import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NoticePeriodCalculator from "@/components/NoticePeriodCalculator";
import { Breadcrumbs, Container, CtaBand, FaqList, SectionHeading } from "@/components/Blocks";
import type { Faq } from "@/lib/content";
import { ORG_ID, breadcrumbJsonLd, canonicalUrl, faqPageJsonLd, pageMetadata, personRef } from "@/lib/seo";
import { PUBLISHED } from "@/lib/blog";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.slug === "notice-period-calculator")!;
const PATH = `tools/${tool.slug}`;

export const metadata = pageMetadata({ title: tool.title, description: tool.description, path: PATH });

const FAQS: Faq[] = [
  {
    q: "How is the last working day calculated?",
    a: "From the date you resign, the calculator counts the notice period in calendar days (or in months to the same date). If the day you resign counts as day 1, a 90-day notice from 1 January ends on 31 March; if counting starts the next day, it ends on 1 April.",
  },
  {
    q: "What is the usual notice period in Indian IT companies?",
    a: "It varies by company and level. 30 days is common for junior roles in smaller companies, while 60 or 90 days is common for experienced people in larger IT services companies. Your offer letter or appointment letter states yours.",
  },
  {
    q: "What is a notice period buyout?",
    a: "Paying the employer, or having the new employer pay, for the days you do not serve, so you can leave earlier. Whether a buyout is allowed, and how it is calculated, depends on your company's policy.",
  },
  {
    q: "Do weekends and holidays count in the notice period?",
    a: "Usually yes: notice periods are normally counted in calendar days. Some companies treat leave taken during notice differently, so check your policy. This calculator uses calendar days.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. The calculation runs in your browser and nothing you enter leaves this page.",
  },
];

const app = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${canonicalUrl(PATH)}#app`,
  name: tool.title,
  url: canonicalUrl(PATH),
  description: tool.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: personRef,
  publisher: { "@id": ORG_ID },
  featureList: ["Notice period in days or months", "Count the resignation day or start the next day", "Buyout or waived days", "Weekend warning"],
};

export default function NoticePeriodCalculatorPage() {
  return (
    <>
      <JsonLd data={[app, faqPageJsonLd(FAQS), breadcrumbJsonLd([{ name: "Free tools", path: "tools" }, { name: tool.name, path: PATH }])]} />
      <Breadcrumbs trail={[{ name: "Free tools", href: "/tools/" }, { name: tool.name }]} />
      <Container className="pb-10 pt-14 sm:pt-20">
        <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Notice period calculator: find your last working day
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
          Enter the date you resign and your notice period, in days or months. The calculator shows your last working day, how many days are left, and the
          date if part of the notice is bought out or waived. It runs in your browser; nothing is sent anywhere.
        </p>
      </Container>

      <Container>
        <NoticePeriodCalculator />
      </Container>

      <Container className="prose-fit py-12">
        <h2>Notice period meaning</h2>
        <p>
          A notice period is the time between telling your employer you are leaving and your last working day. It gives the company time to hand over your
          work and find a replacement. In India it is set in the offer or appointment letter, and in IT companies it is commonly 30, 60 or 90 days.
        </p>
        <h2>Why it matters for planning</h2>
        <p>
          For the person leaving, the last working day decides when the new job can start. For the company, a long notice period is time to plan, but it is
          often wasted because replacement planning starts late. For the hiring company, a candidate&rsquo;s notice period decides whether they can join before
          the project needs them.
          {PUBLISHED.some((p) => p.slug === "notice-periods-staffing-plans") && (
            <>
              {" "}We wrote about that in <Link href="/blog/notice-periods-staffing-plans/">notice periods in India and why they break staffing plans</Link>.
            </>
          )}
        </p>
        <h2>What this calculator does not know</h2>
        <ul>
          <li>Your company&rsquo;s exact policy on counting leave, holidays and the resignation day itself.</li>
          <li>Whether a buyout is allowed for you and at what cost.</li>
          <li>Any notice set by a different law or contract that applies to your role.</li>
        </ul>
      </Container>

      <Container className="py-8">
        <SectionHeading title="Questions about notice periods" />
        <div className="mt-8">
          <FaqList items={FAQS} />
        </div>
      </Container>
      <CtaBand title="Plan for notice periods before they hurt" body="FitRank checks inside first and treats a candidate's notice period as availability, so nobody is shortlisted who cannot join in time." />
    </>
  );
}
