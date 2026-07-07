"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";
import { scheduleScrollTriggerRefresh } from "@/lib/scrollTriggerRefresh";

export function useSectionLineReveal(
  breakRef: RefObject<HTMLElement | null>,
  lineRef: RefObject<HTMLElement | null>,
  transformOrigin: "left center" | "right center" = "left center"
) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!SCROLL_REVEAL_ENABLED || reducedMotion) return;

    const breakEl = breakRef.current;
    const lineEl = lineRef.current;
    if (!breakEl || !lineEl) return;

    let ctx: gsap.Context | undefined;
    let frameId = 0;

    const setup = () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          lineEl,
          { scaleX: 0, transformOrigin },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: breakEl,
              start: SCROLL_REVEAL_START,
              once: true,
            },
          }
        );
      }, breakEl);

      scheduleScrollTriggerRefresh();
    };

    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(setup);
    });

    return () => {
      cancelAnimationFrame(frameId);
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, transformOrigin]);
}
