import { FileSearch, Route, Sparkles } from "lucide-react";
import { BlurFade } from "~/components/magicui/blur-fade";
import { Shine } from "~/components/motion/shine";
import { Tilt } from "~/components/motion/tilt";
import { STAGGER } from "~/lib/motion";
import { MatchCard } from "./match-card";
import { Accent } from "./section-heading";

const rows = [
  {
    icon: FileSearch,
    title: "Profile review",
    body: "We read your experience, stack and written English once — no repeated applications.",
  },
  {
    icon: Route,
    title: "Platform fit",
    body: "Your profile is mapped to the platforms and projects where you are most likely to be accepted.",
  },
  {
    icon: Sparkles,
    title: "Assessment prep",
    body: "You get briefed on what each platform's reviewers look for before you take their test.",
  },
];

/**
 * Avenna "AI Report for Smarter Automation" section: copy + three icon rows beside a product
 * card. Like Avenna it re-plays its reveal each time it re-enters the viewport (delay 0.2s).
 */
export function MatchShowcase() {
  return (
    <section className="container-x relative py-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <BlurFade repeat y={0} delay={0.2}>
            <span className="eyebrow">How matching works</span>
            <h2 className="text-gradient mt-4 text-3xl leading-[1.1] font-semibold sm:text-[44px]">
              One profile. <Accent>Every platform</Accent> that fits.
            </h2>
            <p className="text-muted mt-4 max-w-lg text-base leading-relaxed sm:text-lg">
              Instead of guessing which of dozens of AI training platforms to try, you get a
              shortlist ranked by how well your skills match what they&apos;re hiring for.
            </p>
          </BlurFade>
          <ul className="mt-10 space-y-6">
            {rows.map((r, i) => (
              <BlurFade
                as="li"
                repeat
                key={r.title}
                y={20}
                delay={0.3 + i * STAGGER}
                className="flex gap-4"
              >
                <span className="border-primary/30 bg-primary/15 text-accent grid size-10 shrink-0 place-items-center rounded-xl border">
                  <r.icon className="size-[18px]" aria-hidden />
                </span>
                <div>
                  <h3 className="text-foreground font-semibold">{r.title}</h3>
                  <p className="text-muted mt-1 text-sm leading-relaxed">{r.body}</p>
                </div>
              </BlurFade>
            ))}
          </ul>
        </div>
        <BlurFade repeat y={30} delay={0.2}>
          <Tilt scale={1.03} limit={8}>
            <MatchCard>
              <Shine />
            </MatchCard>
          </Tilt>
        </BlurFade>
      </div>
    </section>
  );
}
