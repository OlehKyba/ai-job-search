---
framework_version: 1.1.1
---

# Candidate Profile / Career Knowledge Base: Oleh Kyba

Interview started: 2026-10-25. Status: **initial career discovery pass completed**; the knowledge base is ready for further work with estimates, sources, and outstanding clarifications explicitly marked.
This file is the canonical record of career facts and detailed project notes.
It is an experience knowledge base, not a finished CV. An unfilled section does not establish a lack of experience.
English translation prepared on 2026-10-26 at the user's request. Future CVs will be in English; interview conversations may continue in Ukrainian.
Updated 2026-11-07: Hugging Face Agents Course completion and Certificate of Excellence recorded [I77, D2].

## Sources and Evidence Status

The interview record below contains **English summaries of the questions/topics and the user's answers**, not a verbatim transcript. Question wording is reconstructed from the recorded topic. Source entries preserve what was known at that point; later corrections and the project records take precedence over earlier unresolved details.

- **U1**: Initial career discovery context supplied by the user on 2026-10-25 in an attached text document. Preliminary information to validate and expand during the interview.
- **I1** — **Question:** Was Simporter your first commercial development experience? **Answer:** Yes. This does not separately confirm dates or employment scope.
- **I2** — **Question:** Why did you move from Simporter to EVO? **Answer:** Simporter was an NLP-focused startup, with the most interesting challenges concentrated in data engineering/science. He wanted more demanding backend work and had heard positive feedback about EVO. This confirms his motivation and personal assessment of the work.
- **I3** — **Question:** What did you initially work on at EVO? **Answer:** Primarily maintenance and new features for Prom.ua's custom CRM. Formal level, team composition, and independence were not yet established in this answer.
- **I4** — **Question:** What was the team structure, and how did your responsibility evolve? **Answer:** CRM and a closely related Back Office team later merged. Tasks progressed from small junior-level fixes/features to broader ownership and clarifying product needs, business context, and technical feasibility at Senior level. Dates and intermediate levels were not given yet.
- **I5** — **Question:** When were your promotions? **Answer:** Middle in **January 2022**, Senior in **June 2025**. Month-level dates; official English titles for intermediate positions were not supplied.
- **I6** — **Question:** When did the teams merge? **Answer:** **January 2022**, coinciding with the Middle promotion. No causal relationship was established.
- **I7** — **Question:** What did Back Office own, and why were the teams combined? **Answer:** Arbitration, billing, and Sender notification services; responsibilities overlapped with CRM under the same product manager. This is team context, not a list of services he personally built. The user considers merger details a low priority.
- **I8** — **Question:** What was an early challenging, product-oriented EVO task? **Answer:** Reviving a legacy automatic calling bot: Celery/Asterisk integration, HTTP result webhooks, retries, and bounded concurrency. See EVO-07; exact dates and production outcomes were not yet established.
- **I9** — **Question:** How did you control the calling workload? **Answer:** A Redis phone-number buffer with a constant limit and Celery tasks for preparation, refilling, and dispatch. Entry lifecycle and the exact limit were initially ambiguous.
- **I10** — **Question:** When was buffer capacity released, and when could another call start? **Answer:** Capacity was released after Asterisk accepted a number, rather than after call completion. A separate check preceded dispatch; unavailable capacity meant waiting. The metric source and exact comparison were not clear yet.
- **I11** — **Question:** Where did the active-call count come from? **Answer:** Asterisk reported calls in progress for this calling category. API endpoint, formula, and atomicity were not established.
- **I12** — **Question:** How were retries tracked? **Answer:** Attempt counts by run ID and phone number; he does not remember whether storage was Redis or PostgreSQL. PostgreSQL transaction reasoning is a present-day hypothesis, not a memory of the implementation. He asked to avoid excessive detail about this old, relatively small task.
- **I13** — **Question:** Why modernize merchant payments? **Answer:** Move to RozetkaPay, unify saved cards/customer experience, enable Apple Pay/Google Pay, and replace a fragile legacy flow with an additional on-site confirmation. Provider details and instability describe the particular historical integration.
- **I14** — **Question:** Which parts of the migration did you personally own? **Answer:** Merchant frontend, web/mobile backend APIs, provider integration, Kafka payment-status handler, and asynchronous status visibility; coordinated mobile engineers. The fintech itself and native mobile clients were built by others.
- **I15** — **Question:** What were your key engineering decisions and rollout responsibilities? **Answer:** Feature-flag rollout to 100%; Kafka message deduplication, retries/DLQ, billing/callback integration, PostgreSQL history, locking, and provider sequence IDs for out-of-order events. Coordinated the event contract with fintech. Detailed guarantees and operational results were not established yet.
- **I16** — **Question:** What changed for users and operations? **Answer:** Refreshed UI, wallet payment methods, shared saved cards, positive feedback, empirically shorter invoice-to-payment time, greater stability, and less manual QA recovery through retries. No numerical measurements; wallet-payment share might be checked later. I18 subsequently separates the delivery phases.
- **I17** — **Question:** When did the work happen, and how did rollout proceed? **Answer:** Rough start **November 2024**; an initially dictated December/January 2025 end conflicted with the Senior-promotion context. Code was ready much earlier than rollout completion. Metrics/errors/payment activity were monitored; most fixes concerned mobile/API integration, with no major backend fixes generally needed. I18 corrects completion.
- **I18** — **Question:** What was the actual completion date, and did it include wallet payments? **Answer:** Base rollout reached **100% of users of this merchant payment flow on 10 January 2026**. Ordinary and saved cards first; Apple Pay/Google Pay were separate later development. This corrects the date and previously combined phases.
- **I19** — **Question:** What did the later Apple Pay/Google Pay work involve? **Answer:** Web buttons, mobile configurations, existing provider support for Google Pay, Apple Pay web verification, and initiating a separate B2B iOS Merchant ID through fintech coordination. Exact verification terminology is ambiguous; shared-domain constraints describe their implementation.
- **I20** — **Question:** How did you resolve the Merchant ID/profile constraint? **Answer:** Multiple Merchant IDs in one fintech profile were not feasible. A second otherwise identical profile/configuration used the B2B Apple Pay Merchant ID; he implemented backend profile selection for mobile-specific API versus web.
- **I21** — **Question:** What problem did the legacy advertising-balance work solve? **Answer:** Unused balances, reported refund/legal constraints, and an old product-storage charge dependent on products and company status. He proposed charging for order history/other persistent information and expanding status coverage. Formal approval and production results were not established in this answer.
- **I22** — **Question:** What was your role in product/legal discussions? **Answer:** Discussed ideas with the product manager, then corresponded directly with lawyers, and reported legally and technically feasible options back to the product manager. Formal document approval/signing was not described.
- **I23** — **Question:** What did you personally implement? **Answer:** Broader company-status coverage, a new product-independent algorithm he calls “deposition,” and a paywall for the agreed functionality. Dictation leaves the exact package/balance AND/OR condition unclear.
- **I24** — **Question:** What was the result, and what further analysis or initiatives followed? **Answer:** Recalled approximately **UAH 10 million over about a month**, above the feature's plan. Analyzed remaining companies without accepted offers/terms; charges for them were not approved. Proposed a trial/reactivation approach, positively received but deferred and not implemented. Amount is an estimate; legal hypotheses are unverified.
- **I25** — **Question:** When was the balance algorithm developed/launched? **Answer:** **Approximately summer 2026**. Exact start/end months and rollout date were not given.
- **I26** — **Question:** What problem did the AI tooling hackathon address? **Answer:** A centralized GitLab marketplace across agent conventions, and a project-specific browser-verification skill tightly coupled to monolith login code. The challenge was keeping skills current when code changed. Implementation was not described yet; internal authentication steps were not retained.
- **I27** — **Question:** What solution and alternatives did you design? **Answer:** Scheduled marketplace sync pipeline, opt-in access through bot membership, merge requests tagging authors, AI/security review. CTO rejected source-repository remote pipeline triggers because of coupling. Another team configured security tooling; tool names should not be requested. Later adoption was not yet known.
- **I28** — **Question:** Did the hackathon solution continue to be used? **Answer:** Yes, internally. Colleagues outside Prom.ua development, for example PMs, install a skill to let agents explore the test environment and validate product hypotheses. No user/repository counts or adoption date.
- **I29** — **Question:** When was the hackathon? **Answer:** **22 May 2026**. Subsequent deployment/use dates were not separately given.
- **I30** — **Topic:** Other CV projects worth exploring. **Answer:** Re-read the supplied CV; discuss advertising tags and the support bot, now also available on Viber. Both D1 pages were re-read. Personal Viber contribution was not yet known.
- **I31** — **Question:** What were tags, and what problem motivated the new service? **Answer:** Ordinary metadata tags with stored many-to-many assignments; conditional tags previously required expensive conditions evaluated during company queries. The service was intended to remove those queries.
- **I32** — **Question:** How did the new tagging service work, and what architecture did you choose? **Answer:** Analyst-prepared segments such as GMV, agreed daily refresh, persisted many-to-many assignments, and a separate service isolating analytics access from the monolith. Sources evolved analytics DB -> CSV/S3 -> Trino. He built it himself with DAO/repository interfaces and dependency injection for easy source replacement. No measured performance result yet.
- **I33** — **Question:** What integrations and outcomes followed? **Answer:** Disabled old queries; merchant cabinet became substantially faster qualitatively. Personally implemented Kafka tag diffs into the monolith and landing-page changes for special offers. Described tag integration with special packages; managers report demand/purchases, without numerical results.
- **I34** — **Question:** When did tagging first launch? **Answer:** Probably **summer 2023**, recalled uncertainly. Not an exact date or a date for every later migration/integration.
- **I35** — **Topic:** Additional tagging ownership. **Answer:** Personally built backend, frontend, all integrations, GitLab CI/CD, Helm templates for Kubernetes pods/deployments/services, Prometheus metrics, and Grafana dashboards/alerts. This clarifies tagging, not Viber authorship.
- **I36** — **Question:** What did you monitor, and what operational problems did you solve? **Answer:** Nightly synchronization occurrence/success and analyst-data quality, especially wrong CSV types, with direct analyst coordination. Early synchronization caused high RAM usage and pod OOM failures; dashboards helped diagnose it and he introduced batching. He explicitly corrected “alerts” to “dashboards” for diagnosis.
- **I37** — **Question:** Did you add the Viber channel? **Answer:** **No.** Do not investigate another person's implementation as his experience. The ambiguous dictated wording was interpreted as Viber from context.
- **I38** — **Question:** What were the important Telegram bot integration challenges? **Answer:** Studied and modified another team's existing ticket service, coordinated with the merchant-cabinet team, and built the manager-response webhook path Prom -> monolith -> bot service -> Telegram, requiring user/chat mapping. Personally configured bot CI/CD and deployment.
- **I39** — **Question:** How were users and chats mapped? **Answer:** Temporary Prom user ID -> Telegram chat ID in Redis, identification through the user's Telegram-associated phone number, mapping deletion at chat end. Loss of state was acceptable; expected sessions about 1–2 days. Webhook integration mattered more than mapping. Exact TTL/contact-ownership checks were not given.
- **I40** — **Question:** When did the bot launch, and was it used? **Answer:** Approximately **summer 2024**. Roughly three months later, managers counted Telegram-tagged Zendesk tickets: **22% of all support requests** through the bot. The user explicitly settled on 22% after initial uncertainty. Historical manager-reported share, not a current independently checked report.
- **I41** — **Question:** What security work have you done? **Answer:** CRM XSS findings from security testers, including raw database HTML rendering in legacy/React pages; Mako escaping was a team setting. Personally added paid-SMS abuse protection and CAPTCHA. CSRF experience recalled without a specific case. Do not invent patch details.
- **I42** — **Question:** How did SMS-abuse limiting work? **Answer:** Authenticated CRM users with user ID/company context; Redis attempt counter and key expiry, rejecting further actions above the limit (example: more than five attempts). Window, exact key scope, expiry updates unknown. He corrected dictation to **CRM**.
- **I43** — **Question:** How did you improve testing and quality? **Answer:** Added test pipelines and tests for several microservices where many previously had none, and initiated mandatory test review in code review. “Most tests in the team” is his acknowledged subjective assessment; recurring feedback described well-tested code and few bugs. No exact metrics.
- **I44** — **Question:** How did you introduce tests in existing services? **Answer:** Incrementally covered changed features, added test pipelines, encouraged colleagues to do likewise. Describes his practice as TDD, easier now with AI. Also created many Prom.ua monolith testing utilities; examples came next.
- **I45** — **Question:** What testing utilities did you create? **Answer:** Decorators saving, overriding, and restoring feature flags, values, and country-specific configuration, reducing repetitive setup. He observed colleagues using them. No framework or quantitative adoption/time metric.
- **I46** — **Question:** What mentoring, knowledge sharing, or interviewing experience do you have? **Answer:** No regular mentoring. Regular technical-meeting contributions with positive feedback, occasional help for Middle developers, and intern/junior interviews. Exact interviewing scope was not given yet.
- **I47** — **Question:** What exactly was your interview role? **Answer:** Supporting interviewer asking follow-ups and observing responses; **once** led a complete technical interview under a team lead's observation. Gave HR candidate feedback. No established final hiring authority.
- **I48** — **Question:** What did you personally do across Simporter products? **Answer:** Limited JTI support/bug fixes on a mostly static report. Main work in Needs Analysis: backend serving data-engineer-prepared data, some scrapers/parsers; possible API for pipeline output recalled uncertainly. White Space backend analyzed gaps in existing businesses. Could not recall Prelaunch and asked for D1's description, which was re-read: simulation of the first 52 launch weeks.
- **I49** — **Question:** Were you involved in Prelaunch? **Answer:** **No involvement at all.** Probably included only to explain Simporter's broader products. Exclude from personal experience/inventory; this correction overrides D1, rather than leaving involvement merely unknown.
- **I50** — **Question:** What was your ownership of the asynchronous task service? **Answer:** Personally initiated, fully designed, and built the microservice as a junior. Startup context and acceptable infrastructure-project risk enabled that responsibility. Detailed design/stack/results were not established yet.
- **I51** — **Question:** What was its purpose and scope? **Answer:** One centralized API for parsers/scraping and other tasks, wrapping direct scraper execution, Apache Airflow, and Celery. Implementation of all three was clarified next.
- **I52** — **Question:** Which execution integrations actually worked? **Answer:** **All three:** direct scrapers, Apache Airflow, and Celery. Adoption scale and operating duration were not separately given.
- **I53** — **Question:** How did clients track tasks? **Answer:** Submission returned a task ID; optional status queries by ID. Could also supply a webhook URL and custom payload for status notifications. This does not confirm delivery of scraping/NLP output itself.
- **I54** — **Question:** Was the task service used after launch? **Answer:** He thinks so; moved to Prom.ua/EVO roughly a month after implementation and cannot describe its later impact. Both use and timing are uncertain recollections.
- **I55** — **Question:** What SQL optimization work do you remember? **Answer:** Probably JTI: Pandas-based SQL access with extra availability checks, no connection pool, and N+1 queries, which he addressed. Also added indexes and performed some denormalization; exact cases unspecified. Do not generalize Pandas behavior or invent results.
- **I56** — **Question:** How did you join the volunteer project? **Answer:** Volunteered after seeing a backend request for a cryptocurrency project in a Ukrainian IT Telegram group after the full-scale invasion. Was in a relatively safe city and able to code; Prom.ua developers' work was paused. No exact city/dates given.
- **I57** — **Question:** What was your volunteer scope? **Answer:** **Only the synchronization worker.** Dictation said OpenSearch, conflicting with OpenSea in D1/context; needed clarification rather than adding a search technology skill.
- **I58** — **Question:** Was the source OpenSea or OpenSearch? **Answer:** **OpenSea.** Earlier wording was a dictation error, not evidence of OpenSearch experience.
- **I59** — **Question:** What did the worker do? **Answer:** Simple scheduled API polling for donated NFTs, writing metadata and image URLs of different qualities to a database for another developer's Next.js part. No major technical challenge; not the whole platform or confirmed image processing.
- **I60** — **Topic:** Additional volunteer technology experience. **Answer:** Worker ran on **AWS Lambda**, providing practical AWS experience. Deployment/scheduling ownership was not clear yet; the earlier 92.7 ETH source question remained unanswered at this point.
- **I61** — **Question:** What was the Lambda workflow, and where did 92.7 ETH come from? **Answer:** Worked in an AWS environment provided by the project leader; hourly Lambda execution from a container image built in CI and pushed to an AWS registry. Exact trigger/registry/CI/deployment automation unspecified. Leader/founder with dedicated account access reported the NFT proceeds: a team result, not independently reconciled by the candidate.
- **I62** — **Question:** Did you complete the Master's as expected in the old CV? **Answer:** Yes, **June 2025**, National University of Kyiv-Mohyla Academy. Month/year confirmed by reference to D1; diploma/exact day not provided.
- **I63** — **Question/topic:** Master's thesis for the CV. **Answer:** Does not want its topic in the CV. Do not ask further now or invent it; this does not negate degree completion or the thesis's existence.
- **I64** — **Question:** What work would you like next? **Answer:** No rigid task preference; ordinary backend work is acceptable, AI engineering/agents/“graphs” interesting. Open to trying despite cautious self-assessment. Corrected an initial claim of practice to an intention to **gain practice in future**, not existing competence.
- **I65** — **Question:** What working arrangement is acceptable? **Answer:** **Remote required**; optional office access is fine. Possible exception: approximately 2–3 office days every 2–3 months. Not agreement to regular weekly hybrid or arbitrary travel.
- **I66** — **Question:** From which country do you plan to work remotely? **Answer:** **Slovakia.** Does not establish city, citizenship, tax status, or contract eligibility.
- **I67** — **Question:** Which employer countries are acceptable? **Answer:** **Any except Russia and Belarus.** Do not restrict to Europe/Slovakia or add founder/capital-origin rules.
- **I68** — **Question:** Any other excluded industries or conditions? **Answer:** No other hard exclusions stated. **Adult and iGaming** raise concerns but remain open to case-by-case consideration. Dictation corrected to these sectors, not all gaming; motives unspecified.
- **I69** — **Question:** What compensation are you seeking? **Answer:** **More than USD 4,000/month**, roughly his current level; wants an increase. Exact current amount and desired upper range unspecified. Not automatically a categorical rejection filter.
- **I70** — **Question:** Is that gross or net? **Answer:** **Net, after tax.** Compare the current reference and desired increase on that basis; no unsupported gross conversion.
- **I71** — **Question:** What certifications or current learning do you have? **Answer:** Coursera Machine Learning certificate, exact program/provider/date unspecified; currently taking **Hugging Face AI Agents**, with the final assignment outstanding before full certification. Not yet a completed HF certification.
- **I72** — **Topic:** Review the course. **Answer/request:** User supplied https://huggingface.co/learn/agents-course/unit0/introduction and asked for an independent overview. Official syllabus/final assignment reviewed; do not infer personal implementation from it.
- **W1**: Official Hugging Face AI Agents Course materials: Units 0–4, framework introductions, Agentic RAG, final GAIA assignment. Links and summary under Certifications and Learning. Syllabus evidence, not proof of the candidate's completed work.
- **I73** — **Question/topic:** Current final-agent status. **Answer:** **Implementation in progress**, plans to finish with Codex in the coming days. The sentence about doing it “together with…” was unfinished; do not infer collaborators. A status/plan, not a request to implement coursework or create automation.
- **I74** — **Topic:** Whether to continue discussing the final agent. **Answer:** **Defer until it is ready.** No further implementation questions now; keep in-progress status. Not a reminder/monitoring request or cancellation of all discovery work.
- **I75** — **Question/topic:** Identifying the Machine Learning course. **Answer:** Recalled the instructor as a Coursera co-founder and an educational project dictated as “DeepMind AI.” Description and W2 identify **Andrew Ng / DeepLearning.AI**. Exact course version/certificate issuer unresolved.
- **W2**: Official https://www.deeplearning.ai/about and https://www.deeplearning.ai/specializations/machine-learning support Andrew Ng / DeepLearning.AI identification and distinguish the original Octave course from the newer Python specialization. Not proof of which version he completed.
- **I76** — **Question:** Which language did you use for the course assignments? **Answer:** **All practical Coursera Machine Learning assignments were in Python.** Concrete learning experience; does not alone identify certificate title/issuer/version.
- **I77** — **Topic:** Hugging Face course completion update, 2026-11-07. **User report:** Completed the course on building agents and supplied a certificate PDF. This supersedes the earlier in-progress learning status [I71, I73–I74]; implementation details and final evaluation score were not supplied in this update.
- **I78** — **Update:** User reports Apple Pay accounts for 12% and Google Pay 11% of all merchant payments; measurement period and methodology unspecified. Reconfirmed approximately UAH 10 million in about one month for EVO-03. Identified the Coursera credential as Machine Learning Specialization and supplied its certificate link. Location specificity was not established in this update; clarified later in I79–I80.
- **I79** — **Location update:** User confirmed living in Bratislava, Slovakia. The assistant initially misinterpreted an earlier comment as a preference to omit the city; corrected in I80.
- **I80** — **Correction:** User did not request omitting Bratislava from the CV. Include the confirmed city when appropriate.
- **I81** — **Go experience:** User reports limited experience with Go from rewriting an existing Go microservice in Python as part of a larger service. Scope, project and outcome were not otherwise specified.
- **I82** — **AI-assisted development:** Uses Codex, Claude Code and Cursor for development. Creates and maintains monolith-specific agent skills for test-environment login and for admin/CRM verification via browser tools including Playwright CLI. The verification skills also document starting the project, building the frontend and applying migrations when needed. These are agent instructions and workflows, not evidence that he built an agent runtime or independently verified every agent result. No internal authentication steps are recorded.
- **I83** — **Agent skills motivation:** User emphasizes that the goal of developing these skills was to give agents a feedback loop to verify their own work. No automatic correction or measured outcome was claimed.
- **I84** — **Volunteer project update:** User describes the NFT fundraising project as supporting the defense forces of Ukraine; the previously recorded source also describes humanitarian needs. The reported 92.7 ETH remains a whole-project result, not individual fundraising.
- **I85** — **Simporter:** User clarified that he personally set up the private PyPI server, in addition to maintaining it.
- **I86** — **EVO initial level:** User requested identifying his initial May–December 2021 level as Strong Junior. Exact official English job title was not separately confirmed.
- **I87** — **Tagging/data tools:** User reports working with Trino and Iceberg in the tagging microservice and also with S3. Specific Iceberg responsibilities and broader S3 scope were not detailed.
- **D3**: [Coursera Machine Learning Specialization certificate screenshot](../../../documents/diplomas/Oleh_Kyba_Machine_Learning_Specialization_2022-12-22.png), visually reviewed; recipient Киба Олег, dated 22 December 2022, three courses, DeepLearning.AI and Stanford Online branding, signed by Andrew Ng; certificate hosted by Coursera. The online verification endpoint was not independently retrieved.
- **D1**: [Old CV](../../../documents/cv/Oleh_Kyba_Resume.pdf), both pages read. Creation date unconfirmed; user warned it is outdated. File modification time does not prove authorship date.
- **D2**: [Hugging Face Agents Course certificate](../../../documents/diplomas/Oleh_Kyba_Hugging_Face_Agents_Course_2026-11-07.pdf), supplied from `/Users/olehkyba/Downloads/certificate.pdf` and copied unchanged. One-page image-based PDF, rendered and visually reviewed on 2026-11-07. States **Certificate of Excellence**, **Oleh Kyba**, successful completion of **Hugging Face Agents Course**, **Hugging Face Instructors**, date **2026-11-07**. No evaluation score, credential ID, or verification URL shown; issuer-side verification not performed.
- **User-reported**: A direct user statement, not independent verification.
- **From document**: Historical D1 information, not confirmation of the current situation.
- **Estimate**: Approximate information; do not turn into exact metrics.
- **Unknown / to clarify**: Do not use as an established fact.
- **Interview-confirmed**: A particular detail clarified or confirmed by the user; answer sources use I1, I2, etc.

