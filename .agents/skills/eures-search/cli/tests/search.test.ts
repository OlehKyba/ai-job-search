import { describe, expect, test } from "bun:test"
import { runCLI, parseJSON } from "./helpers.ts"
import { cleanDescription, parseSearchResults, periodForDays } from "../src/helpers.ts"
import { normalizeId } from "../src/commands/detail.ts"

interface SearchOut {
  meta: { count: number; page: number }
  results: { id: string; title: string; company: string | null; location: string | null; date: string | null; url: string }[]
}

// Live calls to the EURES API stay out of CI (network flakiness, load on a public
// service). Run them locally with: EURES_LIVE=1 bun test
describe.skipIf(!process.env.EURES_LIVE)("live search", () => {
  test("returns results with id/title/url", async () => {
    const out = parseJSON<SearchOut>(await runCLI(["search", "-q", "quality engineer", "-l", "ch", "--limit", "3"]))
    expect(out.results.length).toBeGreaterThanOrEqual(1)
    for (const r of out.results) {
      expect(r.id).toBeTruthy()
      expect(r.title).toBeTruthy()
      expect(r.url).toContain("europa.eu")
    }
  })

  test("detail returns a readable description", async () => {
    const out = parseJSON<SearchOut>(await runCLI(["search", "-q", "quality engineer", "-l", "ch", "--limit", "1"]))
    const d = parseJSON<{ description: string | null }>(await runCLI(["detail", out.results[0].id]))
    expect(d.description).toBeTruthy()
    expect(d.description).not.toContain("---base:")
  })
})

describe("error handling", () => {
  test("unknown flag exits 1 with JSON on stderr", async () => {
    const r = await runCLI(["search", "--bogus", "x"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("UNKNOWN_FLAG")
    expect(r.stdout).toBe("")
  })
  test("bad location exits 1", async () => {
    const r = await runCLI(["search", "-l", "Switzerland"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_ARG")
  })
  test("detail without id exits 1", async () => {
    const r = await runCLI(["detail"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("NO_ID")
  })
})

describe("parsing", () => {
  test("skips malformed entries, nulls missing values", () => {
    const cards = parseSearchResults({
      jvs: [{ id: "abc", title: "QE", creationDate: 1700000000000 }, { title: "no id" } as any],
    })
    expect(cards).toHaveLength(1)
    expect(cards[0].company).toBeNull()
    expect(cards[0].location).toBeNull()
    expect(cards[0].date).toBe("2023-11-14")
  })
  test("cleanDescription strips header and escapes", () => {
    const t = cleanDescription("---base:meta-keywords:title: X--- Head\n====\nA\\-B &amp; C&nbsp;D")
    expect(t).toBe("Head\n\nA-B & C D")
  })
  test("periodForDays buckets", () => {
    expect(periodForDays(5)).toBe("LAST_WEEK")
    expect(periodForDays(60)).toBeNull()
  })
  test("normalizeId rejects foreign hosts", () => {
    expect(normalizeId("https://evil.io/jv-details/ODg4MTMyODgtMDEzOC00NmIx")).toBeNull()
    expect(normalizeId("https://europa.eu/eures/portal/jv-se/jv-details/ODg4MTMyODgtMDEzOC00NmIx?lang=en")).toBe("ODg4MTMyODgtMDEzOC00NmIx")
  })
})
