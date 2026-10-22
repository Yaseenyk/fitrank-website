import JsonLd from "@/components/JsonLd";
import { CheckIcon } from "@/components/Bits";
import { Breadcrumbs, Container, CtaBand, FaqList, PageIntro, SectionHeading } from "@/components/Blocks";
import type { Faq } from "@/lib/content";
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FitRank Hire: shortlist applicants faster",
  description:
    "FitRank Hire gives employers in India a careers page where candidates apply with a resume. It suggests who fits and why, hides names until you shortlist, and never rejects anyone on its own.",
  path: "hire",
});

const EMPLOYER_POINTS = [
  {
    name: "A careers page for every job",
    body: "Publish a job with its skills, level, location and joining window. Each job gets its own page that search engines can read as a job posting.",
  },
  {
    name: "Apply with a resume, nothing else",
    body: "Candidates upload a PDF or Word resume and type their name, email and phone. No account and no long form.",
  },
  {
    name: "A suggested fit, with reasons",
    body: "Each application is marked Strong fit, Possible fit or Not a match, with the skills it has, the skills it misses and why. The same rules FitRank uses for internal staffing.",
  },
  {
    name: "Blind first read",
    body: "You see skills and experience first. Names and contact details appear only when you shortlist someone.",
  },
  {
    name: "A person decides",
    body: "Nothing is rejected automatically. Choosing Not now asks for a short reason, so every decision can be explained later.",
  },
];

const CANDIDATE_POINTS = [
  {
    name: "The resume file is not kept",
    body: "It is read once to fill in skills, experience and education, then dropped. Date of birth, gender, religion, photo and address are never stored.",
  },
  {
    name: "A private link to their own data",
    body: "Every applicant gets a link to see what was saved, check their status and delete everything at once.",
  },
  {
    name: "Deleted after a year",
    body: "Applications are deleted automatically 365 days after applying. Applicants must be 18 or older and see a privacy notice before they apply.",
  },
];

const HIRE_FAQS: Faq[] = [
  {
    q: "Is FitRank Hire available now?",
    a: "It is in pilot. We are working with a small number of employers in India. Pre-register and we will contact you when a place opens.",
  },
  {
    q: "Does the software reject candidates?",
    a: "No. It suggests how well each application fits the job and explains why. Only a person on your team can shortlist or pass on an application.",
  },
  {
    q: "Does AI read the resumes?",
    a: "Yes. The resume text goes to an AI service to fill in fixed fields such as skills and years of experience, after email addresses and phone numbers are removed in code. The fit itself is worked out by rules, not by the AI.",
  },
  {
    q: "Is it connected to FitRank's internal staffing data?",
    a: "No. FitRank Hire has its own logins and its own part of the database. It cannot read your employees' records, and FitRank's staffing screens cannot read applicants.",
  },
];

export default function HirePage() {
  return (
    <>
      <JsonLd data={[faqPageJsonLd(HIRE_FAQS), breadcrumbJsonLd([{ name: "FitRank Hire", path: "hire" }])]} />
      <Breadcrumbs trail={[{ name: "FitRank Hire" }]} />
      <PageIntro
        title="FitRank Hire"
        lead="A careers page for employers in India. Candidates apply with just a resume, FitRank suggests who fits and why, and your team decides. In pilot."
      />

      <Container>
        <SectionHeading title="For your hiring team" />
        <ul className="grid gap-x-12 gap-y-8 border-t border-line pt-10 md:grid-cols-2">
          {EMPLOYER_POINTS.map((p) => (
            <li key={p.name} className="flex gap-3">
              <CheckIcon />
              <div>
                <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pt-16">
        <SectionHeading title="For the people who apply" />
        <ul className="grid gap-x-12 gap-y-8 border-t border-line pt-10 md:grid-cols-2">
          {CANDIDATE_POINTS.map((p) => (
            <li key={p.name} className="flex gap-3">
              <CheckIcon />
              <div>
                <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pt-16">
        <SectionHeading title="Questions" />
        <FaqList items={HIRE_FAQS} />
      </Container>

      <CtaBand
        title="Hiring in India? Try FitRank Hire in the pilot"
        body="Pre-register and tell us how many roles you hire for. We will set up your careers page with you."
      />
    </>
  );
}
