"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function MouseLight() {
  const lightRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.45 });
  const current = useRef({ x: 0.5, y: 0.45 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (event: MouseEvent) => {
      target.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    let frame = 0;

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.035;
      current.current.y += (target.current.y - current.current.y) * 0.035;

      if (lightRef.current) {
        const x = current.current.x * 100;
        const y = current.current.y * 100;
        lightRef.current.style.background = `radial-gradient(circle 38vmax at ${x}% ${y}%, rgba(200,155,118,0.028) 0%, transparent 68%)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={lightRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle 38vmax at 50% 45%, rgba(200,155,118,0.028) 0%, transparent 68%)",
      }}
    />
  );
}
