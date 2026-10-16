import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { BlurFade } from "~/components/magicui/blur-fade";
import { regions } from "~/data/regions";

export function RegionsGrid({ exclude }: { exclude?: string }) {
  const list = regions.filter((r) => r.slug !== exclude);
  return (
    <ul
      className={`grid gap-4 sm:grid-cols-2 ${list.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
    >
      {list.map((r, i) => (
        <BlurFade as="li" key={r.slug} delay={i * 0.06}>
          <Link
            to={`/${r.slug}`}
            prefetch="intent"
            className="card group hover:border-border-strong relative flex h-full flex-col overflow-hidden p-6 transition-colors"
          >
            <div
              className="absolute -top-20 -right-20 size-48 bg-[radial-gradient(closest-side,rgb(90_107_255/0.28),transparent)] transition-opacity group-hover:opacity-100 sm:opacity-70"
              aria-hidden
            />
            <div className="flex items-center justify-between">
              <span className="text-accent font-serif text-3xl italic">{r.short}</span>
              <ArrowUpRight
                className="text-subtle group-hover:text-accent size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </div>
            <p className="text-muted mt-4 text-sm">{r.countries.slice(0, 4).join(", ")} and more</p>
            <p className="text-subtle mt-auto pt-6 text-xs">{r.timezones.split(" — ")[0]}</p>
          </Link>
        </BlurFade>
      ))}
    </ul>
  );
}
