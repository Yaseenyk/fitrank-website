import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import { Breadcrumbs, Container } from "@/components/Blocks";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pre-register for early access",
  description:
    "FitRank is taking on a small number of pilot companies. Pre-register to staff a team with FitRank, with guided setup and an accuracy review against your managers' decisions.",
  path: "early-access",
});

const PILOT = [
  { name: "Setup with you", body: "We import your employees, skills and clients from CSV and map them to FitRank's fields together." },
  { name: "Calibration on your decisions", body: "Your managers review real shortlists, and we measure FitRank against their choices before anyone relies on it." },
  { name: "A say in the roadmap", body: "Pilot companies help decide which integrations come first, such as single sign-on and HRMS connectors." },
];

export default function EarlyAccessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Early access", path: "early-access" }])} />
      <Breadcrumbs trail={[{ name: "Early access" }]} />
      <Container className="grid gap-14 pb-10 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Pre-register for early access
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            FitRank is built and running. We&apos;re choosing a small number of pilot companies to prove it on real staffing decisions.
          </p>
          <h2 className="mt-10 font-display text-2xl font-semibold text-ink">What a pilot includes</h2>
          <ul className="mt-5 space-y-5">
            {PILOT.map((p) => (
              <li key={p.name}>
                <p className="font-medium text-ink">{p.name}</p>
                <p className="mt-1 leading-relaxed text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
          <LeadForm defaultIntent="early-access" />
        </div>
      </Container>
    </>
  );
}
