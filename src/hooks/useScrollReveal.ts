"use client";

import { useLayoutEffect, RefObject } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";

export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  setup: (timeline: gsap.core.Timeline) => void,
  deps: unknown[] = []
) {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!SCROLL_REVEAL_ENABLED) return;

    const scope = scopeRef.current;
    if (!scope || reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: SCROLL_REVEAL_START,
          once: true,
          invalidateOnRefresh: true,
        },
      });

      setup(tl);
    }, scope);

    const refreshScroll = () => ScrollTrigger.refresh();
    const refreshId = requestAnimationFrame(() => {
      requestAnimationFrame(refreshScroll);
    });

    window.addEventListener("load", refreshScroll);

    return () => {
      cancelAnimationFrame(refreshId);
      window.removeEventListener("load", refreshScroll);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, pathname, ...deps]);
}
