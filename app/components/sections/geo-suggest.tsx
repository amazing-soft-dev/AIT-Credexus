import { ArrowRight, MapPin, X } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { regionForCountry, type Region } from "~/data/regions";

const DISMISS_KEY = "cx-geo-dismissed";

/**
 * Suggests the visitor's regional page based on their IP country (via /api/geo).
 * Runs after hydration so every page stays CDN-cacheable and identical for crawlers.
 */
export function GeoSuggest({ exclude }: { exclude?: string }) {
  const [region, setRegion] = React.useState<Region | null>(null);

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* storage blocked */
    }
    const ctrl = new AbortController();
    fetch("/api/geo", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { country?: string } | null) => {
        const match = regionForCountry(d?.country);
        if (match && match.slug !== exclude) setRegion(match);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [exclude]);

  if (!region) return null;
  return (
    <div
      role="status"
      className="border-border-strong bg-surface/95 fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border p-3 pl-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <MapPin className="text-accent size-4 shrink-0" aria-hidden />
      <p className="text-muted text-sm">
        Based in <span className="text-foreground">{region.name}</span>?{" "}
        <Link
          to={`/${region.slug}`}
          className="text-accent inline-flex items-center gap-1 font-medium hover:underline"
        >
          See roles for you <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </p>
      <button
        type="button"
        aria-label="Dismiss"
        className="text-subtle hover:text-foreground ml-auto grid size-7 place-items-center rounded-full hover:bg-white/5"
        onClick={() => {
          try {
            sessionStorage.setItem(DISMISS_KEY, "1");
          } catch {
            /* ignore */
          }
          setRegion(null);
        }}
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
