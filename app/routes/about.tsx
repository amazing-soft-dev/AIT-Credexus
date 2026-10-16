import { BlurFade } from "~/components/magicui/blur-fade";
import { CtaBand } from "~/components/sections/cta-band";
import { PageHero } from "~/components/sections/page-hero";
import { Accent, SectionHeading } from "~/components/sections/section-heading";
import { Stats } from "~/components/sections/stats";
import { breadcrumbLd, cacheHeaders, seo } from "~/lib/seo";
import type { Route } from "./+types/about";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "About Credexus",
    description:
      "Credexus is an independent recruiting agency connecting software engineers in Latam, Asia, Europe and Canada with AI training platforms.",
    path: "/about",
    jsonLd: breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  });

export const headers: Route.HeadersFunction = () => cacheHeaders();

const values = [
  {
    title: "Candidates first",
    body: "We are free for engineers, and always will be. Our job is to put you where you'll succeed — not wherever pays us fastest.",
  },
  {
    title: "Honest matching",
    body: "We tell you which platforms fit your profile and which don't, so you spend your time on applications that convert.",
  },
  {
    title: "Global by default",
    body: "Talent is everywhere. We focus on regions the AI training ecosystem underserves, and on the details that matter there.",
  },
  {
    title: "Privacy by design",
    body: "Your profile is never shared with a platform without your say-so, and you can ask us to delete your data at any time.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            We connect great engineers with the work <Accent>shaping AI</Accent>
          </>
        }
        description="Frontier AI models are only as good as the expert human data behind them. Credexus exists so that the engineers producing that data can come from anywhere."
      />
      <section className="container-x grid gap-12 py-12 lg:grid-cols-2">
        <BlurFade className="text-muted space-y-5 text-lg leading-relaxed">
          <p>
            AI labs and their training partners need thousands of experienced software engineers to
            write, review and evaluate code. But for an engineer in Bogotá, Manila, Kraków or
            Halifax, figuring out which platform to apply to — and how to pass its assessment — is a
            maze.
          </p>
          <p>
            <span className="text-foreground">Credexus is the shortcut.</span> We screen engineers
            once, match them to the platforms where they fit best, and help them prepare. Platforms
            get a pipeline of pre-vetted talent; engineers get remote, well-paid work without paying
            a cent.
          </p>
        </BlurFade>
        <ul className="grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <BlurFade as="li" key={v.title} delay={i * 0.06} className="card p-6">
              <h2 className="text-base font-semibold">{v.title}</h2>
              <p className="text-muted mt-2 text-sm leading-relaxed">{v.body}</p>
            </BlurFade>
          ))}
        </ul>
      </section>
      <section className="container-x py-16">
        <SectionHeading title="Credexus in numbers" />
        <div className="mt-10">
          <Stats />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
