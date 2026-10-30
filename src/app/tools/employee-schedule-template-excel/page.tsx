import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, FaqList, SectionHeading } from "@/components/Blocks";
import type { Faq } from "@/lib/content";
import { ORG_ID, breadcrumbJsonLd, canonicalUrl, faqPageJsonLd, pageMetadata, personRef } from "@/lib/seo";
import { SITE_URL, withBase } from "@/lib/site";
import { TEMPLATE_FILE, TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.slug === "employee-schedule-template-excel")!;
const PATH = `tools/${tool.slug}`;

export const metadata = pageMetadata({ title: tool.title, description: tool.description, path: PATH });

const SHEETS = [
  { name: "Weekly", body: "Monday to Sunday, one row per employee, one shift code per day. Hours, shifts worked and days off per person by formula, a total row, and a coverage block that counts people on each shift each day. Comes with an example week you overwrite." },
  { name: "Monthly", body: "Thirty-one day columns driven by one cell: type the month's first day and the day names follow, with the 29th to 31st going blank in shorter months. The same hours, totals and coverage formulas as the weekly sheet." },
  { name: "Shifts", body: "Your shift codes, names and start and end times. Hours per shift are worked out, including night shifts that end after midnight, and the grids' drop-downs read from this list." },
  { name: "Instructions", body: "How to use it, what the formulas check, and what a spreadsheet will not do for you." },
];

const FAQS: Faq[] = [
  {
    q: "Is the employee schedule template free to download?",
    a: "Yes. It is a plain .xlsx file with no macros, no sign-up and no watermark. Use it, change it and share it inside your company as you like.",
  },
  {
    q: "Does it work in Google Sheets and LibreOffice?",
    a: "Yes. The formulas are COUNTIF, COUNTA, COUNTBLANK, SUMPRODUCT, TEXT, DATEVALUE and MONTH, which all three support. Upload the file to Google Drive and open it with Sheets, or open it directly in LibreOffice Calc.",
  },
  {
    q: "How do I add more employees?",
    a: "Insert rows above the Total row on the Weekly or Monthly sheet and copy an existing row's formulas down. The totals and the coverage block keep covering every employee row above the Total row.",
  },
  {
    q: "Can I change the shift codes?",
    a: "Yes. Edit the Shifts sheet: codes, names and times. The drop-down lists and the hours formulas on both grids read from it. Keep OFF and L (leave) if you want the days-off count to stay right.",
  },
  {
    q: "Will the template choose who works which shift?",
    a: "No. It records the schedule and checks hours and coverage. To fill a week automatically from availability and limits, use the free schedule generator on this site. To rank who fits an open task and see why, that is FitRank.",
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
  contentUrl: `${SITE_URL}${TEMPLATE_FILE}`,
  isAccessibleForFree: true,
  inLanguage: "en",
  author: personRef,
  publisher: { "@id": ORG_ID },
  hasPart: SHEETS.map((s) => ({ "@type": "DigitalDocument", name: `${s.name} sheet`, description: s.body })),
};

export default function TemplatePage() {
  return (
    <>
      <JsonLd data={[doc, faqPageJsonLd(FAQS), breadcrumbJsonLd([{ name: "Free tools", path: "tools" }, { name: tool.name, path: PATH }])]} />
      <Breadcrumbs trail={[{ name: "Free tools", href: "/tools/" }, { name: tool.name }]} />
      <Container className="pb-10 pt-14 sm:pt-20">
        <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Employee schedule template (Excel), free download
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
          A weekly employee schedule template and a monthly one in a single .xlsx, with shift codes you set, hours per person and coverage per shift worked out by
          formula. No macros, no sign-up. Open it in Excel, Google Sheets or LibreOffice.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={withBase(TEMPLATE_FILE)}
            download="employee-schedule-template.xlsx"
            className="inline-flex items-center rounded-md bg-cobalt px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-cobalt-deep"
          >
            Download the template (.xlsx)
          </a>
          <span className="text-sm text-ink-mute">Four sheets, about 14 KB, no macros.</span>
        </div>
      </Container>

      <Container>
        <SectionHeading title="What is in the work schedule template" lead="Four sheets. The two grids are what you print or share; the other two are the settings and the notes." />
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
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
        <h2>How to use the weekly employee schedule template</h2>
        <ul>
          <li>Set your shift codes on the Shifts sheet. The defaults are M (06:00 to 14:00), D (09:00 to 17:00), E (14:00 to 22:00), N (22:00 to 06:00), OFF and L for leave.</li>
          <li>On the Weekly sheet, type the week&apos;s start date, replace the example names, and put one code per person per day. The drop-down lists the codes; typing works too.</li>
          <li>Read the Hours, Shifts and Days off columns for each person, the Total row, and the coverage block underneath, which shows how many people hold each shift on each day. A zero there is an empty shift.</li>
          <li>Save a copy per week. For a month at a glance, use the Monthly sheet: type the first day of the month in B2 and the day names follow.</li>
        </ul>
        <h2>What a template can and cannot do</h2>
        <p>
          A spreadsheet is a good record of a schedule and a fair checker of hours. It does not choose the schedule. It will not tell you who should take the
          open Saturday shift, whether a person has the skills for a task, or why one person is a better fit than another, and it keeps no history of the
          decisions you made. We wrote up{" "}
          <Link href="/blog/automated-employee-scheduling-excel/">how far automated employee scheduling in Excel goes and where it breaks</Link>.
        </p>
        <p>
          To fill a week from availability and limits, the <Link href="/tools/schedule-generator/">free automatic schedule generator</Link> runs in your
          browser and exports a CSV you can paste into this template. For the question the grid cannot answer, which person fits an open task and why,
          FitRank ranks your people with rules in code, a probability for every typed answer, and a manager who makes every final call. See{" "}
          <Link href="/how-it-works/">how FitRank decides</Link>.
        </p>
        <h2>Related reading</h2>
        <ul>
          <li><Link href="/blog/what-is-rostering/">What is rostering? Meaning, types and how it differs from scheduling</Link></li>
          <li><Link href="/blog/rotating-shifts-explained/">Rotating shifts explained: 8-hour and 12-hour rotating shift schedules</Link></li>
          <li><Link href="/blog/staffing-vs-scheduling/">Staffing vs scheduling: what each word means and which software you need</Link></li>
        </ul>
      </Container>

      <Container className="py-8">
        <SectionHeading title="Questions about the template" />
        <div className="mt-8">
          <FaqList items={FAQS} />
        </div>
      </Container>
      <CtaBand title="When the question is who, not when" body="FitRank ranks your people for open tasks with a probability and a reason for each. We are taking on a small number of pilot companies." />
    </>
  );
}
