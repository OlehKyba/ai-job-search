// Data source: Djinni's public RSS feed and job posting pages. robots.txt
// (fetched 2026-09-20) disallows /jobs2, /q, /developers, /free-jobs,
// /set_lang - none of which this skill touches. /jobs/rss/ (search) and
// /jobs/<id>-<slug>/ (detail) are both allowed and confirmed live.
//
// The RSS feed carries title/link/description/pubDate/category but no
// company or location - Djinni's `<item>` schema simply doesn't include
// them. Company, countries, employment type, experience, and language
// requirements all live on the individual job posting page instead, in a
// schema.org JobPosting JSON-LD block (same pattern as dynamitejobs-search).
// So: `search` reads the RSS feed (id/title/date/url only), and `detail`
// fetches the actual posting page for everything else.

export const RSS_URL = "https://djinni.co/jobs/rss/"
export const SITE_BASE = "https://djinni.co"

// The full flat set of category keys from Djinni's primary_keyword filter
// tree (extracted from the tms-data JSON on https://djinni.co/jobs/, checked
// live 2026-09-20). Passed as-is to `primary_keyword` - case-sensitive,
// exact match required (e.g. "Support", not "customer-support" or
// "Customer Support").
export const CATEGORIES = [
  "JavaScript", "Angular", "Markup", "React.js", "Svelte", "Vue.js", "Fullstack", "Java",
  ".NET", ".NET Gamedev", "Dotnet Web", "ASP.NET", "Blazor", "Dotnet Cloud", "Dotnet Mobile",
  "MAUI", "Xamarin", "Dotnet Desktop", "WinForms", "WPF", "Python", "PHP", "Drupal", "Laravel",
  "Magento", "Symfony", "WordPress", "Yii", "Node.js", "iOS", "Android", "React Native", "C++",
  "C Lang", "CPP", "Embedded", "Flutter", "Golang", "Ruby", "Scala", "Salesforce", "Rust",
  "Elixir", "Kotlin", "ERP", "MS Dynamics", "Odoo", "SAP", "No Code", "QA",
  "QA Hardware / Embedded", "QA Automation", "Design", "Product Design", "Content Design",
  "UI UX", "UX Research", "Graphic Design", "Artist", "3D Artist", "VFX Artist", "Motion Design",
  "Video Editor", "2D Animation", "2D Artist", "3D Animation", "Illustrator", "Unity",
  "Game Design", "Game Developer", "Unreal Developer", "Unity Developer", "Level Design",
  "Business Analyst", "Data Science", "ML AI", "Data Analyst", "Web Analyst", "Data Engineer",
  "SQL", "Project Manager", "Product Manager", "Product Owner", "Delivery Manager",
  "Scrum Master", "Lead", "CTO", "Architect", "Engineering Manager", "Head Chief", "CMO", "CCO",
  "CSO", "CIO", "COO", "CEO", "CBDO", "CPO", "CFO", "DevOps", "Security", "Security Analyst",
  "Penetration Tester", "Information Security", "Sysadmin", "DefTech", "Avionics",
  "UAV / Drone Engineer", "Military Software / C4ISR", "Weapons Systems", "Electronic Warfare",
  "UAV / Drone Pilot", "Hardware", "Firmware Engineer", "RF Engineer", "ASIC / Chip Design",
  "Robotics Engineer", "Hardware Engineer", "FPGA Engineer", "Engineering / CAD Design",
  "CAD Designer", "Electrical Engineering", "Electronics / PCB Design", "Industrial Design",
  "Mechanical Engineering", "Marketing", "Content Marketing", "Content Writing",
  "Content Manager", "Advertising", "PPC", "Affiliate Manager", "Media Buying",
  "Digital Marketing", "Social Media", "Digital Marketing Manager", "Marketing Analyst",
  "Performance Marketing", "PR Manager", "Sales", "Account Manager", "Sales Leadership",
  "Sales Manager", "Business Development", "Lead Generation", "SEO", "HR", "Recruiter",
  "Technical Writing", "Support", "Finances", "Financial Analyst", "FinOps", "Finance Manager",
  "Accountant", "Other",
] as const

// A small lookup for the ISO 3166-1 alpha-3 codes seen in
// applicantLocationRequirements - not exhaustive, falls back to the raw code.
const COUNTRY_NAMES: Record<string, string> = {
  BRA: "Brazil", MEX: "Mexico", ARG: "Argentina", COL: "Colombia", CHL: "Chile", PER: "Peru",
  ECU: "Ecuador", UKR: "Ukraine", POL: "Poland", ROU: "Romania", BGR: "Bulgaria", SRB: "Serbia",
  USA: "United States", GBR: "United Kingdom", DEU: "Germany", FRA: "France", ESP: "Spain",
  PRT: "Portugal", ITA: "Italy", NLD: "Netherlands", CZE: "Czechia", HUN: "Hungary",
  GEO: "Georgia", ARM: "Armenia", KAZ: "Kazakhstan", IND: "India", PHL: "Philippines",
  CAN: "Canada", AUS: "Australia",
}

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

const UA = "Mozilla/5.0 (compatible; djinni-cli/1.0)"

