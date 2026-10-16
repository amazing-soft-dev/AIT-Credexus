import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("for-engineers", "routes/for-engineers.tsx"),
  route("for-partners", "routes/for-partners.tsx"),
  route("how-it-works", "routes/how-it-works.tsx"),
  route("about", "routes/about.tsx"),
  route("faq", "routes/faq.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("platforms", "routes/platforms.tsx"),
  route("platforms/:platformSlug", "routes/platform.tsx"),
  route("jobs", "routes/jobs.tsx"),
  route("jobs/:jobId", "routes/job.tsx"),
  // Regional landing pages share one module
  ...(["latam", "asia", "europe", "canada"] as const).map((r) =>
    route(r, "routes/region.tsx", { id: `region-${r}` }),
  ),

  // Resource routes
  route("api/apply", "routes/api.apply.ts"),
  route("api/partner", "routes/api.partner.ts"),
  route("api/contact", "routes/api.contact.ts"),
  route("api/geo", "routes/api.geo.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
