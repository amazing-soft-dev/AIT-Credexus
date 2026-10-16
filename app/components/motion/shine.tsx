import * as React from "react";
import { useInView, usePrefersReducedMotion } from "~/lib/use-in-view";

/**
 * Blue-white diagonal wash for dark cards. Drifts slowly while the card is in view.
 * Reduced motion keeps the settled highlight with no animation.
 * Parent must be `relative overflow-hidden`. Pass `-z-10` inside an `isolate` parent
 * to paint the wash behind card content.
 */
export function Shine({ className = "" }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const reduce = usePrefersReducedMotion();
  const drift = inView && !reduce;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <style href="credexus-shine" precedence="default">{`
        @keyframes credexus-shine-drift {
          from { transform: translate3d(-6%, -4%, 0); }
          to { transform: translate3d(8%, 6%, 0); }
        }
      `}</style>
      <div
        className="absolute -top-[32%] -left-[22%] h-[170%] w-[145%] blur-[6px]"
        style={{
          background:
            "linear-gradient(122deg, rgba(236,242,255,0.55) 0%, rgba(206,218,255,0.38) 18%, rgba(170,188,255,0.22) 40%, rgba(120,140,230,0.1) 62%, transparent 82%)",
          transform: "translate3d(-6%, -4%, 0)",
          animation: reduce ? undefined : "credexus-shine-drift 14s ease-in-out infinite alternate",
          animationPlayState: drift ? "running" : "paused",
        }}
      />
    </div>
  );
}
