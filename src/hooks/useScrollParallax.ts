"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollParallaxOptions = {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: [number, number];
  start?: string;
  end?: string;
  scrub?: boolean | number;
};

export function useScrollParallax(
  targetRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  options: ScrollParallaxOptions = {}
) {
  const reducedMotion = usePrefersReducedMotion();
  const {
    y = 60,
    x = 0,
    scale = 1,
    opacity,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  useEffect(() => {
    if (reducedMotion || !targetRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      const vars: gsap.TweenVars = {
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start,
          end,
          scrub,
        },
      };

      if (y) vars.y = y;
      if (x) vars.x = x;
      if (scale !== 1) vars.scale = scale;
      if (opacity) vars.opacity = opacity[1];

      const fromVars: gsap.TweenVars = { y: 0, x: 0, scale: 1 };
      if (opacity) fromVars.opacity = opacity[0];

      gsap.fromTo(targetRef.current, fromVars, vars);
    }, triggerRef);

    return () => ctx.revert();
  }, [reducedMotion, y, x, scale, opacity, start, end, scrub, targetRef, triggerRef]);
}
