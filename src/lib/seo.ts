import type { Metadata } from "next";
import { MAKER, PRODUCT, SITE_DESCRIPTION, SITE_URL, CONTACT } from "@/lib/site";

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRODUCT_ID = `${SITE_URL}/#product`;
export const personRef = { "@id": MAKER.id };

const DESCRIPTION_MAX = 155;
const DESCRIPTION_MIN = 110;

/** Absolute, slash-terminated URL so canonicals never point at a redirect. */
export function canonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

/** First sentences of a summary, inside the search-snippet limit. */
export function seoDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= DESCRIPTION_MAX) return clean;
  const cut = clean.slice(0, DESCRIPTION_MAX);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
  if (lastStop >= DESCRIPTION_MIN) return cut.slice(0, lastStop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

/** Per-page metadata: canonical, Open Graph and Twitter all from one call. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  /** Share image; defaults to the site card. Feature pages pass their own screenshot. */
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const desc = seoDescription(description);
  const url = canonicalUrl(path);
  const og = image ?? { url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: title };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description: desc, url, siteName: PRODUCT, images: [og] },
    twitter: { card: "summary_large_image", title, description: desc, images: [og.url] },
  };
}

/** A page about the product, with its screenshots as ImageObjects (image search + AI answers). */
export function webPageJsonLd({
  path,
  name,
  description,
  shots,
}: {
  path: string;
  name: string;
  description: string;
  shots: { src: string; width: number; height: number; alt: string; caption: string }[];
}) {
  const images = shots.map((s) => ({
    "@type": "ImageObject",
    contentUrl: `${SITE_URL}${s.src}`,
    url: `${SITE_URL}${s.src}`,
    width: s.width,
    height: s.height,
    caption: s.caption,
    description: s.alt,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl(path)}#webpage`,
    url: canonicalUrl(path),
    name,
    description: seoDescription(description),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PRODUCT_ID },
    author: personRef,
    inLanguage: "en",
    ...(images.length ? { primaryImageOfPage: images[0], image: images } : {}),
  };
}

/** Sitewide entity graph, emitted once in the root layout. */
export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": MAKER.id,
      name: MAKER.name,
      jobTitle: MAKER.jobTitle,
      url: MAKER.url,
      email: `mailto:${CONTACT.email}`,
      sameAs: MAKER.sameAs,
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.city,
        addressCountry: CONTACT.country,
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: PRODUCT,
      description: SITE_DESCRIPTION,
      publisher: personRef,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": PRODUCT_ID,
      name: PRODUCT,
      url: `${SITE_URL}/`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Resource management and staffing",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      author: personRef,
      publisher: personRef,
      offers: {
        "@type": "Offer",
        category: "Annual subscription",
        availability: "https://schema.org/PreOrder",
        url: canonicalUrl("pricing"),
        seller: personRef,
      },
    },
  ],
};

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const crumbs = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

/** Built from the same array the page renders, so markup and visible text never drift. */
export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
