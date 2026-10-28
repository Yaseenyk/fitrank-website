import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro } from "@/components/Blocks";
import { PUBLISHED } from "@/lib/blog";
import { breadcrumbJsonLd, canonicalUrl, pageMetadata, personRef } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const meta = pageMetadata({
  title: "Blog: staffing and hiring problems, plainly",
  description:
    "Notes on the problems behind staffing and hiring in IT services: bench cost, slow resource allocation, skill gaps, resume overload, fair AI hiring and AI agent safety.",
  path: "blog",
});

export const metadata = {
  ...meta,
  alternates: { ...meta.alternates, types: { "application/rss+xml": `${SITE_URL}/blog/feed.xml` } },
};

export default function BlogIndex() {
  const list = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${canonicalUrl("blog")}#blog`,
    name: "FitRank blog",
    url: canonicalUrl("blog"),
    author: personRef,
    blogPost: PUBLISHED.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: canonicalUrl(`blog/${p.slug}`),
      datePublished: p.date,
    })),
  };
  return (
    <>
      <JsonLd data={[list, breadcrumbJsonLd([{ name: "Blog", path: "blog" }])]} />
      <Breadcrumbs trail={[{ name: "Blog" }]} />
      <PageIntro
        title="Blog"
        lead="The problems we built FitRank for, written down plainly: what they look like on the ground, why they are hard, and how we approach them."
      />
      <Container>
        <ul className="divide-y divide-line border-y border-line">
          {PUBLISHED.map((p) => (
            <li key={p.slug} className="py-6">
              <p className="text-sm text-ink-mute">{p.topic}</p>
              <Link href={`/blog/${p.slug}/`} className="mt-1 block font-display text-xl font-semibold text-ink hover:text-cobalt">
                {p.title}
              </Link>
              <p className="mt-2 max-w-[70ch] leading-relaxed text-ink-soft">{p.description}</p>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
