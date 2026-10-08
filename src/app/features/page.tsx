import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro, PrimaryLink, SecondaryLink } from "@/components/Blocks";
import { FEATURE_GROUPS, ROADMAP } from "@/lib/content";
import { PRODUCT_ID, breadcrumbJsonLd, canonicalUrl, pageMetadata } from "@/lib/seo";

const total = FEATURE_GROUPS.reduce((n, g) => n + g.features.length, 0);

export const metadata = pageMetadata({
  title: "Features for staffing, planning, HR and admins",
  description: `All ${total} FitRank features: explained shortlists, bench and skill-gap planning, privacy-first resume reading, fairness checks, model versions and a decision API.`,
  path: "features",
});

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FitRank features",
  url: canonicalUrl("features"),
  about: { "@id": PRODUCT_ID },
  itemListElement: FEATURE_GROUPS.flatMap((g) => g.features).map((f, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: f.name,
    description: f.body,
  })),
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={[itemList, breadcrumbJsonLd([{ name: "Features", path: "features" }])]} />
      <Breadcrumbs trail={[{ name: "Features" }]} />
      <PageIntro
        title="Everything FitRank does today"
        lead={`${total} features across five areas, all built and working. Each one keeps the final decision with a person and records why it was made.`}
      >
        <PrimaryLink href="/early-access/">Pre-register</PrimaryLink>
        <SecondaryLink href="/contact/">Book a demo</SecondaryLink>
      </PageIntro>

      <Container>
        <nav aria-label="Feature areas" className="flex flex-wrap gap-2 border-y border-line py-4">
          {FEATURE_GROUPS.map((g) => (
            <Link key={g.id} href={`#${g.id}`} className="rounded-full border border-line bg-white px-4 py-1.5 text-sm text-ink-soft hover:border-ink-mute hover:text-ink">
              {g.role}
            </Link>
          ))}
        </nav>

        {FEATURE_GROUPS.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-24 border-b border-line py-14">
            <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
              <div>
                <h2 id={`${g.id}-h`} className="font-display text-3xl font-semibold text-ink">{g.role}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{g.summary}</p>
              </div>
              <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {g.features.map((f) => (
                  <div key={f.name}>
                    <dt className="font-semibold text-ink">{f.name}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}

        <section aria-labelledby="roadmap-h" className="py-14">
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
