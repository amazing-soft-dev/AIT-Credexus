import { cn } from "~/lib/utils";

/** Magic UI DotPattern (CSS variant) with radial fade. */
export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]",
        className,
      )}
    />
  );
}
