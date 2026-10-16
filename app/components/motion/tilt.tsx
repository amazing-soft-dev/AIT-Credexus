import * as React from "react";
import { cn } from "~/lib/utils";

/**
 * Avenna's "3D Hover" component: the card tilts in 3D following the pointer.
 * effect "evade" tilts away from the cursor, "follow" towards it. Mouse/pen only.
 */
export function Tilt({
  children,
  className,
  limit = 15,
  scale = 1.1,
  perspective = 500,
  effect = "evade",
}: React.PropsWithChildren<{
  className?: string;
  limit?: number;
  scale?: number;
  perspective?: number;
  effect?: "evade" | "follow";
}>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rest = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  const frame = React.useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dir = effect === "evade" ? -1 : 1;
      const rx = ((clientY - r.top) / r.height - 0.5) * (limit * 2) * dir;
      const ry = ((clientX - r.left) / r.width - 0.5) * -(limit * 2) * dir;
      el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, ${scale})`;
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = rest;
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("will-change-transform", className)}
      style={{ transform: rest, transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  );
}
