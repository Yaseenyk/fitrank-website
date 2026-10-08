import JsonLd from "@/components/JsonLd";
import { BenchmarkTable } from "@/components/Bits";
import { Breadcrumbs, Container, CtaBand, PageIntro, SectionHeading } from "@/components/Blocks";
import { METRICS, UNSEEN_COMPANIES } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Benchmarks: FitRank against a rules-only ranking",
  description:
    "FitRank put the best person in the top five 94.3% of the time on a 40-task synthetic benchmark, ahead of a rules-only ranking, with a 2.2% calibration error and no per-run AI cost.",
  path: "results",
});

export default function ResultsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Benchmarks", path: "results" }])} />
      <Breadcrumbs trail={[{ name: "Benchmarks" }]} />
      <PageIntro
        title="Benchmarks"
        lead="Every FitRank model is tested against a simple rules-only ranking on tasks it has never seen. These are the current results, including where it still falls short."
      />

      <Container className="grid gap-12 py-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="text-ink-soft">
          <h2 className="font-display text-2xl font-semibold text-ink">How we measured</h2>
          <p className="mt-3 leading-relaxed">
            40 tasks the model never saw in training, scored across 647 people, October 2026. The data is synthetic, generated with a hidden
            true fit for every pair so results can be checked exactly.
          </p>
          <p className="mt-3 leading-relaxed">
            Synthetic data proves the method works; it doesn&apos;t prove accuracy at your company. That&apos;s why every pilot measures
            FitRank against your own managers&apos; decisions before anyone relies on it.
          </p>
        </div>
        <BenchmarkTable rows={METRICS} />
      </Container>

      <Container className="py-16">
        <SectionHeading
          title="Companies the model had never seen"
          lead="Balanced accuracy of fit decisions on day one, before any feedback from that company. Two of these company types were held out of training entirely."
        />
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {UNSEEN_COMPANIES.map((c) => (
            <div key={c.name} className="rounded-lg border border-line bg-white p-6">
              <dd className="tabular font-display text-4xl font-semibold text-ink">{c.value}</dd>
              <dt className="mt-2 text-ink-soft">{c.name}</dt>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="prose-fit">
        <h2>Where FitRank still falls short</h2>
        <p>
          FitRank is better than rules at putting the right person in the top five and at ordering people, but rules-only ranking still
          places the single best person first more often (74.3% against 68.6%). That&apos;s one reason FitRank shortlists rather than
          assigns, and why managers always see several people with their reasons.
        </p>
      </Container>
      <CtaBand title="Measure FitRank on your own decisions" body="Pilot companies get an accuracy review against their managers' real choices before rollout." />
    </>
  );
}
