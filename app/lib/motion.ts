/**
 * Motion tokens taken from the Avenna template so every animation shares one feel.
 *   - tween: 0.6s, cubic-bezier(.44, 0, .56, 1) — section reveals, tab panels, shine
 *   - spring: damping 60 / stiffness 500 — scroll-linked transforms (smoothed scrubbing)
 *   - stagger: 0.1s between siblings in a grid
 */
export const EASE = [0.44, 0, 0.56, 1] as const;
export const EASE_CSS = "cubic-bezier(0.44, 0, 0.56, 1)";
export const DURATION = 0.6;
export const STAGGER = 0.1;
export const SCROLL_SPRING = { damping: 60, stiffness: 500, mass: 1 } as const;
/** Spring used by Avenna for hovers/toggles (bounce 0.2, 0.4s) approximated as a CSS curve. */
export const SPRING_CSS = "cubic-bezier(0.34, 1.36, 0.64, 1)";
