import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import { Breadcrumbs, Container } from "@/components/Blocks";
import { CONTACT } from "@/lib/site";
import { breadcrumbJsonLd, canonicalUrl, pageMetadata, personRef } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact sales",
  description:
    "Talk to FitRank about an annual licence, book a demo or ask a question. Email contact@streamerosai.com or use the form and we'll reply by email.",
  path: "contact",
});

const contactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: canonicalUrl("contact"),
  name: "Contact FitRank sales",
  about: personRef,
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT.email,
    telephone: "+91-8208335028",
    areaServed: "Worldwide",
    availableLanguage: ["English"],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[contactPage, breadcrumbJsonLd([{ name: "Contact sales", path: "contact" }])]} />
      <Breadcrumbs trail={[{ name: "Contact sales" }]} />
      <Container className="grid gap-14 pb-10 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">Talk to us</h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            Ask about an annual licence, book a demo on sample data, or check whether FitRank fits how your teams staff work.
          </p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm text-ink-mute">Email</dt>
              <dd className="mt-1 text-lg"><a href={`mailto:${CONTACT.email}`} className="font-medium text-ink hover:text-cobalt">{CONTACT.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm text-ink-mute">Phone</dt>
              <dd className="mt-1 text-lg"><a href={CONTACT.phoneHref} className="tabular font-medium text-ink hover:text-cobalt">{CONTACT.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="text-sm text-ink-mute">Based in</dt>
              <dd className="mt-1 text-lg text-ink">{CONTACT.city}, {CONTACT.country}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
          <LeadForm defaultIntent="sales" />
        </div>
      </Container>
    </>
  );
}
