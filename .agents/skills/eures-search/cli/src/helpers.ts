// Data source: the public JSON API behind the EURES job-vacancy search
// (https://europa.eu/eures/portal/jv-se/). No authentication required.
// Search is a POST with a JSON body; detail is a GET by vacancy id.

export const SEARCH_URL = "https://europa.eu/eures/api/jv-searchengine/public/jv-search/search"
export const DETAIL_URL = "https://europa.eu/eures/api/jv-searchengine/public/jv/id"
export const PORTAL_URL = "https://europa.eu/eures/portal/jv-se/jv-details"

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

const UA = "Mozilla/5.0 (compatible; eures-cli/1.0)"

/** Fetch JSON with exponential backoff on 429/5xx. Returns null on a 404. */
export async function jsonFetch<T = unknown>(url: string, body?: unknown): Promise<T | null> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      method: body === undefined ? "GET" : "POST",
      headers: {
        "User-Agent": UA,
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
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
    if (response.status === 404) return null
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    }
    return (await response.json()) as T
  }
  throw new Error("Request failed after max retries")
}

export interface JobCard {
  id: string
  title: string
  company: string | null
  location: string | null
  date: string | null
  url: string
  employmentType: string | null
}

export interface JobDetail extends JobCard {
  description: string | null
  applyInstructions: string | null
  lastModified: string | null
}

export function jobUrl(id: string): string {
  return `${PORTAL_URL}/${id}?lang=en`
}

function numericEntity(cp: number): string {
  return cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ""
}

function decodeHtmlEntities(text: string): string {
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

/**
 * Descriptions arrive as markdown-ish text, sometimes with a leaked
 * "---base:meta-keywords:...---" front-matter header, backslash-escaped
 * punctuation and HTML entities, and with the bullets run together.
 */
export function cleanDescription(raw: string | null | undefined): string | null {
  if (!raw) return null
  let t = raw
  t = t.replace(/^\s*---base:[\s\S]*?---\s*/, "")
  t = t.replace(/<\s*br\s*\/?>/gi, "\n").replace(/<\/(p|li|ul|ol|div|h\d)>/gi, "\n").replace(/<[^>]+>/g, " ")
  t = decodeHtmlEntities(t)
  t = t.replace(/\\([\\`*_{}\[\]()#+\-.!&|~<>])/g, "$1")
  t = t.replace(/\*\*/g, "").replace(/={3,}/g, "\n").replace(/^-{3,}\s*$/gm, "")
  t = t.replace(/\*\s+/g, "\n- ")
  t = t.split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim()).join("\n")
  t = t.replace(/\n{3,}/g, "\n\n").trim()
  return t || null
}

function isoDate(ms: unknown): string | null {
  return typeof ms === "number" && Number.isFinite(ms) ? new Date(ms).toISOString().slice(0, 10) : null
}

interface RawSearchJv {
  id?: string
  title?: string
  creationDate?: number
  locationMap?: Record<string, string[]>
  positionScheduleCodes?: string[]
  employer?: { name?: string | null } | null
}

/** Parse each vacancy independently so one malformed entry cannot break the rest. */
export function parseSearchResults(data: { jvs?: RawSearchJv[] } | null): JobCard[] {
  const out: JobCard[] = []
  for (const jv of data?.jvs ?? []) {
    try {
      if (!jv.id || !jv.title) continue
      const countries = Object.keys(jv.locationMap ?? {}).map((c) => c.toUpperCase())
      out.push({
        id: jv.id,
        title: jv.title.trim(),
        company: jv.employer?.name?.trim() || null,
        location: countries.length ? countries.join(", ") : null,
        date: isoDate(jv.creationDate),
        url: jobUrl(jv.id),
        employmentType: jv.positionScheduleCodes?.join(", ") || null,
      })
    } catch {
      continue
    }
  }
  return out
}

interface RawProfile {
  title?: string
  description?: string
  locations?: { countryCode?: string; cityName?: string | null; postalCode?: string | null }[]
  positionScheduleCodes?: string[]
  employer?: { name?: string | null } | null
  applicationInstructions?: string[]
}

export function parseDetail(data: any, id: string): JobDetail | null {
  const profiles: Record<string, RawProfile> = data?.jvProfiles ?? {}
  const p = profiles[data?.preferredLanguage] ?? Object.values(profiles)[0]
  if (!p) return null
  const loc = (p.locations ?? [])
    .map((l) => [l.cityName, l.countryCode?.toUpperCase()].filter(Boolean).join(", "))
    .filter(Boolean)
  const apply = (p.applicationInstructions ?? []).join("\n")
  return {
    id,
    title: p.title?.trim() || "(untitled)",
    company: p.employer?.name?.trim() || null,
    location: loc.length ? [...new Set(loc)].join(" | ") : null,
    date: isoDate(data?.creationDate),
    url: jobUrl(id),
    employmentType: p.positionScheduleCodes?.join(", ") || null,
    description: cleanDescription(p.description),
    applyInstructions: apply ? cleanDescription(apply) : null,
    lastModified: isoDate(data?.lastModificationDate),
  }
}

/** Map a posting age in days to the API's coarsest enclosing publicationPeriod bucket. */
export function periodForDays(days: number): string | null {
  if (!days || days >= 9999) return null
  if (days <= 1) return "LAST_DAY"
  if (days <= 3) return "LAST_THREE_DAYS"
  if (days <= 7) return "LAST_WEEK"
  if (days <= 30) return "LAST_MONTH"
  return null
}
