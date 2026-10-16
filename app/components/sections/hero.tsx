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
        {/* Graphic: the grid card (with its own glowing frame) held by two hands. Geometry is
            Avenna's: card 56% wide (70% on tablet/mobile); hands anchored to the card's bottom
            corners — left 161/672 wide, 111px out, 119px below; right 176/672, 111px out, 127px
            below (mobile: 100/95px wide, 64/58px out). Outer div centres, m.div zooms on scroll. */}
        <div className="animate-fade-in absolute top-[81%] left-1/2 w-[70vw] max-w-[1180px] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 lg:w-[56vw]">
          <m.div
            aria-hidden
            className="relative aspect-[2664/1696]"
            style={{ scale, y, opacity: graphicOpacity }}
          >
            <img
              src="/images/hero-grid-2560.png"
              alt=""
              width={2664}
              height={1696}
              fetchPriority="high"
              decoding="async"
              className="relative size-full"
            />
            <img
              src="/images/hand-left.png"
              alt=""
              width={644}
              height={1448}
              decoding="async"
              className="pointer-events-none absolute -bottom-[68%] -left-[23.4%] z-[1] w-[36.6%] [mask-image:linear-gradient(to_bottom,black_52%,transparent_86%)] sm:-bottom-[27.8%] sm:-left-[16.5%] sm:w-[24%]"
            />
            <img
              src="/images/hand-right.png"
              alt=""
              width={704}
              height={1484}
              decoding="async"
              className="pointer-events-none absolute -right-[21.2%] -bottom-[68%] z-[1] w-[34.8%] [mask-image:linear-gradient(to_bottom,black_52%,transparent_86%)] sm:-right-[16.5%] sm:-bottom-[29.7%] sm:w-[26.2%]"
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
              <h1 className="ray-title text-gradient mt-6 text-[40px] leading-[1.04] font-semibold sm:text-6xl lg:text-[72px]">
                Get paid to train the <Accent>world&apos;s best</Accent> AI
              </h1>
            </m.div>
            <m.div style={{ y: copyDown }} className="flex flex-col items-center">
              <p className="ray-copy text-foreground/80 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
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
