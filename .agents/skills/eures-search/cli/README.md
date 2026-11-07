# eures-cli

Search EURES (European Job Mobility Portal) vacancies via its public JSON API.
Zero runtime dependencies; only dev types are installed.

```bash
cd .agents/skills/eures-search/cli && bun install
bun run src/cli.ts search -q "quality engineer" -l ch --format table
bun run src/cli.ts detail <id> --format plain
bun run typecheck && bun run test
```

The default test run is offline. Two live smoke tests against the real API run
only with `EURES_LIVE=1 bun run test`. See `../SKILL.md` for flags and
`../url-reference.md` for endpoints.
