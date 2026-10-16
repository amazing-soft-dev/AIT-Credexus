import type * as React from "react";
import { BlurFade } from "~/components/magicui/blur-fade";
import { cn } from "~/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  animate = true,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  /** Set false for above-the-fold headings so they paint before hydration. */
  animate?: boolean;
  className?: string;
}) {
  const Wrapper = animate ? BlurFade : "div";
  return (
    <Wrapper
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag
        className={cn(
          "text-gradient font-semibold",
          Tag === "h1"
            ? "text-4xl leading-[1.05] sm:text-6xl"
            : "text-3xl leading-[1.1] sm:text-[44px]",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="text-muted text-base leading-relaxed sm:text-lg">{description}</p>
      )}
    </Wrapper>
  );
}

/** Serif-italic accent word, Avenna-style. */
export function Accent({ children }: React.PropsWithChildren) {
  return (
    <em className="text-accent pr-1 font-serif font-normal tracking-normal italic">{children}</em>
  );
}
