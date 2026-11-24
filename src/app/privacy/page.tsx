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
          The form saves your message in my own database (a Cloudflare Worker and D1 database I run, pulse.yaseenyk.workers.dev),
          together with where your visit came from: the page you sent it from and the site or campaign that brought you. Only I can read
          it. A copy is also sent as an email notice using EmailJS, an email delivery service, to {CONTACT.email}. This site sets no
          advertising cookies today.
        </p>
        <h2>Analytics</h2>
        <p>Three measuring tools load on this site. None of them is used for advertising, and the site works the same if you block them with a browser extension.</p>
        <ul>
          <li>
            <strong>Google Analytics</strong> (googletagmanager.com) shows how visitors find and use the site. It sets first-party cookies
            (<code>_ga</code>, <code>_ga_*</code>) and sends usage data, such as pages viewed and approximate location, to Google. Opt out with
            Google&apos;s <a href="https://tools.google.com/dlpage/gaoptout">browser add-on</a>. Google signals is on, so for visitors
            signed in to a Google account with ad personalisation turned on, Google may associate this site&apos;s visit data with that
            account to give me aggregated reports on age group, gender and interests; no individual is identified to me. You can turn
            this off in your Google account under Data &amp; privacy, or in <a href="https://myadcenter.google.com/">My Ad Center</a>.
          </li>
          <li>
            <strong>Microsoft Clarity</strong> (clarity.ms) records session replays and heatmaps (mouse movement, clicks and scrolling) so I can
            see where visitors get stuck. Text typed into forms is masked and is not recorded. It sets its own cookies (<code>_clck</code>,{" "}
            <code>_clsk</code>) and Microsoft cookies on clarity.ms and bing.com (such as <code>MUID</code>); see the{" "}
            <a href="https://privacy.microsoft.com/privacystatement">Microsoft privacy statement</a>.
          </li>
          <li>
            <strong>Pulse</strong>, a small counter run by me (a script from pulse.yaseenyk.workers.dev, a Cloudflare Worker). It records the
            page (without the query string), the page you came from and campaign tags, country, device type, browser and system name, screen
            size, language, the name of your network provider, scroll depth, time on the page, page speed, which links and buttons were
            clicked, and, when a form is sent, the form&apos;s name only, never what you typed. Since 24 November 2026 it also records a
            few technical details: up to three script error messages per page (the message, script file and line), whether your browser
            translated the page and into which language, the connection type (such as 4g or 3g), how fast the page responded to a tap,
            layout jumps, and the name of a form that was sent or started but not sent (never what you typed). It sets no cookies and stores no IP address or
            browser string: the address is used in memory only, to limit abuse and to make a visitor code that changes every day (a one-way
            hash with a random salt that is deleted the next day), so visits cannot be linked across days. Records are deleted after 90 days,
            and it switches itself off if your browser sends Do Not Track or Global Privacy Control.
          </li>
        </ul>
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
        <p>
          Enquiries are kept in my database for up to 24 months (messages marked as spam for 30 days), and we delete them sooner whenever
          you ask at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <h2>Your choices</h2>
        <p>
          To see, correct or delete what you sent us, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. The website is run by Yaseen Khatib in Hyderabad, India. See also the <Link href="/about/">about page</Link>, the <Link href="/terms/">terms</Link> and the <Link href="/contact/">contact page</Link>.
        </p>
        <p className="text-sm">Last updated 24 November 2026.</p>
      </Container>
    </>
  );
}
