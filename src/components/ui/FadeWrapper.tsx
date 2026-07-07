"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { fadeUp, fadeFromLeft, fadeFromRight } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";

type FadeVariant = "up" | "left" | "right";

type FadeWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  animate?: boolean;
  delay?: number;
  variant?: FadeVariant;
};

export default function FadeWrapper({
  animate = true,
  delay = 0,
  variant = "up",
  className,
  children,
  ...props
}: FadeWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!SCROLL_REVEAL_ENABLED) return;
    if (!animate || reducedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: ref.current,
        start: SCROLL_REVEAL_START,
        once: true,
      };

      if (variant === "left") {
        fadeFromLeft(ref.current, { delay, scrollTrigger: trigger });
      } else if (variant === "right") {
        fadeFromRight(ref.current, { delay, scrollTrigger: trigger });
      } else {
        fadeUp(ref.current, { delay, scrollTrigger: trigger });
      }
    }, ref);

    return () => ctx.revert();
  }, [animate, delay, reducedMotion, variant]);

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
