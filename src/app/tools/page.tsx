import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro } from "@/components/Blocks";
import { TOOLS } from "@/lib/tools";
import { breadcrumbJsonLd, canonicalUrl, pageMetadata, personRef } from "@/lib/seo";

const DESCRIPTION =
  "Free staff scheduling tools from FitRank: an automatic schedule generator that runs in your browser and an Excel employee schedule template with weekly and monthly sheets.";

export const metadata = pageMetadata({ title: "Free scheduling tools", description: DESCRIPTION, path: "tools" });

export default function ToolsPage() {
  const list = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl("tools")}#webpage`,
    url: canonicalUrl("tools"),
    name: "Free scheduling tools",
    description: DESCRIPTION,
    author: personRef,
    hasPart: TOOLS.map((t) => ({ "@type": "WebPage", name: t.name, url: canonicalUrl(`tools/${t.slug}`) })),
  };
  return (
    <>
      <JsonLd data={[list, breadcrumbJsonLd([{ name: "Free tools", path: "tools" }])]} />
      <Breadcrumbs trail={[{ name: "Free tools" }]} />
      <PageIntro
        title="Free scheduling tools"
        lead="Two small tools for the schedule grid itself: one fills a week in your browser, the other is a spreadsheet you keep. No sign-up, nothing uploaded. FitRank is for the harder question of who fits an open task, and why."
      />
      <Container>
        <ul className="grid gap-4 md:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}/`} className="group block h-full rounded-xl border border-line bg-white p-6 transition-colors hover:border-cobalt/40">
                <span className="block font-display text-xl font-semibold text-ink group-hover:text-cobalt">{t.name}</span>
                <span className="mt-2 block leading-relaxed text-ink-soft">{t.description}</span>
                <span className="mt-4 block text-sm font-medium text-cobalt" aria-hidden="true">Open →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[68ch] leading-relaxed text-ink-soft">
          Background reading: <Link href="/blog/what-is-rostering/" className="text-cobalt underline underline-offset-2">what rostering means</Link>,{" "}
          <Link href="/blog/rotating-shifts-explained/" className="text-cobalt underline underline-offset-2">8-hour and 12-hour rotating shift schedules</Link>,{" "}
          <Link href="/blog/automated-employee-scheduling-excel/" className="text-cobalt underline underline-offset-2">how far automated scheduling goes in Excel</Link> and{" "}
          <Link href="/blog/staffing-vs-scheduling/" className="text-cobalt underline underline-offset-2">staffing vs scheduling</Link>.
        </p>
      </Container>
      <CtaBand />
    </>
  );
}
