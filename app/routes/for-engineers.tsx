import { Check } from "lucide-react";
import { ApplicationForm } from "~/components/forms";
import { BlurFade } from "~/components/magicui/blur-fade";
import { Benefits } from "~/components/sections/benefits";
import { FaqList, faqLd } from "~/components/sections/faq-list";
import { PageHero } from "~/components/sections/page-hero";
import { PlatformMarquee } from "~/components/sections/platform-marquee";
import { Accent, SectionHeading } from "~/components/sections/section-heading";
import { Steps } from "~/components/sections/steps";
import { faqs, screeningCriteria } from "~/data/content";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/for-engineers";

const engineerFaqs = faqs.filter((f) => f.group !== "Partners");

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Apply — Remote AI Training Jobs for Software Engineers",
    description:
      "Apply once and get matched with remote AI training and evaluation work across 19 platforms. Free for engineers in Latam, Asia, Europe and Canada.",
    path: "/for-engineers",
    jsonLd: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "For Engineers", path: "/for-engineers" },
      ]),
      faqLd(engineerFaqs),
    ],
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function ForEngineers() {
  return (
    <>
      <PageHero
        eyebrow="For engineers"
        title={
          <>
            Your code review skills, <Accent>now a paid career</Accent>
          </>
        }
        description="Apply once. We match you with the AI training platforms where your stack, seniority and region are in demand — and help you get through their assessments."
      />

      <section className="container-x py-12" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="sr-only">
          Why engineers choose Credexus
        </h2>
        <Benefits />
      </section>

      <PlatformMarquee />

      <section className="container-x py-20">
        <SectionHeading eyebrow="Process" title="How we get you onboarded" />
        <div className="mt-12">
          <Steps />
        </div>
      </section>

      <section id="apply" className="container-x scroll-mt-24 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Apply"
              title={
                <>
                  Apply in <Accent>3 minutes</Accent>
                </>
              }
              description="No cover letter. We read every application."
            />
            <h3 className="text-subtle mt-10 text-sm font-medium tracking-[0.14em] uppercase">
              What we look for
            </h3>
            <ul className="mt-5 space-y-5">
              {screeningCriteria.map((c, i) => (
                <BlurFade as="li" key={c.title} delay={i * 0.06} className="flex gap-4">
                  <span className="bg-primary/20 text-accent mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-foreground font-medium">{c.title}</p>
                    <p className="text-muted mt-1 text-sm leading-relaxed">{c.body}</p>
                  </div>
                </BlurFade>
              ))}
            </ul>
          </div>
          <ApplicationForm />
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList items={engineerFaqs} />
        </div>
      </section>
    </>
  );
}
