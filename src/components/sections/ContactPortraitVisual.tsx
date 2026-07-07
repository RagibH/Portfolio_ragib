"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { isScrollScrubEnabled } from "@/lib/motion";

const PORTRAIT_SRC = "/images/ragib-portrait.jpg?v=1";

export default function ContactPortraitVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !visualRef.current || !figureRef.current || !isScrollScrubEnabled()) return;

    const ctx = gsap.context(() => {
      gsap.to(figureRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      gsap.fromTo(
        visualRef.current,
        { scale: 0.96, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 92%",
            end: "center 70%",
            scrub: 1.2,
          },
        }
      );
    }, visualRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={visualRef} className="contact-portrait-visual contact-portrait">
      <div className="contact-portrait-visual__backdrop" aria-hidden="true" />
      <div
        className="contact-portrait-visual__orb contact-portrait-visual__orb--one"
        aria-hidden="true"
      />
      <div
        className="contact-portrait-visual__orb contact-portrait-visual__orb--two"
        aria-hidden="true"
      />
      <div className="contact-portrait-visual__frame" aria-hidden="true" />
      <div className="contact-portrait-visual__sheen" aria-hidden="true" />
      <div ref={figureRef} className="contact-portrait-visual__figure">
        <Image
          src={PORTRAIT_SRC}
          alt="Portrait of Md. Ragib Hasan"
          width={720}
          height={960}
          className="contact-portrait-visual__image"
          sizes="(max-width: 1023px) 100vw, 360px"
          unoptimized
        />
      </div>
    </div>
  );
}
