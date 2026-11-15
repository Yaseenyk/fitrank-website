# AdSense readiness changes, fitrank.streamerosai.com (16 Nov 2026)

Context: the parent domain streamerosai.com was rejected for "Low-value content"; subdomains are judged with it. Policy notes: `portfolio/docs/adsense-readiness-2026-11-16.md`. Ads stay OFF and `scripts/verify-no-ads.mjs` still runs in the build and passes (no Google ad code in 172 built files).

## Audit (visible `<main>` words in the built `out/`, 60 HTML files; 59 in the sitemap before this work)

| Page type | Pages | Words | Verdict |
|---|---|---|---|
| Home | 1 | 2,187 | Strong. |
| Features index and 19 capability pages | 20 | index 2,079; pages 449 to 697 | Real, product-specific copy with screenshots, but about 40 to 50 percent of the wording overlaps between sibling pages (shared structure and phrases). The shortest are around 450 words. |
| Use cases | 9 plus the index | 1,180 to 1,700; index 392 | Substantive. |
| Blog | 14 posts plus the index | 516 to 1,379 | Substantive; a few posts are around 520 to 600 words. |
| Free tools | 4 plus the hub | 581 to 889; hub 245 | Working browser tools with explanatory text. |
| Pricing, how it works, security, hire, results | 5 | 331 to 577 | Real. Results is honest that the benchmark is synthetic and where rules still beat the model. |
| Contact | 1 | 109 | A form with three lines of contact details. Too thin for a trust page. |
| Early access | 1 | 163 | A form page with a 3-item list. Cannot stand alone. |
| Privacy | 1 | 251 | Missing the visit counter, a cookies section and any AdSense statement. |
| About, Terms | 0 (404) | - | Missing. |

No broken internal links (checked over every built page). No placeholder text. The site makes no customer or testimonial claims: footer and pages say "early access", and the benchmark page says its data is synthetic.

## Changes

| Page | Before | After |
|---|---|---|
| `/about/` | 404 | New, about 510 words: who builds it (Yaseen Khatib, solo, Hyderabad), that there are no customers or case studies to claim, what FitRank is and is not, how the benchmark was run and its limit, free tools and blog, money and advertising, contact. Statements were checked against `content.ts`, the security page and the benchmark page. |
| `/terms/` | 404 | New, about 480 words: information only, benchmarks are synthetic and not a promise, staffing decisions stay with people, free tools as-is, licence and pilot governed by a written agreement, submissions, reuse, advertising, liability. |
| `/contact/` | 109 words | 340 words: who you are writing to, what to write about, what FitRank cannot help with, what not to send. Form and details unchanged. |
| `/privacy/` | 251 words | 504 words: adds the first-party visit counter (no cookies, no IP, nothing typed, 90-day retention, off with Do Not Track or GPC), a cookies section, an Advertising section (AdSense for the future, opt-out of personalised ads via Google ad settings and aboutads.info, notice updated before any ad), run-by and contact pointers. |
| `/early-access/` | indexable, in sitemap | `noindex, follow`, removed from the sitemap and `ROUTES` (still linked from the nav, footer and pricing). |
| Footer, every page | Privacy and Contact only among trust links | Adds About and Terms of use. |
| `sitemap.xml` | 59 URLs | 60: minus early-access, plus About and Terms. Share cards `public/og/pages/about.jpg` and `terms.jpg` were generated with the repo's own card function (only those two files; the rest were not regenerated). |

## Gates

`npm run build` passes with `verify-sitemap` (title length, description length, one h1, canonical, share image per URL) and `verify-no-ads`; `npm run lint` and `npm run typecheck` pass. No gate was changed.

## Remaining weaknesses

- Feature pages share a lot of phrasing with each other and with the use-case pages (up to about 50 percent shingle overlap). This is the main "templated" risk. The honest fix is to merge the weakest feature pages into their group, not to add words.
- No customers, reviews or named references exist, which the site says honestly, but a reviewer looking for "genuine user interest" will see a very early product.
- The product is early access with annual-licence selling, so the site is a marketing site; AdSense on a B2B early-access marketing site would also earn very little.
- Blog posts of 520 to 600 words are short.
- Benchmarks rest on synthetic data; stated clearly, but they are not independent evidence.

## Honest assessment

This is a credible small product site with real screenshots, honest benchmark framing and working free tools. The gaps were the missing About and Terms pages, a 109-word contact page, a thin privacy notice and one form-only page in the index. Those are fixed. Its weakness for AdSense is thin audience interest, not low-effort content.

## Owner to-dos

1. Decide whether the weakest feature pages should be merged.
2. Confirm that the About statements match reality (one person, no customers yet, pilot companies being chosen).
3. Re-run `python scripts/generate-images.py` only if you want every share card regenerated; I did not.
