import Link from "next/link";
import type { ReactNode } from "react";
import type { Faq } from "@/lib/content";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-page px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Page header for inner pages: one h1, a plain-language lead, optional actions. */
export function PageIntro({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
  return (
    <Container className="pb-10 pt-14 sm:pt-20">
      <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{lead}</p>
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </Container>
  );
}

export function SectionHeading({ title, lead, id }: { title: string; lead?: string; id?: string }) {
  return (
    <div className="max-w-[60ch]">
      <h2 id={id} className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p>}
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center rounded-md bg-cobalt px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-cobalt-deep">
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center rounded-md border border-ink/20 bg-white px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink/50">
      {children}
    </Link>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <Container className="pt-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-mute">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          {trail.map((t) => (
            <li key={t.name} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {t.href ? <Link href={t.href} className="hover:text-ink">{t.name}</Link> : <span aria-current="page" className="text-ink-soft">{t.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </Container>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium text-ink">
            <h3>{f.q}</h3>
            <span aria-hidden="true" className="mt-1 text-xl leading-none text-ink-mute transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-[68ch] leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "Be one of the first teams to staff with FitRank",
  body = "We're taking on a small number of pilot companies. Pre-register for early access, or talk to us about an annual licence.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    // -mb-24 cancels the footer's top margin, so the dark band meets the footer with no gap.
    <section className="-mb-24 mt-24 bg-ink">
      <Container className="grid gap-8 py-16 md:grid-cols-[1.5fr_1fr] md:items-center">
        <div>
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link href="/early-access/" className="rounded-md bg-white px-5 py-3 text-[15px] font-semibold text-ink hover:bg-paper">
            Pre-register
          </Link>
          <Link href="/contact/" className="rounded-md border border-white/40 px-5 py-3 text-[15px] font-semibold text-white hover:border-white">
            Contact sales
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** Card for a feature page: a real screen on top, name and one line below. */
export function FeatureCard({
  href,
  name,
  description,
  image,
}: {
  href: string;
  name: string;
  description: string;
  image?: { src: string; alt: string };
}) {
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-[0_18px_40px_-24px_rgba(20,33,61,0.35)]">
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-paper">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, already-sized WebP
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={1440} height={900} className="h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="flex h-full items-center justify-center bg-ink p-6 font-mono text-[13px] leading-relaxed text-white/80" aria-hidden="true">
            POST /api/v1/decide → {"{ probabilities }"}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="font-semibold text-ink group-hover:text-cobalt">{name}</span>
        <span className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{description}</span>
        <span className="mt-auto pt-4 text-sm font-medium text-cobalt" aria-hidden="true">See how it works →</span>
      </div>
    </Link>
  );
}
