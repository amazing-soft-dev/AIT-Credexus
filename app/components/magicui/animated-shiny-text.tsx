import type * as React from "react";
import { cn } from "~/lib/utils";

/** Magic UI AnimatedShinyText — a light sweep across text. */
export function AnimatedShinyText({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "animate-shimmer bg-[length:200%_100%] bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,#a2a8cf_35%,#ffffff_50%,#a2a8cf_65%)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