## Source Corrections

- **Prelaunch excluded from personal experience [I49].** D1 listed it among four Simporter products with a product description but no distinct personal task. The user confirmed no involvement. Do not reintroduce it into experience, achievements, or future CVs when reimporting D1. This note preserves provenance, not a personal project.
- **Hugging Face learning status updated [I77, D2].** The earlier in-progress status [I71, I73–I74] is historical. Course completion and the Certificate of Excellence are now documented, dated 7 November 2026. Do not carry the old outstanding-assignment/certificate status into future materials.

## Career Overview

- Target specialization: **Senior Python Backend Engineer** [U1].
- Commercial experience: **approximately 6 years** [U1, estimate]. Do not add overlapping volunteering as extra commercial tenure.
- Primary programming language: **Python** [U1].
- Current employer: **EVO**, systems related to **prom.ua** [U1].
- Current title: **Senior Software Engineer** [U1]; promoted in **June 2025** [I5].
- Work context: backend, marketplace CRM, and payments [U1, D1]. The user describes Prom.ua as a high-load project; traffic and load figures have not been specified. Responsibility is detailed below.

## Career Goals and Preferences

**Work content [I64]**
- Main target: Senior Python Backend Engineer [U1]. **No rigid preference for task type**; ordinary backend development is acceptable [I64].
- Additional interest: more **AI**, **agent development / AI engineering**. “Graphs” was mentioned without a concrete context/framework; do not substitute LangGraph or graph databases.
- Willing to explore opportunities, while cautiously assessing the relevance of his current experience. This is openness/self-assessment, not a final verdict on suitability for all AI roles.
- I64 corrected existing practice to an intention to gain it. **Hugging Face Agents Course completed 7 November 2026** [I77, D2], updating the earlier learning status [I71]. Specific hands-on implementation details are not yet described; do not add production agent development/frameworks to skills without examples.
- EVO-04 is separate real AI tooling/skills marketplace experience, not automatically model development or agent runtime engineering.
- Working arrangement, geography, and other conditions are recorded below. Flexible task preferences do not imply no deal-breakers.

