import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import type { Job } from "~/data/jobs";
import { regionBySlug } from "~/data/regions";

export function JobCard({ job }: { job: Job }) {
  const regionLabel =
    job.regions.length === 4
      ? "All regions"
      : job.regions.map((r) => regionBySlug(r)?.short).join(" · ");
  return (
    <Link
      to={`/jobs/${job.id}`}
      prefetch="intent"
      className="card group hover:border-border-strong hover:bg-surface flex h-full flex-col p-6 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{job.seniority}</Badge>
          <Badge variant="outline">{job.type}</Badge>
          {job.sample && (
            <Badge variant="outline" className="border-dashed">
              Example role
            </Badge>
          )}
        </div>
        <ArrowUpRight
          className="text-subtle group-hover:text-accent size-5 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
      <h3 className="text-foreground mt-5 text-lg leading-snug font-semibold">{job.title}</h3>
      <p className="text-muted mt-2 line-clamp-2 text-sm leading-relaxed">{job.summary}</p>
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-1.5">
          {job.stack.slice(0, 4).map((s) => (
            <span key={s} className="text-muted rounded-md bg-white/[0.04] px-2 py-1 text-xs">
              {s}
            </span>
          ))}
        </div>
        <div className="border-border text-muted mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            {regionLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            {job.hoursPerWeek}
          </span>
          {job.pay && <span className="text-foreground ml-auto font-medium">{job.pay}</span>}
        </div>
      </div>
    </Link>
  );
}
