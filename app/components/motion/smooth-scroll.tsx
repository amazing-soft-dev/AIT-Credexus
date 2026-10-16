import * as React from "react";
import { useLocation } from "react-router";

type LenisInstance = {
  raf: (t: number) => void;
  scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
  destroy: () => void;
};

/**
 * Lenis smooth scrolling (as used by the Avenna template).
 * Loaded after the page is interactive so it stays off the critical path; skipped for
 * reduced-motion users and on touch devices (Lenis leaves native touch scrolling alone anyway).
 */
export function SmoothScroll() {
  const lenisRef = React.useRef<LenisInstance | null>(null);
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let cancelled = false;
    let frame = 0;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        anchors: { offset: -96 },
      }) as unknown as LenisInstance;
      lenisRef.current = lenis;
      document.documentElement.classList.add("lenis");
      const loop = (t: number) => {
        lenis.raf(t);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    };
    const idle = (cb: () => void) => {
      const w = window as Window & { requestIdleCallback?: (c: () => void) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(cb);
      else setTimeout(cb, 200);
    };
    if (document.readyState === "complete") idle(start);
    else window.addEventListener("load", () => idle(start), { once: true });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  // Keep route changes and in-page anchors working with the smooth scroller.
  React.useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    // Plain route changes are handled by <ScrollRestoration/>; Lenis syncs to native scroll.
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) lenis.scrollTo(el, { offset: -96 });
  }, [pathname, hash]);

  return null;
}
