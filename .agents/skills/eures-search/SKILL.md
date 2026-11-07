---
name: eures-search
version: 1.0.0
description: >
  Use this skill to search job vacancies on EURES, the European Job Mobility
  Portal (eures.europa.eu), which aggregates public employment-service postings
  from 30+ European countries (EU/EEA and Switzerland). Invoke for jobs in
  Switzerland, Germany, Spain, Austria, or any EU/EEA country, and for looking up a
  specific EURES vacancy. Trigger phrases: EURES, European Job Mobility Portal,
  jobs in Europe, vacancies across Europe, jobs in Switzerland (Job-Room / RAV),
  Stellenangebote Europa, ofertas de empleo Europa, offres d'emploi Europe,
  work abroad in the EU.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: Bash(bun run .agents/skills/eures-search/cli/src/cli.ts *)
---

# EURES Search Skill

Search live vacancies from EURES (European Job Mobility Portal) through the public
JSON API that backs its job-search page. No authentication, no API key, and **zero
runtime dependencies** - it runs with just `bun`.

EURES aggregates postings from national public employment services (for example
Switzerland's Job-Room/RAV feed, Germany's Bundesagentur, Spain's SEPE) plus some
private employers and agencies. Postings are in their original language.

## Usage notes

- robots.txt on `eures.europa.eu` and `europa.eu` does not disallow the API path, and
  no login is required. Still, keep volume low (a handful of queries per run).
- Many postings are re-publications of other boards (the apply link often points to
  jobs.ch, Indeed, a company site, etc.), so expect overlap with other portal skills;
  `/scrape` deduplicates across runs.

## Commands

### Search

```bash
bun run .agents/skills/eures-search/cli/src/cli.ts search [flags]
```

- `--query <text>` / `-q <text>` - keywords (title, skill, role). Recommended.
- `--location <codes>` / `-l <codes>` - comma-separated ISO 3166-1 alpha-2 **country codes**, e.g. `ch`, `ch,de,at`. Default: all EURES countries. City-level filtering is not supported by the CLI: put the city in `--query` or filter results afterwards.
- `--jobage <days>` - posted within N days (server-side bucket plus exact client-side filter).
- `--page <n>` - 1-indexed page.
- `--limit <n>` / `-n <n>` - cap results (also the page size, max 50; default 25).
- `--format json|table|plain` - default `json`.

### Detail

```bash
bun run .agents/skills/eures-search/cli/src/cli.ts detail <id|url> [--format json|plain]
```

`id` is the long token from `search` results (the `id` field), or a full
`europa.eu/eures/portal/jv-se/jv-details/<id>` URL.

## Examples

```bash
# Quality engineer roles in Switzerland, last 14 days
bun run .agents/skills/eures-search/cli/src/cli.ts search -q "quality engineer" -l ch --jobage 14 --format table

# Supplier quality across the DACH region
bun run .agents/skills/eures-search/cli/src/cli.ts search -q "supplier quality" -l "ch,de,at" --limit 10 --format table

# Medical device quality in Spain
bun run .agents/skills/eures-search/cli/src/cli.ts search -q "calidad productos sanitarios" -l es --format table

# Validation engineer, any EURES country, second page
bun run .agents/skills/eures-search/cli/src/cli.ts search -q "validation engineer" --page 2 --format plain

# Full description of one vacancy
bun run .agents/skills/eures-search/cli/src/cli.ts detail <id> --format plain
```

## Output

Search JSON: `{ "meta": { "count", "page", "total" }, "results": [ ... ] }` with each result
`{ id, title, company, location, date, url, employmentType }`. Missing values are `null`.

| Field | Notes |
|-------|-------|
| `id` | Long base64-like token; pass to `detail` |
| `location` | Country code(s) only in search results; `detail` adds city |
| `date` | Publication date (`YYYY-MM-DD`) |
| `employmentType` | EURES schedule codes (`fulltime`, `parttime`, ...); does **not** distinguish permanent from contract |

Errors go to stderr as `{ "error", "code" }` with exit code 1.

## Notes

- Results ranked `BEST_MATCH`; the match is fuzzy, so results can include loosely related titles - check titles.
- No salary, contract-type (permanent/contractor) or remote/hybrid fields are exposed in search results; read the description in `detail`.
- Descriptions are converted from the portal's markdown-ish text; paragraph structure is only partly preserved.
- `total` in `meta` is the server-side hit count across all pages.
- If the portal changes, see `url-reference.md`.
