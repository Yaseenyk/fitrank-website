import { Breadcrumbs, Container, PageIntro } from "@/components/Blocks";
import { CONTACT } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy notice for this website",
  description:
    "What the FitRank website collects when you pre-register or contact sales, how it's sent, how long it's kept and how to ask for it to be deleted.",
  path: "privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Privacy notice" }]} />
      <PageIntro title="Privacy notice" lead="This notice covers this website only. Data inside the FitRank product is covered by each customer's agreement." />
      <Container className="prose-fit">
        <h2>What we collect</h2>
        <p>
          When you use the pre-register or contact form, we receive what you type: your name, work email, company, and optionally your role,
          phone number, company size and message. We also note which page you sent it from.
        </p>
        <h2>How it&apos;s sent</h2>
        <p>
          The form sends your message by email using EmailJS, an email delivery service. It goes to {CONTACT.email}. This site sets no
          advertising cookies and runs no tracking scripts.
        </p>
        <h2>What we use it for</h2>
        <p>Only to reply to you about FitRank: early access, a quote, a demo or your question. We don&apos;t sell or share it.</p>
        <h2>How long we keep it</h2>
        <p>We keep enquiries only as long as we need them to reply and follow up, and we delete them whenever you ask.</p>
        <h2>Your choices</h2>
        <p>
          To see, correct or delete what you sent us, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <p className="text-sm">Last updated 8 October 2026.</p>
      </Container>
    </>
  );
}
