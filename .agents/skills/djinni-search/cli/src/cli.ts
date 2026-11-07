#!/usr/bin/env bun
// Self-contained CLI for searching job postings on Djinni (djinni.co). No
// external CLI framework, so it runs anywhere `bun` is available with zero
// install beyond the repo clone.
//
// `search` reads Djinni's public RSS feed (/jobs/rss/), optionally scoped to
// one category via `primary_keyword`. The RSS schema carries no company or
// location, so those fields come back null from `search` - `detail` fetches
// the actual posting page (also public) for the full picture, including the
// posting's real accepted-countries list.
//
// Personal use only. Keep volume low and do not use this for bulk data collection.

import { CATEGORIES } from "./helpers.js"
import { runSearch, type SearchOpts } from "./commands/search.js"
import { runDetail, type DetailOpts } from "./commands/detail.js"

interface Flags {
  _: string[]
  [k: string]: string | boolean | string[]
}

function parseFlags(argv: string[]): Flags {
  const flags: Flags = { _: [] }
  const alias: Record<string, string> = { q: "query", n: "limit", c: "category" }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith("--") || a.startsWith("-")) {
      const key = alias[a.replace(/^-+/, "")] ?? a.replace(/^-+/, "")
      const next = argv[i + 1]
      if (next === undefined || next.startsWith("-")) {
        flags[key] = true
      } else {
        flags[key] = next
        i++
      }
    } else {
      ;(flags._ as string[]).push(a)
    }
  }
  return flags
}

const HELP = `djinni-cli — search job postings on Djinni (djinni.co)

Reads the site's public RSS feed for search (optionally scoped to one
category) and the actual posting page for detail. The RSS schema has no
company/location field, so those come back null from \`search\` - always
follow up with \`detail\` for a posting you're seriously evaluating.

USAGE
  bun run src/cli.ts search [--category <key>] [flags]
  bun run src/cli.ts detail <id|url> [--format json|plain]

SEARCH FLAGS
  --category, -c <key>   Optional. Exact category key, e.g. "Support",
                          "Python", "HR". Omit to search across all
                          categories. See url-reference.md for the full list.
  --query, -q <text>      Client-side keyword filter against the title.
  --jobage <days>         Posted within N days (filters on RSS pubDate).
  --page <n>              1-indexed page (20 results/page). Default 1.
  --limit, -n <n>         Cap results emitted (client-side, after filtering).
  --format <fmt>          json (default) | table | plain.

EXAMPLES
  bun run src/cli.ts search -c Support -q "customer" --jobage 14 --format table
  bun run src/cli.ts search -q "operations" --format table
  bun run src/cli.ts detail 819756 --format plain
  bun run src/cli.ts detail https://djinni.co/jobs/819756-tech-support-engineer-l2/

Personal use only — keep volume low, no bulk data collection.
`

const KNOWN_FLAGS: Record<string, Set<string>> = {
  search: new Set(["category", "query", "jobage", "page", "limit", "format", "help", "h"]),
  detail: new Set(["format", "help", "h"]),
}

async function main(): Promise<number> {
  const argv = process.argv.slice(2)
  const flags = parseFlags(argv)
  const cmd = (flags._ as string[])[0]

  if (!cmd || flags.help || flags.h) {
    process.stdout.write(HELP)
    return cmd ? 0 : 1
  }

  const knownFlags = KNOWN_FLAGS[cmd]
  if (knownFlags) {
    for (const key of Object.keys(flags)) {
      if (key === "_" || knownFlags.has(key)) continue
      process.stderr.write(
        JSON.stringify({
          error: `unknown flag --${key} for '${cmd}' - flags are never silently ignored, because a discarded filter changes what the search returns; see --help for the supported flags`,
          code: "UNKNOWN_FLAG",
        }) + "\n",
      )
      return 1
    }
  }

  const parseIntFlag = (name: string, raw: string | boolean | string[]): number | null => {
    const val = typeof raw === "string" ? Number(raw.trim()) : NaN
    if (!Number.isInteger(val) || val < 1) {
      process.stderr.write(
        JSON.stringify({ error: `--${name} must be a whole number of at least 1, got "${raw}"`, code: "BAD_ARG" }) + "\n",
      )
      return null
    }
    return val
  }

  if (cmd === "search") {
    const category = typeof flags.category === "string" ? flags.category : undefined
    if (category !== undefined && !(CATEGORIES as readonly string[]).includes(category)) {
      process.stderr.write(
        JSON.stringify({
          error: `unknown category "${category}" - see url-reference.md for the exact, case-sensitive category keys Djinni accepts`,
          code: "BAD_CATEGORY",
        }) + "\n",
      )
      return 1
    }

    if (flags.jobage !== undefined) {
      const v = parseIntFlag("jobage", flags.jobage)
      if (v === null) return 1
      flags.jobage = String(v)
    }
    if (flags.page !== undefined) {
      const v = parseIntFlag("page", flags.page)
      if (v === null) return 1
      flags.page = String(v)
    }
    if (flags.limit !== undefined) {
      const v = parseIntFlag("limit", flags.limit)
      if (v === null) return 1
      flags.limit = String(v)
    }

    const fmt = (flags.format as string) || "json"
    const opts: SearchOpts = {
      category,
      query: typeof flags.query === "string" ? flags.query : undefined,
      jobage: flags.jobage ? parseInt(flags.jobage as string, 10) : undefined,
      page: flags.page ? Math.max(1, parseInt(flags.page as string, 10)) : 1,
      limit: flags.limit ? parseInt(flags.limit as string, 10) : undefined,
      format: (["json", "table", "plain"].includes(fmt) ? fmt : "json") as SearchOpts["format"],
    }
    return runSearch(opts)
  }

  if (cmd === "detail") {
    const id = (flags._ as string[])[1]
    if (!id) {
      process.stderr.write(JSON.stringify({ error: "detail requires an <id|url>", code: "NO_ID" }) + "\n")
      return 1
    }
    const fmt = (flags.format as string) || "json"
    const opts: DetailOpts = {
      id,
      format: (fmt === "plain" ? "plain" : "json") as DetailOpts["format"],
    }
    return runDetail(opts)
  }

  process.stderr.write(JSON.stringify({ error: `Unknown command "${cmd}"`, code: "BAD_CMD" }) + "\n")
  return 1
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    process.stderr.write(
      JSON.stringify({
        error: e instanceof Error ? e.message : String(e),
        code: "INTERNAL_ERROR",
      }) + "\n",
    )
    process.exit(1)
  })
