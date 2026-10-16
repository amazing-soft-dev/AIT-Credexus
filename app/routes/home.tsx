import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { GeoSuggest } from "~/components/sections/geo-suggest";
import { Benefits } from "~/components/sections/benefits";
import { CtaBand } from "~/components/sections/cta-band";
import { FaqList, faqLd } from "~/components/sections/faq-list";
import { Hero } from "~/components/sections/hero";
import { MatchShowcase } from "~/components/sections/match-showcase";
import { Mission } from "~/components/sections/mission";
import { WorkTabs } from "~/components/sections/work-tabs";
import { BlurFade } from "~/components/magicui/blur-fade";
import { ScrollZoom } from "~/components/motion/scroll-zoom";
import { STAGGER } from "~/lib/motion";
import { JobCard } from "~/components/sections/job-card";
import { PlatformMarquee } from "~/components/sections/platform-marquee";
import { RegionsGrid } from "~/components/sections/regions-grid";
import { Accent, SectionHeading } from "~/components/sections/section-heading";
import { Stats } from "~/components/sections/stats";
import { Steps } from "~/components/sections/steps";
import { Testimonials } from "~/components/sections/testimonials";
import { Button } from "~/components/ui/button";
import { faqs } from "~/data/content";
import { jobs } from "~/data/jobs";
import { site } from "~/data/site";
import { cacheHeaders, organizationLd, SITE_URL, seo } from "~/lib/seo";
import type { Route } from "./+types/home";

const homeFaqs = faqs.filter((f) => f.group !== "Partners").slice(0, 5);

export const meta: Route.MetaFunction = () =>
  seo({
    title: `${site.name} — Remote AI Training Jobs for Software Engineers`,
    description: site.description,
    path: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        url: SITE_URL,
      },
      organizationLd(),
      faqLd(homeFaqs),
    ],
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformMarquee />
      <MatchShowcase />
      <div className="cv-auto">
        <WorkTabs />
      </div>
      <div className="cv-auto">
        <Mission />
      </div>

      <section className="cv-auto container-x py-20">
        <SectionHeading
          eyebrow="Why Credexus"
          title={
            <>
              Skip the guesswork. <Accent>Get matched</Accent> where you&apos;ll get accepted.
            </>
          }
          description="AI labs need experienced engineers to write, review and rank code. There are dozens of platforms doing this work — we know which ones fit your stack, level and region."
        />
        <div className="mt-14">
          <Stats />
        </div>
        <div className="mt-6">
          <Benefits />
        </div>
      </section>

      <section className="cv-auto container-x py-20">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From application to <Accent>first paid task</Accent>
            </>
          }
          description="A simple, human-led process designed to get strong engineers earning quickly."
        />
        <div className="mt-14">
          <Steps />
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="secondary">
            <Link to="/how-it-works">
              See the full process <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="cv-auto container-x py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Open roles"
            title="AI training roles we're hiring for"
            description="Flexible, remote contracts for engineers who care about getting the details right."
          />
          <Button asChild variant="secondary" className="shrink-0">
            <Link to="/jobs" prefetch="intent">
              View all roles <ArrowRight />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.slice(0, 3).map((j, i) => (
            <BlurFade as="li" key={j.id} delay={i * STAGGER}>
              <JobCard job={j} />
            </BlurFade>
          ))}
        </ul>
      </section>

      <section className="cv-auto container-x overflow-x-clip py-24">
        {/* Avenna "Meet the Expert": heading zooms from 1.8× to 1× as it scrolls in */}
        <ScrollZoom>
          <SectionHeading
            animate={false}
            eyebrow="Regions"
            title={
              <>
                Built for engineers <Accent>everywhere</Accent> AI needs them
              </>
            }
            description="We focus on four regions where great engineers are underrepresented on AI training platforms."
          />
        </ScrollZoom>
        <div className="mt-14">
          <RegionsGrid />
        </div>
      </section>

      <Testimonials />

      <section className="cv-auto container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions engineers ask us"
          description={
            <>
              Can&apos;t find your answer?{" "}
              <Link to="/faq" className="text-accent underline underline-offset-4">
                See all FAQs
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="text-accent underline underline-offset-4">
                contact us
              </Link>
              .
            </>
          }
        />
        <FaqList items={homeFaqs} />
      </section>

      <CtaBand />
      <GeoSuggest />
    </>
  );
}
