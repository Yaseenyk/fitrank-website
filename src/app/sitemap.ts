import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const BUILT_AT = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: canonicalUrl(r.path),
    lastModified: BUILT_AT,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
