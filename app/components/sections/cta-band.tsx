import type * as React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BlurFade } from "~/components/magicui/blur-fade";
import { BorderBeam } from "~/components/magicui/border-beam";
import { LightRays } from "~/components/motion/light-rays";
import { Button } from "~/components/ui/button";
import { Accent } from "./section-heading";

export function CtaBand({
  title = (
    <>
      Your next project is <Accent>one application</Accent> away
    </>
  ),
  body = "Apply in three minutes. We will match you with the AI training platforms that fit your stack — free, always.",
  primary = { label: "Apply as an engineer", to: "/for-engineers#apply" },
  secondary = { label: "Hire through Credexus", to: "/for-partners" },
}: {
  title?: React.ReactNode;
  body?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string } | null;
}) {
  return (
    <section className="container-x py-20">
      <div className="border-border-strong relative isolate overflow-hidden rounded-3xl border px-6 pt-28 pb-16 text-center sm:px-16 sm:pt-40 sm:pb-20">
        {/* Rays from the top center, fading to near-black at the bottom of the panel. */}
        <div className="absolute inset-0 -z-20 bg-[#03040f]" />
        <LightRays position={50} className="absolute inset-0 -z-10 size-full" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-[18%] via-[#03040f]/55 to-[#03040f]" />
        <BlurFade y={30}>
          <h2 className="text-gradient mx-auto max-w-2xl text-3xl leading-[1.1] font-semibold sm:text-5xl">
            {title}
          </h2>
        </BlurFade>
        <BlurFade y={30} delay={0.1}>
          <p className="text-foreground/80 mx-auto mt-5 max-w-xl text-base sm:text-lg">{body}</p>
        </BlurFade>
        <BlurFade
          y={30}
          delay={0.2}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" variant="white">
            <Link to={primary.to}>
              {primary.label} <ArrowRight />
            </Link>
          </Button>
          {secondary && (
            <Button asChild size="lg" variant="secondary">
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          )}
        </BlurFade>
        <BorderBeam size={220} duration={10} />
      </div>
    </section>
  );
}
