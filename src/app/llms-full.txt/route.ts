import {
  DECISIONS,
  FAQS,
  FEATURE_GROUPS,
  GUARANTEES,
  METRICS,
  PIPELINE,
  ROADMAP,
  TIERS,
  UNSEEN_COMPANIES,
  USE_CASES,
} from "@/lib/content";
import { CONTACT, MAKER, SITE_DESCRIPTION } from "@/lib/site";
import { FEATURE_BY_NAME, FEATURE_PAGES } from "@/lib/features";
import { SHOTS } from "@/lib/shots";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

// The whole site as plain text, built from the same content the pages render.
export function GET() {
  const parts: string[] = [];

  parts.push(`# FitRank\n\nURL: ${canonicalUrl("")}\n\n${SITE_DESCRIPTION}\n\nStatus: early access. Sold as an annual licence. Built by ${MAKER.name}. Contact: ${CONTACT.email}, ${CONTACT.phoneDisplay}.`);

  parts.push(
    `# How FitRank decides\n\nURL: ${canonicalUrl("how-it-works")}\n\n` +
      PIPELINE.map((s, i) => `${i + 1}. ${s.name}: ${s.body}`).join("\n") +
      "\n\n## The five decisions\n" +
      DECISIONS.map((d) => `- ${d.key} (${d.options}): ${d.body}`).join("\n"),
  );

  parts.push(
    `# Features\n\nURL: ${canonicalUrl("features")}\n\n` +
      FEATURE_GROUPS.map((g) => `## ${g.role}\n${g.summary}\n${g.features.map((f) => `- ${f.name}: ${f.body}`).join("\n")}`).join("\n\n") +
      `\n\n## On the roadmap (not built yet)\n${ROADMAP.map((r) => `- ${r}`).join("\n")}`,
  );

  for (const f of FEATURE_PAGES) {
    const screens = f.shots.length ? `\n\nScreens shown:\n${f.shots.map((k) => `- ${SHOTS[k].caption}: ${SHOTS[k].alt}`).join("\n")}` : "";
    parts.push(
      `# ${f.title}\n\nURL: ${canonicalUrl(`features/${f.slug}`)}\nCapability: ${f.name}\n\n${f.lead}\n\nProblem: ${f.problem}\n\nHow it works:\n${f.steps
        .map((s, i) => `${i + 1}. ${s}`)
        .join("\n")}\n\nIncluded:\n${f.features.map((n) => `- ${n}: ${FEATURE_BY_NAME[n]?.body ?? ""}`).join("\n")}${screens}\n\n${f.faqs
        .map((q) => `Q: ${q.q}\nA: ${q.a}`)
        .join("\n\n")}`,
    );
  }

  for (const u of USE_CASES) {
    parts.push(
      `# ${u.title}\n\nURL: ${canonicalUrl(`use-cases/${u.slug}`)}\nFor: ${u.who}\n\n${u.description}\n\nProblem: ${u.problem}\n\nHow:\n${u.how
        .map((s, i) => `${i + 1}. ${s}`)
        .join("\n")}\n\nResult: ${u.outcome}`,
    );
  }

  parts.push(
    `# Benchmarks\n\nURL: ${canonicalUrl("results")}\n\nSynthetic benchmark, 40 unseen tasks, 647 people, October 2026. Synthetic data proves the method, not accuracy at a specific company; every pilot measures FitRank against that company's managers.\n\n` +
      METRICS.map((m) => `- ${m.label}: FitRank ${m.fitrank}${m.baseline ? `, rules only ${m.baseline}` : ""}${m.note ? ` (${m.note})` : ""}`).join("\n") +
      `\n\nUnseen companies (balanced accuracy, day one):\n${UNSEEN_COMPANIES.map((c) => `- ${c.name}: ${c.value}`).join("\n")}\n\nWeakness: rules-only ranking places the single best person first more often (74.3% vs 68.6%).`,
  );

  parts.push(`# Trust, privacy and fairness\n\nURL: ${canonicalUrl("security")}\n\n${GUARANTEES.map((g) => `- ${g.name}: ${g.body}`).join("\n")}`);

  parts.push(
    `# Pricing\n\nURL: ${canonicalUrl("pricing")}\n\nAnnual licence; custom quote per plan.\n\n` +
      TIERS.map((t) => `## ${t.name}\n${t.forWho}\n${t.features.map((f) => `- ${f}`).join("\n")}`).join("\n\n"),
  );

  parts.push(`# Frequently asked questions\n\n${FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`);

  return new Response(parts.join("\n\n---\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
