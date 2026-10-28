import { PUBLISHED } from "@/lib/blog";
import { canonicalUrl } from "@/lib/seo";
import { MAKER, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const xml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// RSS 2.0 feed of published posts, so feed readers and search engines see new posts on their day.
export function GET() {
  const items = PUBLISHED.map(
    (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${canonicalUrl(`blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${canonicalUrl(`blog/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T06:00:00+05:30`).toUTCString()}</pubDate>
      <description>${xml(p.description)}</description>
      <category>${xml(p.topic)}</category>
      <author>contact@streamerosai.com (${xml(MAKER.name)})</author>
      <enclosure url="${SITE_URL}/og/pages/blog-${p.slug}.jpg" type="image/jpeg" length="0" />
    </item>`,
  ).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FitRank blog</title>
    <link>${canonicalUrl("blog")}</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>The problems behind staffing and hiring in IT services, written down plainly.</description>
    <language>en-in</language>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
