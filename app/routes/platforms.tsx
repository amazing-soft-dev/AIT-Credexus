import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { BlurFade } from "~/components/magicui/blur-fade";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { PlatformMark } from "~/components/sections/platform-mark";
import { platforms } from "~/data/platforms";
import { absoluteUrl, breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/platforms";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "AI Training Platforms Our Candidates Work On",
    description: `Explore the ${platforms.length} AI training and evaluation platforms Credexus candidates work on — from Outlier and Mercor to Turing and Alignerr.`,
    path: "/platforms",
    jsonLd: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Platforms", path: "/platforms" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: platforms.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: absoluteUrl(`/platforms/${p.slug}`),
        })),
      },
    ],
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function Platforms() {
  return (
    <>
      <PageHero
        eyebrow="Platforms"
        title="Platforms our candidates work on"
        description="One application to Credexus covers all of them. We'll tell you which fit your profile best."
      />
      <section className="container-x pb-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <BlurFade as="li" key={p.slug} delay={(i % 3) * 0.05}>
              <Link
                to={`/platforms/${p.slug}`}
                prefetch="intent"
                className="card group hover:border-border-strong hover:bg-surface flex h-full flex-col p-6 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <PlatformMark platform={p} className="size-10 text-xs" />
                  <div className="min-w-0">
                    <h2 className="text-foreground truncate font-semibold">{p.name}</h2>
                    <p className="text-subtle truncate text-xs">
                      {p.operator ? `by ${p.operator}` : p.category}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="text-subtle group-hover:text-accent ml-auto size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </div>
                <p className="text-muted mt-4 line-clamp-3 text-sm leading-relaxed">{p.summary}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {p.workTypes.map((w) => (
                    <span
                      key={w}
                      className="text-muted rounded-md bg-white/[0.04] px-2 py-1 text-xs"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </Link>
            </BlurFade>
          ))}
        </ul>
        <p className="text-subtle mt-10 text-center text-xs">
          Credexus is an independent recruiting agency. Listing a platform does not imply
          affiliation or endorsement. All trademarks belong to their respective owners.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
