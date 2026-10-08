# FitRank website

Marketing site for FitRank: https://fitrank.streamerosai.com

Next.js 14 (App Router, static export), TypeScript, Tailwind. Deployed to GitHub Pages on every push to `main`.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out, then checks every sitemap URL, canonical and h1
npm run lint
```

## Where things live

- `src/lib/content.ts`: all product copy (features, use cases, benchmarks, plans, FAQs). Pages, JSON-LD, `llms.txt` and `llms-full.txt` read from it, so edit content here.
- `src/lib/site.ts`: site URL, contact details, search-console verification tokens.
- `src/lib/seo.ts`: metadata helper, canonical URLs, JSON-LD (Person, WebSite, SoftwareApplication, BreadcrumbList, FAQPage).
- `src/lib/routes.ts`: every indexable page; the sitemap is built from it.
- `src/components/LeadForm.tsx`: pre-register / contact-sales form, sent with EmailJS (same account as the portfolio).
- `public/og.png`: share image (1200×630).

## SEO and AI search

- Canonical URLs with trailing slashes, Open Graph and Twitter cards on every page.
- JSON-LD entity graph linked to the portfolio's Person `@id`.
- `robots.txt` explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …).
- `/llms.txt` and `/llms-full.txt` give answer engines the whole site as plain text.
- IndexNow ping after each deploy (key file in `public/`).

## One-time setup

1. DNS (GoDaddy, `streamerosai.com`): add a `CNAME` record `fitrank` → `yaseenyk.github.io`.
2. GitHub → Settings → Pages: source "GitHub Actions"; custom domain `fitrank.streamerosai.com`; tick "Enforce HTTPS" once the certificate is issued.
3. EmailJS dashboard: if allowed origins are restricted, add `https://fitrank.streamerosai.com`.
4. Google Search Console / Bing Webmaster: add the site, then put the tokens in `VERIFICATION` in `src/lib/site.ts`.
