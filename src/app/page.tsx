import Link from "next/link";
import DecisionDemo from "@/components/DecisionDemo";
import JsonLd from "@/components/JsonLd";
import ProductShot from "@/components/ProductShot";
import { Container, CtaBand, FaqList, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/Blocks";
import { BenchmarkTable, CheckIcon } from "@/components/Bits";
import { FEATURE_GROUPS, GUARANTEES, HOME_FAQS, METRICS, PIPELINE, TIERS, USE_CASES } from "@/lib/content";
import { FEATURE_BY_NAME, FEATURE_PAGES, featurePage } from "@/lib/features";
import { SHOTS } from "@/lib/shots";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";

// The four capabilities shown large on the home page, each on its real screen.
const SHOWCASE = [
  { slug: "explainable-matching", shot: SHOTS.runTrail },
  { slug: "bench-management", shot: SHOTS.bench },
  { slug: "resume-reading", shot: SHOTS.candidate },
  { slug: "model-governance", shot: SHOTS.models },
].map((s) => ({ ...s, page: featurePage(s.slug)! }));

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          faqPageJsonLd(HOME_FAQS),
          webPageJsonLd({
            path: "",
            name: "FitRank: AI staffing recommendations your managers can check",
            description: SITE_DESCRIPTION,
            shots: [SHOTS.run, ...SHOWCASE.map((s) => s.shot)],
          }),
        ]}
      />

      <section className="overflow-hidden">
        <Container className="pb-16 pt-12 sm:pt-20">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm text-ink-soft">
              <span className="h-2 w-2 rounded-full bg-shortlist" aria-hidden="true" />
              Now taking early-access pilot companies
            </p>
            <h1 className="mt-6 max-w-[18ch] font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl">
              Find the right person for every open task, and see why.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
              FitRank ranks your employees for open tasks. Rules and facts are worked out in code, a small in-house AI model gives a
              probability for every judgement, and your managers make every final call.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink href="/early-access/">Pre-register for early access</PrimaryLink>
              <SecondaryLink href="/contact/">Contact sales</SecondaryLink>
            </div>
            <p className="mt-5 text-sm text-ink-mute">Annual licence · No automatic assignment, ever · Real product, shown on demo data</p>
          </div>
          <ProductShot shot={SHOTS.run} priority className="mt-14" />
        </Container>
      </section>

      <section aria-labelledby="pipeline" className="border-y border-line bg-white">
        <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              id="pipeline"
              title="How a recommendation is made"
              lead="AI is used only for the judgements code can't make. Everything else is a rule or a calculated fact, so every score can be traced."
            />
            <ol className="mt-10 space-y-6">
              {PIPELINE.map((s, i) => (
                <li key={s.name} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="tabular flex h-9 w-9 items-center justify-center rounded-full bg-cobalt-wash font-display text-lg font-semibold text-cobalt">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{s.name}</h3>
                    <p className="mt-1 leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8">
              <Link href="/how-it-works/" className="font-medium text-cobalt underline-offset-4 hover:underline">
                Read how FitRank decides
              </Link>
            </p>
          </div>
          <div className="lg:sticky lg:top-24">
            <DecisionDemo />
          </div>
        </Container>
      </section>

      <section aria-labelledby="tour">
        <Container className="py-20">
          <SectionHeading
            id="tour"
            title="See the product, not a mock-up"
            lead="Every screen on this site is the real FitRank app, captured on synthetic demo data."
          />
          <div className="mt-14 space-y-24">
            {SHOWCASE.map(({ page, shot }, i) => {
              const group = FEATURE_GROUPS.find((g) => g.id === page.group)!;
              return (
                <article key={page.slug} className="grid items-center gap-10 lg:grid-cols-[1fr_1.35fr]">
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <p className="text-sm font-medium uppercase tracking-wide text-cobalt">{group.role}</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">{page.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-ink-soft">{page.description}</p>
                    <ul className="mt-6 space-y-3">
                      {page.features.slice(0, 3).map((n) => (
                        <li key={n} className="flex gap-3">
                          <CheckIcon />
                          <span className="text-ink-soft">
                            <span className="font-medium text-ink">{n}.</span> {FEATURE_BY_NAME[n]?.body.split(". ")[0].replace(/\.$/, "")}.
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/features/${page.slug}/`} className="mt-7 inline-block font-medium text-cobalt hover:underline">
                      Explore {page.name.toLowerCase()} →
                    </Link>
                  </div>
                  <ProductShot shot={shot} sizes="(max-width: 1024px) 100vw, 700px" className={i % 2 ? "lg:order-1" : ""} />
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="everyone" className="border-y border-line bg-white">
        <Container className="py-20">
          <SectionHeading
            id="everyone"
            title="One system for everyone who staffs work"
            lead={`Managers, planners, HR and admins each get their own view of the same decisions: ${FEATURE_PAGES.length} capabilities, each with its own page.`}
          />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURE_GROUPS.map((g) => (
              <div key={g.id}>
                <h3 className="font-display text-xl font-semibold text-ink">{g.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-mute">{g.summary}</p>
                <ul className="mt-4 space-y-2 border-t border-line pt-4">
                  {FEATURE_PAGES.filter((p) => p.group === g.id).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/features/${p.slug}/`} className="text-[15px] text-ink-soft hover:text-cobalt">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10">
            <PrimaryLink href="/features/">See every feature</PrimaryLink>
          </p>
        </Container>
      </section>

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
        <SectionHeading title="What teams use FitRank for" lead="Nine jobs FitRank does today, each with the screens that do the work." />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <li key={u.slug}>
              <Link href={`/use-cases/${u.slug}/`} className="group block h-full rounded-xl border border-line bg-white p-6 transition-colors hover:border-cobalt/40">
                <span className="text-sm text-ink-mute">For {u.who.toLowerCase()}</span>
                <span className="mt-2 block font-semibold text-ink group-hover:text-cobalt">{u.title}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink-soft">{u.description}</span>
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
                  <h3 className="font-medium text-ink">{g.name}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{g.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-20">
        <SectionHeading title="Annual plans for every stage" lead="Start with a pilot on one team. Pricing depends on your size and how you deploy, so every quote is put together with you." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className={`flex flex-col rounded-xl border p-6 ${t.highlight ? "border-cobalt bg-white shadow-[0_18px_40px_-28px_rgba(36,67,184,0.6)]" : "border-line bg-white"}`}>
              {t.highlight && <p className="text-sm font-medium text-cobalt">Open now for a few companies</p>}
              <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{t.name}</h3>
              <p className="mt-2 text-[15px] text-ink-soft">{t.forWho}</p>
              <ul className="mt-5 space-y-2.5">
                {t.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex gap-2.5 text-[15px] text-ink-soft">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Link
                  href={t.cta === "Pre-register" ? "/early-access/" : "/contact/"}
                  className={`block rounded-md px-4 py-2.5 text-center font-semibold ${t.highlight ? "bg-cobalt text-white hover:bg-cobalt-deep" : "border border-ink/20 text-ink hover:border-ink/50"}`}
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6">
          <Link href="/pricing/" className="font-medium text-cobalt hover:underline">Compare plans in full</Link>
        </p>
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
