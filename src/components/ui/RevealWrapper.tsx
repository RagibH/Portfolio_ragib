"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { slideReveal, fadeUp, scaleIn } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";

type RevealVariant = "slide-right" | "slide-left" | "fade-up" | "scale";

type RevealWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  animate?: boolean;
  variant?: RevealVariant;
};

export default function RevealWrapper({
  animate = true,
  variant = "slide-right",
  className,
  children,
  ...props
}: RevealWrapperProps) {
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

      if (variant === "slide-left") {
        slideReveal(ref.current, { fromDirection: "left", scrollTrigger: trigger });
      } else if (variant === "fade-up") {
        fadeUp(ref.current, { scrollTrigger: trigger });
      } else if (variant === "scale") {
        scaleIn(ref.current, { scrollTrigger: trigger });
      } else {
        slideReveal(ref.current, { fromDirection: "right", scrollTrigger: trigger });
      }
    }, ref);

    return () => ctx.revert();
  }, [animate, reducedMotion, variant]);

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
