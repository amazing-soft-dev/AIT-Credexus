import { BlurFade } from "~/components/magicui/blur-fade";
import { engineerBenefits } from "~/data/content";
import { STAGGER } from "~/lib/motion";
import { iconMap } from "./icons";

export function Benefits() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {engineerBenefits.map((b, i) => {
        const Icon = iconMap[b.icon]!;
        return (
          <BlurFade as="li" key={b.title} delay={(i % 3) * STAGGER} className="card p-6">
            {/* Avenna performance cards: the icon de-blurs (10px → 0) as the card lands */}
            <BlurFade
              as="span"
              y={0}
              blur={10}
              delay={(i % 3) * STAGGER + 0.15}
              className="border-primary/30 bg-primary/15 text-accent grid size-10 place-items-center rounded-xl border"
            >
              <Icon className="size-[18px]" aria-hidden />
            </BlurFade>
            <h3 className="text-foreground mt-5 text-base font-semibold">{b.title}</h3>
            <p className="text-muted mt-1.5 text-sm leading-relaxed">{b.body}</p>
          </BlurFade>
        );
      })}
    </ul>
  );
}
