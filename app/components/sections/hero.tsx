import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { AnimatedShinyText } from "~/components/magicui/animated-shiny-text";
import { Button } from "~/components/ui/button";
import { SCROLL_SPRING } from "~/lib/motion";
import { useMediaQuery } from "~/lib/use-in-view";
import { Accent } from "./section-heading";

/** Scroll targets per breakpoint, taken from the Avenna hero ("Graphic" transform targets). */
const TARGETS = {
  desktop: { scale: 2.4, y: 100, opacity: 1 },
  tablet: { scale: 2.6, y: 68, opacity: 1 },
  mobile: { scale: 4, y: -200, opacity: 0 },
} as const;

/**
 * Pinned hero (Avenna "Desktop - Animated"):
 *  - the section is ~1.75 viewports tall with a sticky stage
 *  - as you scroll, the glowing grid card (held by two hands) zooms 1 → 2.4 and drifts down,
 *    filling the screen, while the headline lifts (-50px) and the copy/CTA drop (+50px) as
 *    both fade out — all spring-smoothed (damping 60, stiffness 500)
 *  - on load the content fades in (0.6s, cubic-bezier(.44,0,.56,1))
 */
export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 809.98px)");
  const isTablet = useMediaQuery("(min-width: 810px) and (max-width: 1199.98px)");
  const t = isMobile ? TARGETS.mobile : isTablet ? TARGETS.tablet : TARGETS.desktop;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, SCROLL_SPRING);

  const scale = useTransform(p, [0, 1], [1, t.scale]);
  const y = useTransform(p, [0, 1], [0, t.y]);
  const graphicOpacity = useTransform(p, [0, 1], [1, t.opacity]);
  const contentOpacity = useTransform(p, [0, 0.45], [1, 0]);
  const headUp = useTransform(p, [0, 0.45], [0, -50]);
  const copyDown = useTransform(p, [0, 0.45], [0, 50]);

  return (
    <section ref={ref} aria-label="Introduction" className="relative h-[175svh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* ambient glow behind the card */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_55%,rgb(63_79_217/0.35),transparent_70%)]"
        />

        {/* Graphic: grid card + hands, zooms on scroll. Outer div centres, inner m.div animates. */}
        <div className="animate-fade-in absolute top-[79%] left-1/2 w-[92vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:w-[78vw] lg:w-[56vw]">
          <m.div
            aria-hidden
            className="relative aspect-[2604/1636]"
            style={{ scale, y, opacity: graphicOpacity }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[22px] shadow-[0_0_0_1px_rgb(160_175_255/0.35),0_0_40px_-8px_rgb(90_107_255/0.6)] sm:rounded-[28px]">
              <picture>
                <source media="(min-width: 1440px)" srcSet="/images/hero-grid-2560.webp" />
                <source media="(min-width: 810px)" srcSet="/images/hero-grid-1920.webp" />
                <img
                  src="/images/hero-grid-1280.webp"
                  alt=""
                  width={1920}
                  height={1206}
                  fetchPriority="high"
                  decoding="async"
                  className="size-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-[#06071a]/55 via-transparent to-[#06071a]/20" />
            </div>
            <img
              src="/images/hand-left.webp"
              alt=""
              width={340}
              height={764}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute top-[43%] -left-[13%] w-[24%] [mask-image:linear-gradient(to_bottom,black_55%,transparent_92%)]"
            />
            <img
              src="/images/hand-right.webp"
              alt=""
              width={370}
              height={780}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute top-[31%] -right-[14%] w-[26%] [mask-image:linear-gradient(to_bottom,black_55%,transparent_92%)]"
            />
          </m.div>
        </div>

        {/* Content */}
        {/* CSS load fade lives on the wrapper so it can't override the scroll-driven opacity */}
        <div className="animate-fade-in relative z-10 max-sm:-translate-y-[11vh]">
          <m.div
            className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center"
            style={{ opacity: contentOpacity }}
          >
            <m.div style={{ y: headUp }} className="flex flex-col items-center">
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
              <h1 className="text-gradient mt-6 text-[40px] leading-[1.04] font-semibold [text-shadow:0_4px_30px_rgb(6_7_26/0.6)] sm:text-6xl lg:text-[72px]">
                Get paid to train the <Accent>world&apos;s best</Accent> AI
              </h1>
            </m.div>
            <m.div style={{ y: copyDown }} className="flex flex-col items-center">
              <p className="text-foreground/80 mt-6 max-w-xl text-base leading-relaxed [text-shadow:0_2px_16px_rgb(6_7_26/0.8)] sm:text-lg">
                Credexus fast-tracks software engineers in Latam, Asia, Europe and Canada into
                remote, high-paying AI training and evaluation work.
              </p>
              <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button asChild size="lg" variant="white" className="w-full sm:w-auto">
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
              <ul className="text-muted mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                {["Free for candidates", "Remote & flexible", "19 platforms, one application"].map(
                  (x) => (
                    <li key={x} className="inline-flex items-center gap-2">
                      <span className="bg-accent size-1.5 rounded-full" aria-hidden />
                      {x}
                    </li>
                  ),
                )}
              </ul>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
