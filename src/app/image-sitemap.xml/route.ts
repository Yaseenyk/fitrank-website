import { PUBLISHED } from "@/lib/blog";
import { USE_CASES } from "@/lib/content";
import { FEATURE_PAGES } from "@/lib/features";
import { SHOTS, type Shot } from "@/lib/shots";
import { canonicalUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Next 14's sitemap() has no image entries, so product screenshots get their own
// image sitemap (listed in robots.txt) for image search.
const PAGES: { path: string; shots: Shot[] }[] = [
  { path: "", shots: [SHOTS.dashboard, SHOTS.runTrail, SHOTS.bench, SHOTS.candidate, SHOTS.models] },
  ...FEATURE_PAGES.map((f) => ({ path: `features/${f.slug}`, shots: f.shots.map((k) => SHOTS[k]) })),
  ...USE_CASES.map((u) => ({ path: `use-cases/${u.slug}`, shots: [SHOTS[u.shot]] })),
].filter((p) => p.shots.length > 0);

// Each published post's featured image.
const POST_IMAGES = PUBLISHED.map((p) => ({ path: `blog/${p.slug}`, src: `/og/pages/blog-${p.slug}.jpg` }));

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES.map(
  (p) => `  <url>
    <loc>${canonicalUrl(p.path)}</loc>
${p.shots.map((s) => `    <image:image><image:loc>${SITE_URL}${s.src}</image:loc></image:image>`).join("\n")}
  </url>`,
).join("\n")}
${POST_IMAGES.map(
  (p) => `  <url>
    <loc>${canonicalUrl(p.path)}</loc>
    <image:image><image:loc>${SITE_URL}${p.src}</image:loc></image:image>
  </url>`,
).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
