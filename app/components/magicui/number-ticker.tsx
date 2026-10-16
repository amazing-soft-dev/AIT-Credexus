import * as React from "react";
import { useInView, usePrefersReducedMotion } from "~/lib/use-in-view";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/** Magic UI NumberTicker — counts up to `value` when visible. SSR renders the final value. */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, "0px");
  const reduce = usePrefersReducedMotion();
  const format = React.useCallback(
    (n: number) =>
      `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`,
    [decimals, prefix, suffix],
  );

  React.useEffect(() => {
    const node = ref.current;
    if (!inView || reduce || !node || value === 0) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      node.textContent = format(value * easeOutExpo(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, format]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(value)}
    </span>
  );
}
