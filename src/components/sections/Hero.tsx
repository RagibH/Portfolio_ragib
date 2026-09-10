"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { heroImageFallbackSrc, heroImageSrc } from "@/lib/site";
import { isScrollScrubEnabled } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !isScrollScrubEnabled()) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -48,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "42% top",
          scrub: 0.6,
        },
      });

      if (mediaRef.current) {
        gsap.to(mediaRef.current, {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "52% top",
            scrub: 0.6,
          },
        });
      }

      gsap.to(sectionRef.current, {
        scale: 0.975,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "52% top",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="home-hero-section relative flex h-dvh min-h-[640px] w-full flex-col overflow-hidden"
      style={{ transformOrigin: "top center" }}
    >
      <div
        ref={mediaRef}
        data-intro="background"
        className="home-hero__media"
        aria-hidden="true"
      >
        <picture>
          <source srcSet={heroImageSrc} type="image/webp" />
          <img
            src={heroImageFallbackSrc}
            alt=""
            className="home-hero__image"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="home-hero__overlay" />
        <div className="home-hero__float home-hero__float--one" />
        <div className="home-hero__float home-hero__float--two" />
        <div className="home-hero__float home-hero__float--three" />
      </div>

      <div
        ref={contentRef}
        className="home-hero__content editorial-page-container"
      >
        <h1 data-intro="title" className="home-hero__title opacity-0">
          Ragib Hasan
        </h1>

        <div className="home-hero__roles">
          <p
            data-intro="subtitle-primary"
            className="home-hero__role home-hero__role--left opacity-0"
            aria-hidden="true"
          >
            <span className="home-hero__role-line">Aspiring Machine Learning</span>
            <span className="home-hero__role-line">Researcher</span>
          </p>
          <p
            data-intro="subtitle-secondary"
            className="home-hero__role home-hero__role--right opacity-0"
          >
            <span className="home-hero__role-line">Aspiring PhD</span>
            <span className="home-hero__role-line">Student</span>
          </p>
        </div>

        <div data-intro="hero-actions" className="home-hero__actions opacity-0">
          <p className="home-hero__status">
            <span className="home-hero__status-dot" aria-hidden="true" />
            Open to research collaborations
          </p>
          <div className="home-hero__buttons">
            <Link href="/projects" className="premium-button premium-button--filled">
              View Projects
            </Link>
            <Link href="/research" className="premium-button">
              View Research
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10">
        <ScrollIndicator />
      </div>
    </section>
  );
}
