import { DETAIL_URL, jsonFetch, parseDetail, writeError } from "../helpers.js"

export interface DetailOpts {
  id: string
  format: "json" | "plain"
}

const EURES_HOST = /(^|\.)europa\.eu$/i

/**
 * Accept a raw vacancy id (base64url-like token) or a europa.eu EURES
 * jv-details URL. URLs on other hosts are rejected.
 */
export function normalizeId(input: string): string | null {
  const trimmed = input.trim()
  if (/^[A-Za-z0-9_-]{16,}={0,2}$/.test(trimmed)) return trimmed
  const hasScheme = /^https?:\/\//i.test(trimmed)
  if (hasScheme || /^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(trimmed)) {
    let parsed: URL
    try {
      parsed = new URL(hasScheme ? trimmed : `https://${trimmed}`)
    } catch {
      return null
    }
    if (!EURES_HOST.test(parsed.hostname)) return null
    const m = parsed.pathname.match(/\/jv-details\/([A-Za-z0-9_=-]{8,})\/?$/)
    return m ? m[1] : null
  }
  return null
}

export async function runDetail(opts: DetailOpts): Promise<number> {
  const id = normalizeId(opts.id)
  if (!id) {
    writeError(`Could not parse a vacancy ID from "${opts.id}"`, "BAD_ID")
    return 1
  }
  try {
    const data = await jsonFetch(`${DETAIL_URL}/${encodeURIComponent(id)}?lang=en`)
    const job = data ? parseDetail(data, id) : null
    if (!job) {
      writeError("Job not found", "NOT_FOUND")
      return 1
    }
    if (opts.format === "plain") {
      const lines = [
        job.title,
        `${job.company || "—"} · ${job.location || "—"}`,
        job.employmentType ? `Schedule: ${job.employmentType}` : "",
        job.date ? `Posted: ${job.date}` : "",
        "",
        job.description || "(no description)",
        job.applyInstructions ? `\nApply: ${job.applyInstructions}` : "",
        "",
        `URL: ${job.url}`,
      ].filter((l, i) => l !== "" || i === 4 || i === 6)
      process.stdout.write(lines.join("\n") + "\n")
    } else {
      process.stdout.write(JSON.stringify(job, null, 2) + "\n")
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "DETAIL_FAILED")
    return 1
  }
}
