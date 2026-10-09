import { FEATURE_GROUPS, USE_CASES } from "@/lib/content";
import { FEATURE_PAGES } from "@/lib/features";
import { CONTACT, MAKER, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

// llmstxt.org format: a short, link-rich map of the site for AI answer engines.
export function GET() {
  const body = `# FitRank

> ${SITE_DESCRIPTION} Sold as an annual licence; currently in early access. Built by ${MAKER.name} (${MAKER.url}). Contact: ${CONTACT.email}.

Key facts:
- FitRank recommends; it never assigns people automatically. A manager accepts or rejects every suggestion.
- Matching uses five typed decisions (skill match, level fit, domain relevance, delivery risk, overall fit), each a probability over fixed options, from a small in-house model that runs on CPU.
- Protected attributes (gender, age, religion, caste and others) are never stored, sent to AI or used as signals. Names never go to a language model.
- Benchmark (synthetic data, 40 unseen tasks, 647 people, Oct 2026): best person in the top five 94.3% vs 91.4% for rules only; pairwise ranking 88.7% vs 86.1%; calibration error 2.2%.

## Pages
- [Features](${canonicalUrl("features")}): every feature by role
- [How it works](${canonicalUrl("how-it-works")}): rules, facts, typed decisions, checks, human decision
- [Benchmarks](${canonicalUrl("results")}): results against a rules-only ranking, including weaknesses
- [Trust and privacy](${canonicalUrl("security")}): guarantees on fairness, privacy and audit
- [Pricing](${canonicalUrl("pricing")}): annual plans (Early access pilot, Team, Enterprise)
- [Pre-register](${canonicalUrl("early-access")}): join the early-access pilot
- [Contact sales](${canonicalUrl("contact")})

## Feature areas
${FEATURE_GROUPS.map((g) => `- ${g.role}: ${g.summary} (${canonicalUrl("features")}#${g.id})`).join("\n")}

## Capabilities (one page each, with real screenshots)
${FEATURE_PAGES.map((f) => `- [${f.name}](${canonicalUrl(`features/${f.slug}`)}): ${f.description}`).join("\n")}

## Use cases
${USE_CASES.map((u) => `- [${u.title}](${canonicalUrl(`use-cases/${u.slug}`)}): ${u.description}`).join("\n")}

## Optional
- [Full text for AI](${SITE_URL}/llms-full.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
