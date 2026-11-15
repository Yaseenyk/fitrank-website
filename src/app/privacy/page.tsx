import Link from "next/link";
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
          advertising cookies today.
        </p>
        <h2>Analytics</h2>
        <p>
          We use Google Analytics to see how visitors find and use the site. It sets first-party analytics cookies and sends usage data, such
          as pages viewed and approximate location, to Google. We don&apos;t use it for advertising. The site also uses Microsoft Clarity, a free tool that records anonymised heatmaps and session replays so I can see where visitors get stuck. Text typed into forms is masked and is not recorded. You can block it with a browser extension
          or by disabling cookies. A small counter run by me on my own server also records page views, the page you came from and link clicks, and whether the visit looks like a person or a bot. It sets no cookies and stores no IP address, name or anything you type. Records are deleted after 90 days, and it switches itself off if your browser sends Do Not Track or Global Privacy Control.
        </p>
        <h2>Cookies</h2>
        <p>
          The only cookies or local storage on this site come from Google Analytics and Microsoft Clarity, and from Google if ads are ever switched on. The site itself keeps one note in your browser, the first site that sent you, so an enquiry can be tied to where you came from. Clearing your browser data removes it.
        </p>
        <h2>Advertising</h2>
        <p>
          This site shows no ads today. If Google AdSense approves it and ads are switched on, Google and its partners may use cookies to show ads based on your visits to this and other sites. Ads will be labelled and kept away from the product pages and forms, and this notice will be updated before any ad appears. You can opt out of personalised ads at <a href="https://adssettings.google.com/">adssettings.google.com</a>, in your Google account settings, or at <a href="https://www.aboutads.info/choices/">aboutads.info</a>; you will still see ads, just not personalised ones. Google explains how it uses data from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites">policies.google.com/technologies/partner-sites</a>.
        </p>
        <h2>What we use it for</h2>
        <p>Only to reply to you about FitRank: early access, a quote, a demo or your question. We don&apos;t sell or share it.</p>
        <h2>How long we keep it</h2>
        <p>We keep enquiries only as long as we need them to reply and follow up, and we delete them whenever you ask.</p>
        <h2>Your choices</h2>
        <p>
          To see, correct or delete what you sent us, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. The website is run by Yaseen Khatib in Hyderabad, India. See also the <Link href="/about/">about page</Link>, the <Link href="/terms/">terms</Link> and the <Link href="/contact/">contact page</Link>.
        </p>
        <p className="text-sm">Last updated 16 November 2026.</p>
      </Container>
    </>
  );
}
