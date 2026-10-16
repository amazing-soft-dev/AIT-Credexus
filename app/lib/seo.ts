import type { MetaDescriptor } from "react-router";
import { site } from "~/data/site";

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://credexus.com").replace(
  /\/$/,
  "",
);

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/** Builds a complete, consistent set of meta tags for a route. */
export function seo({
  title,
  description,
  path,
  image = "/og-image.jpg",
  type = "website",
  noindex,
  jsonLd,
}: SeoInput): MetaDescriptor[] {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const img = image.startsWith("http") ? image : absoluteUrl(image);
  const tags: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${site.name} — ${site.tagline}` },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (noindex) tags.push({ name: "robots", content: "noindex, follow" });
  if (jsonLd) {
    for (const block of Array.isArray(jsonLd) ? jsonLd : [jsonLd]) {
      tags.push({ "script:ld+json": block });
    }
  }
  return tags;
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: SITE_URL,
  logo: absoluteUrl("/logo.png"),
  email: site.email,
  description: site.description,
  sameAs: Object.values(site.socials),
});

/** Long-lived CDN caching for static marketing pages. */
export const cacheHeaders = () => ({
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
});
