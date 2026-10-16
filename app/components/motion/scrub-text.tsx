import { useMotionValueEvent, useScroll } from "framer-motion";
import * as React from "react";
import { cn } from "~/lib/utils";

/**
 * Avenna's "Solution" paragraph: GSAP SplitText + ScrollTrigger scrubbing each character from
 * transparent to solid (stagger 0.1, duration 0.5, ease none) as the block scrolls through.
 * Re-implemented with one scroll listener writing a single CSS variable (--p); each character
 * computes its own opacity in CSS, so there's no per-character JavaScript.
 */
export function ScrubText({
  text,
  className,
  as: Tag = "p",
  min = 0.12,
}: {
  text: string;
  className?: string;
  as?: "p" | "h2";
  min?: number;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    ref.current?.style.setProperty("--p", v.toFixed(4));
  });

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      ref.current?.style.setProperty("--p", "1");
  }, []);

  const words = text.split(" ");
  const total = text.replace(/ /g, "").length;
  // gsap timeline length for stagger .1 / duration .5 → (n-1)*0.1 + 0.5
  const span = (total - 1) * 0.1 + 0.5;
  let i = 0;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn("scrub-text", className)}
      style={{ "--p": 0, "--span": span, "--min": min } as React.CSSProperties}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, wi) => (
        <React.Fragment key={wi}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {[...w].map((ch) => (
              <span key={i} className="scrub-char" style={{ "--i": i++ } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? <span aria-hidden> </span> : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}
