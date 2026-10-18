import { ArrowRight, Clock, MapPin } from "lucide-react";
import { data, Link } from "react-router";
import { ApplicationForm } from "~/components/forms";
import { BlurFade } from "~/components/magicui/blur-fade";
import { CtaBand } from "~/components/sections/cta-band";
import { JobCard } from "~/components/sections/job-card";
import { PageHero } from "~/components/sections/page-hero";
import { PlatformMarquee } from "~/components/sections/platform-marquee";
import { RegionsGrid } from "~/components/sections/regions-grid";
import { Accent, SectionHeading } from "~/components/sections/section-heading";
import { Steps } from "~/components/sections/steps";
import { Button } from "~/components/ui/button";
import { jobs } from "~/data/jobs";
import { regionBySlug } from "~/data/regions";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/region";

export function loader({ url }: Route.LoaderArgs) {
  const slug = url.pathname.replace(/^\/|\/$/g, "");
  const region = regionBySlug(slug);
  if (!region) throw data(null, { status: 404 });
  return { region, roles: jobs.filter((j) => j.regions.includes(region.slug)).slice(0, 6) };
}

export const meta: Route.MetaFunction = ({ data: d }) => {
  if (!d) return seo({ title: "Not found", description: "", path: "/", noindex: true });
  const r = d.region;
  return seo({
    title: `AI Training Jobs for Software Engineers in ${r.name}`,
    description: `${r.intro} Free for engineers in ${r.countries.slice(0, 4).join(", ")} and across ${r.name}.`,
    path: `/${r.slug}`,
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: r.name, path: `/${r.slug}` },
    ]),
  });
};

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function RegionPage({ loaderData }: Route.ComponentProps) {
  const { region: r, roles } = loaderData;
  const [lead, ...rest] = r.headline.split(" for ");
  return (
    <>
      <PageHero
        eyebrow={r.name}
        title={
          <>
            {lead} for <Accent>{rest.join(" for ")}</Accent>
          </>
        }
        description={r.intro}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#apply">
                Apply from {r.short} <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to={`/jobs?region=${r.slug}`}>See {r.short} roles</Link>
            </Button>
          </div>
          <div className="text-muted flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin className="text-accent size-4" aria-hidden />
              {r.countries.slice(0, 5).join(" · ")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="text-accent size-4" aria-hidden />
              {r.timezones}
            </span>
          </div>
        </div>
      </PageHero>

      <section className="container-x py-12">
        <ul className="grid gap-4 md:grid-cols-3">
          {r.highlights.map((h, i) => (
            <BlurFade as="li" key={h.title} delay={i * 0.06} className="card p-6">
              <h2 className="text-base font-semibold">{h.title}</h2>
              <p className="text-muted mt-2 text-sm leading-relaxed">{h.body}</p>
            </BlurFade>
          ))}
        </ul>
      </section>

      <PlatformMarquee />

      {roles.length > 0 && (
        <section className="container-x py-16">
          <SectionHeading
            align="left"
            eyebrow="Open roles"
            title={`Roles open to engineers in ${r.name}`}
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((j) => (
              <li key={j.id}>
                <JobCard job={j} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-x py-16">
        <SectionHeading eyebrow="Process" title="How it works" />
        <div className="mt-12">
          <Steps />
        </div>
      </section>

      <section id="apply" className="container-x scroll-mt-24 py-16">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            align="left"
            eyebrow={`Apply from ${r.short}`}
            title={
              <>
                Start your application <Accent>today</Accent>
              </>
            }
            description="Three minutes, no cover letter, always free."
          />
          <ApplicationForm defaultRegion={r.slug} />
        </div>
      </section>

      <section className="container-x py-12">
        <h2 className="text-subtle mb-6 text-sm font-medium tracking-[0.14em] uppercase">
          Other regions
        </h2>
        <RegionsGrid exclude={r.slug} />
      </section>

      <CtaBand secondary={null} />
    </>
  );
}
