import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { data, Link } from "react-router";
import { ApplicationForm } from "~/components/forms";
import { DotPattern } from "~/components/magicui/dot-pattern";
import { PlatformMark } from "~/components/sections/platform-mark";
import { SectionHeading } from "~/components/sections/section-heading";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { platformBySlug, platforms } from "~/data/platforms";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/platform";

export function loader({ params }: Route.LoaderArgs) {
  const platform = platformBySlug(params.platformSlug);
  if (!platform) throw data(null, { status: 404 });
  const i = platforms.indexOf(platform);
  const related = [1, 2, 3].map((d) => platforms[(i + d) % platforms.length]!);
  return { platform, related };
}

export const meta: Route.MetaFunction = ({ data: d }) => {
  if (!d)
    return seo({ title: "Platform not found", description: "", path: "/platforms", noindex: true });
  const p = d.platform;
  return seo({
    title: `${p.name} Jobs for Software Engineers — Get Matched via Credexus`,
    description: `Want to work on ${p.name}${p.operator ? ` (${p.operator})` : ""}? ${p.summary} Apply once with Credexus to get matched — free for engineers.`,
    path: `/platforms/${p.slug}`,
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Platforms", path: "/platforms" },
      { name: p.name, path: `/platforms/${p.slug}` },
    ]),
  });
};

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function PlatformPage({ loaderData }: Route.ComponentProps) {
  const { platform: p, related } = loaderData;
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-12 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(63_79_217/0.32),transparent_70%)]"
        />
        <DotPattern className="-z-10 opacity-50" />
        <div className="container-x">
          <Link
            to="/platforms"
            className="text-muted hover:text-foreground inline-flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="size-4" aria-hidden /> All platforms
          </Link>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <PlatformMark platform={p} className="size-16 rounded-2xl text-lg" />
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{p.category}</Badge>
                {p.operator && <Badge variant="outline">by {p.operator}</Badge>}
              </div>
              <h1 className="text-gradient mt-3 text-4xl font-semibold sm:text-5xl">{p.name}</h1>
            </div>
          </div>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">{p.summary}</p>
        </div>
      </section>

      <section className="container-x grid gap-4 py-8 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-subtle text-sm font-medium tracking-[0.14em] uppercase">
            Typical work
          </h2>
          <ul className="mt-4 space-y-3">
            {p.workTypes.map((w) => (
              <li key={w} className="text-foreground flex items-center gap-3">
                <Check className="text-accent size-4" aria-hidden /> {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-subtle text-sm font-medium tracking-[0.14em] uppercase">
            Skills in demand
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.skills.map((s) => (
              <span
                key={s}
                className="border-border text-foreground rounded-lg border bg-white/[0.03] px-3 py-1.5 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-muted mt-6 text-sm leading-relaxed">
            Requirements, rates and availability are set by {p.name} and vary by project. We'll tell
            you what's open for your profile when we review your application.
          </p>
        </div>
      </section>

      <section id="apply" className="container-x scroll-mt-24 py-16">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            align="left"
            eyebrow="Get matched"
            title={`Interested in ${p.name}?`}
            description={`Apply once with Credexus. If ${p.name} is a strong fit for your profile we'll help you prepare — and we'll also tell you about other platforms that match.`}
          />
          <ApplicationForm />
        </div>
      </section>

      <section className="container-x py-12">
        <h2 className="text-subtle text-sm font-medium tracking-[0.14em] uppercase">
          Other platforms
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                to={`/platforms/${r.slug}`}
                prefetch="intent"
                className="card hover:border-border-strong flex items-center gap-3 p-4 transition-colors"
              >
                <PlatformMark platform={r} />
                <span className="text-foreground text-sm">{r.name}</span>
                <ArrowRight className="text-subtle ml-auto size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-subtle mt-10 text-xs">
          Credexus is an independent recruiting agency and is not affiliated with, endorsed by, or
          acting on behalf of {p.name}
          {p.operator ? ` or ${p.operator}` : ""}. Trademarks belong to their respective owners.
        </p>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link to="/jobs">
              Browse open roles <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
