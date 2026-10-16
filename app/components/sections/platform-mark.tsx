import type { Platform } from "~/data/platforms";
import { cn } from "~/lib/utils";

const hues = [232, 245, 220, 258, 210, 270];

/** Logo slot: renders /platforms/<slug>.svg when available, else a monogram tile. */
export function PlatformMark({ platform, className }: { platform: Platform; className?: string }) {
  if (platform.logo) {
    return (
      <img
        src={`/platforms/${platform.slug}.svg`}
        alt=""
        width={32}
        height={32}
        loading="lazy"
        className={cn("size-8 rounded-lg object-contain", className)}
      />
    );
  }
  const hue = hues[platform.name.length % hues.length];
  const initials = platform.name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg text-[11px] font-semibold tracking-tight text-white",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 90% 72%), hsl(${hue} 75% 48%))`,
        boxShadow: "inset 0 1px 0 rgb(255 255 255 / .3)",
      }}
    >
      {initials}
    </span>
  );
}

export function PlatformChip({ platform }: { platform: Platform }) {
  return (
    <span className="border-border bg-surface/70 flex items-center gap-3 rounded-2xl border py-2.5 pr-5 pl-2.5">
      <PlatformMark platform={platform} />
      <span className="flex flex-col leading-tight">
        <span className="text-foreground text-sm font-medium">{platform.name}</span>
        {platform.operator && (
          <span className="text-subtle text-[11px]">by {platform.operator}</span>
        )}
      </span>
    </span>
  );
}
