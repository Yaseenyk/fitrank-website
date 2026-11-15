import Link from "next/link";
import { Breadcrumbs, Container, PageIntro } from "@/components/Blocks";
import { CONTACT } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of use for this website",
  description:
    "The terms for using the FitRank website and its free tools: information only, early-access product, benchmarks on synthetic data, licences agreed separately, and no warranty.",
  path: "terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Terms" }]} />
      <PageIntro title="Terms of use" lead="These terms cover this website and its free tools. Use of the FitRank product itself is governed by the licence agreement you sign for it." />
      <Container className="prose-fit">
        <h2>Information on this site</h2>
        <p>
          The site describes FitRank, an early-access product, and publishes articles and tools about scheduling. It is general information. It is not legal, employment, HR or financial advice, and it is not an offer that binds anyone until a written agreement is signed. Features, plans and roadmap items described here can change, and some are planned rather than shipped; the roadmap is labelled as such.
        </p>

        <h2>Benchmarks and results</h2>
        <p>
          Accuracy figures on this site come from tests on synthetic data, described on the <Link href="/results/">benchmarks page</Link>. They show how the method behaves in a controlled test. They are not a promise of the same results at your organisation. A pilot measures FitRank against your own managers&apos; decisions before you rely on it.
        </p>

        <h2>Staffing decisions stay with people</h2>
        <p>
          FitRank recommends; it does not decide. Whoever uses it remains responsible for staffing, hiring and employment decisions and for complying with the employment, anti-discrimination and data protection laws that apply to them.
        </p>

        <h2>Free tools</h2>
        <p>
          The scheduling tools and templates are provided as they are, with no warranty. The schedule generator and calculators run in your browser and produce suggestions that you should check against your own rules, contracts and local labour law before using them. Templates may be used and adapted for your own organisation; please do not resell them.
        </p>

        <h2>Licence, pricing and the pilot</h2>
        <p>
          The product is sold as an annual licence under a written agreement. Prices are quoted per customer, as the <Link href="/pricing/">pricing page</Link> explains. Early-access terms, data handling and support are set out in that agreement, not on this website.
        </p>

        <h2>Your submissions</h2>
        <p>
          If you send the contact or pre-register form you agree that we may use what you type to reply to you. Please do not put sensitive personal data about other people in a message. The <Link href="/privacy/">privacy notice</Link> explains how it is handled and deleted.
        </p>

        <h2>Links, content and reuse</h2>
        <p>
          The site may link to other websites that we do not control. The text, screenshots and design are ours; you may quote short passages with a link back, but please do not copy whole pages. The screenshots show demo data, not real people.
        </p>

        <h2>Advertising</h2>
        <p>
          The site shows no ads today. If that changes, ads will be labelled and served by Google AdSense, and the privacy notice describes the cookies involved and how to opt out of personalised ads.
        </p>

        <h2>Liability and changes</h2>
        <p>
          To the extent the law allows, we are not liable for loss arising from reliance on the content or free tools of this website. We may update these terms; the date below shows the latest version. They are governed by the laws of India. Questions: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <p className="text-sm">Last updated 16 November 2026.</p>
      </Container>
    </>
  );
}
