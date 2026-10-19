import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BlurFade } from "~/components/magicui/blur-fade";
import { Button } from "~/components/ui/button";
import { regionBySlug } from "~/data/regions";
import { sampleEngineers, type SampleEngineer } from "~/data/talent";
import { STAGGER } from "~/lib/motion";
import { Accent, SectionHeading } from "./section-heading";

export function TalentCard({ engineer }: { engineer: SampleEngineer }) {
  const region = regionBySlug(engineer.region);
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <img
        src={engineer.portrait}
        alt=""
        width={engineer.portraitWidth}
        height={engineer.portraitHeight}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full object-cover object-[center_18%]"
      />
      <div className="flex flex-1 flex-col p-5">
        {region ? <span className="text-subtle text-xs">{region.short}</span> : null}
        <h3 className="text-foreground mt-4 text-lg leading-snug font-semibold">{engineer.name}</h3>
        <p className="text-muted mt-1 text-sm">{engineer.role}</p>
        <p className="text-foreground/90 mt-3 text-sm font-medium">
          {engineer.years} years of experience
        </p>
        <p className="text-muted mt-2 text-sm leading-relaxed">{engineer.summary}</p>
      </div>
    </article>
  );
}

export function TalentProfiles({ cta }: { cta: { label: string; to: string } }) {
  return (
    <section className="cv-auto container-x py-20">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          eyebrow="Example profiles"
          title={
            <>
              Engineers ready for <Accent>AI training</Accent> work
            </>
          }
          description="Fictional profiles that show the experience we look for across our four regions. Real engineers apply with their own background."
        />
        <Button asChild variant="secondary" className="shrink-0">
          <Link to={cta.to}>
            {cta.label} <ArrowRight />
          </Link>
        </Button>
      </div>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sampleEngineers.map((engineer, i) => (
          <BlurFade as="li" key={engineer.id} delay={i * STAGGER}>
            <TalentCard engineer={engineer} />
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}
