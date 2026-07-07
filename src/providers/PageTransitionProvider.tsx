"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { pageEnter } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { scheduleScrollTriggerRefresh } from "@/lib/scrollTriggerRefresh";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      pageEnter(containerRef.current);
    }, containerRef);

    const refreshId = requestAnimationFrame(() => {
      scheduleScrollTriggerRefresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, [pathname, reducedMotion]);

  return <div ref={containerRef}>{children}</div>;
}
