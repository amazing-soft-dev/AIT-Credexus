import type * as React from "react";
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
    <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="container-x">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
