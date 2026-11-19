# AdSense revamp, fitrank.streamerosai.com (19 Nov 2026)

Follows `docs/adsense-changes-2026-11-16.md`. Context: AdSense rejected streamerosai.com on 16 Nov 2026 for "low-value content"; the review is
domain-level. Policy checklist: `portfolio/docs/adsense-readiness-2026-11-16.md`. Ads stay off: `verify-no-ads` passes (no Google ad code in
176 built files) and no ad code was added.

## Audit method

Fresh `npm run build`, then the visible `<main>` text of every page in `out/`, word counts and the highest 5-word shingle overlap with any other
feature, use-case or blog page. Blog posts were also counted from source with the site's own `words()` function, including the ones queued for
later dates. The FitRank product repository is not on this machine (searched `D:\` three levels deep), so product facts were checked against
the site's own product copy (`src/lib/content.ts`, the feature pages and the results page), which earlier work had checked against the app.

## Feature pages: 19 to 14

Each weak page was merged into the sibling in the same role group that covers the closest ground. The merged page took over the features,
steps, screenshots, use cases and FAQs; the text was rewritten as one page, not pasted. Use-case pages and blog links now point to the merged page.

| Old page | Merged into | Overlap before | Why |
| --- | --- | --- | --- |
| /features/employee-value/ | /features/what-if-staffing/ (now "Pre-sales: what-if staffing and client profiles") | 52% with what-if | Both serve proposals: can we staff it, and the client profile of who we propose. |
| /features/hire-or-move/ | /features/skill-gap-analysis/ (now "Skill gaps: train, move or hire") | 45% with skill gaps | The hire-or-move card is the decision that follows a gap. |
| /features/candidate-matching/ | /features/hiring-requests/ (now "Hiring requests and candidate matching") | 39%, 488 words | Candidate matching is what HR does with a hiring request. |
| /features/health-and-fairness/ | /features/model-governance/ (now "Model governance, health and fairness") | 48% with the fair-decisions use case, 443 words | Same admin screens, same audience. |
| /features/decision-api/ | /features/in-house-decision-model/ (now "In-house decision model and API") | 38% with the decision-api use case, 480 words | The API is the same engine. The illustrative API call now shows on the merged page. |

- Old URLs still build (no redirects on a static site): each shows "X is now part of Y", the features that moved, and a link. They are
  `noindex, follow`, out of `sitemap.xml`, `image-sitemap.xml`, `llms.txt` and `llms-full.txt` (`MERGED_FEATURE_PAGES` in `src/lib/features.ts`).
- Highest overlap between indexable feature pages is now about 40% (it was 52%); the remaining overlap is mostly the shared page frame
  ("The problem", "How it works", "What's included"). Use cases now overlap their feature page by 26 to 32% (was up to 48%).
- Share cards regenerated for the five merged pages only (their headings changed); the script rewrote no other card.

## Blog

| Change | Why |
| --- | --- |
| New rule in `src/lib/blog.ts`: a post under 600 words (`MIN_INDEXED_WORDS`, counted by the site's `words()`) is still built on its day but is `noindex, follow` and left out of the sitemap, llms.txt, the feed, the image sitemap and the blog JSON-LD | Short posts read as thin. The comment says to add words only by adding information. |
| /blog/employee-skill-matrix/ deepened (written meaning for each rating level, a worked example of reading the gap row with a made-up team labelled as such) | Was about 580 page words. |
| /blog/resource-manager-rmg/ deepened (a week in RMG, how the role is measured with definitions) | Was about 517 page words. |
| /blog/utilization-vs-billable-utilization/ deepened (what counts in the denominator: leave, training, pre-sales, partial allocation, unpaid support; two FAQs, no invented benchmark) | Was about 585 page words. |
| /blog/skills-gap-key-person-risk/ deepened (a key-person check a team can run by hand) | Was about 603 page words. |
| /blog/hire-or-move-internal-mobility/ deepened (the inside-versus-outside comparison, field by field) | Was about 647 page words. |
| /blog/skills-based-resource-matching/ deepened (turning a client brief into a matchable request) | Fell just under the new line. |
| Product claims reworded in skills-gap and skill-matrix posts | They said FitRank moves a skill's "last used" date automatically and flags key-person risk; neither is in the product copy. They now say what the feature pages say: profiles carry level, years and last used, a data-health view flags missing and due-for-review profiles, HR accepts resume skill suggestions. |
| One FAQ on the merged model page now says the benchmark data is synthetic | Benchmarks rest on synthetic data; the home page, results page and llms.txt already said so. |

All 17 live posts are indexable after this work.

## Checks

`npm run build` passes, including `verify-sitemap` (57 URLs: canonical, one h1, alt text, title and description length, share card) and
`verify-no-ads`; `npm run typecheck` and `npm run lint` pass. In `out/`: the five old feature URLs are `noindex, follow` and absent from both
sitemaps and both llms files; no built page links to them.

## What remains (needs the owner)

- **The queued posts are short.** All 29 posts dated 20 Nov 2026 to 26 Feb 2027 are under 600 words (about 300 to 560). Under the new rule
  each one will publish noindex on its day. Deepen each with real product detail or a real lesson before its date (the next is
  `job-description-to-staffing-request` on 20 Nov), or move the dates.
- Feature pages still share the page frame and some phrasing with their use-case pages; a further merge (for example `project-staffing` into
  the multi-task use case) is possible but would remove a real capability page.
- No customers, reviews or references exist, which the site says honestly. "Genuine user interest" for AdSense depends on real traffic.
- Benchmarks are synthetic and say so; real accuracy needs a pilot company's own decisions.
