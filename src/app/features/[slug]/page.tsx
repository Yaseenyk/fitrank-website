import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProductShot from "@/components/ProductShot";
import { Breadcrumbs, Container, CtaBand, FaqList, PrimaryLink, SecondaryLink } from "@/components/Blocks";
import { CheckIcon } from "@/components/Bits";
import { FEATURE_GROUPS, USE_CASES } from "@/lib/content";
import { FEATURE_BY_NAME, FEATURE_PAGES, featurePage } from "@/lib/features";
import { SHOTS } from "@/lib/shots";
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURE_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = featurePage(params.slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.description, path: `features/${p.slug}` });
}

const API_EXAMPLE = `POST /api/v1/decide
Authorization: Bearer <project key>

{
  "decision": "agent.model_choice",
  "inputs": {
    "task": "Rename a variable across one file",
    "context": "Small change, no earlier attempts"
  }
}

→ 200 OK
{
  "decision": "agent.model_choice",
  "answer": "cheap",
  "probabilities": { "cheap": 0.93, "strong": 0.07 },
  "confidence": 0.93,
  "abstained": false,
  "flags": [],
  ...
}`;

export default function FeaturePageView({ params }: { params: { slug: string } }) {
  const p = featurePage(params.slug);
  if (!p) notFound();
  const group = FEATURE_GROUPS.find((g) => g.id === p.group)!;
  const shots = p.shots.map((k) => SHOTS[k]);
  const [hero, ...more] = shots;
  const useCases = USE_CASES.filter((u) => p.useCases.includes(u.slug));
  const siblings = FEATURE_PAGES.filter((x) => x.group === p.group && x.slug !== p.slug);
  const others = siblings.length >= 3 ? siblings : [...siblings, ...FEATURE_PAGES.filter((x) => x.group !== p.group)].slice(0, 3);
  const path = `features/${p.slug}`;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path, name: p.title, description: p.description, shots }),
          breadcrumbJsonLd([{ name: "Features", path: "features" }, { name: p.name, path }]),
          faqPageJsonLd(p.faqs),
        ]}
      />
      <Breadcrumbs trail={[{ name: "Features", href: "/features/" }, { name: p.name }]} />

      <Container className="pb-12 pt-12 sm:pt-16">
        <p className="text-sm font-medium uppercase tracking-wide text-cobalt">
          <Link href={`/features/#${group.id}`} className="hover:underline">{group.role}</Link>
          <span className="text-ink-mute"> · {p.name}</span>
        </p>
        <h1 className="mt-4 max-w-[22ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">{p.title}</h1>
        <p className="mt-6 max-w-[64ch] text-lg leading-relaxed text-ink-soft">{p.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryLink href="/early-access/">Pre-register for early access</PrimaryLink>
          <SecondaryLink href="/contact/">Book a demo</SecondaryLink>
        </div>
      </Container>

      <Container>
        {hero ? (
          <ProductShot shot={hero} priority />
        ) : (
          <figure className="overflow-hidden rounded-xl border border-ink/10 bg-ink shadow-[0_24px_60px_-28px_rgba(20,33,61,0.35)]">
            <pre className="overflow-x-auto p-6 text-[13px] leading-relaxed text-white/90 sm:text-sm">
              <code>{API_EXAMPLE}</code>
            </pre>
            <figcaption className="border-t border-white/10 px-6 py-3 text-sm text-white/60">
              Illustrative call to a built-in question: a probability for every option, or an abstain when the model isn&apos;t sure.
            </figcaption>
          </figure>
        )}
      </Container>

      <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_1.3fr]">
        <section aria-labelledby="problem-h">
          <h2 id="problem-h" className="font-display text-3xl font-semibold text-ink">The problem</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{p.problem}</p>
        </section>
        <section aria-labelledby="how-h" className="rounded-xl border border-line bg-white p-6 sm:p-8">
          <h2 id="how-h" className="font-display text-3xl font-semibold text-ink">How it works</h2>
          <ol className="mt-6 space-y-5">
            {p.steps.map((step, i) => (
              <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="tabular flex h-8 w-8 items-center justify-center rounded-full bg-cobalt-wash font-display font-semibold text-cobalt">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-ink-soft">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      {more.length > 0 && (
        <section aria-label="More screens" className="border-y border-line bg-white">
          <Container className={`grid gap-12 py-16 ${more.length > 1 ? "lg:grid-cols-2" : ""}`}>
            {more.map((s) => (
              <ProductShot key={s.src} shot={s} sizes={more.length > 1 ? "(max-width: 1024px) 100vw, 600px" : undefined} />
            ))}
          </Container>
        </section>
      )}

      <Container className="py-20">
        <h2 className="font-display text-3xl font-semibold text-ink">What&apos;s included</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {p.features.map((name) => (
            <li key={name} className="flex gap-3">
              <CheckIcon />
              <div>
                <h3 className="font-semibold text-ink">{name}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{FEATURE_BY_NAME[name]?.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {useCases.length > 0 && (
        <Container className="pb-20">
          <h2 className="font-display text-3xl font-semibold text-ink">Where teams use it</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {useCases.map((u) => (
              <li key={u.slug}>
                <Link href={`/use-cases/${u.slug}/`} className="group block h-full rounded-xl border border-line bg-white p-6 transition-colors hover:border-cobalt/50">
                  <span className="text-sm text-ink-mute">For {u.who.toLowerCase()}</span>
                  <span className="mt-2 block font-display text-xl font-semibold text-ink group-hover:text-cobalt">{u.title}</span>
                  <span className="mt-2 block leading-relaxed text-ink-soft">{u.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="pb-20">
        <h2 className="font-display text-3xl font-semibold text-ink">Questions about {p.name.toLowerCase()}</h2>
        <div className="mt-8">
          <FaqList items={p.faqs} />
        </div>
      </Container>

      <Container>
        <h2 className="font-display text-2xl font-semibold text-ink">More of FitRank</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/features/${o.slug}/`} className="group block h-full rounded-xl border border-line bg-white p-5 transition-colors hover:border-cobalt/50">
                <span className="font-semibold text-ink group-hover:text-cobalt">{o.name}</span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-ink-soft">{o.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/features/" className="font-medium text-cobalt hover:underline">See all {FEATURE_PAGES.length} capabilities</Link>
        </p>
      </Container>

      <CtaBand />
    </>
  );
}
