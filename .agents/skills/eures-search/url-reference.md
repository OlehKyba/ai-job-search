# EURES - URL and API reference

Verified live 2026-10-24. The EURES job-vacancy search page
(`https://europa.eu/eures/portal/jv-se/`) is a single-page app over a public JSON API; no
login or API key. `eures.europa.eu/robots.txt` and `europa.eu/robots.txt` have no
disallow rule covering `/eures/api/`.

## Search - POST

`POST https://europa.eu/eures/api/jv-searchengine/public/jv-search/search`
`Content-Type: application/json`

Body (fields the CLI sends):

| Field | Value |
|-------|-------|
| `resultsPerPage` | page size (CLI: `--limit`, max 50) |
| `page` | 1-indexed |
| `sortSearch` | `BEST_MATCH` (`MOST_RECENT` ignored the keyword in testing, so it is not used) |
| `keywords` | `[{ "keyword": "<text>", "specificSearchCode": "EVERYWHERE" }]` |
| `publicationPeriod` | `LAST_DAY`, `LAST_THREE_DAYS`, `LAST_WEEK`, `LAST_MONTH` or `null`. Other values (`TODAY`) give HTTP 500 |
| `locationCodes` | lowercase ISO country codes (`["ch"]`); NUTS codes also accepted by the API |
| `occupationUris`, `skillUris`, `requiredExperienceCodes`, `positionScheduleCodes`, `sectorCodes`, `educationAndQualificationLevelCodes`, `positionOfferingCodes`, `euresFlagCodes`, `otherBenefitsCodes`, `requiredLanguages` | `[]` |
| `minNumberPost` | `null` |
| `sessionId` | any string |

Response: `{ numberRecords, jvs: [...], facets }`. Per `jvs[]`: `id`, `title`, `description`
(full text), `creationDate` / `lastModificationDate` (epoch ms), `locationMap`
(`{ "CH": ["CH040"] }`, country -> NUTS codes), `positionScheduleCodes`, `employer.name`,
`jobCategoriesCodes` (ISCO), `availableLanguages`.

## Detail - GET

`GET https://europa.eu/eures/api/jv-searchengine/public/jv/id/<id>?lang=en`

404 for unknown ids. Response: `id`, `reference`, `source`, `creationDate`,
`lastModificationDate`, `preferredLanguage`, and `jvProfiles.<lang>` with `title`,
`description`, `locations[]` (`countryCode`, `region`, `cityName`, `postalCode`),
`employer`, `positionScheduleCodes`, `applicationInstructions[]` (HTML snippets with the
apply link), `personContacts`.

The CLI reads `jvProfiles[preferredLanguage]`, falling back to the first profile.

## Human-facing URL

`https://europa.eu/eures/portal/jv-se/jv-details/<id>?lang=en`

This is a single-page app, so the link cannot be verified without a browser.

## Quirks

- `description` often starts with a leaked front-matter header (`---base:meta-keywords:...---`) and has backslash-escaped punctuation, `&nbsp;`/`&amp;` entities and `=====` heading underlines; `cleanDescription()` in `helpers.ts` handles these.
- `LAST_DAY` / `LAST_THREE_DAYS` can legitimately return zero hits for narrow queries.
- Search results carry no city, salary, contract-type or remote fields.
