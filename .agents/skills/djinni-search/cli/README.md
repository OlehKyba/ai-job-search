# djinni-cli

CLI for searching job postings on [Djinni](https://djinni.co). Zero runtime dependencies — just `bun` and `fetch`.

## Why search and detail read different sources

Djinni's public RSS feed (`/jobs/rss/`) is allowed by `robots.txt` and works with a plain `fetch`, but its `<item>` schema carries no company name or location — just title, link, description, pubDate, and category. Company, accepted countries, employment type, experience level, and salary tier all live on the individual job posting page instead (also public, also allowed), in a `schema.org JobPosting` JSON-LD block.

- **`search`** reads the RSS feed, optionally scoped to one category via `primary_keyword`. `company`/`location` come back `null`.
- **`detail`** fetches the actual posting page and parses its JSON-LD for the full picture, including the posting's real accepted-countries list (`applicantLocationRequirements`) — this is the field that actually determines eligibility, and it's frequently more complete than what a human reader sees on the rendered page.

See `../url-reference.md` for the full endpoint documentation and category list.

## Commands

```bash
bun run src/cli.ts search --category Support --query "customer" --format table
bun run src/cli.ts detail <numeric-id> --format plain
```

## Install

```bash
bun install
bun run typecheck
bun run test
```

Personal use only — keep volume low, no bulk data collection.
