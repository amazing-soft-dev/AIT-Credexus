import * as React from "react";
import { EASE_CSS } from "~/lib/motion";
import { useInView } from "~/lib/use-in-view";

/**
 * Avenna's "Shiny - Animated" card variant: a soft diagonal light bar (opacity .2, rotated 60°)
 * sweeps in from the right edge and settles across the card when it scrolls into view.
 * Parent must be `relative overflow-hidden`.
 */
export function Shine({ className = "" }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div
        className="absolute h-[317px] w-[912px]"
        style={{
          top: "calc(28% - 158px)",
          left: inView ? "calc(60% - 456px)" : "calc(100% - 368px)",
          transform: "rotate(60deg)",
          opacity: 0.2,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 52%, rgba(255,255,255,0) 100%)",
          transition: `left 0.6s ${EASE_CSS}`,
        }}
      />
    </div>
  );
}
