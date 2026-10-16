import { ArrowLeft, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { data, Link } from "react-router";
import { ApplicationForm } from "~/components/forms";
import { DotPattern } from "~/components/magicui/dot-pattern";
import { Badge } from "~/components/ui/badge";
import { jobById } from "~/data/jobs";
import { regionBySlug } from "~/data/regions";
import { site } from "~/data/site";
import { absoluteUrl, breadcrumbLd, cacheHeaders, SITE_URL, seo } from "~/lib/seo";
import type { Route } from "./+types/job";

export function loader({ params }: Route.LoaderArgs) {
  const job = jobById(params.jobId);
  if (!job) throw data(null, { status: 404 });
  return { job };
}

export const meta: Route.MetaFunction = ({ data: d }) => {
  if (!d) return seo({ title: "Role not found", description: "", path: "/jobs", noindex: true });
  const j = d.job;
  const regionNames = j.regions.map((r) => regionBySlug(r)!.name);
  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: j.title, path: `/jobs/${j.id}` },
  ]);
  const posting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: `<p>${j.summary}</p><ul>${j.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    datePosted: j.posted,
    ...(j.validThrough ? { validThrough: j.validThrough } : {}),
    employmentType: "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: SITE_URL,
      logo: absoluteUrl("/logo.png"),
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: regionNames.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    ...(j.payRange
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: j.payRange.currency,
            value: {
              "@type": "QuantitativeValue",
              minValue: j.payRange.min,
              maxValue: j.payRange.max,
              unitText: j.payRange.unit,
            },
          },
        }
      : {}),
    directApply: true,
  };
  return seo({
    title: `${j.title} — Remote (${j.regions.length === 4 ? "Global" : regionNames.join(", ")})`,
    description: j.summary,
    path: `/jobs/${j.id}`,
    // Example listings are not real openings: keep them out of search and Google for Jobs.
    noindex: j.sample,
    jsonLd: j.sample ? crumbs : [crumbs, posting],
  });
};

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function JobPage({ loaderData }: Route.ComponentProps) {
  const { job: j } = loaderData;
  const regionLabel =
    j.regions.length === 4
      ? "Latam · Asia · Europe · Canada"
      : j.regions.map((r) => regionBySlug(r)!.short).join(" · ");
  const facts = [
    { icon: MapPin, label: "Remote", value: regionLabel },
    { icon: Briefcase, label: "Type", value: j.type },
    { icon: Clock, label: "Hours", value: j.hoursPerWeek },
    ...(j.pay ? [{ icon: DollarSign, label: "Pay", value: j.pay }] : []),
  ];
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-10 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(63_79_217/0.32),transparent_70%)]"
        />
        <DotPattern className="-z-10 opacity-50" />
        <div className="container-x">
          <Link
            to="/jobs"
            className="text-muted hover:text-foreground inline-flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="size-4" aria-hidden /> All roles
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{j.seniority}</Badge>
            {j.stack.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
            {j.sample && (
              <Badge variant="outline" className="border-dashed">
                Example role
              </Badge>
            )}
          </div>
          <h1 className="text-gradient mt-5 max-w-3xl text-4xl leading-[1.1] font-semibold sm:text-5xl">
            {j.title}
          </h1>
          <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed">{j.summary}</p>
          <dl className="border-border bg-border mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-background p-5">
                <dt className="text-subtle flex items-center gap-2 text-xs">
                  <f.icon className="size-3.5" aria-hidden /> {f.label}
                </dt>
                <dd className="text-foreground mt-1.5 text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-x grid gap-12 py-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-10">
          <Block title="What you'll do" items={j.responsibilities} />
          <Block title="What we're looking for" items={j.requirements} />
          {j.niceToHave && <Block title="Nice to have" items={j.niceToHave} />}
          <p className="text-subtle text-xs leading-relaxed">
            Rates are indicative and set by the platform you're placed with. Credexus is free for
            candidates.
            {j.sample && " This is an example listing showing the type of role we place for."}
          </p>
        </div>
        <div id="apply" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <ApplicationForm
            jobId={j.id}
            defaultRegion={j.regions.length === 1 ? j.regions[0] : undefined}
            title="Apply for this role"
          />
        </div>
      </section>
    </>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="text-muted flex gap-3 leading-relaxed">
            <span className="bg-accent mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
