# FitRank website

Marketing site for FitRank: https://fitrank.streamerosai.com

Next.js 14 (App Router, static export), TypeScript, Tailwind. Deployed to GitHub Pages on every push to `main`.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out, then checks every sitemap URL: canonical, one h1, image alt text, title and description length
npm run lint

# after changing page titles or screenshots: icons + one share card per page
npm run build && python scripts/generate-images.py && npm run build
```

## Where things live

- `src/lib/content.ts`: all product copy (features, use cases, benchmarks, plans, FAQs). Pages, JSON-LD, `llms.txt` and `llms-full.txt` read from it, so edit content here.
- `src/lib/features.ts`: one page per capability (`/features/<slug>/`). Every feature in `content.ts` belongs to exactly one page.
- `src/lib/shots.ts` + `public/screenshots/`: real app captures on synthetic demo data (desktop WebP + phone crop `-m.webp`), with alt text.
- `src/lib/site.ts`: site URL, contact details, search-console verification tokens.
- `src/lib/seo.ts`: metadata helper, canonical URLs, JSON-LD (Person, WebSite, SoftwareApplication, BreadcrumbList, FAQPage).
- `src/lib/routes.ts`: every indexable page; the sitemap is built from it.
- `src/components/LeadForm.tsx`: pre-register / contact-sales form, sent with EmailJS (same account as the portfolio).
- `public/og/pages/<slug>.jpg`: each page's share card (1200×630: its h1, section and hero screenshot), and the icons (`src/app/favicon.ico`, `apple-icon.png`, `public/icon-192.png`, `icon-512.png`, `logo.png`), all made by `scripts/generate-images.py` (Pillow, Figtree font under OFL in `scripts/fonts/`). The build fails if a page's card is missing.

## SEO and AI search

- Canonical URLs with trailing slashes, Open Graph and Twitter cards on every page.
- JSON-LD entity graph linked to the portfolio's Person `@id`.
- `robots.txt` explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …).
- `/llms.txt` and `/llms-full.txt` give answer engines the whole site as plain text, including every capability page and what its screenshots show.
- JSON-LD: Organization (logo, sales contact), WebSite, SoftwareApplication (screenshots, every feature in `featureList`), and per page WebPage, BreadcrumbList, FAQPage or HowTo.
- Favicon set (ICO, SVG, Apple touch icon) and a web app manifest.
- `/image-sitemap.xml` (listed in `robots.txt`) lists every screenshot per page; pages carry `WebPage` JSON-LD with the screenshots as `ImageObject`s.
- IndexNow ping after each deploy (key file in `public/`).

## One-time setup

1. DNS (GoDaddy, `streamerosai.com`): add a `CNAME` record `fitrank` → `yaseenyk.github.io`.
2. GitHub → Settings → Pages: source "GitHub Actions"; custom domain `fitrank.streamerosai.com`; tick "Enforce HTTPS" once the certificate is issued.
3. EmailJS dashboard: if allowed origins are restricted, add `https://fitrank.streamerosai.com`.
4. Google Search Console / Bing Webmaster: add the site, then put the tokens in `VERIFICATION` in `src/lib/site.ts`.
