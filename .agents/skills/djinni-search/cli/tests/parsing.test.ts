import { describe, expect, test } from "bun:test"
import {
  parseFeed,
  parseJobDetail,
  parseJobPostingJsonLd,
  companyFromTitleTag,
  idFromUrl,
  normalizeId,
  buildPostingUrl,
  withinDays,
} from "../src/helpers.js"

const FEED_FIXTURE = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Latest Job Vacancies at Djinni</title><link>http://djinni.co/jobs/</link><item><title>Tech Support Engineer (L2)</title><link>https://djinni.co/jobs/819756-tech-support-engineer-l2/</link><description>&lt;p&gt;Some description&lt;/p&gt;</description><pubDate>Sat, 19 Sep 2026 18:01:58 +0300</pubDate><guid>https://djinni.co/jobs/819756-tech-support-engineer-l2/</guid><category>Support</category></item><item><title>Customer Service Specialist</title><link>https://djinni.co/jobs/835461-customer-service-specialist/</link><description>&lt;p&gt;Another one&lt;/p&gt;</description><pubDate>Tue, 08 Sep 2026 00:00:00 +0300</pubDate><guid>https://djinni.co/jobs/835461-customer-service-specialist/</guid><category>Support</category></item></channel></rss>`

const DETAIL_PAGE_FIXTURE = `<!doctype html>
<html lang="en">
<head><title>Implementation Consultant at Precoro – Djinni</title></head>
<body>
<script type="application/ld+json">{"@context":"https://schema.org/","@type":"BreadcrumbList","name":"nope"}</script>
<script type="application/ld+json">{"@context":"https://schema.org/","@type":"JobPosting","title":"Implementation Consultant","description":"Job description text here","datePosted":"2026-09-10T22:12:56.090553","validThrough":"2026-10-10T22:12:56.090553","employmentType":"FULL_TIME","category":"Support","industry":"saas","jobLocationType":"TELECOMMUTE","identifier":847789,"hiringOrganization":{"@type":"Organization","name":"Precoro","sameAs":"http://precoro.com/"},"experienceRequirements":{"@type":"OccupationalExperienceRequirements","monthsOfExperience":24.0},"applicantLocationRequirements":[{"@type":"AdministrativeArea","address":{"@type":"PostalAddress","addressCountry":"BRA"}},{"@type":"AdministrativeArea","address":{"@type":"PostalAddress","addressCountry":"MEX"}}]}</script>
</body>
</html>`

describe("parseFeed", () => {
  test("parses items into job cards with numeric ids", () => {
    const cards = parseFeed(FEED_FIXTURE)
    expect(cards.length).toBe(2)
    expect(cards[0].id).toBe("819756")
    expect(cards[1].id).toBe("835461")
  })

  test("company and location are always null (not present in the RSS schema)", () => {
    const cards = parseFeed(FEED_FIXTURE)
    expect(cards[0].company).toBeNull()
    expect(cards[0].location).toBeNull()
  })

  test("title and date are populated", () => {
    const cards = parseFeed(FEED_FIXTURE)
    expect(cards[0].title).toBe("Tech Support Engineer (L2)")
    expect(cards[0].date).toBe("Sat, 19 Sep 2026 18:01:58 +0300")
  })
})

describe("idFromUrl / normalizeId", () => {
  test("extracts the numeric id from a full posting URL", () => {
    expect(idFromUrl("https://djinni.co/jobs/819756-tech-support-engineer-l2/")).toBe("819756")
  })

  test("normalizeId accepts a bare numeric id", () => {
    expect(normalizeId("819756")).toBe("819756")
  })

  test("normalizeId accepts an '<id>-<slug>' fragment", () => {
    expect(normalizeId("819756-tech-support-engineer-l2")).toBe("819756")
  })

  test("normalizeId rejects garbage input", () => {
    expect(normalizeId("not-a-valid-id-or-url")).toBeNull()
  })

  test("buildPostingUrl produces a URL idFromUrl can parse back", () => {
    const url = buildPostingUrl("819756")
    expect(idFromUrl(url)).toBe("819756")
  })
})

describe("parseJobPostingJsonLd / parseJobDetail", () => {
  test("picks the JobPosting block among several ld+json scripts", () => {
    const ld = parseJobPostingJsonLd(DETAIL_PAGE_FIXTURE)
    expect(ld?.title).toBe("Implementation Consultant")
  })

  test("parses company, countries, and experience from the JSON-LD", () => {
    const job = parseJobDetail(DETAIL_PAGE_FIXTURE, "847789")
    expect(job?.company).toBe("Precoro")
    expect(job?.location).toBe("Brazil, Mexico")
    expect(job?.applicantCountries).toEqual(["BRA", "MEX"])
    expect(job?.experienceMonths).toBe(24)
    expect(job?.validThrough).toBe("2026-10-10T22:12:56.090553")
  })

  test("falls back to the <title> tag for company when hiringOrganization is missing", () => {
    expect(companyFromTitleTag(DETAIL_PAGE_FIXTURE)).toBe("Precoro")
  })

  test("returns null when no JobPosting block is present", () => {
    const html = `<script type="application/ld+json">{"@type":"BreadcrumbList"}</script>`
    expect(parseJobPostingJsonLd(html)).toBeNull()
    expect(parseJobDetail(html, "1")).toBeNull()
  })
})

describe("withinDays", () => {
  test("a date within the window passes", () => {
    const now = new Date("2026-09-20T00:00:00Z")
    expect(withinDays("Sat, 19 Sep 2026 18:01:58 +0300", 14, now)).toBe(true)
  })

  test("a date outside the window fails", () => {
    const now = new Date("2026-09-20T00:00:00Z")
    expect(withinDays("Thu, 01 Jan 2026 00:00:00 +0300", 14, now)).toBe(false)
  })

  test("a null date is never excluded", () => {
    expect(withinDays(null, 14)).toBe(true)
  })
})
