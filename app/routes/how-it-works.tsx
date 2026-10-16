import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BlurFade } from "~/components/magicui/blur-fade";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { Accent, SectionHeading } from "~/components/sections/section-heading";
import { Button } from "~/components/ui/button";
import { steps } from "~/data/content";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/how-it-works";

const details: Record<string, string[]> = {
  "01": [
    "Name, email, LinkedIn and (optionally) GitHub",
    "Primary region and English level",
    "Your CV as PDF or Word",
  ],
  "02": [
    "We review your experience and written communication",
    "We map you to platforms by stack, seniority and region",
    "You hear back from us by email",
  ],
  "03": [
    "What each platform's assessment covers",
    "How reviewers judge rationales and code",
    "Introductions where we have a direct line",
  ],
  "04": [
    "Platforms pay you directly, on their terms",
    "We point you to higher-paying specialist work",
    "Credexus never takes a cut of your earnings",
  ],
};

export const meta: Route.MetaFunction = () =>
  seo({
    title: "How It Works — From Application to Paid AI Training Work",
    description:
      "See how Credexus screens, matches and prepares software engineers for remote AI training and evaluation projects, step by step.",
    path: "/how-it-works",
    jsonLd: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "How it works", path: "/how-it-works" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to get remote AI training work through Credexus",
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.body,
        })),
      },
    ],
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            Four steps to your <Accent>first paid task</Accent>
          </>
        }
        description="A human-led onboarding pipeline that gets strong engineers onto the right platforms — without the guesswork."
      />
      <section className="container-x py-12">
        <ol className="relative mx-auto max-w-3xl">
          <span
            aria-hidden
            className="from-accent/60 via-border-strong absolute top-2 bottom-2 left-[27px] w-px bg-gradient-to-b to-transparent"
          />
          {steps.map((s, i) => (
            <BlurFade
              as="li"
              key={s.n}
              delay={i * 0.05}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              <span className="border-border-strong bg-surface text-accent relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border font-serif text-xl italic">
                {s.n}
              </span>
              <div className="pt-2">
                <h2 className="text-foreground text-xl font-semibold sm:text-2xl">{s.title}</h2>
                <p className="text-muted mt-2 leading-relaxed">{s.body}</p>
                <ul className="text-muted mt-4 grid gap-2 text-sm sm:grid-cols-1">
                  {details[s.n]?.map((d) => (
                    <li key={d} className="flex items-center gap-2.5">
                      <span className="bg-accent size-1.5 rounded-full" aria-hidden /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          ))}
        </ol>
      </section>
      <section className="container-x py-16">
        <SectionHeading
          title="Hiring engineers instead?"
          description="Our partner process works in reverse: you brief us, we source and screen."
        />
        <div className="mt-8 text-center">
          <Button asChild variant="secondary">
            <Link to="/for-partners">
              Partner with us <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
