import type * as React from "react";
import { cn } from "~/lib/utils";

/** Magic UI BorderBeam — a light that travels around the parent's border. Parent needs `relative`. */
export function BorderBeam({
  className,
  size = 160,
  duration = 9,
  delay = 0,
  colorFrom = "#9fb0ff",
  colorTo = "#5a6bff",
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      aria-hidden
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]",
        "![mask-composite:intersect] ![mask-clip:padding-box,border-box] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:animate-border-beam after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
}