**Working arrangement [I65]**
- **Remote is required.** Regular mandatory office attendance does not match the preference.
- **Optional office access** is acceptable, without an obligation to attend.
- **Possible exception to discuss:** approximately **2–3 office days every 2–3 months**, not blanket consent to any location/frequency or weekly attendance.
- Planned remote base: **Slovakia** [I66]. Employers from any country **except Russia and Belarus** are acceptable [I67]. Destinations for occasional office visits remain unspecified.

**Geography [I66]**
- Plans to work remotely **from Slovakia**.
- **Employers: any country except Russia and Belarus [I67].** Hard exclusion; other markets are possible subject to the remaining requirements.
- Lives in Bratislava, Slovakia [I79]; the user did not request omitting the city from CV materials [I80]. Headquarters/registration/ownership edge cases were not discussed; do not invent criteria.
- Citizenship, work authorization, tax status, and contract type are not established by the remote-work country.

**Other conditions and sectors [I68]**
- No further hard exclusions beyond the recorded working-arrangement/geographic requirements.
- **Adult and iGaming: concerns, but no automatic rejection.** Consider individual opportunities.
- Dictation correction refers to Adult/iGaming, not all video games/gaming. Reasons for concerns were not discussed.
- Contract type and scheduling constraints are not established; no mention does not imply unconditional acceptance.

**Compensation [I69–I70]**
- Currency/period: **USD per month**.
- Current user-reported reference: **approximately USD 4,000/month net, after tax**; exact current amount not separately specified.
- Wants an increase, **more than USD 4,000/month net**, for a move. Exact desired range/upper bound unspecified.
- **Net after tax [I70].** Do not compare directly with gross salary, employer cost, or B2B invoice amount, or assume a tax conversion without necessary data.
- A desired increase from the current reference, not an explicitly unconditional rejection rule. Do not automatically include salary expectations in a CV.

## Identity

