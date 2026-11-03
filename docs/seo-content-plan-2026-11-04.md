# FitRank SEO content plan, 4 November 2026

Experiment: five first-person story posts, each aimed at one search keyword, published one every three days from 2026-11-05 so Search Console and GA4 can show whether the format works. Audience: US (DataForSEO location 2840).

## treg spend (budget $0.40)

| Call | Count | Cost |
|---|---|---|
| dataforseo.google.keywords.ideas | 8 | $0.1182 |
| treg.google.serp.organic | 8 | about $0.0012 |
| dataforseo.google.domain.ranked_keywords (workeen.ai, muchskills.com, 7shifts.com) | 3 | $0.0504 |
| Total | | about $0.170 |

Seeds searched: shift swap, fair shift scheduling, employee scheduling conflicts, scheduling rules, open shift, employee availability form, shift scheduling, predictive scheduling. Head terms such as staff scheduling software were already priced in docs/seo-keyword-research-2026-10-30.md in the portfolio repo and not repeated. "fair shift scheduling" and "employee scheduling conflicts" returned almost nothing. "open shift" is polluted by Red Hat OpenShift.

## Keyword table (US, volume per month / difficulty)

| Keyword | Vol | KD | Intent | Who ranks (as of November 2026) |
|---|---|---|---|---|
| shift scheduling | 1,600 | 12 | commercial | zebra.com, getsling.com, peoplemanagingpeople.com, microsoft.com, joinhomebase.com |
| shift swap | 720 | 0 | informational | help.workforce.com, rippling.com glossary, shift-swap.com, Microsoft support, Reddit |
| shift swapping | 720 | 0 | informational | Reddit, inflectionhr.com, workjam.com |
| employee availability form | 480 | 0 | transactional | agendrix.com, luminpdf.com, pdffiller.com, timetrex.com, cognitoforms.com, shifton.com, getsling.com |
| ai schedule maker | 480 | 11 | commercial | Google Play app, taskade.com, rosterlab.com, zapier.com, genspark.ai, venngage.com |
| work schedule template excel free download | 480 | 2 | transactional | projectmanager.com, workintelhub.com, YouTube (our template page also targets it) |
| shift scheduling template | 320 | 12 | transactional | smartsheet.com, monday.com, myshyft.com, clockify.me |
| weekly employee schedule template excel | 260 | 6 | transactional | excel.cloud.microsoft, smartsheet.com, a university library |
| predictive scheduling | 140 | 4 | informational | not checked (legal topic, not built: no verified episode) |
| employee availability form template | 110 | 0 | transactional | as for the form |
| scheduling rules | 90 | 21 | informational | not checked |
| shift swap form | 90 | 0 | transactional | not checked |

Heads left alone: employee scheduling app 8,100 (KD 35), staff scheduling software 12,100 (KD 54), schedule template excel 2,400 (KD 15, not a story fit).

## Competitor analysis

1. workeen.ai (256 ranked keywords) ranks at positions 16 to 58 on "staffing and scheduling" (8,100), "rostering definition" (3,600), "what is rostering" (2,400) and "what is rotating shift" (1,900). It earns volume from definitions. Nobody on the first pages of our five targets tells a first-hand story; they are product pages, glossaries or forms.
2. muchskills.com (1,639 ranked keywords) earns its volume from team-building games and software head terms, a different audience. Not a model for this site beyond one real artefact per page.
3. 7shifts.com (15,809 ranked keywords): its biggest rankings are state minimum wage pages and "google maps restaurants". A scheduling vendor wins traffic from law and local-data pages, not scheduling advice. We did not copy this: no legal claims without sources.
4. SERP shape: "shift swap" and "shift swapping" are held by help pages, a glossary, Reddit and one HR blog, so a specific checklist can compete. "employee availability form" is a wall of template pages, so the post leads with the four questions and a test. "shift scheduling" is vendor-dominated; the riskiest target.

## The five stories

All numbers come from runs of the generator's own fill function (ported verbatim to a script and run on the example team in src/components/ScheduleGenerator.tsx) or from the repo. Where a variant was tested (Saturday cover needs two people; calendar-order fill; one person removed; one extra unavailable day), the post says so.

