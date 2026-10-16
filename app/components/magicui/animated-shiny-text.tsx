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
        "shiny-text animate-shimmer bg-[length:200%_100%] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