- **Name:** Oleh Kyba [D1].
- **Location:** Bratislava, Slovakia, confirmed by user [I79].
- **Phone:** +421 949 418 279, confirmed current by the user for applications.
- **Application email:** oleh.kyba@gmail.com, supplied by the user for applications.
- **Previous email:** vestigor0@gmail.com [D1; also selected for this repository's Git identity].
- **LinkedIn:** https://www.linkedin.com/in/oleh-kyba-0621b11b5 [D1].
- **GitHub:** https://github.com/OlehKyba [D1].
- **LeetCode:** https://leetcode.com/u/oleh_kyba [D1].
- **Status:** Employed at EVO [U1].
- **Constraints:** See Career Goals and Preferences. Relocation was mentioned only in the old CV; current willingness is not confirmed.
- **CV language:** English, explicitly requested on 2026-10-26.

### Languages

| Language | Level | Notes |
|----------|-------|-------|
| English | Approximately C1 | U1 self-assessment; old CV said B2. Updated self-assessment, not a verified examination result. |
| Ukrainian | Native | D1; professional use not separately discussed. |
| Russian | C2 | Historical D1 entry; current relevance and preference to include it need confirmation. |

## Education

**CV preference [I63]: omit the Master's thesis topic.** Not collected; do not ask further without the user's initiative. Master's completion in June 2025 remains confirmed [I62].

| Degree | Period | Institution | Status / source |
|--------|--------|-------------|-----------------|
| Master of Science, Computer Science | Start unknown; completed June 2025 | National University of Kyiv-Mohyla Academy | Completion on schedule confirmed [I62]; degree wording from D1, not checked against the diploma. |
| Bachelor of Science, Computational Science | Start unknown; June 2021 in CV | NTUU "Igor Sikorsky Kyiv Polytechnic Institute" | D1; official subject translation and dates to confirm. |

## Professional Experience

### EVO (May 2021 - present)

- Joined May 2021 and remains employed [U1; start also D1].
- Old CV title: Software Engineer - Python [D1].
- Initial scope: primarily maintenance and new features in the custom Prom.ua CRM [I3, interview-confirmed], not sole ownership of the entire CRM.
- Current title: Senior Software Engineer [U1]; Senior-level work described in I4.
- Promoted to **Middle: January 2022** [I5, month-level interview confirmation].
- Promoted to **Senior: June 2025** [I5, month-level interview confirmation]. Official English Middle-role title not established; do not invent it.
- Initial level: Strong Junior, May–December 2021, per user [I86]; exact official English title not separately confirmed. Early work involved simple bugs, small features and extensions, progressing toward greater ownership and business understanding [I4].
- At Senior level, works from broadly expressed product needs to clarify business requirements, technical feasibility, and implementation approach [I4]. This does not imply sole authority over every decision; examples appear in the project inventory.
- Original **CRM** team [I7]: one team lead, one product manager, two QA, and three developers including the candidate [I4].
- Closely collaborating **Back Office** team [I7]: three developers, its own team lead, same product manager and shared QA [I4].
- Back Office had related business responsibilities, with more emphasis on separate microservices [I7]:
  - **Arbitration:** merchant/buyer dispute resolution. Separate service, which the candidate felt could conceptually fit CRM.
  - **Billing:** billing, document/invoice calculations, and accounting reports. Exact document operations were not explored.
  - **Sender:** notification microservice used across EVO.
- These services describe Back Office's scope, not verified personal authorship [I7]. His involvement in each is not established.
- He attributes the shared product manager and eventual merger to overlapping responsibilities [I7].
- Teams merged in **January 2022**, alongside his Middle promotion [I6]. Result: five developers, two QA, one team lead, one product manager [I4]. Personal scope changes are not established; simultaneity does not imply causation. Do not infer staffing changes from team-size arithmetic.
- D1 lists the role as Kyiv (Remote), not evidence of current residence.
- D1: CRM development/maintenance, microservices, CRM business logic, REST/gRPC APIs, Kafka listeners.
- D1 lists disputes, merchant special offers, URL shortening, IP telephony, company tagging, and fraud prevention. Individual contributions are not separately detailed for every item.
- D1: GitLab CI/CD, Docker, Kubernetes, Prometheus/Grafana dashboards.
- D1: XSS, CSRF, brute-force protection; advocacy for tests, Python/library updates, and layered architecture. Specific examples are recorded below where explored.
- Project records: **EVO-01–EVO-07**. EVO-02 followed base migration EVO-01 [I18]; no dependency on EVO-03 established.

### Simporter (September 2020 - May 2021)

- Junior Software Engineer - Python, Kyiv, Ukraine [D1].
- First commercial development experience [I1, interview-confirmed].
- Dates and employment scope still need separate confirmation.
- NLP-focused startup. He felt the main interesting challenges were in data engineering/science and his backend tasks did not offer the challenge he wanted [I2]. A personal development-fit assessment, not a claim that the product was technically simple overall.
- Moved to EVO to develop as a backend engineer and tackle harder problems; positive recommendations from acquaintances influenced the decision [I2]. Subsequent examples: EVO-01–EVO-07.
- Personal product involvement: **SIM-01–SIM-03** [I48–I49]. D1's four-product list included Prelaunch as company context; he confirmed no personal involvement.
- D1: REST/JSON-RPC APIs, asynchronous scraping/NLP tasks, Celery preprocessing, GitHub Actions, Azure App Services.
- Personally initiated, architected, and built an asynchronous task-management infrastructure microservice as a junior [I50; **SIM-05**]. Specific stack is not established; purpose and scope are detailed below.
- D1: SQL optimization (indexes, queries, N+1, thread-local SQLAlchemy sessions), Scrapy spiders with Airflow, Flask ELK logging extension wrapping python-logstash-async; personally set up and maintained a private PyPI server [I85].
- Main product work was Needs Analysis, also White Space backend; JTI involved limited support/bug fixes [I48]. Prelaunch excluded [I49]. Do not assign the entire data-science/pipeline scope to him.

## Independent Projects

### VOL-01: Volunteer NFT platform (March 2022 - June 2022)

- Software Engineer - Python, Kyiv, Ukraine, March–June 2022 [D1]. Historical document dates/location, not separately confirmed in the interview. Participation in 2022 confirmed [U1, I56].

**Joining and career context [I56]**
- Saw a request for a backend developer for a cryptocurrency project in a Telegram community of Ukrainian IT professionals volunteering after the full-scale invasion.
- **Volunteered himself**, saying he was in a relatively safe city and able to code. City unspecified; do not substitute D1 or system timezone.
- **Prom.ua developers' work was paused** then, allowing him to volunteer. This does not mean the website was down, the company closed, or he was dismissed.
- Volunteering overlapped the EVO employment period; formal employment/pause terms were not explored. Do not count it as extra commercial tenure.
- Purpose: NFT-based cryptocurrency fundraising for Ukraine; the old CV describes humanitarian needs [D1], and the user additionally describes support for Ukraine's defense forces [I84]. Do not infer an allocation breakdown.
- D1 contribution: Python/asyncio worker periodically synchronizing OpenSea wallet state with database/landing-page data. **I57 limits ownership to the worker**, not the entire backend/platform.
- Source name confirmed: **OpenSea** [I58]. Earlier OpenSearch wording was a dictation error, not OpenSearch experience.
- **Whole-project result: 92.7 ETH** [D1, source clarified I61]. Reported by the leader/founder with access to a dedicated account and NFT donation/sale proceeds. Exact leadership title unknown. Candidate did not independently reconcile it: **reported team result**, not his personal fundraising or ledger. Gross/net, fees, period, and exact proceeds composition unspecified.

**Personal worker implementation [I59]**
- **Scheduled/cron** work fetched information about **donated NFTs** via API [I59].
- Ran on **AWS Lambda** [I60–I61]. He worked on the Lambda in an AWS environment supplied by the leader, not necessarily account creation or all cloud infrastructure.
- **Hourly execution** [I61]; exact scheduling/event service unnamed. Do not assume EventBridge/CloudWatch.
- Lambda used a **Docker/container image**, **built in CI and pushed to an AWS registry** [I61]. Registry not specifically named ECR; CI platform unspecified. Hourly refers to worker execution, not image builds.
- Image-update/deployment automation details unknown; do not invent Terraform, IAM, VPC, or other AWS services.
- Wrote NFT metadata and **image URLs at different qualities/resolutions** to the database for another platform component.
- Another developer handled **Next.js** and consuming those data. Do not credit that frontend to the candidate.
- Whether he generated image variants or only stored available URLs is unknown; no confirmed image resizing/processing ownership.
- User explicitly described a **fairly simple** implementation without exceptional challenges. Do not force a distributed-systems story or further drill-down.
- Python/asyncio from D1; API/scheduled sync/database responsibilities confirmed I59, hourly Lambda/container workflow I61. Exact frameworks/versions unspecified.
- Initial discovery complete [I56–I61]: worker scope, AWS context, scenario, and team-result source collected. Do not require minor cloud parameters.

### LEARN-01: Hugging Face AI Agents final agent

**Sources:** I73–I74 for the earlier project status; I77/D2 for course completion; general syllabus/requirements under W1 in Certifications and Learning.

- **Course completed; implementation case study not yet collected.** The user reported completion and provided the Certificate of Excellence dated **7 November 2026** [I77, D2]. This supersedes the earlier course-in-progress status, without establishing a production project.
- Earlier [I73], was implementing the final agent and planned to finish with **Codex**. This is historical context, not evidence of the exact final development workflow.
- Framework, model, tools, components, repository, and final GAIA score are not recorded. The certificate confirms course completion but does not show these details or a score.
- The earlier unfinished “together with…” sentence does not identify a collaborator. No instruction to implement the agent, message anyone, or create reminders.
- **Implementation discussion was deferred at the user's request [I74].** Course completion is now recorded; collect the project case study when the user chooses to discuss it, without restarting discovery automatically.

## Project Inventory

Records preserve the underlying accounts rather than turning them prematurely into promotional achievements.
For each project, progressively capture context, problem, dates, team, personal contribution,
architecture, decisions/alternatives, constraints, failures, results, evidence, and open questions.
Unrecorded details remain unknown.

### EVO-01: Merchant payments modernization

**Sources:** U1 (initial account), I13 (context), I14 (contribution), I15 (reliability/rollout), I16 (results), I17 (rollout experience), I18 (exact completion and phase separation).

**Context and migration decision [I13]**
- Candidate reports EVO developing its own fintech **RozetkaPay**. Previous merchant payments used another provider, dictated as **“Transzo.”** Spelling unconfirmed; do not silently substitute a similar brand.
- Separate customer and merchant fintech integrations split the experience for people acting in both roles.
- Customers could save cards and pay for purchases with Apple Pay/Google Pay, but could not reuse those saved cards to pay company invoices as merchants.
- Candidate reports complaints about this behavior; complaint counts and measured conversion effects unspecified.
- Previous merchant flow did not offer Apple Pay/Google Pay. This describes that integration/time, not an independently verified universal limitation of the provider.
- Decision: migrate merchant payments to RozetkaPay, unify customer/merchant UX, and modernize legacy functionality.

**Old-flow shortcomings [I13]**
- After initial payment, user had to additionally confirm/decline **on Prom.ua**, which sent the corresponding provider request.
- Candidate called these “two-factor payments,” explicitly distinct from bank **3DS**. Exact semantics unknown: do not label preauthorization/capture, two-phase commit, or standard 2FA automatically.
- He felt this extra step added frontend/backend complexity without a useful user benefit.
- In his experience, the legacy flow was fragile and QA often manually restarted stuck payments. Exact frequency, root causes, safe-restart procedure, and failure share unspecified.

**Personal contribution and boundaries [I14]**
- Owned the merchant-product side of the transition and RozetkaPay integration end to end.
- Built new merchant-cabinet payment frontend; project-specific frontend technology not yet named.
- Built backend APIs for that frontend and mobile applications.
- Coordinated Android/iOS developers and required integration settings. Native apps were implemented by mobile engineers, not him.
- Implemented RozetkaPay API integration.
- Implemented Kafka payment-status event handler. Exact publisher/intermediate components unspecified.
- Built asynchronous payment-status tracking/display for web and apps. Transport (polling/push, etc.) not named; do not assume.
- Fintech implementation itself was outside his scope. Do not describe this as building a payment provider or all fintech infrastructure.

**Available interaction outline [I14]**
- Merchant web/mobile clients -> merchant backend API -> RozetkaPay API.
- Kafka status events -> his handler -> web/mobile status-tracking mechanism.
- Interaction outline, not a complete service-boundary or consistency specification.

**Independent engineering decisions: Kafka handler and billing [I15]**
- He identified the Kafka handler as the most significant area of his own decisions: process events and expose current payment status.
- **Redelivery/deduplication:** anticipated duplicate processing, using message ID/deduplication key to detect handled events. Key composition, store, persistence timing, transaction boundaries unknown; no exactly-once claim.
- **Billing side effect:** paid invoice required billing-service document processing, followed by a callback into Prom marking it paid. Full status sequence/callback contract unspecified.
- **Dependency failures:** billing handled many payments and could be slow or time out. No load/latency figures. Dependency context, not evidence of his handler's throughput.
- **Retries/dead-letter queue:** implemented retry handling and DLQ for billing failures. Transport, backoff, limits, replay process unknown; do not assume a Kafka topic or other specific implementation.
- **PostgreSQL status history:** stored all status changes for analysis/debugging. Schema, indexes, retention not discussed.
- **Concurrency/locking:** prevented unwanted parallel processing of documents/events across Kafka partitions from breaking billing. Recalled duplicate success events causing billing failures. Lock granularity/implementation and document/invoice/payment relations unknown; no claim of global serialization or actual double charges.
- **Out-of-order events:** success could arrive before pending, so arrival order could not determine current status.
- **Provider sequence ID:** restored order using fintech-supplied sequence IDs; DB records could be ordered by that ID to identify actual current status. Ordering scope, ID structure, SQL unknown; no assumed global ordering across payments.
- **Event-contract coordination:** negotiated required data, including sequence ID, with fintech engineers. Do not attribute their internal implementation to him.

**Project period [I17–I18]**
- Previously recalled start: **approximately November 2024** [I17], not an exact development date. I18 clarified completion without separately reconfirming the start.
- **Full rollout completed 10 January 2026:** RozetkaPay merchant payments enabled for **100% of users of this payment flow** [I18, explicit date]. Not all EVO payments/products.
- This phase retained **ordinary card and saved-card payments**. **Apple Pay/Google Pay were later separate work (EVO-02)** [I18].
- Initial ambiguous December/January 2025 wording was corrected by I18; do not reuse as an alternative end date.
- Main code was ready well before gradual rollout finished [I17]. Development/code-complete dates unknown; do not infer them from rollout duration or assign the whole project to one formal level.

**Gradual production rollout [I15, I17]**
- Personally responsible for gradual rollout given payment/revenue risk.
- Used a **feature flag** and selected company segments.
- Reached **100%**; recalled approximate steps **5 -> 10 -> 20 -> 50 -> 100%**, not a verified release log.
- Full rollout is user-confirmed, not proof of zero incidents/downtime/financial loss. Stage thresholds and rollback/fallback unspecified. Completion clarified I18; start remains approximate.
- Monitored metrics, errors, and payment activity to detect drops; fixed issues found [I17]. Dashboard names, thresholds, stage durations unknown. Monitoring alone does not establish zero drops.
- Generally no major backend fixes were needed; main issues concerned mobile/backend API interaction [I17]. Specific causes/severity unknown; no “zero bugs/incidents” claim.

**Observed payment-experience outcomes [I16; phase correction I18]**
- I16 discussed payment changes together; I18 separates base migration from later wallets. Do not attach every result to one release/date. Wallet availability/share belongs to EVO-02.
- **Interface:** new payment widget and refreshed frontend following company design. Not authorship of the design system or fintech widget internals.
- **Shared wallet/saved cards:** same person as buyer/seller gained a shared card set. Candidate reports positive feedback; quantity/format unknown.
- **Payment completion time:** empirically, **invoice creation to payment** became substantially shorter after removing on-site reconfirmation. No measured values/distribution/source. User-flow duration, not backend latency or proven conversion gain.
- **3DS retained:** removed Prom.ua's additional step, not bank 3DS. Informal “one-factor/two-factor payment” wording is not a formal authentication/security claim.
- **Stability:** fewer payment problems observed. Failure rates, SLA, observation period unspecified.
- **Billing recovery:** payments delayed by billing could later retry and complete. Not an absolute guarantee under every failure.
- **Manual QA work:** candidate reports much less time spent recovering these payments and removal of the previous recurring stuck-payment completion task through the new flow/retries. Qualitative operational impact, not measured hours or proof of no manual interventions/incidents.
- Results are user-reported and not quantitatively verified. No unsupported revenue gain, cost reduction, or numeric time improvement.

**Discovery status**
- Business problem [I13], contribution [I14], reliability/rollout [I15], qualitative UX/operational results [I16] collected.
- Base rollout date: 10 January 2026 [I18]. Sufficient initial EVO-01 detail; start remains provisional.
- EVO-02 is separate subsequent wallet work on the new fintech foundation, not part of EVO-01's base release [I18]. Keep contributions/results phase-specific without double counting.
- Kafka, PostgreSQL, API integration, feature flags confirmed. Do not assign all general-stack technologies or claim provider-to-provider token migration without explanation.

### EVO-02: Apple Pay and Google Pay

**Sources:** U1 (initial account), I16 (results), I18 (separate phase), I19 (implementation/coordination), I20 (alternative, constraints, profile selection).

**Timing and relationship to other work**
- Separate development **after** the base EVO-01 migration completed 10 January 2026 [I18]: ordinary/saved cards first, wallets later.
- Exact development/rollout dates unknown. Shared foundation is in EVO-01; do not claim its components were all rebuilt for EVO-02.

**Personal contribution [I19]**
- Integrated Apple Pay/Google Pay buttons into the frontend where absent before.
- Coordinated mobile developers and supplied configuration/Merchant IDs. Actual IDs or secret-bearing configurations need not be stored.
- Candidate says RozetkaPay supported Google Pay out of the box, requiring little configuration from him. Provider agreements/certification are not his personal contribution.
- Configured additional Apple Pay web verification/merchant settings, mentioning validation requests and an artifact in Prom.ua static assets at a specific URL.
- **Terminology unresolved:** dictation called artifacts “certificates,” but exact artifact type (domain verification file, certificate, other) and API names unknown. Do not claim private keys/certificates were published or assume a specific official procedure. No actual files/URLs/keys supplied or needed.

**B2B/B2C configurations and decision [I19–I20]**
- Two apps: B2B and B2C. B2B iOS engineers wanted a separate Merchant ID for their metrics and independence from B2C settings.
- He initiated/advocated separate configurations, coordinated fintech, and enabled B2B app Apple Pay with a **separate Merchant ID**. Reports meeting the iOS team's needs.
- Web retained the shared B2C configuration/merchant setup. He explains this through their shared-domain/URL-verification arrangement; not a universal Apple Pay ban on multiple Merchant IDs per domain.
- Explored multiple Merchant IDs in one fintech profile; **not feasible in their integration** [I20], not a universal provider/Apple Pay limitation.
- Implemented **a second otherwise equivalent fintech profile/configuration**, differing only in the **B2B Apple Pay Merchant ID** [I20]. Do not claim multi-ID support was added to one profile.
- Personally implemented **backend profile selection by client flow**: mobile-specific API distinguished app from web [I20]. Do not invent User-Agent/header/auth-claim detection.
- Resulting B2B app configuration was separate while web used its existing configuration [I19–I20]. Exact fields, IDs, code unnecessary for the career record.
- Example of initiative and coordination across mobile/fintech, not formal management of those teams.

**Results and open details**
- Merchants gained Apple Pay/Google Pay [I16]; separate B2B iOS configuration achieved [I19]. Independent metrics/settings were stated goals, not separately measured outcomes.
- User reports Apple Pay at **12%** and Google Pay at **11%** of all merchant payments [I78]. Measurement period, count versus value, and independent verification are unspecified; do not assume a measurement basis or causal uplift.
- Decision collected [I20]: unsuccessful multi-ID profile alternative -> second config -> backend selection. Sufficient depth; no more technical questions now.
- Dates and verification terminology may be clarified later without reconstructing every parameter.

### EVO-03: Charging-model changes for unused advertising balances

**Sources:** U1 (initial account), I21 (problem/proposal), I22 (product/legal collaboration), I23 (implementation), I24 (results/analysis), I25 (approximate period).
**Work and launch period:** approximately **summer 2026** [I25, user estimate]. Exact dates unknown.
User calls the algorithm **“deposition”** [I23]. Preserve as his feature label, not an assumed legal/accounting category; the described mechanism is a service fee deducted from advertising balances.

**Context and problem [I21]**
- Merchants funded advertising balances for ad clicks and/or clicks leading to sales. Product name and exact attribution model unspecified.
- Some accounts retained unused positive balances, creating financial/operational constraints.
- User-reported legal context: refund-on-request obligations with a three-year period, extended/deferred by wartime changes in his understanding, leaving balances outstanding indefinitely. **Reported project context**, not an independently verified statement of current law or unlimited obligation duration.
- Do not infer financial advice, a right to deduct any funds, accounting classification, denial of lawful refunds, or a revenue-recognition procedure.

**Previous model and causes identified [I21]**
- Existing charges for storing merchant product information, including after switching to a free package. Exact contractual terms/eligibility rules unspecified.
- He identified two causes: limited company/status coverage and dependence on products being present.
- When products were deleted, the old charging condition ceased to apply. Example: temporary company blocking led to product deletion and stranded balances.

**Initiative and proposed solution [I21]**
- Proposed changing the chargeable service to **storing order history and other information** remaining even without products.
- I21 mentions hiding this information; I23 confirms the paywall below. Exact access terms, user communication, contractual wording unspecified.
- Also proposed removing company-status dependence to prevent new similar unused balances.
- Reported the approach could be legally implemented [I21]; his role in discussions is below. Formal approvals/legal documents not supplied.

**Product manager and legal collaboration [I22]**
- Developed ideas and first consulted the product manager.
- Product manager directed him to communicate with lawyers directly.
- Personally corresponded with lawyers about permissible options.
- Reported back to product with legally/technically feasible changes after those discussions.
- Concrete investigation across business, legal, and engineering constraints. Not a legal role, unilateral legal approval, or sole authority to alter contracts.

**Personal implementation [I23]**
- Confirmed personally implementing all discussed changes.
- First broadened company-status coverage for charges.
- Implemented product-independent “deposition,” reflecting the proposed history/other-data service-fee model.
- Implemented a **paywall** for agreed functionality, linked in his account to exhausted funds / absence of a paid package or account balance.
- **Exact Boolean condition unknown:** dictation included a self-correction. Do not invent AND/OR between package/balance or all access transitions.
- Frameworks, scheduling, charge atomicity/idempotency, paywall enforcement unspecified. Scope is enough for the initial record; no requirement to recover every detail.

**Results and metric status [I24]**
- Recalled approximately **UAH 10 million** in previously unused/“frozen” advertising balances charged over about **one month**. **Approximate amount reconfirmed by the user [I78]; not independently reconciled.** Refines U1's “1 or 10 million” toward 10 million, without making it a verified metric.
- Small daily service-access charges; rate/exact period unspecified.
- Product/mechanism result; his contribution was investigation, proposal, coordination, implementation [I21–I23]. Not personal receipt of funds or automatic accounting revenue equivalence.
- Reports exceeding this feature's income plan; plan value/percentage unknown.
- Not all companies were covered because legal obstacles remained. Do not claim every unused balance was resolved.

**Additional investigation and analysis [I24]**
- Investigated companies that could not be charged, including those without an accepted offer/terms.
- Personally prepared analysis by company, status, active-user presence, last merchant-cabinet login, etc. Tools/counts unspecified.
- Concluded these were mostly inactive companies without active users. His analyzed group, not a universal description of outstanding accounts.
- Charges for companies without accepted terms were **not approved or performed** under this model. Removing status dependence did not remove all legal eligibility conditions.
- Future postwar/three-year-inactivity action was mentioned as a theoretical option: unverified legal hypothesis, not an established future right.

**Reactivation proposal: deferred, not implemented [I24]**
- Proposed a free trial package for approximately one or three months for those companies/users.
- Intended to reactivate them and explore making package acceptance also acceptance of the offer/terms, potentially enabling the charging model.
- Legal feasibility not established here: candidate proposal, not confirmed legal approval.
- Product manager liked the idea but **deferred implementation** because the main feature already exceeded plan.
- Candidate expected limited reactivation; a forecast, not measured retention. No implemented campaign or resulting funds confirmed.

**Open details**
- Approximate period collected [I25]. Exact dates, amount/counting method, analysis tools, paywall conditions unknown; not a blocker. Do not collect confidential legal materials/account data.
- Initial case complete [I21–I25]; deferred clarifications retained above.

### EVO-04: Keeping project AI skills current in a shared marketplace

**Sources:** U1 (preliminary account), I26 (problem), I27 (solution/alternatives), I28 (continued use), I29 (date).
**Hackathon: 22 May 2026** [I29, directly reported]. Not automatically the company rollout date.
Status: **continued internal use after the hackathon confirmed** [I28]. Internal tooling, including agent use in test environments, not production Prom.ua actions.

**Company context [I26]**
- Company aimed to centralize AI skills, MCP, and other agent resources, for example in a GitLab marketplace repository.
- Approved tools include Codex, Claude Code, Cursor, requiring several instruction conventions. Environment context, not proof of proficiency in every tool.
- U1 broadly described marketplace creation; I26 narrows his work to keeping project skills current. Do not claim he built the entire existing company marketplace from scratch without evidence.

**Personally encountered scenario [I26]**
- Was writing a browser frontend-verification skill explaining a project-specific multistep login in a monolith.
- Preserve only the engineering relationship between instructions/code; internal login steps, verification-code retrieval, URLs, and identifiers are unnecessary.
- Skill tightly coupled to one project's implementation, not a universal company instruction.

**Problem and considered arrangement [I26]**
- Felt project-local skills beside monolith code (e.g. .agents/.claude, possibly linked across conventions) were logical.
- Company convention instead required central marketplace storage, separate from the code it described.
- Engineer/agent might update login code but forget the skill in another repository, leaving stale instructions and repeated browser failures.
- This synchronization problem motivated the hackathon work. Local symlinks are not established as the final solution.

**Solution and synchronization direction [I27]**
- Explicitly stated he devised the solution **himself**.
- Scheduled cron/job in marketplace starts a pipeline importing local repository skills. Scheduler, frequency, change detection unspecified; do not assume GitLab Pipeline Schedules.
- **Bot-user opt-in:** repositories add the bot, synchronizer authenticates as it and can read local skills.
- Described discovery/access mechanism; permissions, repository enumeration, authentication details/credentials neither collected nor needed.
- Changes arrive through **merge requests**, tagging the local skill's author/contributor.
- **AI Review and security review/scanning** run in the workflow. Exact scan/MR sequence and merge conditions unknown.
- **Another team configured security tooling.** User cannot disclose names; do not ask or assign scanner implementation to him.
- Project repository remains source; changes flow through review into central catalog. No evidence of bidirectional synchronization.

**Alternative and trade-off [I27]**
- Initial idea: each source project's pipeline triggers the marketplace's remote pipeline, avoiding reliance on cron.
- CTO objected because every repository would need to know and configure that external pipeline.
- Chose central execution with bot-membership access. This is the stated trade-off; no invented latency/cost/accuracy comparison.

**Actual use and outcome [I28]**
- Reports it **continues to be used after the hackathon**, beyond a demonstration.
- Colleagues outside Prom.ua code development can install shared skills and have agents use the test environment.
- Example: PM checks a product-behavior hypothesis through an agent in testing. Not autonomous product decisions or production activity.
- Project-specific login skill is one distributed resource. Do not include internal authentication instructions/data.
- User/repository counts, automated-check volume, time saved, quantitative productivity/adoption unknown.

**Open details**
- Solution authorship confirmed [I27]; exact code contribution versus other components, beyond known external security setup, not detailed.
- Hackathon date clarified [I29]; initial case complete.
- Script technologies, security tools, maintenance arrangement unknown; do not request confidential tools/internal URLs.

### EVO-05: Company tagging service

**First launch:** probably **summer 2023** [I34, uncertain recollection]. Dates of later integrations/source migrations not separately established.

- [D1] Architected and built a company-tagging microservice.
- Users: CRM managers; use cases: targeted advertisements, conditional offers, analysis segmentation.
- Listed implementation: aiohttp server, asyncio worker, Redis Pub/Sub, React.js frontend.
- User identified advertising tags as an important next case [I30].

**Tag model and initial problem [I31]**
- Ordinary tags: metadata table with ID, name, meaning/description and many-to-many assignments. Exact tables/entity types unknown; do not infer a separate user model from ambiguous dictation.
- **Conditional tags** were calculated while querying companies rather than read as persisted assignments.
- Expensive queries evaluated all conditions; eliminating them motivated the new service.
- Confirmed performance problem/goal, without latency, load, or measured impact.

**Requirements and agreed freshness [I32]**
- Managers needed richer segmentation such as **GMV segments**, calculated by analysts. Do not attribute GMV methodology/all analytical calculations to him.
- Agreed to derive tags from analyst-prepared data.
- **Daily refresh** was sufficient for managers, enabling persisted many-to-many assignments instead of query-time calculations.
- Not real-time semantics or a guaranteed maximum 24-hour lag under all failures; recovery mechanisms not discussed.

**Service boundary and data-access evolution [I32]**
- Initially data lived in a separate analytics DB. Calculation moved into **a separate service** so the monolith would neither know nor access that DB; important security requirement at the time.
- When direct analytics-DB access for the service itself was to be restricted, switched to **CSV in S3** containing exported analyst data. Export authorship, S3 provider, full pipeline unknown.
- Later switched to **Trino**; user also reports working with **Iceberg** in the tagging service [I87]. Specific Iceberg responsibilities, connectors and deployment/administration ownership are not established.
- Three successive access/source arrangements: analytics DB -> CSV/S3 -> Trino; exact migration dates/release count unknown.

**Personal contribution and architecture [I32, I35]**
- Explicitly built the service **entirely himself** [I32]. I35 clarifies **backend, frontend, all integrations, CI/CD, Kubernetes deployment templates, observability**.
- Calls the approach DDD/clean architecture/clean code. Concrete mechanisms: **DAO/repository abstraction**, common interface, **dependency injection**.
- Changed sources by implementing a new class for the existing interface and injecting it. Reports fast changes, without exact time/code metrics.
- Demonstrates isolated data access. Do not infer every DDD pattern (aggregates, bounded contexts, domain events, etc.) solely from the label.
- D1 stack: aiohttp, asyncio worker, Redis Pub/Sub, React.js. Exact Redis/worker role in daily refresh not detailed.

**Integrations and additional personal work [I33]**
- Personally integrated tagging with the monolith: **Kafka tag-assignment diffs**, additions/removals.
- Event contracts, partition keys, delivery guarantees, publisher, Redis Pub/Sub role unspecified; do not fill from typical architectures.
- Integrated with the special-offers/packages service (package discounts, advertising points, etc.) [I33]. All tagging integrations personally confirmed [I35], not authorship of the entire external offer service.
- Enabled offers for narrow company segments using GMV, quality segments, and other analyst-prepared conditions.
- Personally changed the **monolith landing page** to show eligible tagged special offers alongside regular packages. Exact authorization/eligibility implementation unknown.

**Delivery, Kubernetes, observability: personal implementation [I35]**
- Fully configured service **GitLab CI/CD**.
- Wrote **Helm templates for Kubernetes pods, deployments, services**.
- Collected/configured **Prometheus metrics**.
- Created **Grafana dashboards and alerts**.
- User-confirmed infrastructure/operations scope for this service, not construction of the entire cluster, corporate CI/CD platform, or observability infrastructure.

**Monitored signals [I36]**
- Whether **nightly synchronization ran at all** and whether it **finished successfully**: distinct operational checks.
- **Analyst-data quality**, especially unexpected CSV value types; needed prompt direct communication with analysts to correct inputs.
- Validation rules/libraries, thresholds, blocking invalid updates, alert recipients unknown. No assumed schema-validation technology or atomic refresh.

**Production operations issue: memory and OOM [I36]**
- Early synchronization used high RAM; Kubernetes pods frequently failed with **OOM** (contextual correction of dictated “OM”).
- Diagnosed using **dashboards**, changed synchronization to **batch processing**.
- Mentioned memory monitoring/alerts but explicitly corrected the diagnostic aid to **dashboards, not alerts**. Do not invent the exact memory-alert set.
- Concrete memory-pressure mitigation; batch sizes, RAM before/after, pod limits, numeric failure frequency unknown. No absolute elimination of all OOM claim.

**Observed results [I33]**
- **Old expensive conditional-tag queries disabled** after launch.
- Reports **substantially faster merchant-cabinet page**, previously recalculating tags for banners/advertisements.
- No latency/percentiles, SQL execution time, load, sample size: qualitative reported performance improvement.
- **Managers report** demand and purchases of segmented offers. Not measured conversion lift, incremental revenue, or causal A/B result.
- Keep segmented-offer capability and page performance as separate outcomes without invented combined metrics.

**Continuation**
- First launch approximately established [I34]; initial case collected. Later dates/exact metrics can be added.
- Problem, requirements, own architecture, source evolution, integrations/results collected [I31–I33]. Unknown dates/scale/low-level mechanisms do not warrant a long follow-up sequence.

### EVO-06: Telegram bot and Zendesk/CRM

**Sources:** D1 (initial description/stack), I30/I37 (Viber added by others), I38 (integrations/delivery), I39 (state/identity), I40 (approximate launch/adoption).

**Context and contribution boundaries**
- Marketplace seller/support communication bot; managers use the existing CRM/Zendesk ticket workflow [D1, I38].
- Initial bot stack: **python-telegram-bot**, **FastAPI** [D1].
- Viber channel added later [I30], **not by the candidate** [I37]. Do not credit it to him or ask about its implementation.

**Existing ticket-workflow integration [I38]**
- Ticket creation/handling already defined by **another team's service**; he did not create the entire workflow from scratch.
- Studied that service/API and made changes for integration with his bot service.
- Coordinated with the merchant-cabinet team; not ownership of their whole service/team.

**Two-way communication and response delivery [I38]**
- Bot creates tickets; Telegram user messages become comments.
- Manager responses must reach the user in Telegram.
- Implemented return path at the described level: **manager comment in Zendesk/ticket flow -> Prom.ua webhook -> monolith request to bot service -> Telegram message**.
- Exact webhook publisher, payload, retries/delivery unspecified; do not add particular Zendesk triggers, Kafka, or Celery.
- Needed Prom.ua recipient/user to **Telegram chat ID** mapping to route the reply.

**Temporary state and identity linking [I39]**
- Simple **Prom.ua user ID -> Telegram chat ID** mapping in Redis, described as one-to-one.
- User supplied the phone number associated with their Telegram account; used to identify/authenticate the Prom.ua user.
- Candidate explains trust in the number through Telegram guarantees. Contact-transfer method/server-side ownership checks unspecified: reported design, not an independent security audit. Do not assume arbitrary typed numbers were trusted or a particular Telegram API method.
- Deleted Redis mapping at chat end.
- Chose Redis because losing this temporary state was acceptable. Expected session **about 1–2 days**, not a confirmed TTL or measured average.
- Recovery after mapping loss unspecified; no invented persistence/HA guarantees.
- User considers mapping simple and **the return webhook initiative** the more significant challenge. Avoid further Redis/auth drill-down without need.

**Delivery: personal work [I38]**
- Personally **fully configured CI/CD and deployment**.
- Do not automatically transfer tagging's Helm/Kubernetes/Prometheus details to this bot; specific artifacts/observability not described.

**Timing and usage [I40]**
- Initial Telegram launch **approximately summer 2024** [user recollection].
- Approximately **three months after launch**, managers reported **22% of all support requests** through Telegram. User explicitly settled on 22% after initial uncertainty.
- Counted **Telegram-tagged tickets in Zendesk**, allowing channel attribution.
- **Historical user account of managers' measurement**, not current independently reconciled reporting. Aggregation period/scope and absolute counts unknown; not all EVO products.
- Candidate interprets usage as seller convenience versus the website form. Not an independent UX study, A/B test, or proven support-time reduction.
- Channel share, not a 22% rise in total requests, cost saving, or user count.

**Initial discovery status**
- Problem, personal integrations, CI/CD/deployment, temporary Redis-state choice, approximate launch, and reported adoption collected [D1, I38–I40].
- Failure behavior, exact dates/absolute volume may remain unknown. Exclude Viber from personal achievements.

### EVO-07: Reviving the CRM automatic calling bot

**Sources:** I8–I12, user interview accounts. **Period:** junior stage at EVO; exact dates unknown.
One of his first challenging product-oriented tasks, in his assessment.

**Business context and problem**
- CRM contained many phone numbers from user profiles, manager notes, and other sources.
- Bot collected reachability/call results so managers could choose a current contact number for a company.
- Legacy functionality had been broken for a long time: uncertain recollection of **over three years**, not verified downtime.
- Asterisk, its API, and Celery task launching changed meanwhile; old code needed adaptation.

**Workflow outline (not a claim of an exhaustive final design)**
1. Celery tasks processed database phone numbers and requested calls from Asterisk.
2. Asterisk played prerecorded prompts and a keypad-response survey. Script/questions described were approximate examples.
3. Asterisk sent call results through an HTTP webhook.
4. Dedicated table stored outcomes: reached/not reached, answered, survey participation/nonparticipation, immediate hang-up, etc.
5. Managers used these data to assess contacts. An unanswered call does not prove an invalid number; exact business states/transitions not explored.

**Personal contribution**
- Independently investigated the old implementation, reconstructed its workflow, rewrote/revived legacy code, and added behavior.
- Adapted Asterisk/API integration and Celery task launching; exact API changes unspecified.
- Added required retries: one unanswered call was insufficient, another attempt needed later. Intervals/count/scheduler unknown.
- Designed bounded parallel work with queues, pools, batches [I8], elaborated below. Do not assume particular Celery primitives/broker.

**Redis buffer and Celery tasks [I9–I11]**
- Redis buffer held phone numbers awaiting dispatch [I9]. I10 clarifies removal after Asterisk acceptance; not a list of every active call.
- Constant upper buffer capacity; actual value unspecified.
- Separate Celery functions prepared/read/wrote candidate numbers, refilled available buffer slots, and consumed entries for dispatch.
- Exact task-type count, full candidate-set storage, scheduling frequency, operation ordering unknown.
- Slot released **when Asterisk acknowledged accepting the number**, without waiting for call completion/result webhook [I10].
- A **separate admission check** preceded dispatch. If unavailable, waited rather than sending [I10]. General logic, not proof of strict limits under concurrent workers.
- Metric came from **Asterisk's active-call count for this calling category** [I11]. Does not prove presence/absence of auxiliary local tracking.
- Exact count/limit comparison unclear. Do not choose an inequality or concurrency guarantees from ambiguous I10 wording.
- Distinguish buffer capacity from Asterisk admission, rather than treating both as one limit.
- Redis datatype unknown (“list” is logical), as are atomic check/add and failure recovery, including ambiguous/missing Asterisk acceptance.
- Message-broker comparison was his rough analogy. Do not call the buffer a Celery broker or full independent message broker.

**Retry accounting [I12]**
- Besides webhook call-state records, tracked attempts per phone per calling run.
- Run ID, phone number, attempt count used for retry decisions.
- **Counter store unknown:** Redis or PostgreSQL not recalled. Reasoning that PostgreSQL would make sense for transactions is not implementation evidence.
- Increment timing, atomicity, intervals, maximum attempts, scheduling unknown. Acceptable gaps; do not force reconstruction of old code.

**Constraints and trade-off**
- High parallelism was too costly; calling every number simultaneously unacceptable.
- One-at-a-time execution too slow for a large database.
- Needed concurrency within cost/load constraints. Tariff, limit, database size, throughput, actual spend unspecified.

**Technologies with concrete usage:** Python/Celery, Asterisk, HTTP webhooks [I8], bounded Redis number buffer [I9], database result table. DB type, Celery broker, deployment topology unknown.

**Outcome and evidence**
- User describes rewriting/reviving and extending the bot.
- Production rollout/date, subsequent operating duration, manager use after changes, measured impact not discussed. Do not derive savings/data-quality improvement from requirements alone.

**Further discovery status**
- Deep dive stopped at user's request [I12]; enough detail for the current inventory of this early junior case.
- Unknown implementation details remain unknown; do not automatically reopen next session.
- Rollout/business outcome could be briefly clarified later if needed, without restarting technical interrogation.
- Subsequent interview focus was newer, more significant projects/decisions at his current level.

### SIM-01: JTI SaaS platform

- Product for **Japan Tobacco International** [D1, I48]. Dictated “GTA” interpreted as JTI from the explicitly named company, not a separate project.
- Uncertain recollection: evaluated market entry of a tobacco product relative to competitors. Exact brands/research scope unspecified and unnecessary for this limited contribution.
- Described as mostly a static client report.
- **Limited personal contribution:** maintenance and bug fixes [I48]. I55 adds a database-access optimization example, probably here; uncertainty/boundaries under Engineering Practice / SQL. Not full architecture, report, or model authorship.

### SIM-02: Needs Analysis

- **Main Simporter product by his personal involvement** [I48]. “Nits Analysis” was a voice-transcription variant of D1's Needs Analysis.
- D1: NLP review analysis across e-commerce categories, followed by Google Trends keyword analysis.
- I48: users described a business idea; AI/NLP pipeline analyzed reviews/data and produced a report on needs/opportunities. Furniture-shop example illustrates a scenario, not a verified client.
- Reports processing was slow but functional; exact duration/metrics unknown.
- **Backend contribution:** retrieve data already prepared by data engineers from DB and serve the frontend. Not proof of full frontend or AI-model development.
- **Partial participation** in site-specific scrapers/parsers and category data collection.
- **Uncertain recollection:** may have provided an API for pipeline/model output into DB. Not established pipeline ownership.
- **Data engineers** owned the main pipeline work [I48].

### SIM-03: White Space

- D1: service identifying potentially successful product characteristics.
- I48: similar to Needs Analysis but for **existing businesses**, identifying gaps from reviews/data rather than just researching new ideas.
- Worked on **backend** [I48]. Specific components/decisions, scope, outcomes not yet explored.

### SIM-05: Asynchronous task-management infrastructure microservice

**Sources:** D1 (async tasks), I50 (authorship), I51 (purpose), I52 (working integrations), I53 (task ID/status/webhooks), I54 (limited adoption recollection).
Do not reuse SIM-04: historically assigned to excluded Prelaunch.

- Explicitly **initiated, fully architected, and built the microservice himself** [I50]. Personal contribution, not a general description of data engineers' work.
- Was a **junior developer**; startup entrusted him with a distinct infrastructure project to simplify work.
- Explains that potential failures would not critically burden the system/company, making this ownership reasonable. Exact blast radius/production guarantees unknown; no zero-risk claim.

**Purpose, interface, implemented scope [I51–I52]**
- **One centralized place and convenient API** for parsers/scrapers and other tasks, e.g. submitting scraping work.
- Wrapped **direct scraper execution**, **Apache Airflow**, **Celery tasks**.
- **All three integrations worked** [I52, explicit confirmation]. Not merely an unrealized design. Users/tasks/long-term scale unspecified.
- API protocol (REST/JSON-RPC), stack, routing/state mechanisms unknown. Do not assume Kafka/Redis or a specific adapter pattern.

**Task lifecycle and notifications [I53]**
- Submission returned a **task ID**.
- Clients could optionally **query status by ID**. Polling frequency/automation unspecified.
- Could provide a **webhook URL and client-defined payload** for status notifications.
- Confirmed status tracking/delivery, not necessarily scraping/NLP outputs, datasets, or model results.
- Transitions, storage, retry/delivery guarantees, payload format unexplored. No need for internal URLs or secret-bearing examples.
- Relationship to Needs Analysis/White Space and data engineers' scope not established; task orchestration is not model development.

**Outcome and observation limits [I54]**
- Thinks service **was used after launch**, with uncertainty.
- Moved to Prom.ua/EVO **roughly one month after implementation**, also recalled uncertainly.
- Later use, task/team counts, time saved, operational results unknown. Do not substitute generic benefits of centralized task APIs.
- Do not infer exact launch from an approximate month before changing jobs, especially with employment dates not separately verified.
- Initial case collected; no need to demand its subsequent history.

## Engineering Practice

### Security: CRM XSS and paid-SMS abuse [I41]

**XSS context and contribution boundaries**
- Several CRM XSS cases found by security testers/penetration testers, who filed tasks for the team to address. Do not credit candidate with those pentests or initial discovery of every vulnerability.
- Unsafe data already in DB, rendered as HTML without adequate protection on legacy pages.
- CRM used old Mako templates with default escaping and newer React pages. “We configured” escaping is a team statement; sole authorship not established.
- Found/fixed direct HTML-string rendering into React DOM where user-controlled data could reach it. Exact API name not recalled; no need to demand it or example payloads.
- Personal patch details, sanitizer/escaping method, regression tests unspecified. Experience addressing security findings, not sole audit of the entire CRM.

**Protecting paid-SMS actions from abuse**
- Personally added protection and **CAPTCHA** to actions such as phone confirmation.
- Risk: bulk SMS calls create provider costs. Candidate distinguishes this financial abuse from performance overload; do not describe solely as performance DDoS mitigation.
- Mentioned a historical international-portal incident. Portal details/attacker attribution unnecessary and not recorded as verified.
- **Redis attempt limiting [I42]:** authenticated CRM users with user ID/company context. Specific flow, not every anonymous product endpoint.
- Used **attempt counter with Redis key expiry**, updated on attempts; blocked further action above the limit.
- Example threshold: **more than five attempts**. Not necessarily every action/window or an invariant production constant.
- Exact key scope (user/company/combination), atomicity, fixed/sliding window, whether expiry extended on each attempt unknown. Do not infer a typical Redis implementation.
- Dictation corrected to **CRM**. Mechanism sufficiently described; exact settings, measured effect/savings unavailable.

**CSRF: reported experience without a recalled case**
- Reports CSRF protection work but cannot recall particular tasks. Preserve as reported experience; do not invent token/cookie/SameSite design or require reconstruction.
- Security-work dates, fix counts, costs/savings, impact metrics not given; do not invent results.

### Code quality, tests, and code review [I43–I45]

- Reports **many microservices in his team lacked tests before he joined**, not all services/teams across EVO.
- Created **test pipelines for several services** and added tests. Exact services, framework, test types, timing unspecified.
- Initiated **mandatory review of tests in code review**. Team practice, not evidence of an automatic CI merge gate, coverage threshold, company-wide policy, or mandatory reviewer role for every MR.
- Believes he wrote the most tests in the team, explicitly subjective; not a measured ranking/numerical advantage.
- Reports regular feedback that his code was well tested and usually had few bugs; team saw tests in review. Qualitative feedback, not independently verified defect rate or causal experiment.
- Coverage before/after, test counts, bug reduction, specific prevented regressions unavailable.

**Incremental testing and TDD [I44]**
- Added tests during large/small feature work, not a distinct whole-legacy coverage project.
- In services without tests, covered **the feature/changed functionality** and added a test pipeline.
- Encouraged colleagues to add tests when touching untested functionality. Concrete influence on practice, without assumed managerial authority.
- Describes personal practice as **TDD**, finding it easier now with AI. Personal assessment, not measured productivity improvement.
- Do not project current AI use across all previous years or claim every historical test followed strict TDD.

**Monolith testing utilities: own initiative [I44–I45]**
- Created **Prom.ua monolith testing utilities/modules** to avoid repetitive setup.
- Example: **decorators temporarily overriding feature flags, feature values, and configurations**; save original state, override, then restore it [I45].
- Used to test before/after feature enablement and differing country configurations in a multi-country monolith.
- Intent to test required variants, not achieved 100% or exhaustive combinatorial coverage.
- Observed benefits for himself and other developers. Adoption/time savings not quantified.
- Framework, internals, restoration under exceptions/parallel tests unknown. Do not assume context managers/fixtures or parallel-isolation guarantees.
- Example sufficiently explored; no code/full wrapper catalog required.

### Simporter database-access optimization [I55]

- Recalled an example **probably in JTI**. Dictated “GTI” mapped contextually to JTI, but attribution itself remained uncertain.
- Backend initially written by data scientists, according to his memory; not his original authorship.
- That SQL access path used **Pandas** and generated extra DB-availability checks. Specific remembered implementation, **not a universal Pandas behavior** or proven library/driver root cause.
- Also lacked **connection pooling** and had **N+1 queries**. Personally addressed these; exact access-API/pool changes unspecified.
- Added **indexes** where needed and performed **denormalization** in some cases. Tables/indexes and whether all changes belonged to JTI unknown; do not combine all SQL work into one precisely dated project.
- Queries, measured latency/query counts before/after, EXPLAIN plans, data scale unavailable. No invented speedup or claim every problem was eliminated.
- Sufficient initial SQL example; do not require six-year-old implementation details.

## Achievements

Candidates for further development: EVO-01–EVO-07, SIM-01–SIM-03, **SIM-05**, VOL-01. Prelaunch is not personal experience [I49].
For **EVO-01**, initial case collected: problem -> contribution -> key engineering decisions -> rollout -> qualitative results [I13–I16]. Details/evidence remain in the project record; final CV wording not drafted.
For **EVO-03**, investigation/legal discussions through implementation and approximate reported result collected; analysis and unimplemented trial proposal separated [I21–I24].
For **EVO-04**, personal architecture and continued use after hackathon recorded [I26–I28], without unsupported metrics.
For **EVO-05**, expensive-query removal, reported merchant-cabinet speedup, segmented offers collected; purchases supported by manager feedback, not measured lift [I31–I33].
For **EVO-06**, engineering case and historical manager-reported 22% Telegram request share about three months after launch recorded [I38–I40]; absolute volume/current share unknown.
Keep outcomes and figures in the relevant project record with sources, precision status,
and a clear distinction between individual and team contribution.

## Technical Skills

### Programming & Backend

- Python as primary language [U1].
- asyncio, aiohttp, FastAPI, REST, gRPC [U1; D1 examples in EVO-05, EVO-06, VOL-01, and general EVO scope].
- TypeScript: frontend experience, reported by the user on 2026-11-07; project details and depth not yet described.
- Go: limited experience from rewriting an existing Go microservice in Python as part of a larger service [I81]; do not imply extensive Go development.
- JavaScript [D1 skills list; proficiency/examples unknown].
- React [U1, D1/EVO-05]; depth/other frontend work to clarify.
- Flask, Celery, SQLAlchemy, Scrapy, Airflow [D1/Simporter; exact tasks still to map to SIM projects].
- Celery/Asterisk integration through tasks/HTTP webhooks [I8/EVO-07]; bounded Redis buffer/separate task functions [I9]. Release on Asterisk acceptance [I10]; dispatch admission uses Asterisk's active-call count for that category [I11]. Legacy, retries, concurrency experience; exact scheduling remains unknown.

### Architecture & Data Integration

- DAO/repository interface and dependency injection for analytics DB -> CSV/S3 -> Trino access changes, preserving the service data-access contract [I32/EVO-05]. DDD/clean architecture is his label; do not expand patterns without examples.
- Daily persisted many-to-many tags from analyst-prepared data; service boundary isolates analytics access from monolith [I32/EVO-05].

### Data & Messaging

- Redis temporary Prom user ID/Telegram chat ID mapping, acceptable state loss, deletion on chat completion [I39/EVO-06]. Expected 1–2-day session is not a confirmed TTL.
- Personally implemented Kafka tag-assignment diffs to monolith [I33/EVO-05]; exact contracts/guarantees not discussed.
- PostgreSQL, Redis, Kafka, RabbitMQ [U1, D1]; listing technologies alone does not establish architecture ownership.
- Redis Pub/Sub [D1/EVO-05]; Kafka listeners [D1/EVO].
- Trino and Apache Iceberg in the tagging microservice; S3 experience [I87]. Do not infer infrastructure ownership or proficiency depth beyond the described work.
- Kafka payment-status handler [I14–I15/EVO-01]: message-ID deduplication, billing retries/DLQ, concurrency lock, PostgreSQL history, sequence-ID ordering. Do not infer guarantee scope; project record holds detail.
- Elasticsearch [D1 skills list]; ELK logging extension [D1/Simporter].
- SQL optimization: addressed N+1, connection pooling/extra queries; indexes/denormalization [I55/Simporter, probably JTI]. Exact SQL/results unknown. Thread-local SQLAlchemy sessions appear only in D1, not separately interview-confirmed.

### Testing & Quality

- Test pipelines and incremental coverage of changed functionality in previously untested microservices; mandatory test review [I43–I44].
- Personal TDD practice, including current AI-assisted work [I44].
- Own override/restore decorators for monolith feature flags and country configuration; colleagues' reuse observed [I45]. Frameworks unnamed.

### Security

- Addressing security-team CRM XSS findings/raw HTML rendering; SMS protection through Redis attempt counters/expiry and CAPTCHA [I41–I42, Engineering Practice]. CSRF reported without a concrete recalled case. Do not assign pentest ownership.

### Software & Tools

- **AWS Lambda/container images:** hourly worker, CI-built image pushed to AWS registry, in leader-provided AWS environment [I60–I61/VOL-01]. Scheduler/registry/CI platform unspecified.
- Docker, Kubernetes, GitLab CI/CD [U1, D1/EVO].
- **GitLab CI/CD, Helm, Kubernetes pods/deployments/services:** personally configured pipelines/deployment templates for tagging [I35/EVO-05].
- Also independently configured Telegram bot CI/CD/deployment [I38/EVO-06]; specific artifacts not described.
- **Prometheus/Grafana:** tagging metrics, dashboards/alerts [I35–I36/EVO-05]; nightly run/success/data-quality checks, dashboard-based OOM diagnosis and batching. Numeric impact unknown.
- GitHub Actions, Azure App Services, private PyPI [D1/Simporter].
- Linux, Git [D1].
- AI-assisted development with Codex, Claude Code and Cursor; creates and maintains project-specific agent skills to give agents a feedback loop for verifying their work [I83], covering test-environment login, admin/CRM browser verification with Playwright CLI, project startup, frontend builds and migrations where needed [I82]. Do not include internal authentication procedures.
- Scheduled-pipeline/bot/MR architecture importing local skills into a GitLab marketplace [I26–I28/EVO-04]. Continued use confirmed; do not collect security-tool names.

## Leadership and Collaboration

- Independently investigated advertising balances/proposed charging-model change [I21/EVO-03]; after product discussion, corresponded directly with lawyers and reported feasible options [I22]. Stakeholder collaboration, not formal legal/management role.
- Test pipelines/tests across several services and mandatory test-review initiative [I43]. Feedback under Engineering Practice, no measured outcome. Python/library upgrades and other D1 process claims not separately explored.
- End-to-end merchant-side migration and Android/iOS integration coordination [I14/EVO-01]. Cross-team collaboration, not mobile-team management.
- Feature-flag payment rollout to 100% and event-contract coordination with fintech [I15/EVO-01]. Exact rollout thresholds and measured business effects unavailable; qualitative results in project record.
- Initiated separate B2B iOS Apple Pay configuration, coordinated mobile/fintech; after multi-ID profile option failed, second config with personally implemented backend profile selection [I19–I20/EVO-02]. Metrics/settings independence were goals, without measured effect.
- Analyzed remaining companies by status/activity and proposed trial/reactivation, deferred by product [I24/EVO-03]. No implemented campaign/results.
- Devised marketplace synchronization and adapted design after CTO feedback: per-repository remote trigger -> centralized job/bot opt-in [I27/EVO-04]. Security configuration belonged to another team.
- Independently wrote tagging, negotiated daily freshness, isolated analytical sources behind interface/DI [I32/EVO-05]. Architecture under business/security constraints.
- Studied/modified another team's ticket service and coordinated merchant-cabinet integration for Telegram [I38/EVO-06]. Not ownership of the entire ticket platform.
- Reusable configuration/flag testing decorators benefiting colleagues in his observation [I45]. Developer enablement, not automatic evidence of mentoring/management.
- No regular mentoring [I46]. Knowledge sharing, ad hoc support, precise interview role below [I46–I47]. Formal code-review authority, final hiring decisions, team leadership not established.
- Growth from small tasks to clarifying product needs [I4]; examples in EVO-01–EVO-06. Do not automatically place every project in the Senior period.
- As junior, independently reconstructed legacy calling under changed environment/requirements [I8/EVO-07]. Colleague roles/decision approvals not explored.
- Establish architecture, delivery, production ownership separately for each project.

### Knowledge sharing, peer support, interviewing [I46–I47]

- Explicitly **no regular mentoring**. Do not rename occasional assistance as sustained mentoring/management.
- Regularly shares successes, failures, and experience in **team technical meetings**.
- Reports positive feedback that his contributions are valuable/visible and discussions with him comfortable. Qualitative feedback, not independent assessment or a formal lead role.
- Occasionally helped several **Middle developers** with difficulties raised at standups; felt help was useful. Specific cases/outcomes not described.
- Intern/junior interviews [I47]:
  - **Supporting interviewer**, asking follow-ups and observing responses; count unspecified.
  - **Once led a full technical interview**, observed by a **team lead**.
  - Supplied **candidate feedback to HR**.
- Question sets, criteria, hiring outcomes, final authority unknown. One lead interview is not recurring lead-interviewer experience.
- Onboarding neither confirmed nor denied; do not assume either.
- Interview scope clarified [I47]; no additional questions now.

### Personal infrastructure initiative at Simporter [I50]

- As junior, proposed, architected, and built async-task microservice SIM-05. Startup ownership within acceptable infrastructure-project risk in his account; not formal team leadership.

## Certifications and Learning

### Coursera Machine Learning Specialization [I71, I75–I76, I78, D3]

- User identifies the completed credential as **Machine Learning Specialization**, taught by Andrew Ng, and supplied a [certificate link](https://www.coursera.org/account/accomplishments/specialization/certificate/GTV7FBL2W48T) [I78].
- Certificate screenshot [D3] records completion on **22 December 2022**, with **DeepLearning.AI and Stanford Online** branding and Andrew Ng's signature; Coursera hosts the certificate. Its online verification endpoint was not independently retrieved.
- All practical assignments were in Python [I76]. Completion does not itself establish commercial ML engineering experience.

### Hugging Face Agents Course [I77, D2; earlier I71–I73; syllabus W1]

**Personal learning status**
- **Completed 7 November 2026** [I77, D2]. Previously in progress with the final assignment outstanding [I71–I73]; that status is superseded.
- **Official course title on certificate:** Hugging Face Agents Course.
- **Credential:** Certificate of Excellence; **recipient:** Oleh Kyba; **issuer/signature:** Hugging Face Instructors; **certificate date:** 2026-11-07 [D2, visually reviewed].
- **Evidence:** [Certificate PDF](../../../documents/diplomas/Oleh_Kyba_Hugging_Face_Agents_Course_2026-11-07.pdf), unchanged local copy. Score, credential ID, and verification URL are not shown. Separate Fundamentals certificate not discussed.
- User previously supplied the [official course link](https://huggingface.co/learn/agents-course/unit0/introduction) and requested the overview [I72].
- Final-agent learning project recorded as **LEARN-01** under Independent Projects. Implementation details/framework/score not collected. Syllabus below remains context, not proof of specific technologies or production experience.

**Official syllabus overview [W1]**
- [Unit 1: agent foundations](https://huggingface.co/learn/agents-course/en/unit1/introduction): LLMs, tools/actions, agent loop, simple instructional agent. [Dummy Agent Library](https://huggingface.co/learn/agents-course/unit1/dummy-agent-library) demonstrates Python tool calls/model interaction.
- [Unit 2: frameworks](https://huggingface.co/learn/agents-course/en/unit2/introduction): smolagents, LlamaIndex, LangGraph. [smolagents](https://huggingface.co/learn/agents-course/en/unit2/smolagents/introduction): code/tool-calling agents and tools; [LlamaIndex](https://huggingface.co/learn/agents-course/unit2/llama-index/introduction): components, tools, agents, workflows; [LangGraph](https://huggingface.co/learn/agents-course/en/unit2/langgraph/introduction): LLM workflow orchestration. Course modules, not confirmed candidate skills.
- [Unit 3: Agentic RAG](https://huggingface.co/learn/agents-course/en/unit3/agentic-rag/introduction): data retrieval/tool integration in an applied agent, with framework choice.
- [Unit 4: final project](https://huggingface.co/learn/agents-course/en/unit4/introduction): own agent on a GAIA subset; at review time a **30%** threshold was stated for the final challenge. [Hands-on](https://huggingface.co/learn/agents-course/unit4/hands-on) covers questions, answer submission, code link. Assignment requirement, not his score.
- [Syllabus/certification](https://huggingface.co/learn/agents-course/unit0/introduction) distinguishes Fundamentals from full completion; bonus topics not automatically completed.

**Continuation**
- Course completion is documented [I77, D2]. LEARN-01 implementation discovery remains deferred until the user chooses to discuss the project [I74].
- Completion does not establish proficiency in every syllabus framework or commercial agent engineering experience; collect concrete implementation examples before expanding Technical Skills.

## Publications, Awards and References

Publications, awards, and professional references not separately discussed. Missing records do not establish absence.

## Open Questions

These are retained question/topic summaries and their current status, rather than a new questionnaire to ask automatically.

- **A2:** Why Simporter -> EVO? Answer collected [I2]; date accuracy/transition details not separately confirmed.
- **A4:** What team/reorganization context? Recorded [I4, I6–I7]. VOL-01 occurred during a pause in Prom.ua developer work [I56], not a confirmed employment break. Organizational details low priority.
- **B0 / EVO-07:** How did the calling bot work? Sufficient discovery complete [I8–I12]. Unknown details do not block continuation; no renewed deep dive without user initiative.
- **B2 / EVO-02:** What constraints/decisions did wallets require? Initial case complete [I19–I20]. Dates/adoption metric can be added later.
- **B3 / EVO-03:** What changed for unused balances? Investigation, implementation, analysis, reported result recorded [I21–I25]. Exact sum remains deferred.
- **B4 / EVO-04:** What was the hackathon solution and actual use? Initial case complete [I26–I29]. Date known; adoption metrics unspecified.
- **B5 / EVO-05:** How did tagging and its integrations work? Initial case complete [I31–I36], including CI/CD, deployment, observability, OOM/batching. Dates approximate, numeric impact unknown.
- **B5a / EVO-05:** What delivery/observability work did you own? Added [I35–I36], including monitored signals and the OOM/batching case. Attribute diagnosis to dashboards, not alerts.
- **B6 / EVO-06:** What was the bot's scope/result? Initial case complete [I37–I40]. Viber excluded; Telegram integration and historical 22% request share recorded.
- **C1 / Security:** Initial cases recorded [I41–I42]: security-team XSS findings, personal Redis SMS limiter/CAPTCHA, CSRF without recalled detail. Do not require exact parameters or an unknown CSRF case.
- **C2 / Testing:** Initial examples collected [I43–I45]: feature-led coverage, pipelines, test review, TDD, override/restore decorators.
- **D-mentor:** No regular mentoring [I46]; knowledge sharing, occasional Middle-developer help, interviews. Onboarding unknown.
- **D-interview:** Scope clarified [I47]: supporting interviewer, once led a full technical interview under TL observation, HR feedback.
- **SIM-A:** Product contribution split collected [I48]; Needs Analysis was the main involvement.
- **SIM-Prelaunch / closed:** No involvement; excluded from personal experience [I49].
- **SIM-backend / SIM-05:** Initial case complete [I50–I54]. Use after launch/roughly one month before moving recalled uncertainly; long-term results unknown.
- **SIM-SQL:** Initial SQL example recorded [I55]; JTI attribution uncertain, no metrics.
- **VOL-start:** Voluntary joining and Prom.ua developer-work pause context collected [I56].
- **VOL-scope:** Only synchronization worker [I57], not entire backend.
- **VOL-name / closed:** **OpenSea**, explicitly confirmed [I58]. OpenSearch not a technology in this case.
- **VOL-tech:** Scheduled API sync, DB metadata/image URLs, other developer's Next.js scope recorded [I59]. User calls task simple; no more technical detail required.
- **VOL-result:** 92.7 ETH source clarified [I61]: leader/founder with account access, no candidate reconciliation, team result.
- **VOL-AWS:** Lambda/scheduled/container-CI workflow collected [I61]; no demand for exact cloud components.
- **EDU-MSc / closed:** Master's completed June 2025 as expected in D1 [I62].
- **EDU-thesis / omitted by preference:** Exclude topic from CV [I63]; no further questions without user initiative.
- **GOAL-work:** Task/AI interests described [I64], no rigid task preferences.
- **GOAL-format:** Remote required, optional office acceptable; 2–3 office days every 2–3 months a possible exception [I65].
- **GOAL-location:** Planned remote base Slovakia [I66].
- **GOAL-employers:** Any country except Russia/Belarus [I67].
- **GOAL-other:** No further hard exclusions; Adult/iGaming considered case by case with concerns [I68].
- **GOAL-comp:** More than current approximate USD 4,000/month **net** [I69–I70]; upper range unspecified.
- **EXTRA:** Coursera ML certificate recorded [I71]; Hugging Face Agents Course completion/Certificate of Excellence dated 7 November 2026 documented [I77, D2]. Coursera specialization title, date and program partners documented from certificate screenshot [D3]; other nonwork contributions/projects not separately explored.
- **HF-cert / closed:** Completed Hugging Face Agents Course; Certificate of Excellence, Oleh Kyba, 7 November 2026 [I77, D2].
- **HF-practice / deferred by preference, LEARN-01:** Course completion recorded [I77, D2]; project implementation case study, score/framework/repository remain uncollected. Discuss when the user chooses to reopen it [I74]; no monitoring/reminder.
- **CERT-id / resolved from certificate screenshot:** Machine Learning Specialization, 22 December 2022, DeepLearning.AI and Stanford Online, hosted by Coursera [D3]. All assignments were in Python [I76]; online verification not independently retrieved.
- **E3 / updated:** Apple Pay 12%, Google Pay 11% of all merchant payments, user-reported [I78]; period and measurement basis unspecified.
- **B1:** EVO-01/EVO-02 phases separated [I18]; EVO-01 end known, start approximate; EVO-02 date unknown. EVO-03 separate case approximately summer 2026 [I21–I25]; other EVO cases also recorded. Do not invent initiative dependencies.
- **E1 / updated:** Approximately UAH 10 million over about one month reconfirmed by user [I78]. Exact amount/counting method not independently verified; retain approximation.
- **E2:** 92.7 ETH source established in user's account [I61]: leader/founder report. Preserve team attribution and “reported, not independently checked,” not personal fundraising.
- **F1:** Master's completed June 2025 [I62]; exclude/do not ask thesis topic [I63]. Start dates/official degree wording may be checked as needed, without demanding diploma now.
- **F2 / when preparing materials:** Slovakia/working and geographic preferences established [I65–I68]; English approximately C1 is U1 self-assessment. Bratislava confirmed [I79]; some formal dates remain unknown. Application phone and email were supplied later. Do not infer from timezone/Git identity.

## Interview Progress

- **Mode:** Career discovery conversations in Ukrainian, one primary question then wait. Adaptive technical follow-ups; allow for dictation errors. This stored knowledge base, question summaries, and answer summaries are now in English at the user's request; future CV language is English.
- **Using supplied CV [I30]:** Choose next topics from the existing document. Do not make user relist known projects or ask questions already answered by D1.
- **Pacing [I7, I12]:** Avoid many questions on organization trivia or low-level details of old small tasks. Prioritize significant projects, problem, contribution, key decisions, results; go deeper selectively to understand current level. Not a memory exam on five-year-old code. Accept unknowns without repeated questioning.
- **Current status:** Initial interview pass complete, no active question. Coursera ML/Python clarified [I76]; specialization certificate date and program partners documented from screenshot [D3]. **Hugging Face Agents Course completed; Certificate of Excellence dated 7 November 2026 visually reviewed [I77, D2].** LEARN-01 implementation details remain for a separate discussion when the user chooses to reopen it.
- **Completed:** Repository rules and both CV pages read; initial discovery persisted as I1–I76, separating D1 and official W1/W2 from personal facts. Key cases, competencies, collaboration, outcomes, preferences collected. English translation and CLAUDE.md profile summary requested on 2026-10-26. Completion update I77 and certificate D2 recorded on 2026-11-07; concise profile and detailed learning/project records synchronized.
- **Coverage:** A: timeline/promotions/teams; B/C: EVO-01–EVO-06, sufficient early EVO-07, Simporter/SIM-05/SQL, security, tests, CI/CD, observability; D: initiatives, product/legal/mobile/fintech/CTO coordination, knowledge sharing, exact interview role; E: results with sources/estimates; F: volunteering/AWS, MSc completion, Coursera/HF. Goals/remote/geography/compensation also recorded.
- **Recommended next topic:** Wallet shares, approximate EVO-03 amount, Coursera specialization title/link and location were updated [I78–I80]; certificate screenshot records its date and program partners [D3]; wallet measurement context remains unspecified. LEARN-01 implementation can be explored when the user chooses, now that course completion is documented. On new requests, continue the specific topic without restarting discovery. CV/job search are separate workflows.
- **Persistence:** After meaningful topics, briefly summarize, allow corrections, save confirmed details/open questions here. Do not label preliminary source notes independently verified.
- **Current scope:** Collect/document experience. CVs, cover letters, job searches/applications are separate future work.
- **Resuming:** Read this file first; do not repeat answered questions.
- Do not store credentials, internal URLs, proprietary code, confidential details; a safe engineering account is sufficient.
