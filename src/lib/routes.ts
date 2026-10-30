import { PUBLISHED } from "@/lib/blog";
import { USE_CASES } from "@/lib/content";
import { FEATURE_PAGES } from "@/lib/features";
import { TOOLS } from "@/lib/tools";

export type Route = { path: string; title: string; priority: number; lastModified?: string };

/** Every indexable page. Sitemap, llms.txt and the build check all read this list. */
export const ROUTES: Route[] = [
  { path: "", title: "FitRank home", priority: 1 },
  { path: "features", title: "Features", priority: 0.9 },
  { path: "use-cases", title: "Use cases", priority: 0.9 },
  { path: "how-it-works", title: "How FitRank decides", priority: 0.8 },
  { path: "results", title: "Benchmarks", priority: 0.7 },
  { path: "security", title: "Trust, privacy and fairness", priority: 0.8 },
  { path: "hire", title: "FitRank Hire", priority: 0.8 },
  { path: "blog", title: "Blog", priority: 0.7 },
  { path: "tools", title: "Free scheduling tools", priority: 0.7 },
  { path: "pricing", title: "Pricing: annual plans", priority: 0.9 },
  { path: "early-access", title: "Pre-register for early access", priority: 0.9 },
  { path: "contact", title: "Contact sales", priority: 0.8 },
  { path: "privacy", title: "Privacy notice", priority: 0.2 },
  ...FEATURE_PAGES.map((f) => ({ path: `features/${f.slug}`, title: f.name, priority: 0.8 })),
  ...TOOLS.map((t) => ({ path: `tools/${t.slug}`, title: t.title, priority: 0.8 })),
  ...PUBLISHED.map((p) => ({ path: `blog/${p.slug}`, title: p.title, priority: 0.6, lastModified: p.date })),
  ...USE_CASES.map((u) => ({ path: `use-cases/${u.slug}`, title: u.title, priority: 0.7 })),
];
