"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { textReveal, slideReveal } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";

type AnimatedHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
  animate?: boolean;
  variant?: "rise" | "slide-left" | "slide-right";
};

export default function AnimatedHeading({
  as: Tag = "h2",
  animate = true,
  variant = "rise",
  className,
  children,
  ...props
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
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
      } else if (variant === "slide-right") {
        slideReveal(ref.current, { fromDirection: "right", scrollTrigger: trigger });
      } else {
        textReveal(ref.current, { scrollTrigger: trigger });
      }
    }, ref);

    return () => ctx.revert();
  }, [animate, reducedMotion, variant]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "font-sans font-semibold tracking-[-0.025em] text-[#F5F1EC]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
