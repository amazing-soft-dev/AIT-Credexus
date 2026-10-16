import { Mail } from "lucide-react";
import { PartnerForm } from "~/components/forms";
import { BlurFade } from "~/components/magicui/blur-fade";
import { FaqList, faqLd } from "~/components/sections/faq-list";
import { PageHero } from "~/components/sections/page-hero";
import { RegionsGrid } from "~/components/sections/regions-grid";
import { Accent, SectionHeading } from "~/components/sections/section-heading";
import { faqs, partnerBenefits } from "~/data/content";
import { site } from "~/data/site";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/for-partners";

const partnerFaqs = faqs.filter((f) => f.group === "Partners");

export const meta: Route.MetaFunction = () =>
  seo({
    title: "For AI Training Platforms — Source Vetted Software Engineers",
    description:
      "Credexus sources pre-screened software engineers across Latam, Asia, Europe and Canada for AI training, RLHF and model-evaluation projects.",
    path: "/for-partners",
    jsonLd: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "For Partners", path: "/for-partners" },
      ]),
      faqLd(partnerFaqs),
    ],
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

const pipeline = [
  { k: "Brief", v: "Share stacks, seniority, languages, regions and volume." },
  { k: "Source", v: "We tap our four-region network and targeted outreach." },
  { k: "Screen", v: "Coding depth, written English and reasoning are reviewed." },
  { k: "Deliver", v: "You receive a shortlist ready for your own assessment." },
];

export default function ForPartners() {
  return (
    <>
      <PageHero
        eyebrow="For partners"
        title={
          <>
            Engineering talent for <Accent>AI training</Accent> at scale
          </>
        }
        description="We source and pre-screen software engineers across four regions so your projects ramp faster — without growing your recruiting team."
      />

      <section className="container-x py-12" aria-labelledby="partner-benefits">
        <h2 id="partner-benefits" className="sr-only">
          Why partner with Credexus
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnerBenefits.map((b, i) => (
            <BlurFade as="li" key={b.title} delay={i * 0.06} className="card p-6">
              <h3 className="text-base font-semibold">{b.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">{b.body}</p>
            </BlurFade>
          ))}
        </ul>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Pipeline" title="From brief to shortlist" />
        <ol className="border-border bg-border mt-12 grid gap-px overflow-hidden rounded-3xl border md:grid-cols-4">
          {pipeline.map((p, i) => (
            <li key={p.k} className="bg-background p-6">
              <span className="text-subtle text-xs tabular-nums">0{i + 1}</span>
              <p className="text-accent mt-3 font-serif text-3xl italic">{p.k}</p>
              <p className="text-muted mt-3 text-sm leading-relaxed">{p.v}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Network reach" title="Talent across four regions" />
        <div className="mt-12">
          <RegionsGrid />
        </div>
      </section>

      <section id="inquire" className="container-x scroll-mt-24 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Talk to us"
              title="Tell us what you're building"
              description="We'll reply within one business day with a realistic plan and timeline."
            />
            <a
              href={`mailto:${site.partnersEmail}`}
              className="text-accent mt-8 inline-flex items-center gap-2 hover:underline"
            >
              <Mail className="size-4" aria-hidden /> {site.partnersEmail}
            </a>
            <div className="mt-12">
              <FaqList items={partnerFaqs} />
            </div>
          </div>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}
