import type * as React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BorderBeam } from "~/components/magicui/border-beam";
import { Button } from "~/components/ui/button";
import { Accent } from "./section-heading";

export function CtaBand({
  title = (
    <>
      Your next project is <Accent>one application</Accent> away
    </>
  ),
  body = "Apply in three minutes. We will match you with the AI training platforms that fit your stack — free, always.",
  primary = { label: "Apply as an engineer", to: "/for-engineers#apply" },
  secondary = { label: "Hire through Credexus", to: "/for-partners" },
}: {
  title?: React.ReactNode;
  body?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string } | null;
}) {
  return (
    <section className="container-x py-20">
      <div className="border-border-strong relative isolate overflow-hidden rounded-3xl border px-6 py-16 text-center sm:px-16 sm:py-20">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/mesh-1400.webp" />
          <img
            src="/images/mesh-800.webp"
            alt=""
            loading="lazy"
            decoding="async"
            width={900}
            height={795}
            className="absolute inset-0 -z-20 size-full object-cover opacity-70"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(6_7_26/0.6),rgb(6_7_26/0.85)_80%)]" />
        <h2 className="text-gradient mx-auto max-w-2xl text-3xl leading-[1.1] font-semibold sm:text-5xl">
          {title}
        </h2>
        <p className="text-foreground/80 mx-auto mt-5 max-w-xl text-base sm:text-lg">{body}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to={primary.to}>
              {primary.label} <ArrowRight />
            </Link>
          </Button>
          {secondary && (
            <Button asChild size="lg" variant="secondary">
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          )}
        </div>
        <BorderBeam size={220} duration={10} />
      </div>
    </section>
  );
}
