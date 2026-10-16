import { BadgeCheck, Sparkles } from "lucide-react";
import * as React from "react";
import { BorderBeam } from "~/components/magicui/border-beam";
import { platformBySlug } from "~/data/platforms";
import { useInView } from "~/lib/use-in-view";
import { PlatformMark } from "./platform-mark";

const matches = [
  { slug: "outlier", fit: 94, task: "Python code evaluation" },
  { slug: "mercor", fit: 89, task: "Agentic coding tasks" },
  { slug: "alignerr", fit: 82, task: "Reasoning & review" },
];

/** Illustrative candidate → platform match card. Fit bars fill when the card scrolls into view. */
export function MatchCard({
  caption = true,
  children,
}: React.PropsWithChildren<{ caption?: boolean }>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md">
      <div
        className="absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,rgb(90_107_255/0.32),transparent)]"
        aria-hidden
      />
      <div className="border-border-strong bg-surface/90 relative overflow-hidden rounded-3xl border p-5 shadow-2xl sm:p-6">
        <div className="flex items-center gap-3">
          <span className="from-accent to-primary-strong grid size-11 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white">
            LM
          </span>
          <div className="min-w-0">
            <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
              Senior Python Engineer
              <BadgeCheck className="text-accent size-4" aria-hidden />
            </p>
            <p className="text-subtle text-xs">São Paulo, Brazil · English C1 · 6 yrs</p>
          </div>
          <span className="border-success/30 bg-success/10 text-success ml-auto rounded-full border px-2.5 py-1 text-[11px] font-medium">
            Screened
          </span>
        </div>

        <div className="text-subtle mt-5 flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase">
          <Sparkles className="text-accent size-3.5" aria-hidden /> Best-fit platforms
        </div>
        <ul className="mt-3 space-y-2.5">
          {matches.map((mt, i) => {
            const p = platformBySlug(mt.slug)!;
            return (
              <li key={mt.slug} className="border-border bg-background/50 rounded-2xl border p-3">
                <div className="flex items-center gap-3">
                  <PlatformMark platform={p} className="size-7" />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm">{p.name}</p>
                    <p className="text-subtle truncate text-[11px]">{mt.task}</p>
                  </div>
                  <span className="text-foreground text-sm font-semibold tabular-nums">
                    {mt.fit}%
                  </span>
                </div>
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="from-primary to-accent h-full origin-left rounded-full bg-gradient-to-r"
                    style={{
                      width: `${mt.fit}%`,
                      transform: inView ? "scaleX(1)" : "scaleX(0)",
                      transition: `transform 1.1s cubic-bezier(0.44, 0, 0.56, 1) ${0.2 + i * 0.1}s`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <BorderBeam size={140} duration={8} />
        {children}
      </div>
      {caption && (
        <p className="text-subtle mt-3 text-center text-[11px]">
          Illustrative example of a Credexus match
        </p>
      )}
    </div>
  );
}
