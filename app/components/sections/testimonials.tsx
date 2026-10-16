import { Quote } from "lucide-react";
import { BlurFade } from "~/components/magicui/blur-fade";
import { testimonials } from "~/data/content";
import { SectionHeading } from "./section-heading";

/**
 * Renders only real testimonials from data/content.ts. With none, it is hidden in production
 * and shows dashed placeholder slots in development.
 */
export function Testimonials() {
  const isDev = import.meta.env.DEV;
  if (testimonials.length === 0 && !isDev) return null;
  const items =
    testimonials.length > 0
      ? testimonials
      : Array.from({ length: 3 }, (_, i) => ({
          quote: "Placeholder — add a real, consented candidate quote in app/data/content.ts.",
          name: `Candidate ${i + 1}`,
          role: "Role",
          region: "Region",
        }));
  const placeholder = testimonials.length === 0;
  return (
    <section className="container-x py-20">
      <SectionHeading eyebrow="Engineers" title="From engineers in our network" />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((t, i) => (
          <BlurFade
            as="li"
            key={i}
            delay={i * 0.08}
            className={
              placeholder ? "border-border-strong rounded-2xl border border-dashed p-6" : "card p-6"
            }
          >
            <Quote className="text-accent size-5" aria-hidden />
            <blockquote className="text-foreground/90 mt-4 text-[15px] leading-relaxed">
              “{t.quote}”
            </blockquote>
            <p className="text-foreground mt-6 text-sm font-medium">{t.name}</p>
            <p className="text-subtle text-xs">
              {t.role} · {t.region}
            </p>
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}
