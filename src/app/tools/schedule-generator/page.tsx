import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ScheduleGenerator from "@/components/ScheduleGenerator";
import { Breadcrumbs, Container, CtaBand, FaqList, SectionHeading } from "@/components/Blocks";
import type { Faq } from "@/lib/content";
import { ORG_ID, breadcrumbJsonLd, canonicalUrl, faqPageJsonLd, pageMetadata, personRef } from "@/lib/seo";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.slug === "schedule-generator")!;
const PATH = `tools/${tool.slug}`;

export const metadata = pageMetadata({ title: tool.title, description: tool.description, path: PATH });

const FAQS: Faq[] = [
  {
    q: "Is this schedule generator really free?",
    a: "Yes. It runs entirely in your browser: there is no account, no upload and no limit on how often you use it. Your people and shifts are not sent anywhere.",
  },
  {
    q: "How does it decide who gets each shift?",
    a: "It fills the hardest slots first (the days with the fewest available people), and for each slot picks the available person with the fewest shifts so far who is still under their weekly maximum. The same input always gives the same schedule.",
  },
  {
    q: "What if a slot cannot be filled?",
    a: "The slot is marked UNFILLED in the result and the summary says how many were left. Add a person, raise someone's maximum, or free a day, then generate again.",
  },
  {
    q: "Can it handle skills, preferences or fairness over several weeks?",
    a: "No. It knows availability, a weekly maximum per person and how many people each shift needs. It does not know skills, who prefers mornings, or what last week looked like. FitRank is built for the first of those: ranking who fits an open task, with a reason.",
  },
  {
    q: "How do I get the schedule into Excel or Google Sheets?",
    a: "Copy as text pastes straight into a spreadsheet as a grid, or download the CSV and open it. For a template with hours and coverage formulas, use the free Excel employee schedule template on this site.",
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
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: personRef,
  publisher: { "@id": ORG_ID },
  featureList: ["People with weekly shift limits and unavailable days", "Shifts with days and people needed", "One shift per person per day", "Copy as text", "CSV download"],
};

export default function ScheduleGeneratorPage() {
  return (
    <>
      <JsonLd data={[app, faqPageJsonLd(FAQS), breadcrumbJsonLd([{ name: "Free tools", path: "tools" }, { name: tool.name, path: PATH }])]} />
      <Breadcrumbs trail={[{ name: "Free tools", href: "/tools/" }, { name: tool.name }]} />
      <Container className="pb-10 pt-14 sm:pt-20">
        <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Free automatic schedule generator online
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
          Add your people, the shifts or tasks that need covering, who is unavailable when, and a weekly maximum per person. The generator fills the week in your
          browser and you copy it or download a CSV. No sign-up, nothing uploaded. It starts with an example you can edit.
        </p>
      </Container>

      <Container>
        <ScheduleGenerator />
      </Container>

      <Container className="prose-fit py-12">
        <h2>What this schedule generator does</h2>
        <p>
          It solves the plain version of the weekly scheduling problem: a set of slots (each shift on each day, times the number of people it needs) and a set
          of people who can fill them, subject to two limits per person: days they cannot work and the most shifts they will take in the week. It fills the
          slots with the fewest candidates first, so a Saturday that only two people can work is not left until last, and it hands each slot to the available
          person with the fewest shifts so far, which keeps the load even.
        </p>
        <p>
          Everything is visible in the result: who is on each shift each day, how many shifts each person got against their maximum, and every slot that
          could not be filled within the limits. There is no hidden score and no randomness, so if you change one input you can see exactly what moved.
        </p>
        <h2>What it does not do</h2>
        <ul>
          <li>It does not know skills, roles or qualifications. Anyone you list can take any shift.</li>
          <li>It does not know preferences, rest rules between shifts, or what last week looked like. Check those yourself before you publish.</li>
          <li>It is greedy, not optimal. On awkward inputs it can leave a slot unfilled that a careful planner would have found a way to cover.</li>
          <li>It plans one week at a time. For a rotating pattern, see <Link href="/blog/rotating-shifts-explained/">8-hour and 12-hour rotating shift schedules</Link>.</li>
        </ul>
        <h2>When a grid is not enough</h2>
        <p>
          A generator like this answers &ldquo;who is free?&rdquo;. It cannot answer &ldquo;who is the right person for this task, and why?&rdquo;. That is the
          question FitRank is built for: it ranks your people for an open task with rules in code, a probability for every typed answer, a reason that cites
          the facts behind it, and a manager who makes every final call. Read <Link href="/how-it-works/">how FitRank decides</Link>, or the honest account of{" "}
          <Link href="/blog/automated-employee-scheduling-excel/">how far automated scheduling goes in Excel and where it breaks</Link>. If you want the grid
          as a spreadsheet, the <Link href="/tools/employee-schedule-template-excel/">free Excel employee schedule template</Link> has weekly and monthly sheets
          with hours and coverage worked out by formula.
        </p>
      </Container>

      <Container className="py-8">
        <SectionHeading title="Questions about the generator" />
        <div className="mt-8">
          <FaqList items={FAQS} />
        </div>
      </Container>
      <CtaBand title="Ranking fit, not just filling slots" body="FitRank ranks your people for open tasks with a probability and a reason for each. We are taking on a small number of pilot companies." />
    </>
  );
}
