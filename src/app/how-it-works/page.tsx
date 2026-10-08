import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, CtaBand, PageIntro, SectionHeading } from "@/components/Blocks";
import { DECISIONS, PIPELINE } from "@/lib/content";
import { PRODUCT_ID, breadcrumbJsonLd, canonicalUrl, pageMetadata, personRef } from "@/lib/seo";

const DESCRIPTION =
  "How FitRank makes a staffing recommendation: rules and facts in code, five typed AI decisions with a probability for every option, code cross-checks, thresholds and a human decision.";

export const metadata = pageMetadata({ title: "How FitRank decides", description: DESCRIPTION, path: "how-it-works" });

const article = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "How FitRank makes a staffing recommendation",
  description: DESCRIPTION,
  url: canonicalUrl("how-it-works"),
  author: personRef,
  publisher: personRef,
  about: { "@id": PRODUCT_ID },
  dateModified: "2026-10-08",
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={[article, breadcrumbJsonLd([{ name: "How it works", path: "how-it-works" }])]} />
      <Breadcrumbs trail={[{ name: "How it works" }]} />
      <PageIntro
        title="How FitRank decides"
        lead="Most AI staffing tools ask a chatbot to pick someone. FitRank splits the decision into parts: code does what code can, a small model answers fixed questions, and a person decides."
      />

      <Container className="py-8">
        <ol className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
          {PIPELINE.map((s, i) => (
            <li key={s.name} className="grid gap-2 bg-white p-6 sm:grid-cols-[3rem_14rem_1fr] sm:gap-6">
              <span className="tabular font-display text-3xl font-semibold text-cobalt">{i + 1}</span>
              <h2 className="text-lg font-semibold text-ink">{s.name}</h2>
              <p className="leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="py-16">
        <SectionHeading
          title="Five typed decisions"
          lead="Each question has a fixed list of answers. The model returns a probability for every answer and can't answer outside the list."
        />
        <div className="mt-10 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[36rem] text-left">
            <thead>
              <tr className="border-b border-line text-sm text-ink-mute">
                <th scope="col" className="px-5 py-3 font-medium">Decision</th>
                <th scope="col" className="px-5 py-3 font-medium">Possible answers</th>
                <th scope="col" className="px-5 py-3 font-medium">What it judges</th>
              </tr>
            </thead>
            <tbody>
              {DECISIONS.map((d) => (
                <tr key={d.key} className="border-b border-line last:border-0 align-top">
                  <th scope="row" className="px-5 py-4 font-semibold text-ink">{d.key}</th>
                  <td className="px-5 py-4 text-ink-soft">{d.options}</td>
                  <td className="px-5 py-4 text-ink-soft">{d.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      <Container className="prose-fit pb-8">
        <h2>Why probabilities, not a ranked list</h2>
        <p>
          A probability tells you how sure the model is. FitRank calibrates them, so when it says 90%, it&apos;s right about 90% of the time.
          Your thresholds turn that number into a band: Shortlist, Review or Hidden. A low-confidence answer never reaches the shortlist on
          its own.
        </p>
        <h2>Code checks the model</h2>
        <p>
          A well-formed answer can still be wrong, so FitRank compares each answer with the facts it calculated. A strong skill match for
          someone with none of the must-have skills, or &ldquo;right level&rdquo; for someone two grades away, is flagged as a contradiction
          and sent to Review. So are thin profiles and answers the model is unsure about.
        </p>
        <h2>A model that belongs to you</h2>
        <p>
          The matching model is a small transformer trained by distilling an open-weight LLM on thousands of example decisions. It runs on an
          ordinary CPU, so there is no per-run AI bill and no data sent to a third party for scoring. A hosted LLM is used only to read free
          text, such as a task description or a resume, into fixed fields. It never ranks or judges people.
        </p>
        <h2>It learns from your managers</h2>
        <p>
          The final score combines facts from code with the model&apos;s five answers, and that combination is learned from your managers&apos;
          accept and reject decisions. FitRank retrains overnight on new decisions and reports what changed, but an admin decides whether to
          switch. Every model version can be compared and rolled back.
        </p>
        <h2>Explanations that cite facts</h2>
        <p>
          Every explanation points to numbered facts, such as &ldquo;F1: must-have skills 3 of 3&rdquo;. An explanation that cites a fact
          that doesn&apos;t exist is rejected and never shown.
        </p>
      </Container>
      <CtaBand />
    </>
  );
}
