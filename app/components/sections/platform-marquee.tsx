import { Link } from "react-router";
import { Marquee } from "~/components/magicui/marquee";
import { platforms } from "~/data/platforms";
import { PlatformChip } from "./platform-mark";

export function PlatformMarquee() {
  const half = Math.ceil(platforms.length / 2);
  return (
    <section aria-labelledby="platforms-heading" className="relative py-16">
      <div className="container-x">
        <h2
          id="platforms-heading"
          className="text-subtle text-center text-xs font-medium tracking-[0.2em] uppercase"
        >
          Platforms our candidates work on
        </h2>
      </div>
      <div className="mt-8 flex flex-col gap-1">
        <Marquee duration="55s">
          {platforms.slice(0, half).map((p) => (
            <Link key={p.slug} to={`/platforms/${p.slug}`} className="rounded-2xl" prefetch="none">
              <PlatformChip platform={p} />
            </Link>
          ))}
        </Marquee>
        <Marquee duration="60s" reverse>
          {platforms.slice(half).map((p) => (
            <Link key={p.slug} to={`/platforms/${p.slug}`} className="rounded-2xl" prefetch="none">
              <PlatformChip platform={p} />
            </Link>
          ))}
        </Marquee>
      </div>
      <p className="container-x text-subtle mt-6 text-center text-xs">
        Independent agency. Listing a platform does not imply endorsement; trademarks belong to
        their owners.
      </p>
    </section>
  );
}
