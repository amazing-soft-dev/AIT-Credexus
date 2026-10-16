import * as React from "react";

type Options = { rootMargin?: string; amount?: number; once?: boolean };

/** Minimal IntersectionObserver hook (avoids pulling animation code into the main bundle). */
export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  opts: Options | string = {},
) {
  const {
    rootMargin = "0px",
    amount = 0,
    once = true,
  } = typeof opts === "string" ? { rootMargin: opts } : opts;
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // Tall elements can never be 35% visible on short screens — cap the threshold by size.
    const ratio = Math.min(
      amount,
      (window.innerHeight * 0.9) / Math.max(1, el.getBoundingClientRect().height),
    );
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: Math.max(0, ratio) },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, amount, once]);
  return inView;
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** Tracks a media query (SSR-safe: false until mounted). */
export function useMediaQuery(query: string) {
  const [match, setMatch] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    setMatch(mq.matches);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}
