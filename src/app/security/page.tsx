import JsonLd from "@/components/JsonLd";
import { CheckIcon } from "@/components/Bits";
import { Breadcrumbs, Container, CtaBand, PageIntro } from "@/components/Blocks";
import { GUARANTEES } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trust, privacy and fairness",
  description:
    "FitRank never assigns people automatically, never uses protected attributes, removes personal details before AI reads a resume, walls off each company's data and audits every decision.",
  path: "security",
});

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Trust and privacy", path: "security" }])} />
      <Breadcrumbs trail={[{ name: "Trust and privacy" }]} />
      <PageIntro
        title="Trust, privacy and fairness"
        lead="Staffing decisions affect people's careers. These protections are built into how FitRank works, not left to configuration."
      />
      <Container>
        <ul className="grid gap-x-12 gap-y-8 border-t border-line pt-10 md:grid-cols-2">
          {GUARANTEES.map((g) => (
            <li key={g.name} className="flex gap-3">
              <CheckIcon />
              <div>
                <h2 className="text-lg font-semibold text-ink">{g.name}</h2>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{g.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="prose-fit pt-8">
        <h2>Fairness you can check</h2>
        <p>
          The admin fairness view compares how often qualified people are recommended across locations and practices, using the four-fifths
          rule and a significance test. Location is only ever used as a hard requirement of the task, never as a scoring signal.
        </p>
        <h2>Sign-in and access</h2>
        <p>
          Passwords are hashed with argon2. Sessions use short-lived tokens and a secure, HTTP-only refresh cookie. Accounts lock after repeated
          failed sign-ins, new users must change their temporary password, and every request is checked against the user&apos;s role.
        </p>
        <h2>Where your data lives</h2>
        <p>
          Each company&apos;s records are separated by row-level security in the database. The matching model runs inside the deployment, so
          scoring sends no employee data to an outside AI service. Text that does go to a hosted LLM, such as a task description or a cleaned
          resume, never includes names or employee codes.
        </p>
        <h2>Before you use real data</h2>
        <p>
          Every pilot starts with a data-protection and bias review with your HR and legal teams. We&apos;ll walk you through what FitRank
          stores, how long it keeps it, and how to export or delete it.
        </p>
      </Container>
      <CtaBand title="Questions about security or compliance?" body="Talk to us before you share any data. We'll answer in writing." />
    </>
  );
}
