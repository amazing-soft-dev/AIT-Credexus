import type * as React from "react";
import { DotPattern } from "~/components/magicui/dot-pattern";
import { SectionHeading } from "./section-heading";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(63_79_217/0.35),transparent_70%)]"
      />
      <DotPattern className="-z-10 opacity-60" />
      <div className="container-x">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
