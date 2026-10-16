import { Link } from "react-router";
import { CtaBand } from "~/components/sections/cta-band";
import { FaqList, faqLd } from "~/components/sections/faq-list";
import { PageHero } from "~/components/sections/page-hero";
import { faqs } from "~/data/content";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/faq";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "FAQ — AI Training Jobs, Pay, Process & Partners",
    description:
      "Answers to common questions about Credexus, AI training work, eligibility, payments and partnering with us.",
    path: "/faq",
    jsonLd: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ]),
      faqLd(faqs),
    ],
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

const groups = ["Engineers", "Process", "Partners"] as const;

export default function Faq() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description={
          <>
            Everything you need to know. Still curious?{" "}
            <Link to="/contact" className="text-accent underline underline-offset-4">
              Get in touch
            </Link>
            .
          </>
        }
      />
      <div className="container-x mx-auto max-w-3xl space-y-14 py-8">
        {groups.map((g) => (
          <section key={g} aria-labelledby={`faq-${g}`}>
            <h2
              id={`faq-${g}`}
              className="text-subtle mb-5 text-xs font-medium tracking-[0.18em] uppercase"
            >
              {g}
            </h2>
            <FaqList items={faqs.filter((f) => f.group === g)} />
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
