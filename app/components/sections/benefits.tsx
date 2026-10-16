import { BlurFade } from "~/components/magicui/blur-fade";
import { engineerBenefits } from "~/data/content";
import { iconMap } from "./icons";

export function Benefits() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {engineerBenefits.map((b, i) => {
        const Icon = iconMap[b.icon]!;
        return (
          <BlurFade as="li" key={b.title} delay={(i % 3) * 0.07} className="card p-6">
            <span className="border-primary/30 bg-primary/15 text-accent grid size-10 place-items-center rounded-xl border">
              <Icon className="size-[18px]" aria-hidden />
            </span>
            <h3 className="text-foreground mt-5 text-base font-semibold">{b.title}</h3>
            <p className="text-muted mt-1.5 text-sm leading-relaxed">{b.body}</p>
          </BlurFade>
        );
      })}
    </ul>
  );
}
