import { m, useScroll, useSpring, useTransform } from "framer-motion";
import * as React from "react";
import { SCROLL_SPRING } from "~/lib/motion";

/**
 * Scroll-linked zoom used on Avenna's "Meet the Expert" heading: the element starts at
 * scale 1.8 (perspective 1200) and settles to 1 as it travels into the viewport.
 */
export function ScrollZoom({
  children,
  className,
  from = 1.8,
}: React.PropsWithChildren<{ className?: string; from?: number }>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.55"] });
  const raw = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const scale = useSpring(raw, SCROLL_SPRING);
  return (
    <m.div ref={ref} className={className} style={{ scale, transformPerspective: 1200 }}>
      {children}
    </m.div>
  );
}