/** Fetch text (RSS/HTML) with exponential backoff on 429/5xx. Returns "" on a 404. */
export async function textFetch(url: string): Promise<string> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/rss+xml,application/xml;q=0.9,*/*;q=0.8",
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
  industry: string | null
  experienceMonths: number | null
  applicantCountries: string[] | null
  validThrough: string | null
}

/** Extract the numeric job id from a djinni.co/jobs/<id>-<slug>/ URL. */
export function idFromUrl(url: string): string | null {
  const m = url.match(/\/jobs\/(\d+)-/) || url.match(/\/jobs\/(\d+)\/?(?:$|[?#])/)
  return m ? m[1] : null
}

/** Accept a bare numeric id, a full posting URL, or an "<id>-<slug>" fragment. */
export function normalizeId(input: string): string | null {
  const fromUrl = idFromUrl(input)
  if (fromUrl) return fromUrl
  const bare = input.match(/^\d+$/)
  if (bare) return input
  const prefixed = input.match(/^(\d+)-/)
  if (prefixed) return prefixed[1]
  return null
}

export function buildPostingUrl(id: string): string {
  return `${SITE_BASE}/jobs/${id}-job/`
}

/**
 * Parse the RSS feed into job cards. Djinni's <item> schema carries no
 * company or location - just title/link/description/pubDate/category. Each
 * item is parsed independently so one malformed entry cannot break the rest.
 */
export function parseFeed(xml: string): JobCard[] {
  const results: JobCard[] = []
  const items = xml.split(/<item>/).slice(1)

  for (const raw of items) {
    const block = raw.split(/<\/item>/)[0]
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/)
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/) || block.match(/<guid>([\s\S]*?)<\/guid>/)
    if (!titleMatch || !linkMatch) continue

    const url = decodeHtmlEntities(linkMatch[1].trim())
    const id = idFromUrl(url)
    if (!id) continue

    const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)

    results.push({
      id,
      title: decodeHtmlEntities(titleMatch[1].trim()),
      company: null, // not present in the RSS feed - see `detail`
      location: null, // not present in the RSS feed - see `detail`
      date: dateMatch ? decodeHtmlEntities(dateMatch[1].trim()) : null,
      url,
    })
  }

  return results
}

/**
 * Parse the posting page's schema.org JobPosting JSON-LD block. Unlike some
 * sites, Djinni's job pages carry exactly one ld+json script per posting, but
 * this still scans all of them and picks the one typed JobPosting rather than
 * assuming position, matching the defensive pattern used elsewhere.
 */
export function parseJobPostingJsonLd(html: string): Record<string, unknown> | null {
  const scriptRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let m: RegExpExecArray | null
  while ((m = scriptRe.exec(html)) !== null) {
    try {
      const data = JSON.parse(m[1])
      if (data && data["@type"] === "JobPosting") return data
    } catch {
      continue
    }
  }
  return null
}

/** "<Job Title> at <Company> – Djinni" -> "<Company>". Fallback when the JSON-LD lacks a hiringOrganization name. */
export function companyFromTitleTag(html: string): string | null {
  const m = html.match(/<title>(.*?) at (.*?)\s*[–-]\s*Djinni<\/title>/)
  return m ? decodeHtmlEntities(m[2].trim()) : null
}

export function parseJobDetail(html: string, id: string): JobDetail | null {
  const ld = parseJobPostingJsonLd(html)
  if (!ld) return null

  const url = buildPostingUrl(id)
  const hiringOrg = ld.hiringOrganization as { name?: string } | undefined
  const applicantReqs = ld.applicantLocationRequirements as
    | { address?: { addressCountry?: string } }[]
    | undefined
  const countryCodes = Array.isArray(applicantReqs)
    ? applicantReqs.map((r) => r.address?.addressCountry).filter((c): c is string => Boolean(c))
    : null
  const countryNames = countryCodes?.map((c) => COUNTRY_NAMES[c] ?? c) ?? null

  const experienceReq = ld.experienceRequirements as { monthsOfExperience?: number } | undefined

  return {
    id,
    title: typeof ld.title === "string" ? ld.title : "(untitled)",
    company: hiringOrg?.name ?? companyFromTitleTag(html),
    location: countryNames && countryNames.length > 0
      ? countryNames.join(", ")
      : (typeof ld.jobLocationType === "string" ? ld.jobLocationType : null),
    date: typeof ld.datePosted === "string" ? ld.datePosted : null,
    url,
    description: typeof ld.description === "string" ? ld.description.trim() : null,
    employmentType: typeof ld.employmentType === "string" ? ld.employmentType : null,
    category: typeof ld.category === "string" ? ld.category : null,
    industry: typeof ld.industry === "string" ? ld.industry : null,
    experienceMonths: typeof experienceReq?.monthsOfExperience === "number" ? experienceReq.monthsOfExperience : null,
    applicantCountries: countryCodes,
    validThrough: typeof ld.validThrough === "string" ? ld.validThrough : null,
  }
}

/** True if `date` falls within the last N days of `now`. Accepts any Date-parseable string. */
export function withinDays(date: string | null, days: number, now: Date = new Date()): boolean {
  if (!date) return true
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return true
  const ms = days * 24 * 60 * 60 * 1000
  return now.getTime() - parsed.getTime() <= ms
}
