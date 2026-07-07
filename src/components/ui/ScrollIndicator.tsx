"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function ScrollIndicator() {
  const lineRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        y: 4,
        opacity: 0.35,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, lineRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div data-intro="scroll-indicator" className="opacity-0" aria-hidden="true">
      <span
        ref={lineRef}
        className="block h-12 w-px origin-top bg-[rgba(245,241,236,0.22)]"
      />
    </div>
  );
}
