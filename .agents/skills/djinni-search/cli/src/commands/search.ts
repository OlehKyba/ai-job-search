import { RSS_URL, textFetch, parseFeed, withinDays, writeError, type JobCard } from "../helpers.js"

export interface SearchOpts {
  category?: string
  query?: string
  jobage?: number
  page: number
  limit?: number
  format: "json" | "table" | "plain"
}

function matchesQuery(card: JobCard, query: string): boolean {
  return card.title.toLowerCase().includes(query.toLowerCase())
}

function renderTable(cards: JobCard[]): string {
  if (cards.length === 0) return "No results."
  const rows = cards.map((c) => {
    const id = c.id.padEnd(10)
    const title = (c.title || "").slice(0, 50).padEnd(50)
    const date = (c.date || "—").slice(0, 25)
    return `${id} ${title} ${date}`
  })
  const header = "ID".padEnd(10) + " " + "TITLE".padEnd(50) + " " + "DATE"
  return [header, "-".repeat(header.length), ...rows].join("\n")
}

export async function runSearch(opts: SearchOpts): Promise<number> {
  try {
    const params = new URLSearchParams()
    if (opts.category) params.set("primary_keyword", opts.category)
    const url = params.toString() ? `${RSS_URL}?${params.toString()}` : RSS_URL

    const xml = await textFetch(url)
    let cards = parseFeed(xml)

    if (opts.query) cards = cards.filter((c) => matchesQuery(c, opts.query!))
    if (opts.jobage !== undefined) cards = cards.filter((c) => withinDays(c.date, opts.jobage!))

    const pageSize = 20
    const start = (opts.page - 1) * pageSize
    let paged = cards.slice(start, start + pageSize)
    if (opts.limit !== undefined && opts.limit >= 0) paged = paged.slice(0, opts.limit)

    if (opts.format === "table") {
      process.stdout.write(renderTable(paged) + "\n")
    } else if (opts.format === "plain") {
      process.stdout.write(
        paged.map((c) => `${c.title}\n  ${c.date || "—"}\n  id: ${c.id}\n  ${c.url}`).join("\n\n") + "\n",
      )
    } else {
      process.stdout.write(
        JSON.stringify(
          { meta: { count: paged.length, page: opts.page, totalFetched: cards.length }, results: paged },
          null,
          2,
        ) + "\n",
      )
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "SEARCH_FAILED")
    return 1
  }
}
