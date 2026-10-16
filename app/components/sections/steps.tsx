import { BlurFade } from "~/components/magicui/blur-fade";
import { steps } from "~/data/content";
import { STAGGER } from "~/lib/motion";

export function Steps() {
  return (
    <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <BlurFade as="li" key={s.n} delay={i * STAGGER} className="card group relative p-6">
          <span className="text-accent/90 font-serif text-4xl italic">{s.n}</span>
          <h3 className="text-foreground mt-6 text-lg font-semibold">{s.title}</h3>
          <p className="text-muted mt-2 text-sm leading-relaxed">{s.body}</p>
          <span
            aria-hidden
            className="via-accent/60 absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />
        </BlurFade>
      ))}
    </ol>
  );
}
