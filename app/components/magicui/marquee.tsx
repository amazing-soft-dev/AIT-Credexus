import type * as React from "react";
import { cn } from "~/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  duration?: string;
}

/** Magic UI Marquee — pure CSS infinite scroller. */
export function Marquee({
  className,
  reverse,
  pauseOnHover = true,
  repeat = 2,
  duration = "40s",
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ "--duration": duration, "--gap": "1rem" } as React.CSSProperties}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] p-2",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          inert={i > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
