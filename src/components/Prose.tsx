import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/blog";

/** Text with [label](href) links: internal links stay in the site, outside ones open a new tab. */
export function withLinks(text: string): ReactNode[] {
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

/** Renders the same block types the blog uses, inside a .prose-fit container. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
        if (b.type === "ul") return <ul key={i}>{b.items.map((t) => <li key={t}>{withLinks(t)}</li>)}</ul>;
        if (b.type === "ol") return <ol key={i}>{b.items.map((t) => <li key={t}>{withLinks(t)}</li>)}</ol>;
        if (b.type === "tldr")
          return (
            <p key={i} className="rounded-lg border border-line bg-white p-5 leading-relaxed text-ink">
              <strong>Short answer.</strong> {withLinks(b.text)}
            </p>
          );
        if (b.type === "faq")
          return (
            <div key={i}>
              {b.items.map((f) => (
                <div key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{withLinks(f.a)}</p>
                </div>
              ))}
            </div>
          );
        return <p key={i}>{withLinks(b.text)}</p>;
      })}
    </>
  );
}
