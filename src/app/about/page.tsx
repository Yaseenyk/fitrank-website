import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, Container, PageIntro } from "@/components/Blocks";
import { CONTACT, MAKER } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About FitRank and who builds it",
  description:
    "FitRank is an early-access staff scheduling product built by one developer in Hyderabad. What it does, what it does not do, how it is tested, and how to reach the person behind it.",
  path: "about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "about" }])} />
      <Breadcrumbs trail={[{ name: "About" }]} />
      <PageIntro
        title="About FitRank"
        lead="FitRank is software that ranks the people in a company for open tasks and explains why. It is in early access, and it is built and maintained by one person."
      />
      <Container className="prose-fit">
        <h2>Who builds it</h2>
        <p>
          FitRank is built by <a href={MAKER.url}>{MAKER.name}</a>, a {MAKER.jobTitle} based in {CONTACT.city}, {CONTACT.country}. I design the model, write the code, run the benchmarks and answer the email. There is no large team or outside investor behind this website, and I do not claim customers or case studies that do not exist: FitRank is currently choosing a small number of pilot companies, which is why the site says &ldquo;early access&rdquo; on every page.
        </p>
        <p>
          My other work, including the portfolio and engineering write-ups, is on <a href={MAKER.url}>{MAKER.url.replace("https://", "")}</a>, <a href={MAKER.sameAs[1]} rel="noopener">GitHub</a> and <a href={MAKER.sameAs[0]} rel="noopener">LinkedIn</a>.
        </p>

        <h2>What FitRank is</h2>
        <p>
          When a delivery team, a pre-sales group or an HR team has a task to staff, FitRank reads the task, scores the people who could do it, and gives the manager a shortlist with a probability and a reason for each person. The rules (availability, leave, skills that are required) are written in code and checked every time; a trained model handles the judgement part. The <Link href="/how-it-works/">how it works page</Link> explains the steps, the <Link href="/features/">features</Link> and <Link href="/use-cases/">use cases</Link> pages go through each capability, and the <Link href="/security/">trust page</Link> lists the protections built in.
        </p>

        <h2>What it does not do</h2>
        <ul>
          <li>It does not assign anyone automatically. A manager makes every final call, and the product records the decision and the reason.</li>
          <li>It does not use protected attributes, and it removes personal details before an AI model reads a resume.</li>
          <li>It does not claim accuracy it has not measured on your data. The benchmarks are on synthetic data and say so, including where rules alone still beat the model (see <Link href="/results/">benchmarks</Link>).</li>
        </ul>

        <h2>How it is tested</h2>
        <p>
          The published numbers come from a 40-task synthetic benchmark run in October 2026 across 647 people, with a hidden true fit for every pair so the results can be checked exactly. Synthetic data shows that the method works; it does not prove the same accuracy at your company. That is why a pilot starts with a calibration review of FitRank against your own managers&apos; decisions before anyone relies on it.
        </p>

        <h2>The free tools and the blog</h2>
        <p>
          Besides the product, the site has a few <Link href="/tools/">free scheduling tools</Link> that run in your browser (a schedule generator, a skills matrix template, a notice-period calculator and an Excel template) and a <Link href="/blog/">blog</Link> on scheduling, rostering and bench management. They are free to use and are not gated behind a form.
        </p>

        <h2>Money and advertising</h2>
        <p>
          FitRank is sold as an annual licence; see <Link href="/pricing/">pricing</Link>. The website itself shows no advertising today. I may apply for Google AdSense later to cover some running costs of the free tools and blog; if ads ever appear they will be labelled, kept away from the product pages and forms, and the <Link href="/privacy/">privacy notice</Link> will be updated first.
        </p>

        <h2>Contact</h2>
        <p>
          Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or see the <Link href="/contact/">contact page</Link>. The <Link href="/terms/">terms</Link> cover use of this website.
        </p>
      </Container>
    </>
  );
}
