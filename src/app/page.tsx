import Link from "next/link";
import DecisionDemo from "@/components/DecisionDemo";
import JsonLd from "@/components/JsonLd";
import { Container, CtaBand, FaqList, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/Blocks";
import { BenchmarkTable, CheckIcon } from "@/components/Bits";
import { FEATURE_GROUPS, GUARANTEES, HOME_FAQS, METRICS, PIPELINE, TIERS, USE_CASES } from "@/lib/content";
import { faqPageJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(HOME_FAQS)} />

      <Container className="grid gap-12 pb-20 pt-12 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm text-ink-soft">
            <span className="h-2 w-2 rounded-full bg-shortlist" aria-hidden="true" />
            Now taking early-access pilot companies
          </p>
          <h1 className="mt-6 max-w-[16ch] font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-[4.25rem]">
            Find the right person for every open task, and see why.
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-soft">
            FitRank ranks your employees for open tasks. Rules and facts are worked out in code, a small in-house AI model gives a
            probability for every judgement, and your managers make every final call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryLink href="/early-access/">Pre-register for early access</PrimaryLink>
            <SecondaryLink href="/contact/">Contact sales</SecondaryLink>
          </div>
          <p className="mt-6 text-sm text-ink-mute">Annual licence. No automatic assignment, ever.</p>
        </div>
        <DecisionDemo />
      </Container>

      <section aria-labelledby="pipeline" className="border-y border-line bg-white">
        <Container className="py-20">
          <SectionHeading
            id="pipeline"
            title="How a recommendation is made"
            lead="AI is used only for the judgements code can't make. Everything else is a rule or a calculated fact, so every score can be traced."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5">
            {PIPELINE.map((s, i) => (
              <li key={s.name} className="bg-white p-6">
                <span className="tabular font-display text-2xl font-semibold text-cobalt">{i + 1}</span>
                <h3 className="mt-3 font-semibold text-ink">{s.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link href="/how-it-works/" className="font-medium text-cobalt underline-offset-4 hover:underline">
              Read how FitRank decides
            </Link>
          </p>
        </Container>
      </section>

      <Container className="py-20">
        <SectionHeading title="One system for everyone who staffs work" lead="Managers, planners, HR and admins each get their own view of the same decisions." />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {FEATURE_GROUPS.map((g) => (
            <div key={g.id} className="grid gap-6 py-8 md:grid-cols-[18rem_1fr]">
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">{g.role}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{g.summary}</p>
                <Link href={`/features/#${g.id}`} className="mt-3 inline-block text-sm font-medium text-cobalt hover:underline">
                  All {g.features.length} features
                </Link>
              </div>
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {g.features.slice(0, 4).map((f) => (
                  <li key={f.name}>
                    <p className="font-medium text-ink">{f.name}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{f.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <section aria-labelledby="results" className="bg-paper-deep/60">
        <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              id="results"
              title="Measured against a simple rules-only ranking"
              lead="If the model can't beat plain rules, it hasn't earned its place. Every evaluation runs both side by side."
            />
            <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-ink-mute">
              Benchmark of 40 unseen tasks and 647 people with synthetic data, October 2026. Measuring accuracy on your own managers&apos;
              decisions is part of every pilot.
            </p>
            <p className="mt-4">
              <Link href="/results/" className="font-medium text-cobalt hover:underline">See every benchmark result</Link>
            </p>
          </div>
          <BenchmarkTable rows={METRICS.slice(0, 3)} />
        </Container>
      </section>

      <Container className="py-20">
        <SectionHeading title="What teams use FitRank for" />
        <ul className="mt-10 grid gap-x-10 border-t border-line md:grid-cols-2">
          {USE_CASES.map((u) => (
            <li key={u.slug} className="border-b border-line">
              <Link href={`/use-cases/${u.slug}/`} className="group block py-5">
                <span className="font-medium text-ink group-hover:text-cobalt">{u.title}</span>
                <span className="mt-1 block text-[15px] leading-relaxed text-ink-soft">{u.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <section aria-labelledby="trust" className="border-y border-line bg-white">
        <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="trust" title="Built to be trusted with people decisions" lead="These are rules in the product, not settings someone can switch off." />
            <p className="mt-6">
              <Link href="/security/" className="font-medium text-cobalt hover:underline">Read the trust and privacy details</Link>
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {GUARANTEES.slice(0, 6).map((g) => (
              <li key={g.name} className="flex gap-3">
                <CheckIcon />
                <div>
                  <p className="font-medium text-ink">{g.name}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{g.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-20">
        <SectionHeading title="Annual plans for every stage" lead="Start with a pilot on one team. Pricing depends on your size and how you deploy." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className={`rounded-lg border p-6 ${t.highlight ? "border-cobalt bg-white" : "border-line bg-white/60"}`}>
              <h3 className="font-display text-2xl font-semibold text-ink">{t.name}</h3>
              <p className="mt-2 text-[15px] text-ink-soft">{t.forWho}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryLink href="/pricing/">Compare plans</PrimaryLink>
          <SecondaryLink href="/contact/">Get a quote</SecondaryLink>
        </div>
      </Container>

      <Container className="py-12">
        <SectionHeading title="Questions teams ask first" />
        <div className="mt-8">
          <FaqList items={HOME_FAQS} />
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
