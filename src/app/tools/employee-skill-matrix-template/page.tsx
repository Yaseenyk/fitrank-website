import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, FaqList, SectionHeading } from "@/components/Blocks";
import type { Faq } from "@/lib/content";
import { ORG_ID, breadcrumbJsonLd, canonicalUrl, faqPageJsonLd, pageMetadata, personRef } from "@/lib/seo";
import { SITE_URL, withBase } from "@/lib/site";
import { PUBLISHED } from "@/lib/blog";
import { SKILL_MATRIX_FILE, TOOLS } from "@/lib/tools";

const live = (slug: string) => PUBLISHED.some((p) => p.slug === slug);

const tool = TOOLS.find((t) => t.slug === "employee-skill-matrix-template")!;
const PATH = `tools/${tool.slug}`;

export const metadata = pageMetadata({ title: tool.title, description: tool.description, path: PATH });

const SHEETS = [
  { name: "Skill matrix", body: "One row per employee with designation, level and the date they are free, then a 0 to 4 rating for each skill. Ratings are checked (only 0 to 4) and coloured from light to dark, and a total row counts how many people are strong (3 or more) in each skill." },
  { name: "Scale", body: "What 0 to 4 means, from no experience to expert, so everyone rates the same way." },
  { name: "How to use", body: "Six short steps: replace the example row, rename skills, agree ratings, fill availability, read the gaps, and review regularly." },
];

const FAQS: Faq[] = [
  {
    q: "What is a skill matrix?",
    a: "A skill matrix is a grid with people in rows and skills in columns, where each cell shows how good that person is at that skill. It shows at a glance who can do what, and which skills too few people have.",
  },
  {
    q: "Is the employee skill matrix template free?",
    a: "Yes. It is a plain .xlsx file with no macros and no sign-up. Use it and change it as you like.",
  },
  {
    q: "Does it work in Google Sheets?",
    a: "Yes. The rating check, colours and COUNTIF totals work in Excel, Google Sheets and LibreOffice.",
  },
  {
    q: "What rating scale should a skill matrix use?",
    a: "Keep it short and defined. This template uses 0 to 4: none, basic, working, strong, expert, each with a one-line meaning so two managers rate the same way.",
  },
  {
    q: "When does a spreadsheet skill matrix stop working?",
    a: "When it goes out of date. Ratings are typed once and rarely updated, the sheet does not know who used a skill last month, and it cannot match people to an open project by itself. That is the gap FitRank is built for.",
  },
];

const doc = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "@id": `${canonicalUrl(PATH)}#template`,
  name: tool.title,
  url: canonicalUrl(PATH),
  description: tool.description,
  encodingFormat: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  contentUrl: `${SITE_URL}${SKILL_MATRIX_FILE}`,
  isAccessibleForFree: true,
  inLanguage: "en",
  author: personRef,
  publisher: { "@id": ORG_ID },
  hasPart: SHEETS.map((s) => ({ "@type": "DigitalDocument", name: `${s.name} sheet`, description: s.body })),
};

export default function SkillMatrixTemplatePage() {
  return (
    <>
      <JsonLd data={[doc, faqPageJsonLd(FAQS), breadcrumbJsonLd([{ name: "Free tools", path: "tools" }, { name: tool.name, path: PATH }])]} />
      <Breadcrumbs trail={[{ name: "Free tools", href: "/tools/" }, { name: tool.name }]} />
      <Container className="pb-10 pt-14 sm:pt-20">
        <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Employee skill matrix template (Excel), free download
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
          A ready skill matrix format in Excel: people in rows, skills in columns, a 0 to 4 rating with a defined scale, colours that show strengths at a
          glance, and a total row that shows your skill gaps. No macros, no sign-up.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={withBase(SKILL_MATRIX_FILE)}
            download="employee-skill-matrix-template.xlsx"
            className="inline-flex items-center rounded-md bg-cobalt px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-cobalt-deep"
          >
            Download the skill matrix (.xlsx)
          </a>
          <span className="text-sm text-ink-mute">Three sheets, about 8 KB, no macros.</span>
        </div>
      </Container>

      <Container>
        <SectionHeading title="What is in the skill matrix template" lead="Three sheets: the matrix you fill in, the rating scale, and short instructions." />
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {SHEETS.map((s, i) => (
            <li key={s.name} className="rounded-xl border border-line bg-white p-6">
              <p className="text-sm font-medium text-cobalt">Sheet {i + 1}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink">{s.name}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="prose-fit py-12">
        <h2>How to use the skill matrix format</h2>
        <ul>
          <li>Replace the example row with your people, one row each.</li>
          <li>Rename the skill columns to the skills your projects actually need. Ten is a good start; add more as needed.</li>
          <li>Rate each skill from 0 to 4 using the Scale sheet. Let the person and their manager agree on the number.</li>
          <li>Fill the date each person is free for new work.</li>
          <li>Read the total row: a skill with only one or two people at level 3 or above is a gap and a risk.</li>
          <li>Review rows regularly. A matrix nobody updates is worse than none, because people trust it.</li>
        </ul>
        <h2>Where a spreadsheet skill matrix breaks</h2>
        <p>
          A spreadsheet is a fine start for a team of twenty. It gets hard beyond that: ratings go stale, the sheet does not know who used a skill on their
          last project, and it cannot tell you who should take the next open task.
          {live("employee-skill-matrix") && (
            <>
              {" "}More in <Link href="/blog/employee-skill-matrix/">employee skill matrix: format, meaning and where Excel breaks</Link>.
            </>
          )}
          {live("stale-skill-profiles") && (
            <>
              {" "}See also <Link href="/blog/stale-skill-profiles/">why skill profiles go stale</Link>.
            </>
          )}
        </p>
      </Container>

      <Container className="py-8">
        <SectionHeading title="Questions about skill matrices" />
        <div className="mt-8">
          <FaqList items={FAQS} />
        </div>
      </Container>
      <CtaBand title="From a skill grid to the right person for each task" body="FitRank keeps skills current from project history and ranks your people for open tasks with a reason for each." />
    </>
  );
}
