import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { AnimatedShinyText } from "~/components/magicui/animated-shiny-text";
import { BorderBeam } from "~/components/magicui/border-beam";
import { Button } from "~/components/ui/button";
import { platformBySlug } from "~/data/platforms";
import { Accent } from "./section-heading";
import { PlatformMark } from "./platform-mark";

const matches = [
  { slug: "outlier", fit: 94, task: "Python code evaluation" },
  { slug: "mercor", fit: 89, task: "Agentic coding tasks" },
  { slug: "alignerr", fit: 82, task: "Reasoning & review" },
];

function MatchCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,rgb(90_107_255/0.32),transparent)]"
        aria-hidden
      />
      <div className="border-border-strong bg-surface/90 relative overflow-hidden rounded-3xl border p-5 shadow-2xl sm:p-6">
        <div className="flex items-center gap-3">
          <span className="from-accent to-primary-strong grid size-11 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white">
            LM
          </span>
          <div className="min-w-0">
            <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
              Senior Python Engineer
              <BadgeCheck className="text-accent size-4" aria-hidden />
            </p>
            <p className="text-subtle text-xs">São Paulo, Brazil · English C1 · 6 yrs</p>
          </div>
          <span className="border-success/30 bg-success/10 text-success ml-auto rounded-full border px-2.5 py-1 text-[11px] font-medium">
            Screened
          </span>
        </div>

        <div className="text-subtle mt-5 flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase">
          <Sparkles className="text-accent size-3.5" aria-hidden /> Best-fit platforms
        </div>
        <ul className="mt-3 space-y-2.5">
          {matches.map((mt, i) => {
            const p = platformBySlug(mt.slug)!;
            return (
              <li key={mt.slug} className="border-border bg-background/50 rounded-2xl border p-3">
                <div className="flex items-center gap-3">
                  <PlatformMark platform={p} className="size-7" />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm">{p.name}</p>
                    <p className="text-subtle truncate text-[11px]">{mt.task}</p>
                  </div>
                  <span className="text-foreground text-sm font-semibold tabular-nums">
                    {mt.fit}%
                  </span>
                </div>
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="from-primary to-accent animate-grow-x h-full origin-left rounded-full bg-gradient-to-r"
                    style={{ width: `${mt.fit}%`, animationDelay: `${0.5 + i * 0.15}s` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <BorderBeam size={140} duration={8} />
      </div>
      <p className="text-subtle mt-3 text-center text-[11px]">
        Illustrative example of a Credexus match
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <picture>
        <source media="(min-width: 1280px)" srcSet="/images/hero-grid-1920.webp" />
        <source media="(min-width: 768px)" srcSet="/images/hero-grid-1280.webp" />
        <img
          src="/images/hero-grid-768.webp"
          alt=""
          width={1920}
          height={1206}
          fetchPriority="low"
          decoding="async"
          className="absolute inset-0 -z-20 size-full object-cover object-bottom opacity-90"
        />
      </picture>
      <div
        className="from-background/80 via-background/30 to-background absolute inset-0 -z-10 bg-gradient-to-b"
        aria-hidden
      />
      <div
        className="to-background absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent"
        aria-hidden
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div className="text-center lg:text-left">
          <div className="animate-fade-up">
            <Link
              to="/jobs"
              className="border-border-strong bg-surface/80 inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-xs"
            >
              <span className="bg-primary rounded-full px-2 py-0.5 text-[11px] font-medium text-white">
                New
              </span>
              <AnimatedShinyText>AI training roles open across 4 regions</AnimatedShinyText>
              <ArrowRight className="text-muted size-3" aria-hidden />
            </Link>
          </div>

          <h1 className="text-gradient mt-7 text-[40px] leading-[1.04] font-semibold sm:text-6xl lg:text-[68px]">
            Get paid to train the <Accent>world&apos;s best</Accent> AI
          </h1>
          <p className="text-muted mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0">
            Credexus fast-tracks software engineers in Latam, Asia, Europe and Canada into remote,
            high-paying AI training and evaluation work — on the platforms frontier labs rely on.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/for-engineers#apply" prefetch="intent">
                Apply as an engineer <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link to="/for-partners" prefetch="intent">
                I&apos;m hiring engineers
              </Link>
            </Button>
          </div>

          <ul className="text-muted mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm lg:justify-start">
            {["Free for candidates", "Remote & flexible", "19 platforms, one application"].map(
              (t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <span className="bg-accent size-1.5 rounded-full" aria-hidden />
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <MatchCard />
        </div>
      </div>
    </section>
  );
}
