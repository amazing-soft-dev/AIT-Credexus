import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { BlurFade } from "~/components/magicui/blur-fade";
import { Button } from "~/components/ui/button";
import { DURATION, EASE } from "~/lib/motion";
import { cn } from "~/lib/utils";
import { Accent, SectionHeading } from "./section-heading";

type Tab = {
  id: string;
  n: string;
  label: string;
  summary: string;
  Visual: () => React.ReactElement;
};

function CodeEvalVisual() {
  return (
    <div className="font-mono text-[12px] leading-relaxed sm:text-[13px]">
      <p className="text-subtle">{"// Prompt: dedupe a list while keeping order"}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          {
            tag: "Response A",
            code: ["return list(set(xs))"],
            verdict: "Loses order",
            good: false,
          },
          {
            tag: "Response B",
            code: [
              "seen = set()",
              "return [x for x in xs",
              "  if not (x in seen",
              "  or seen.add(x))]",
            ],
            verdict: "Preferred",
            good: true,
          },
        ].map((r) => (
          <div
            key={r.tag}
            className={cn(
              "rounded-xl border p-3",
              r.good ? "border-success/40 bg-success/5" : "border-border bg-background/40",
            )}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted font-sans">{r.tag}</span>
              <span className={cn("font-sans", r.good ? "text-success" : "text-danger")}>
                {r.verdict}
              </span>
            </div>
            <pre className="text-foreground/90 mt-2 overflow-x-auto">{r.code.join("\n")}</pre>
          </div>
        ))}
      </div>
      <p className="text-muted mt-3 font-sans text-xs">
        Rationale: B preserves insertion order in O(n); A&apos;s set() reorders items.
      </p>
    </div>
  );
}

function RatingVisual() {
  const rows = [
    ["Correctness", 5],
    ["Helpfulness", 4],
    ["Instruction following", 5],
    ["Safety", 5],
  ] as const;
  return (
    <ul className="space-y-3">
      {rows.map(([label, score]) => (
        <li key={label} className="flex items-center justify-between gap-4">
          <span className="text-foreground/90 text-sm">{label}</span>
          <span className="flex gap-1" aria-label={`${score} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                aria-hidden
                className={cn(
                  "size-4",
                  i < score ? "fill-accent text-accent" : "text-border-strong",
                )}
              />
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

function AgentVisual() {
  const steps = [
    "Read issue #482 and reproduce the failing test",
    "Locate bug in parser/tokenize.ts",
    "Patch edge case for escaped quotes",
    "Run test suite — 214 passed",
  ];
  return (
    <ol className="space-y-2.5 font-mono text-[12px] sm:text-[13px]">
      {steps.map((s, i) => (
        <li key={s} className="flex items-start gap-3">
          <span className="bg-success/15 text-success mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
            <Check className="size-3" aria-hidden />
          </span>
          <span className="text-foreground/90">
            <span className="text-subtle">step {i + 1} · </span>
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}

const tabs: Tab[] = [
  {
    id: "code",
    n: "(01)",
    label: "Code evaluation",
    summary:
      "Compare model-written solutions, find the bugs, and explain which answer is better and why. Your rationale becomes training signal.",
    Visual: CodeEvalVisual,
  },
  {
    id: "rlhf",
    n: "(02)",
    label: "RLHF & rating",
    summary:
      "Score responses against detailed rubrics for correctness, helpfulness and safety — then rewrite weak answers into ideal ones.",
    Visual: RatingVisual,
  },
  {
    id: "agents",
    n: "(03)",
    label: "Agentic tasks",
    summary:
      "Design realistic multi-step engineering tasks in real repositories and grade how AI coding agents work through them.",
    Visual: AgentVisual,
  },
];

/**
 * Avenna "Track What Counts" section: numbered tabs (01)/(02)/(03) on the left switch a panel on
 * the right. Panels cross-fade (opacity .001 → 1, 0.6s) and the copy block de-blurs (30px → 0).
 */
export function WorkTabs() {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active]!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="container-x py-24">
      <SectionHeading
        eyebrow="The work"
        title={
          <>
            What AI training work <Accent>looks like</Accent>
          </>
        }
        description="Three kinds of projects make up most of what our engineers do. Pick one to see a sample task."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div
          role="tablist"
          aria-label="Types of AI training work"
          aria-orientation="vertical"
          className="flex flex-col gap-2"
        >
          {tabs.map((t, i) => {
            const selected = i === active;
            return (
              <BlurFade key={t.id} delay={i * 0.1}>
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`work-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`work-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "group relative flex w-full items-baseline gap-4 rounded-2xl px-5 py-4 text-left transition-colors duration-300",
                    selected ? "text-foreground" : "text-subtle hover:text-muted",
                  )}
                >
                  {selected && (
                    <m.span
                      layoutId="work-tab-pill"
                      className="border-border-strong bg-surface absolute inset-0 -z-10 rounded-2xl border"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="text-sm tabular-nums">{t.n}</span>
                  <span className="text-2xl font-semibold tracking-tight sm:text-[32px]">
                    {t.label}
                  </span>
                </button>
              </BlurFade>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`work-panel-${tab.id}`}
          aria-labelledby={`work-tab-${tab.id}`}
          className="card glow-ring relative min-h-[360px] overflow-hidden p-6 sm:p-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={tab.id}
              initial={{ opacity: 0.001 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.001 }}
              transition={{ duration: DURATION / 2, ease: EASE }}
            >
              <div className="border-border bg-background/50 rounded-2xl border p-4 sm:p-5">
                <tab.Visual />
              </div>
              <m.div
                initial={{ filter: "blur(30px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: DURATION, ease: EASE, delay: 0.1 }}
                className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
              >
                <p className="text-muted max-w-md text-[15px] leading-relaxed">{tab.summary}</p>
                <Button asChild variant="white" className="shrink-0">
                  <Link to="/jobs">
                    See roles <ArrowRight />
                  </Link>
                </Button>
              </m.div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
