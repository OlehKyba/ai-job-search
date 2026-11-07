# Djinni URL Reference

Public, unauthenticated endpoints used by this skill. Checked 2026-09-20.

> **robots.txt** (`https://djinni.co/robots.txt`) disallows `/jobs2`, `/q`,
> `/developers`, `/free-jobs`, `/set_lang`. None of that overlaps with what
> this skill reads: `/jobs/rss/` (search) and `/jobs/<id>-<slug>/` (detail)
> are both allowed and confirmed live with a plain, honest User-Agent.

## Search — RSS feed

```
GET https://djinni.co/jobs/rss/?primary_keyword=<category-key>
```

`primary_keyword` is optional — omit it to get the latest postings across
every category. When present, it must be an **exact, case-sensitive** key
from Djinni's own category tree (e.g. `Support`, not `customer-support` or
`Customer Support` — passing a human-readable label instead of the key is
silently ignored and returns the unfiltered feed, which is what happened
during Step 2 investigation before the correct key was found).

The category tree was extracted from a `<script type="application/json"
class="tms-data">` block embedded in `https://djinni.co/jobs/` (the site's
job-search page), under `data-name="primary_keyword"`. It's a two-level
tree of `{key, label, children?}` objects; the full flat list of 156 `key`
values is embedded in `helpers.ts`'s `CATEGORIES` export. The category
relevant to customer support / technical support / operations-adjacent roles
is `Support` (label "Customer/Technical Support") — it lives under the tree's
"Other" group, not an "Operations" or "Customer Support" group, which is easy
to miss.

Returns RSS 2.0 XML. Each `<item>` carries only:

| Field | Meaning |
|---|---|
| `<title>` | Job title (no company prefix, unlike We Work Remotely) |
| `<link>` / `<guid>` | Both point at `https://djinni.co/jobs/<id>-<slug>/` |
| `<description>` | HTML entity-escaped body (not used by `search` - `detail` gets a cleaner version from the JSON-LD instead) |
| `<pubDate>` | RFC-822-ish posting date |
| `<category>` | The job's category key(s), e.g. `Support` |

**No company, no location, no salary, no deadline field.** These live only
on the individual posting page - `search` returns them as `null`, and code
consuming this skill should call `detail` before treating a result as
qualified (this is exactly how the "EverHelp" posting's Ukraine-only
eligibility requirement was caught: invisible in the RSS/summary, present in
the structured page data).

Feed returns roughly its 100 most recent postings for the given filter (or
overall, unfiltered) - no pagination parameter beyond that window. The CLI
paginates client-side over whatever the feed currently holds.

## Detail — job posting page

```
GET https://djinni.co/jobs/<id>-<any-slug>/
```

The slug portion is cosmetic - `https://djinni.co/jobs/819756-x/` and
`https://djinni.co/jobs/819756-tech-support-engineer-l2/` both resolve to the
same posting (confirmed live); `https://djinni.co/jobs/819756/` with **no**
slug at all returns 404. `detail` always builds the URL with a placeholder
slug (`<id>-job`) when given a bare id.

Server-rendered HTML containing a `<script type="application/ld+json">`
block typed `JobPosting` (schema.org), structurally almost identical to
Dynamite Jobs' posting pages. Fields used:

| JSON-LD field | Meaning |
|---|---|
| `title`, `description` (already **plain text**, not HTML - no stripping needed, unlike WWR/Dynamite Jobs) | Posting title and full body |
| `hiringOrganization.name` | Company name. Falls back to parsing the page's `<title>Job Title at Company – Djinni</title>` tag if this is ever absent |
| `applicantLocationRequirements[].address.addressCountry` | **ISO 3166-1 alpha-3** country codes (e.g. `BRA`, not `Brazil`) - this is the real eligibility gate, more complete than the page's visible "Countries where we consider candidates" text in at least one observed case |
| `employmentType`, `category`, `industry` | e.g. `FULL_TIME`, `Support`, `saas` |
| `experienceRequirements.monthsOfExperience` | Minimum experience, in months (divide by 12 for years) |
| `datePosted`, `validThrough` | Posting date and deadline |
| `identifier` | The numeric job id - matches the id in the URL |

No `baseSalary`/`estimatedSalary` field observed - Djinni shows salary as a
visual `$`-`$$$$` tier indicator on the page (not in JSON-LD, not scraped by
this skill) rather than a number.

## Notes

- No authentication required for either endpoint.
- The CLI backs off on 429/5xx with jitter, matching the other portal skills
  in this repo.
- Djinni sets a `sessionid` cookie encoding a geolocated `country_code`
  (inferred from the requester's IP) on every response - this affects site
  personalization only, not the JSON-LD content of a specific posting, so it
  doesn't matter for this skill's purposes.
- Predominantly Eastern Europe / Ukraine-focused (many postings require
  Ukrainian and/or restrict to European countries), but a meaningful minority
  of postings explicitly list Latin American countries as accepted - always
  check `detail`'s `applicantLocationRequirements`, never assume from the
  category or company name.
