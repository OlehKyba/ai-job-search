// Data source: We Work Remotely's public per-category RSS feeds. No authentication
// required. robots.txt (fetched 2026-09-20) allows "/" broadly, disallowing only
// /admin/, /account/, /job-seekers/account/, /job-seekers/profile/,
// /manage-company/, and token-bearing edit/cancel links — none of which this skill
// touches. In practice, though, the site's HTML pages (homepage, sitemap.xml, and
// individual /remote-jobs/<slug> posting pages) sit behind a Cloudflare JS
// challenge and return 403 to a plain fetch even with browser-like headers; the
// RSS feeds do not and return real content with a plain, honest User-Agent. This
// skill therefore never attempts the HTML pages: `search` reads a category feed,
// and `detail` re-reads that same feed to find a matching item, since there is no
// working way to fetch a single posting page directly.

export const RSS_BASE = "https://weworkremotely.com/categories"
export const SITE_BASE = "https://weworkremotely.com"

// Verified live 2026-09-20 by probing each category's .rss URL for a 200.
// (WWR's homepage/category index is behind the Cloudflare challenge described
// above, so this list can't be scraped - it's just the confirmed-working slugs.)
export const CATEGORY_MAP: Record<string, string> = {
  "programming": "remote-programming-jobs",
  "full-stack-programming": "remote-full-stack-programming-jobs",
  "front-end-programming": "remote-front-end-programming-jobs",
  "back-end-programming": "remote-back-end-programming-jobs",
  "devops-sysadmin": "remote-devops-sysadmin-jobs",
  "customer-support": "remote-customer-support-jobs",
  "design": "remote-design-jobs",
  "sales-and-marketing": "remote-sales-and-marketing-jobs",
  "management-and-finance": "remote-management-and-finance-jobs",
  "product": "remote-product-jobs",
}

export const CATEGORIES = Object.keys(CATEGORY_MAP)

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

const UA = "Mozilla/5.0 (compatible; weworkremotely-cli/1.0)"

/** Fetch text (RSS/XML) with exponential backoff on 429/5xx. Returns "" on a 404. */
export async function textFetch(url: string): Promise<string> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "application/rss+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    })
    if (response.status === 429 || response.status >= 500) {
      if (attempt === maxRetries) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }
      const jitter = Math.floor(Math.random() * 500)
      await new Promise((r) => setTimeout(r, delay + jitter))
      delay = Math.min(delay * 2, 8000)
      continue
    }
    if (response.status === 404) return ""
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    }
    return response.text()
  }
  throw new Error("Request failed after max retries")
}

function numericEntity(cp: number): string {
  return cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ""
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => numericEntity(parseInt(dec, 10)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) => numericEntity(parseInt(hex, 16)))
    .replace(/&nbsp;/g, " ")
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

export interface JobCard {
  id: string
  title: string
  company: string | null
  location: string | null
  date: string | null
  url: string
}

export interface JobDetail extends JobCard {
  description: string | null
  employmentType: string | null
  category: string | null
  expiresAt: string | null
}

function xmlField(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  return m ? decodeHtmlEntities(m[1].trim()) : null
}

/** Extract the job slug from a weworkremotely.com/remote-jobs/<slug> URL. */
export function slugFromUrl(url: string): string | null {
  const m = url.match(/\/remote-jobs\/([^/?#]+)/)
  return m ? m[1] : null
}

export function buildCompoundId(categoryKey: string, slug: string): string {
  return `${categoryKey}/${slug}`
}

/** Split a compound "<category-key>/<job-slug>" id. Returns null if the category key isn't recognized. */
export function splitCompoundId(id: string): { category: string; slug: string } | null {
  const idx = id.indexOf("/")
  if (idx === -1) return null
  const category = id.slice(0, idx)
  const slug = id.slice(idx + 1)
  if (!CATEGORY_MAP[category] || !slug) return null
  return { category, slug }
}

function locationOf(block: string): string | null {
  const region = xmlField(block, "region")
  const country = xmlField(block, "country")
  const state = xmlField(block, "state")
  const parts = [region, country, state].filter((p): p is string => Boolean(p && p.length > 0))
  return parts.length > 0 ? Array.from(new Set(parts)).join(", ") : null
}

function titleAndCompany(rawTitle: string): { title: string; company: string | null } {
  const idx = rawTitle.indexOf(": ")
  if (idx === -1) return { title: rawTitle, company: null }
  return { company: rawTitle.slice(0, idx).trim(), title: rawTitle.slice(idx + 2).trim() }
}

/**
 * Parse a category RSS feed into job cards. Each <item> is parsed independently
 * so one malformed entry cannot break the rest.
 */
export function parseCategoryFeed(xml: string, categoryKey: string): JobCard[] {
  const results: JobCard[] = []
  const items = xml.split(/<item>/).slice(1)

  for (const raw of items) {
    const block = raw.split(/<\/item>/)[0]
    const rawTitle = xmlField(block, "title")
    const link = xmlField(block, "link") ?? xmlField(block, "guid")
    if (!rawTitle || !link) continue

    const slug = slugFromUrl(link)
    if (!slug) continue

    const { title, company } = titleAndCompany(rawTitle)

    results.push({
      id: buildCompoundId(categoryKey, slug),
      title,
      company,
      location: locationOf(block),
      date: xmlField(block, "pubDate"),
      url: link,
    })
  }

  return results
}

/** Parse a single matching <item> block into full detail, including description. */
export function parseItemDetail(block: string, categoryKey: string): JobDetail | null {
  const rawTitle = xmlField(block, "title")
  const link = xmlField(block, "link") ?? xmlField(block, "guid")
  if (!rawTitle || !link) return null
  const slug = slugFromUrl(link)
  if (!slug) return null

  const { title, company } = titleAndCompany(rawTitle)
  const descMatch = block.match(/<description>([\s\S]*?)<\/description>/)
  const description = descMatch
    ? decodeHtmlEntities(stripTags(decodeHtmlEntities(descMatch[1]))).replace(/\s{2,}/g, " ").trim() || null
    : null

  return {
    id: buildCompoundId(categoryKey, slug),
    title,
    company,
    location: locationOf(block),
    date: xmlField(block, "pubDate"),
    url: link,
    description,
    employmentType: xmlField(block, "type"),
    category: xmlField(block, "category"),
    expiresAt: xmlField(block, "expires_at"),
  }
}

/** Find the <item> block in a feed whose link/guid matches the given slug. */
export function findItemBySlug(xml: string, slug: string): string | null {
  const items = xml.split(/<item>/).slice(1)
  for (const raw of items) {
    const block = raw.split(/<\/item>/)[0]
    const link = xmlField(block, "link") ?? xmlField(block, "guid")
    if (link && slugFromUrl(link) === slug) return block
  }
  return null
}

/** True if `date` (an RFC-822 pubDate) falls within the last N days of `now`. */
export function withinDays(date: string | null, days: number, now: Date = new Date()): boolean {
  if (!date) return true
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return true
  const ms = days * 24 * 60 * 60 * 1000
  return now.getTime() - parsed.getTime() <= ms
}
