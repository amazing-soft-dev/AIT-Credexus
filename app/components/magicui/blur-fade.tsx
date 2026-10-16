import { m } from "framer-motion";
import * as React from "react";
import { useInView } from "~/lib/use-in-view";

/**
 * Magic UI BlurFade — reveals children with blur + slide when scrolled into view.
 * Uses Framer Motion's `m` component; its animation features load lazily via <LazyMotion>.
 * Respects prefers-reduced-motion through <MotionConfig reducedMotion="user"> in root.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  y = 14,
  as = "div",
}: React.PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
}>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const Comp = m[as] as typeof m.div;
  return (
    <Comp
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Comp>
  );
}
