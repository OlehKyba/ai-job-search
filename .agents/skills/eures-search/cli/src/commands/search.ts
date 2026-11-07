import { SEARCH_URL, jsonFetch, parseSearchResults, periodForDays, writeError, type JobCard } from "../helpers.js"

export interface SearchOpts {
  query?: string
  location?: string // comma-separated lowercase ISO country codes, e.g. "ch,de"
  jobage: number
  page: number
  limit?: number
  format: "json" | "table" | "plain"
}

export function buildBody(opts: SearchOpts, resultsPerPage: number) {
  return {
    resultsPerPage,
    page: opts.page,
    sortSearch: "BEST_MATCH",
    keywords: opts.query ? [{ keyword: opts.query, specificSearchCode: "EVERYWHERE" }] : [],
    publicationPeriod: periodForDays(opts.jobage),
    occupationUris: [],
    skillUris: [],
    requiredExperienceCodes: [],
    positionScheduleCodes: [],
    sectorCodes: [],
    educationAndQualificationLevelCodes: [],
    positionOfferingCodes: [],
    locationCodes: opts.location ? opts.location.split(",").map((c) => c.trim().toLowerCase()) : [],
    euresFlagCodes: [],
    otherBenefitsCodes: [],
    requiredLanguages: [],
    minNumberPost: null,
    sessionId: "eures-cli",
  }
}

function renderTable(cards: JobCard[]): string {
  if (cards.length === 0) return "No results."
  const rows = cards.map((c) => {
    const title = (c.title || "").slice(0, 42).padEnd(42)
    const company = (c.company || "—").slice(0, 26).padEnd(26)
    const loc = (c.location || "—").slice(0, 10).padEnd(10)
    return `${c.id.padEnd(52)} ${title} ${company} ${loc} ${c.date || "—"}`
  })
  const header =
    "ID".padEnd(52) + " " + "TITLE".padEnd(42) + " " + "COMPANY".padEnd(26) + " " + "COUNTRY".padEnd(10) + " DATE"
  return [header, "-".repeat(header.length), ...rows].join("\n")
}

export async function runSearch(opts: SearchOpts): Promise<number> {
  try {
    const perPage = Math.min(opts.limit ?? 25, 50)
    const data = await jsonFetch<{ numberRecords?: number; jvs?: any[] }>(SEARCH_URL, buildBody(opts, perPage))
    let cards = parseSearchResults(data)
    // The API only filters by coarse period buckets; enforce the exact age client-side.
    if (opts.jobage < 9999) {
      const cutoff = new Date(Date.now() - opts.jobage * 86400000).toISOString().slice(0, 10)
      cards = cards.filter((c) => !c.date || c.date >= cutoff)
    }
    if (opts.limit !== undefined) cards = cards.slice(0, opts.limit)

    if (opts.format === "table") {
      process.stdout.write(renderTable(cards) + "\n")
    } else if (opts.format === "plain") {
      process.stdout.write(
        cards
          .map((c) => `${c.title}\n  ${c.company || "—"} · ${c.location || "—"} · ${c.date || "—"}\n  id: ${c.id}\n  ${c.url}`)
          .join("\n\n") + "\n",
      )
    } else {
      process.stdout.write(
        JSON.stringify({ meta: { count: cards.length, page: opts.page, total: data?.numberRecords ?? null }, results: cards }, null, 2) + "\n",
      )
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "SEARCH_FAILED")
    return 1
  }
}
