import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand } from "@/components/Blocks";
import { PUBLISHED, post, words, type Block } from "@/lib/blog";
import { ORG_ID, breadcrumbJsonLd, canonicalUrl, pageMetadata, personRef, shareImage } from "@/lib/seo";
import { MAKER } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = post(params.slug);
  if (!p) return {};
  return pageMetadata({ title: p.seoTitle, description: p.description, path: `blog/${p.slug}` });
}

/** Text with [label](href) links: internal links stay in the site, outside ones open a new tab. */
function withLinks(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    out.push(text.slice(last, m.index));
    const [, label, href] = m;
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href}>{label}</Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener">{label}</a>
      ),
    );
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

function render(b: Block, i: number) {
  if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
  if (b.type === "ul") return <ul key={i}>{b.items.map((t) => <li key={t}>{withLinks(t)}</li>)}</ul>;
  return <p key={i}>{withLinks(b.text)}</p>;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const p = post(params.slug);
  if (!p) notFound();
  const minutes = Math.max(1, Math.round(words(p) / 200));
  const others = PUBLISHED.filter((x) => x.slug !== p.slug).slice(0, 4);
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    url: canonicalUrl(`blog/${p.slug}`),
    mainEntityOfPage: canonicalUrl(`blog/${p.slug}`),
    image: shareImage(`blog/${p.slug}`, p.title).url,
    author: personRef,
    publisher: { "@id": ORG_ID },
    about: p.topic,
    wordCount: words(p),
    inLanguage: "en",
  };
  return (
    <>
      <JsonLd data={[article, breadcrumbJsonLd([{ name: "Blog", path: "blog" }, { name: p.title, path: `blog/${p.slug}` }])]} />
      <Breadcrumbs trail={[{ name: "Blog", href: "/blog/" }, { name: p.title }]} />
      <Container className="pb-4 pt-12 sm:pt-16">
        <p className="text-ink-mute">{p.topic}</p>
        <h1 className="mt-3 max-w-[24ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">{p.title}</h1>
        <p className="mt-5 text-ink-mute">
          By <a href={MAKER.url} className="underline underline-offset-2 hover:text-ink">{MAKER.name}</a>,{" "}
          <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>,{" "}
          {minutes} min read
        </p>
      </Container>
      <Container className="prose-fit pb-8">{p.blocks.map(render)}</Container>
      <Container className="pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">More from the blog</h2>
        <ul className="mt-6 grid gap-x-10 border-t border-line md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug} className="border-b border-line">
              <Link href={`/blog/${o.slug}/`} className="block py-4 font-medium text-ink hover:text-cobalt">{o.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
