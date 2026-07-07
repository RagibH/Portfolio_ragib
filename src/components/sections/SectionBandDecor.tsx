"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { SectionBandDecorVariant } from "@/lib/sectionBand";

type SectionBandDecorProps = {
  variant?: SectionBandDecorVariant;
};

export default function SectionBandDecor({
  variant = "subtle",
}: SectionBandDecorProps) {
  const decorRef = useRef<HTMLDivElement>(null);
  const orbOneRef = useRef<HTMLDivElement>(null);
  const orbTwoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !decorRef.current) return;

    const ctx = gsap.context(() => {
      if (orbOneRef.current) {
        gsap.to(orbOneRef.current, {
          y: -48,
          x: 24,
          ease: "none",
          scrollTrigger: {
            trigger: decorRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (orbTwoRef.current) {
        gsap.to(orbTwoRef.current, {
          y: 36,
          x: -32,
          ease: "none",
          scrollTrigger: {
            trigger: decorRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0.3, opacity: 0.15 },
          {
            scaleX: 1,
            opacity: variant === "warm" ? 0.35 : 0.22,
            ease: "none",
            scrollTrigger: {
              trigger: decorRef.current,
              start: "top 85%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    }, decorRef);

    return () => ctx.revert();
  }, [reducedMotion, variant]);

  return (
    <div
      ref={decorRef}
      className={`section-band-decor section-band-decor--${variant}`}
      aria-hidden="true"
    >
      <div ref={orbOneRef} className="section-band-decor__orb section-band-decor__orb--one" />
      <div ref={orbTwoRef} className="section-band-decor__orb section-band-decor__orb--two" />
      <div ref={lineRef} className="section-band-decor__line" />
      <div className="section-band-decor__grain" />
    </div>
  );
}
