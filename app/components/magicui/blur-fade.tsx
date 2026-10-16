import { m } from "framer-motion";
import * as React from "react";
import { DURATION, EASE } from "~/lib/motion";
import { useInView } from "~/lib/use-in-view";

type RevealProps = React.PropsWithChildren<{
  className?: string;
  /** Seconds. In grids pass index * STAGGER (0.1) like Avenna's cards. */
  delay?: number;
  /** Vertical offset in px (Avenna uses 30 for cards, 0 for plain fades). */
  y?: number;
  /** Optional blur-to-sharp, e.g. 10 for icons, 30 for large copy blocks. */
  blur?: number;
  /** Replay every time it re-enters the viewport (Avenna's "animateOnce: false"). */
  repeat?: boolean;
  as?: "div" | "li" | "section" | "span";
}>;

/**
 * Scroll reveal matching the Avenna template: opacity 0 → 1 (+ optional y / blur),
 * 0.6s tween with cubic-bezier(.44,0,.56,1), triggered when ~half the element is visible.
 * Exported as BlurFade for backwards compatibility (it began life as Magic UI's BlurFade).
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  y = 30,
  blur = 0,
  repeat = false,
  as = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: !repeat });
  const Comp = m[as] as typeof m.div;
  const hidden = { opacity: 0, y, filter: blur ? `blur(${blur}px)` : "blur(0px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <Comp
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration: DURATION, delay: inView ? delay : 0, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

export { BlurFade as Reveal };
