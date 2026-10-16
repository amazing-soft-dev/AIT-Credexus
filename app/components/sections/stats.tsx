import { BlurFade } from "~/components/magicui/blur-fade";
import { NumberTicker } from "~/components/magicui/number-ticker";
import { platforms } from "~/data/platforms";

const stats = [
  { value: platforms.length, label: "AI training platforms our candidates work on" },
  { value: 4, label: "Regions: Latam, Asia, Europe and Canada" },
  { value: 0, prefix: "$", label: "Cost to engineers — platforms pay us" },
  { value: 1, label: "Application to be matched across all of them" },
];

export function Stats() {
  return (
    <div className="border-border bg-border grid grid-cols-2 gap-px overflow-hidden rounded-3xl border lg:grid-cols-4">
      {stats.map((s, i) => (
        <BlurFade key={s.label} delay={i * 0.06} className="bg-background p-6 sm:p-8">
          <p className="text-gradient text-4xl font-semibold tracking-tight sm:text-5xl">
            <NumberTicker value={s.value} prefix={s.prefix} />
          </p>
          <p className="text-muted mt-3 text-sm leading-snug">{s.label}</p>
        </BlurFade>
      ))}
    </div>
  );
}