| # | Slug | Primary keyword | Secondary | Publish |
|---|---|---|---|---|
| 1 | /blog/shift-scheduling-hardest-shift-first/ | shift scheduling | how to schedule shifts, shift scheduling template, scheduling rules | 2026-11-05 |
| 2 | /blog/employee-availability-form-what-to-ask/ | employee availability form | availability form template, schedule of availability | 2026-11-08 |
| 3 | /blog/shift-swap-rules-a-manager-can-copy/ | shift swap | shift swapping, shift swap form, shift swap policy | 2026-11-11 |
| 4 | /blog/ai-schedule-maker-what-it-should-tell-you/ | ai schedule maker | ai schedule generator, ai employee scheduling | 2026-11-14 |
| 5 | /blog/weekly-schedule-template-excel-night-shift-hours/ | weekly schedule template excel | night shift hours formula excel, work schedule template excel free download | 2026-11-17 |

### 1. Hardest shift first
- Episode: ran the generator's fill on its example team (six people, caps and days off) with Saturday cover raised to two people (23 slots, capacity 27), once in shipped order (fewest possible people first) and once in calendar order. Shipped order fills 23 of 23; calendar order fills 22 of 23 because Elena's 3-shift cap is spent on Monday, Wednesday and Friday mornings.
- Proof: `generate()` in src/components/ScheduleGenerator.tsx; the fill-order FAQ in src/app/tools/schedule-generator/page.tsx; commit 6f3617e (30 Oct 2026).
- Why it can win: a checkable test plus a five-step rule list; competitors are vendor pages. Risk: head term with strong domains.

### 2. Availability form
- Episode: why the generator asks for unavailable days and a weekly maximum; removing Dev (no days off, max 5) makes capacity 22 equal to demand 22 and still leaves Friday evening unfilled. It also discloses that the tool's banner only warns when capacity is below demand.
- Proof: `unavailable`, `maxShifts` and the capacity formula in ScheduleGenerator.tsx.
- Why it can win: KD 0, a four-question form and a margin rule; competitors are templates with no reasoning. The 20 percent margin is labelled a rule of thumb from one test.

### 3. Shift swap
- Episode: marked Chen unavailable on Friday and regenerated: 8 of 15 slots and 10 of 22 assignments changed, versus 2 changes for a local swap (Chen's Friday morning for Dev's Thursday evening).
- Proof: same function; the fill is deterministic, so anyone can reproduce it from the example inputs.
- Why it can win: KD 0, 720 searches, weak SERP (help pages, Reddit); five copyable swap rules and the fields of a request form. Rules are labelled the author's own, not legal advice.

### 4. AI schedule maker
- Episode: commit 123b146 (30 Oct 2026) repositioned the category word from staffing to staff scheduling because search treats staffing as recruiting; commit 6f3617e, same timestamp, shipped a generator with no AI in it. The post asks what a searcher for an AI schedule maker needs.
- Proof: git log for both commits, tool title in src/lib/tools.ts, src/app/how-it-works/page.tsx for where FitRank does use a model.
- Why it can win: an honest angle on a keyword whose results are mixed apps; six questions to ask any tool.

### 5. Weekly schedule template in Excel
- Episode: a night shift 22:00 to 06:00 gives minus 16 hours with plain subtraction and 8 with `MOD(...,1)*24`; the template's example week shows two night staff on Thursday and hours of 40, 40, 40, 32, 40, 40, 32, 32.
- Proof: scripts/generate-schedule-template.py (Shifts hours formula, SUMPRODUCT/COUNTIF grid, coverage rows) and public/templates/employee-schedule-template.xlsx.
- Why it can win: KD 2 to 6, a formula plus a seven-point build checklist. Risk: overlaps /tools/employee-schedule-template-excel/ (the post links to it rather than competing).

## Not done, and why
- Healthcare and hospital pages: nothing in the repo claims healthcare capability, so no post was written for those keywords.
- Predictive scheduling (US fair workweek laws): needs cited statutes and no true episode exists.
- Competitor pages were not scraped; competitor facts are limited to titles and domains seen in the SERP, as of November 2026.
- No backlink lookups (budget kept for keyword data).
