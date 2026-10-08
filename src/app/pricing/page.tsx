import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { CheckIcon } from "@/components/Bits";
import { Breadcrumbs, Container, CtaBand, FaqList, PageIntro, SectionHeading } from "@/components/Blocks";
import { PRICING_FAQS, TIERS } from "@/lib/content";
import { PRODUCT_ID, breadcrumbJsonLd, canonicalUrl, faqPageJsonLd, pageMetadata, personRef } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing: annual licences",
  description:
    "FitRank is sold as an annual licence in three plans: Early access pilot, Team and Enterprise. Pricing depends on team size and deployment; contact sales for a quote.",
  path: "pricing",
});

const offers = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "FitRank annual plans",
  url: canonicalUrl("pricing"),
  itemListElement: TIERS.map((t) => ({
    "@type": "Offer",
    name: `FitRank ${t.name}`,
    description: `${t.forWho}. ${t.features.join("; ")}.`,
    category: "Annual subscription",
    itemOffered: { "@id": PRODUCT_ID },
    seller: personRef,
    url: canonicalUrl("contact"),
  })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[offers, faqPageJsonLd(PRICING_FAQS), breadcrumbJsonLd([{ name: "Pricing", path: "pricing" }])]} />
      <Breadcrumbs trail={[{ name: "Pricing" }]} />
      <PageIntro
        title="Annual plans"
        lead="FitRank is licensed per year. The price depends on how many people you staff and how you deploy, so every quote is put together with you."
      />
      <Container>
        <div className="grid gap-5 lg:grid-cols-3">
          {TIERS.map((t) => (
            <section
              key={t.name}
              aria-labelledby={`tier-${t.name}`}
              className={`flex flex-col rounded-lg border bg-white p-7 ${t.highlight ? "border-cobalt shadow-[0_0_0_1px_#2443B8]" : "border-line"}`}
            >
              {t.highlight && <p className="mb-3 text-sm font-medium text-cobalt">Open now for a few companies</p>}
              <h2 id={`tier-${t.name}`} className="font-display text-3xl font-semibold text-ink">{t.name}</h2>
              <p className="mt-2 text-ink-soft">{t.forWho}</p>
              <p className="mt-6 text-ink">
                <span className="font-display text-2xl font-semibold">Custom quote</span>
                <span className="text-ink-mute">, billed yearly</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[15px] text-ink-soft">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={t.cta === "Pre-register" ? "/early-access/" : "/contact/"}
                className={`mt-8 rounded-md px-5 py-3 text-center text-[15px] font-semibold transition-colors ${
                  t.highlight ? "bg-cobalt text-white hover:bg-cobalt-deep" : "border border-ink/20 text-ink hover:border-ink/50"
                }`}
              >
                {t.cta}
              </Link>
            </section>
          ))}
        </div>
      </Container>

      <Container className="pt-20">
        <SectionHeading title="Pricing questions" />
        <div className="mt-8">
          <FaqList items={PRICING_FAQS} />
        </div>
      </Container>
      <CtaBand title="Get a quote for your team" body="Tell us how many people you staff and how you'd like to deploy. We'll come back with an annual price." />
    </>
  );
}
