import { Briefcase, Mail, UserRound } from "lucide-react";
import { ContactForm } from "~/components/forms";
import { PageHero } from "~/components/sections/page-hero";
import { site } from "~/data/site";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/contact";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Contact Credexus",
    description:
      "Questions about applying, partnerships or anything else? Get in touch with the Credexus team.",
    path: "/contact",
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

const channels = [
  { icon: UserRound, label: "Engineers", email: site.talentEmail },
  { icon: Briefcase, label: "Partners", email: site.partnersEmail },
  { icon: Mail, label: "General", email: site.email },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="We usually reply within one business day."
      />
      <section className="container-x grid gap-12 pb-12 lg:grid-cols-[0.8fr_1.2fr]">
        <ul className="space-y-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={`mailto:${c.email}`}
                className="card hover:border-border-strong flex items-center gap-4 p-5 transition-colors"
              >
                <span className="bg-primary/15 text-accent grid size-10 place-items-center rounded-xl">
                  <c.icon className="size-[18px]" aria-hidden />
                </span>
                <span>
                  <span className="text-subtle block text-sm">{c.label}</span>
                  <span className="text-foreground">{c.email}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <ContactForm />
      </section>
    </>
  );
}
