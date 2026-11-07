---
name: djinni-search
version: 1.0.0
description: >
  Use this skill to search job listings on Djinni (djinni.co), a large
  Eastern Europe / Ukraine-centric tech and remote job board covering
  development, QA, design, data, operations, customer/technical support,
  marketing, sales, and HR. Many postings are remote and explicitly name
  which countries they accept, including a meaningful minority open to Latin
  America. Trigger phrases: djinni, djinni.co, remote tech jobs Ukraine,
  Ukrainian job board, remote customer support jobs, "find me a remote job",
  "are there any remote <role> jobs".
context: fork
allowed-tools: Bash(bun run .agents/skills/djinni-search/cli/src/cli.ts *)
---

# Djinni Search Skill

Search real, live postings on [Djinni](https://djinni.co), a large tech-and-adjacent job board serving the Eastern Europe / Ukraine market with a substantial fully-remote listing base.

## ⚠️ How search works here (read before using)

Djinni's public RSS feed carries no company name or location field — just
title, link, description, date, and category. Company, accepted countries,
employment type, and experience level all live on the individual job
posting page instead (also public).

- **`search`** reads the RSS feed, optionally scoped to one category.
  `company` and `location` always come back `null` from `search` alone.
- **`detail`** fetches the actual posting page and returns the full picture,
  including the posting's real accepted-countries list — this is the field
  that determines eligibility, and it caught a Ukraine-only requirement on
  one posting that a lighter summary had missed entirely.

**Always run `detail` before treating a `search` result as qualified** — see
`url-reference.md` for the exact endpoints and category list.

## ⚠️ Personal use only

This skill only reads paths `robots.txt` allows. Even so, keep volume low
and don't use this for bulk data collection or commercial purposes. Run it
on your own responsibility.

## When to use this skill

- Search Djinni's postings, across all categories or scoped to one (e.g.
  `Support` for customer/technical support roles)
- Filter results by keyword within the title, and by posting age
- Get the full detail of a specific posting, including its real accepted
  countries, employment type, experience requirement, and deadline

## Commands

### Search job listings

```bash
bun run .agents/skills/djinni-search/cli/src/cli.ts search [--category <key>] [flags]
```

Key flags:
- `--category <key>` / `-c <key>` — optional. An **exact, case-sensitive**
  category key (e.g. `Support`, `Python`, `HR`, `Project Manager`). Omit to
  search the latest postings across every category. See `url-reference.md`
  for the full list of 156 keys.
- `--query <text>` / `-q <text>` — keyword filter, matched client-side
  against the title only (case-insensitive substring) — the feed schema has
  no company field to match against here.
- `--jobage <days>` — only postings whose RSS `pubDate` is within N days.
- `--page <n>` — page number (1-indexed, 20 results per page).
- `--limit <n>` / `-n <n>` — cap total results emitted (client-side).
- `--format json|table|plain` — default `json`.

### Fetch full posting detail

```bash
bun run .agents/skills/djinni-search/cli/src/cli.ts detail <id|url> [--format json|plain]
```

Accepts the numeric id from a `search` result, a full posting URL, or an
`<id>-<slug>` fragment.

## Usage examples

```bash
# Customer/technical support roles, last 14 days
bun run .agents/skills/djinni-search/cli/src/cli.ts search -c Support -q "customer" --jobage 14 --format table

# Search across every category (no --category)
bun run .agents/skills/djinni-search/cli/src/cli.ts search -q "operations" --format table

# HR-adjacent roles
bun run .agents/skills/djinni-search/cli/src/cli.ts search -c HR --format table

# Full detail for a specific posting
bun run .agents/skills/djinni-search/cli/src/cli.ts detail 819756 --format plain
bun run .agents/skills/djinni-search/cli/src/cli.ts detail https://djinni.co/jobs/819756-tech-support-engineer-l2/
```

## Output formats

| Format | Best for |
|--------|----------|
| `json` | Default — programmatic use, passing ids to `detail` |
| `table` | Quick human-readable scanning |
| `plain` | Reading a single posting's full detail (`detail` command) |

All errors are written to **stderr** as `{ "error": "...", "code": "..." }` and the process exits with code `1`.

## Notes

- No authentication required — both the RSS feed and posting pages are
  public.
- `search`'s `company`/`location` fields are always `null` — this is a real
  schema limitation of the RSS feed, not a bug. Call `detail` for anything
  worth evaluating.
- No structured `--location` filter on `search`; `detail`'s
  `applicantCountries`/`location` fields are the reliable source for
  eligibility, not the category or company name.
- Predominantly Eastern Europe / Ukraine-focused overall, but check every
  posting's `detail` output individually — country and language requirements
  vary a lot even within one category.
- The CLI backs off on 429/5xx with jitter, matching the other portal skills
  in this repo.
