import { jobs } from "~/data/jobs";
import { platforms } from "~/data/platforms";
import { regions } from "~/data/regions";
import { site } from "~/data/site";
import { absoluteUrl } from "~/lib/seo";

type Entry = {
  path: string;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  lastmod?: string;
};

export function loader() {
  const entries: Entry[] = [
    { path: "/", priority: 1, changefreq: "weekly" },
    { path: "/for-engineers", priority: 0.9, changefreq: "weekly" },
    { path: "/jobs", priority: 0.9, changefreq: "daily" },
    { path: "/for-partners", priority: 0.8, changefreq: "monthly" },
    { path: "/how-it-works", priority: 0.7, changefreq: "monthly" },
    { path: "/platforms", priority: 0.7, changefreq: "monthly" },
    { path: "/faq", priority: 0.6, changefreq: "monthly" },
    { path: "/about", priority: 0.5, changefreq: "monthly" },
    { path: "/contact", priority: 0.5, changefreq: "yearly" },
    { path: "/privacy", priority: 0.2, changefreq: "yearly", lastmod: site.legalUpdated },
    { path: "/terms", priority: 0.2, changefreq: "yearly", lastmod: site.legalUpdated },
    ...regions.map((r) => ({ path: `/${r.slug}`, priority: 0.8, changefreq: "weekly" as const })),
    ...platforms.map((p) => ({
      path: `/platforms/${p.slug}`,
      priority: 0.6,
      changefreq: "monthly" as const,
    })),
    // Example (sample) jobs are deliberately excluded.
    ...jobs
      .filter((j) => !j.sample)
      .map((j) => ({
        path: `/jobs/${j.id}`,
        priority: 0.7,
        changefreq: "weekly" as const,
        lastmod: j.posted,
      })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${absoluteUrl(e.path)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}<changefreq>${e.changefreq}</changefreq><priority>${e.priority.toFixed(1)}</priority></url>`,
  )
  .join("\n")}
</urlset>`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
