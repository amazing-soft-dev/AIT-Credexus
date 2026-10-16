import { cn } from "~/lib/utils";

/** Credexus mark: the glowing blue ribbon (raster with transparent background). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-mark.webp"
      alt=""
      aria-hidden
      width={64}
      height={64}
      decoding="async"
      className={cn("size-8 shrink-0 select-none", className)}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-foreground text-[17px] font-semibold tracking-tight">Credexus</span>
    </span>
  );
}
