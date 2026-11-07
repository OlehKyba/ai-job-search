# Search Queries for Job Scraper

## Search scope

Find remote Senior Python/backend roles, including relevant AI/agent engineering
roles. Ukrainian and international employers are welcome; exclude employers
from Russia and Belarus. Work must be possible from Slovakia. Occasional visits
of roughly 2–3 days every 2–3 months may be considered; regular weekly hybrid
does not fit. Check eligibility in the posting instead of assuming that a
remote, Europe, or Ukraine label permits work from Slovakia.

Use the candidate profile in `CLAUDE.md` and the Language Gate in
`04-job-evaluation.md`. Compensation is a preference, not a hard filter:
compare contract terms and taxes before comparing an advertised figure with
the current approximate USD 4,000/month net.

## Portal execution

Discover installed and enabled `*-search` skills as described in `SKILL.md`.
Use LinkedIn and freehire as broad sources, Djinni for the Ukrainian tech
market, Himalayas and We Work Remotely for remote roles, and EURES for European
coverage. Respect each CLI's documented filters; do not treat country-filtered
results as proof of remote eligibility.

- Djinni: use the `Python` category and test title keywords separately; its
  search only matches titles and its RSS may contain only a recent window.
  Follow the Djinni detail-enrichment exception in `SKILL.md`.
- We Work Remotely: use `back-end-programming` and, where useful,
  `programming`; a category is required. Search matches title/company only.
- Himalayas: keyword and location filters are client-side over a limited recent
  API window; a Slovakia-only substring search can miss jobs open to Europe or
  worldwide. Search broadly and check restrictions in the posting. Its detail
  command scans only recent API pages and can return `NOT_FOUND` for a search
  result; use the search description and verify the original posting instead.
  An absent location restriction is not proof that Slovakia is eligible.
- EURES: try `sk` as well as broader European searches; location identifies the
  vacancy's country, not whether remote work from Slovakia is allowed. Check
  details, dates, and language. Expect duplicates and fuzzy matches.
- Normalize RSS dates to `YYYY-MM-DD` when possible before storing them.

## Query categories

Run the first three categories by default; adapt terms to each portal rather
than passing literal WebSearch syntax to a CLI.

### Priority 1: Python backend engineering

`Senior Python Developer`, `Senior Python Engineer`, `Backend Engineer`,
`Python Backend Developer`, `розробник Python`, `бекенд розробник`,
`Python разработчик`, `бэкенд разработчик`.

### Priority 2: Backend systems and product engineering

`Python API`, `FastAPI`, `async Python`, `distributed systems`,
`інженер програмного забезпечення Python`, `инженер программного обеспечения Python`.
Also consider relevant payments, marketplace and integration work.

### Priority 3: AI and agent engineering

`Python AI Engineer`, `AI Backend Engineer`, `AI agents`, `інженер ШІ`,
`AI розробник`, `инженер ИИ`, `AI разработчик`. Treat AI as an additional
interest, and assess actual requirements against demonstrated experience.

### Priority 4: Broader software engineering

`Senior Software Engineer Python`, `Platform Engineer Python`,
`старший розробник Python`, `старший разработчик Python`.

## WebSearch fallback

Use the categories above with `site:djinni.co/jobs`, `site:linkedin.com/jobs`,
`site:himalayas.app/jobs`, `site:weworkremotely.com/remote-jobs`, or EURES as
appropriate when a CLI fails. Add `remote`, `Slovakia`, `Europe`, `віддалено`,
or `удаленно` as useful, without assuming those terms establish eligibility.
Search employer career pages directly when appropriate. Report fallback use.

## Freshness

Prefer postings from the last 14 days. Include an unknown publication date only
with an explicit date-unknown flag; verify that the posting is still open and
check any deadline.

## Skill provenance

- `djinni-search`, `weworkremotely-search`: room2speak/ai-job-search,
  commit `05420fa9795ded8fe81cf7dcba2a43d2f4817704` (MIT).
- `himalayas-search`: Faisa1khan/ai-job-search-global,
  commit `a44b2240d5723db9bd0dca1024dc01304ba6c840` (MIT).
- `eures-search`: diegosabinogomez/ai-job-search-europe,
  commit `8d548e901fdc777d0ab856409755b2b78c499722` (MIT).
