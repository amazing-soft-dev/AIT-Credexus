import { Search } from "lucide-react";
import { Form, Link, useNavigation } from "react-router";
import { CtaBand } from "~/components/sections/cta-band";
import { JobCard } from "~/components/sections/job-card";
import { PageHero } from "~/components/sections/page-hero";
import { Input } from "~/components/ui/input";
import { jobs } from "~/data/jobs";
import { regionBySlug, regions, type RegionSlug } from "~/data/regions";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/jobs";

export function loader({ url }: Route.LoaderArgs) {
  const regionParam = url.searchParams.get("region");
  const region = regionParam && regionBySlug(regionParam) ? (regionParam as RegionSlug) : null;
  const q = (url.searchParams.get("q") ?? "").trim().slice(0, 80);
  const needle = q.toLowerCase();
  const results = jobs.filter(
    (j) =>
      (!region || j.regions.includes(region)) &&
      (!needle || [j.title, j.summary, ...j.stack].some((s) => s.toLowerCase().includes(needle))),
  );
  return { results, region, q, hasSamples: jobs.some((j) => j.sample) };
}

export const meta: Route.MetaFunction = ({ data: d }) => {
  const r = d?.region ? regionBySlug(d.region) : undefined;
  return seo({
    title: r
      ? `Remote AI Training Jobs in ${r.name}`
      : "Remote AI Training Jobs for Software Engineers",
    description: r
      ? `Open AI training, RLHF and code-evaluation roles for software engineers in ${r.name}. Remote, flexible, free to apply.`
      : "Browse remote AI training, RLHF and code-evaluation roles for software engineers in Latam, Asia, Europe and Canada.",
    path: r ? `/jobs?region=${r.slug}` : "/jobs",
    // Filtered/search views shouldn't compete with the canonical list in search results
    noindex: Boolean(d?.q),
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Jobs", path: "/jobs" },
    ]),
  });
};

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function Jobs({ loaderData }: Route.ComponentProps) {
  const { results, region, q, hasSamples } = loaderData;
  const nav = useNavigation();
  const loading = nav.state === "loading" && nav.location?.pathname === "/jobs";
  const tab = (slug: string | null) => {
    const sp = new URLSearchParams();
    if (slug) sp.set("region", slug);
    if (q) sp.set("q", q);
    const s = sp.toString();
    return s ? `/jobs?${s}` : "/jobs";
  };

  return (
    <>
      <PageHero
        eyebrow="Open roles"
        title="Remote AI training roles"
        description="Flexible contracts for software engineers. Apply to a role — or apply once and we'll match you."
      />
      <section className="container-x pb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Filter by region" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
            {[{ slug: null, short: "All regions" }, ...regions].map((r) => {
              const active = (r.slug ?? null) === region;
              return (
                <Link
                  key={r.short}
                  to={tab(r.slug)}
                  preventScrollReset
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                    active
                      ? "border-primary/50 bg-primary/20 text-foreground"
                      : "border-border text-muted hover:text-foreground",
                  )}
                >
                  {r.short}
                </Link>
              );
            })}
          </nav>
          <Form method="get" role="search" className="relative md:w-72" preventScrollReset>
            {region && <input type="hidden" name="region" value={region} />}
            <label htmlFor="job-q" className="sr-only">
              Search roles
            </label>
            <Search
              className="text-subtle pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
              aria-hidden
            />
            <Input
              id="job-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Search stack or title"
              className="h-11 pl-11"
            />
          </Form>
        </div>

        {hasSamples && (
          <p className="border-border-strong text-subtle mt-6 rounded-xl border border-dashed px-4 py-3 text-xs">
            Roles marked “Example role” illustrate the kinds of work we place for. Apply and
            we&apos;ll match you with live openings.
          </p>
        )}

        <h2 className="sr-only">Open roles</h2>
        <p className="text-muted mt-8 text-sm" aria-live="polite">
          {results.length} {results.length === 1 ? "role" : "roles"}
          {region ? ` in ${regionBySlug(region)!.name}` : ""}
          {q ? ` matching “${q}”` : ""}
        </p>
        <ul
          className={cn(
            "mt-4 grid gap-4 transition-opacity md:grid-cols-2 lg:grid-cols-3",
            loading && "opacity-60",
          )}
        >
          {results.map((j) => (
            <li key={j.id}>
              <JobCard job={j} />
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <div className="card mt-4 p-10 text-center">
            <p className="text-foreground">No roles match that search yet.</p>
            <p className="text-muted mt-2 text-sm">
              <Link to="/for-engineers#apply" className="text-accent underline underline-offset-4">
                Apply anyway
              </Link>{" "}
              — we&apos;ll match you as new projects open.
            </p>
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}
