import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro } from "@/components/Blocks";
import { USE_CASES } from "@/lib/content";
import { breadcrumbJsonLd, canonicalUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Use cases: staffing, bench, skill gaps, hiring and audit",
  description:
    "How teams use FitRank: staff open tasks, cut bench time, plan for skill shortages, decide hire or move, run HR candidate pipelines, staff pre-sales deals and audit decisions.",
  path: "use-cases",
});

const list = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FitRank use cases",
  itemListElement: USE_CASES.map((u, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: u.title,
    url: canonicalUrl(`use-cases/${u.slug}`),
  })),
};

export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={[list, breadcrumbJsonLd([{ name: "Use cases", path: "use-cases" }])]} />
      <Breadcrumbs trail={[{ name: "Use cases" }]} />
      <PageIntro
        title="Use cases"
        lead="FitRank starts with one question, who should take this task, and answers the planning and hiring questions that follow from it."
      />
      <Container>
        <ul className="divide-y divide-line border-y border-line">
          {USE_CASES.map((u) => (
            <li key={u.slug}>
              <Link href={`/use-cases/${u.slug}/`} className="group grid gap-2 py-7 md:grid-cols-[1fr_1.2fr] md:gap-10">
                <span>
                  <span className="block font-display text-2xl font-semibold text-ink group-hover:text-cobalt">{u.title}</span>
                  <span className="mt-1 block text-sm text-ink-mute">{u.who}</span>
                </span>
                <span className="leading-relaxed text-ink-soft">{u.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
