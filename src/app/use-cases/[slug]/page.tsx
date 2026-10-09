import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProductShot from "@/components/ProductShot";
import { Breadcrumbs, Container, CtaBand, FeatureCard, PrimaryLink, SecondaryLink } from "@/components/Blocks";
import { USE_CASES } from "@/lib/content";
import { featurePage } from "@/lib/features";
import { SHOTS, ogImage } from "@/lib/shots";
import { PRODUCT_ID, breadcrumbJsonLd, canonicalUrl, pageMetadata, personRef, webPageJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const u = USE_CASES.find((x) => x.slug === params.slug);
  if (!u) return {};
  const s = SHOTS[u.shot];
  return pageMetadata({
    title: u.title,
    description: u.description,
    path: `use-cases/${u.slug}`,
    image: ogImage(s),
  });
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const u = USE_CASES.find((x) => x.slug === params.slug);
  if (!u) notFound();
  const others = USE_CASES.filter((x) => x.slug !== u.slug).slice(0, 4);
  const shot = SHOTS[u.shot];
  const capabilities = u.features.map((slug) => featurePage(slug)!);

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: u.title,
    description: u.description,
    url: canonicalUrl(`use-cases/${u.slug}`),
    tool: { "@id": PRODUCT_ID },
    author: personRef,
    step: u.how.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
  };

  return (
    <>
      <JsonLd
        data={[
          howTo,
          webPageJsonLd({ path: `use-cases/${u.slug}`, name: u.title, description: u.description, shots: [shot] }),
          breadcrumbJsonLd([{ name: "Use cases", path: "use-cases" }, { name: u.title, path: `use-cases/${u.slug}` }]),
        ]}
      />
      <Breadcrumbs trail={[{ name: "Use cases", href: "/use-cases/" }, { name: u.title }]} />

      <Container className="pb-6 pt-14 sm:pt-20">
        <p className="text-ink-mute">For {u.who.toLowerCase()}</p>
        <h1 className="mt-3 max-w-[22ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">{u.title}</h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{u.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryLink href="/early-access/">Pre-register for early access</PrimaryLink>
          <SecondaryLink href="/contact/">Talk to sales</SecondaryLink>
        </div>
      </Container>

      <Container className="pt-6">
        <ProductShot shot={shot} priority />
      </Container>

      <Container className="grid gap-14 py-12 lg:grid-cols-[1fr_1.4fr]">
        <section aria-labelledby="problem">
          <h2 id="problem" className="font-display text-2xl font-semibold text-ink">The problem</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{u.problem}</p>
          <h2 className="mt-10 font-display text-2xl font-semibold text-ink">The result</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{u.outcome}</p>
        </section>
        <section aria-labelledby="how" className="rounded-lg border border-line bg-white p-6 sm:p-8">
          <h2 id="how" className="font-display text-2xl font-semibold text-ink">How FitRank does it</h2>
          <ol className="mt-6 space-y-6">
            {u.how.map((step, i) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="tabular font-display text-xl font-semibold text-cobalt">{i + 1}</span>
                <span className="leading-relaxed text-ink-soft">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <Container className="pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">The features that do the work</h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const s = c.shots[0] ? SHOTS[c.shots[0]] : undefined;
            return (
              <li key={c.slug}>
                <FeatureCard href={`/features/${c.slug}/`} name={c.name} description={c.description} image={s && { src: s.src, alt: s.alt }} />
              </li>
            );
          })}
        </ul>
      </Container>

      <Container className="pt-16">
        <h2 className="font-display text-2xl font-semibold text-ink">More use cases</h2>
        <ul className="mt-6 grid gap-x-10 border-t border-line md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug} className="border-b border-line">
              <Link href={`/use-cases/${o.slug}/`} className="block py-4 font-medium text-ink hover:text-cobalt">{o.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
