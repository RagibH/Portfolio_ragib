"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeUp, textReveal } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type SubpageCompactHeroProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SubpageCompactHero({
  title,
  subtitle,
  align = "left",
}: SubpageCompactHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowSecondaryRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (glowRef.current) {
        tl.from(glowRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 1.1,
        });
      }

      if (glowSecondaryRef.current) {
        tl.from(
          glowSecondaryRef.current,
          {
            opacity: 0,
            x: -24,
            duration: 1,
          },
          "-=0.85"
        );
      }

      if (headingRef.current) {
        tl.add(textReveal(headingRef.current), "-=0.55");
      }

      if (subtitleRef.current) {
        tl.add(fadeUp(subtitleRef.current, { duration: 0.7, y: 18 }), "-=0.35");
      }

      if (lineRef.current) {
        tl.from(
          lineRef.current,
          {
            scaleY: 0,
            opacity: 0,
            duration: 0.65,
            transformOrigin: "top center",
          },
          "-=0.25"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "subpage-compact-hero",
        align === "center" && "subpage-compact-hero--center"
      )}
    >
      <div ref={glowRef} className="subpage-compact-hero__glow" aria-hidden="true" />
      <div
        ref={glowSecondaryRef}
        className="subpage-compact-hero__glow subpage-compact-hero__glow--secondary"
        aria-hidden="true"
      />
      <div className="subpage-compact-hero__grain" aria-hidden="true" />

      <div className="editorial-page-container subpage-compact-hero__inner">
        <h1 ref={headingRef} className="subpage-compact-hero__title">
          {title}
        </h1>
        {subtitle ? (
          <p ref={subtitleRef} className="subpage-compact-hero__subtitle">
            {subtitle}
          </p>
        ) : null}
        <div ref={lineRef} className="subpage-compact-hero__line" aria-hidden="true" />
      </div>
    </section>
  );
}
