import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, FeatureCard, PageIntro, PrimaryLink, SecondaryLink } from "@/components/Blocks";
import { FEATURE_GROUPS, ROADMAP } from "@/lib/content";
import { FEATURE_PAGES, featurePageFor } from "@/lib/features";
import { SHOTS } from "@/lib/shots";
import { PRODUCT_ID, breadcrumbJsonLd, canonicalUrl, pageMetadata } from "@/lib/seo";

const total = FEATURE_GROUPS.reduce((n, g) => n + g.features.length, 0);

export const metadata = pageMetadata({
  title: "Features for staffing, planning, HR and admins",
  description: `All ${total} FitRank features across ${FEATURE_PAGES.length} capabilities: explained shortlists, bench and skill-gap planning, privacy-first resume reading and fairness checks.`,
  path: "features",
});

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FitRank capabilities",
  url: canonicalUrl("features"),
  about: { "@id": PRODUCT_ID },
  numberOfItems: FEATURE_PAGES.length,
  itemListElement: FEATURE_PAGES.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: p.description,
    url: canonicalUrl(`features/${p.slug}`),
  })),
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={[itemList, breadcrumbJsonLd([{ name: "Features", path: "features" }])]} />
      <Breadcrumbs trail={[{ name: "Features" }]} />
      <PageIntro
        title="Everything FitRank does today"
        lead={`${total} features in ${FEATURE_PAGES.length} capabilities, all built and working, shown here on real screens with demo data. Each one keeps the final decision with a person and records why it was made.`}
      >
        <PrimaryLink href="/early-access/">Pre-register</PrimaryLink>
        <SecondaryLink href="/contact/">Book a demo</SecondaryLink>
      </PageIntro>

      <Container>
        <nav aria-label="Feature areas" className="-mx-4 flex gap-2 overflow-x-auto border-y border-line px-4 py-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {FEATURE_GROUPS.map((g) => (
            <Link key={g.id} href={`#${g.id}`} className="shrink-0 rounded-full border border-line bg-white px-4 py-1.5 text-sm text-ink-soft hover:border-ink-mute hover:text-ink">
              {g.role}
            </Link>
          ))}
        </nav>

        {FEATURE_GROUPS.map((g) => {
          const pages = FEATURE_PAGES.filter((p) => p.group === g.id);
          return (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-24 border-b border-line py-16">
              <div className="max-w-[60ch]">
                <h2 id={`${g.id}-h`} className="font-display text-3xl font-semibold text-ink sm:text-4xl">{g.role}</h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-soft">{g.summary}</p>
              </div>

              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pages.map((p) => {
                  const s = p.shots[0] ? SHOTS[p.shots[0]] : undefined;
                  return (
                    <li key={p.slug}>
                      <FeatureCard href={`/features/${p.slug}/`} name={p.name} description={p.description} image={s && { src: s.src, alt: s.alt }} />
                    </li>
                  );
                })}
              </ul>

              <details className="group mt-8 rounded-xl border border-line bg-white/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-ink">
                  <span>All {g.features.length} {g.role.toLowerCase()} features</span>
                  <span aria-hidden="true" className="text-xl leading-none text-ink-mute transition-transform group-open:rotate-45">+</span>
                </summary>
                <dl className="grid gap-x-10 gap-y-6 border-t border-line px-5 py-6 sm:grid-cols-2">
                  {g.features.map((f) => {
                    const page = featurePageFor(f.name);
                    return (
                      <div key={f.name}>
                        <dt className="font-semibold text-ink">
                          {page ? <Link href={`/features/${page.slug}/`} className="hover:text-cobalt">{f.name}</Link> : f.name}
                        </dt>
                        <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{f.body}</dd>
                      </div>
                    );
                  })}
                </dl>
              </details>
            </section>
          );
        })}

        <section aria-labelledby="roadmap-h" className="py-16">
          <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
            <div>
              <h2 id="roadmap-h" className="font-display text-3xl font-semibold text-ink">On the roadmap</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">Not built yet. Early-access customers help decide the order.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ROADMAP.map((r) => (
                <li key={r} className="rounded-md border border-dashed border-ink/25 px-4 py-3 text-ink-soft">{r}</li>
              ))}
            </ul>
          </div>
        </section>
      </Container>
      <CtaBand />
    </>
  );
}
