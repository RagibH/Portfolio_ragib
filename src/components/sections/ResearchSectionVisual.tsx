"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const RESEARCH_IMAGE_SRC = "/images/research-section.png?v=3";

export default function ResearchSectionVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !visualRef.current || !figureRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(figureRef.current, {
        y: -28,
        ease: "none",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(visualRef.current, {
        rotateY: 2,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1.8,
        },
      });
    }, visualRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={visualRef} className="research-visual">
      <div className="research-visual__backdrop" aria-hidden="true" />
      <div
        className="research-visual__orb research-visual__orb--one"
        aria-hidden="true"
      />
      <div
        className="research-visual__orb research-visual__orb--two"
        aria-hidden="true"
      />
      <div className="research-visual__sheen" aria-hidden="true" />
      <div ref={figureRef} className="research-visual__figure">
        <Image
          src={RESEARCH_IMAGE_SRC}
          alt="Research workspace with laptop, notes and sketches"
          width={960}
          height={1200}
          className="research-visual__image"
          sizes="(max-width: 1023px) 100vw, 40vw"
          unoptimized
        />
      </div>
    </div>
  );
}
