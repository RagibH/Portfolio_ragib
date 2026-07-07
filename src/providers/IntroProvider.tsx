"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function showNavOnly(nav: Element | null) {
  if (nav) {
    gsap.set(nav, { opacity: 1, y: 0, clearProps: "clipPath,scale" });
  }
}

function runHomeIntro(reducedMotion: boolean) {
  const background = document.querySelector('[data-intro="background"]');
  const nav = document.querySelector('[data-intro="nav"]');
  const title = document.querySelector('[data-intro="title"]');
  const subtitlePrimary = document.querySelector(
    '[data-intro="subtitle-primary"]'
  );
  const subtitleSecondary = document.querySelector(
    '[data-intro="subtitle-secondary"]'
  );
  const heroActions = document.querySelector('[data-intro="hero-actions"]');
  const scrollIndicator = document.querySelector(
    '[data-intro="scroll-indicator"]'
  );

  if (!title) return null;

  const introTargets = [
    background,
    nav,
    title,
    subtitlePrimary,
    subtitleSecondary,
    heroActions,
    scrollIndicator,
  ].filter(Boolean);

  if (reducedMotion) {
    gsap.set(introTargets, { opacity: 1, x: 0, y: 0, clearProps: "clipPath,scale" });
    return null;
  }

  const fadeTargets = [
    nav,
    title,
    subtitlePrimary,
    subtitleSecondary,
    heroActions,
    scrollIndicator,
  ].filter(Boolean);

  gsap.set(fadeTargets, { opacity: 0 });
  if (nav) gsap.set(nav, { y: -10 });
  if (title) gsap.set(title, { y: 24 });
  if (subtitlePrimary) gsap.set(subtitlePrimary, { y: 12, x: -32 });
  if (subtitleSecondary) gsap.set(subtitleSecondary, { y: 12, x: 32 });
  if (heroActions) gsap.set(heroActions, { y: 18 });
  if (scrollIndicator) gsap.set(scrollIndicator, { y: 8 });
  if (background) gsap.set(background, { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  if (background) {
    tl.to(background, { opacity: 1, duration: 0.7 });
  }
  if (nav) {
    tl.to(nav, { opacity: 1, y: 0, duration: 0.55 }, background ? "-=0.35" : undefined);
  }
  if (title) {
    tl.to(title, { opacity: 1, y: 0, duration: 0.75 }, "-=0.2");
  }
  if (subtitlePrimary) {
    tl.to(
      subtitlePrimary,
      { opacity: 1, y: 0, x: 0, duration: 0.65, clearProps: "x" },
      "-=0.4"
    );
  }
  if (subtitleSecondary) {
    tl.to(
      subtitleSecondary,
      { opacity: 1, y: 0, x: 0, duration: 0.65, clearProps: "x" },
      "-=0.5"
    );
  }
  if (heroActions) {
    tl.to(heroActions, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
  }
  if (scrollIndicator) {
    tl.to(scrollIndicator, { opacity: 1, y: 0, duration: 0.45 }, "-=0.1");
  }

  return tl;
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.querySelector('[data-intro="nav"]');

    if (pathname !== "/") {
      showNavOnly(nav);
      return;
    }

    let timeline: gsap.core.Timeline | null = null;
    let frameId = 0;

    const startIntro = () => {
      timeline = runHomeIntro(reducedMotion);
    };

    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(startIntro);
    });

    return () => {
      cancelAnimationFrame(frameId);
      timeline?.kill();
    };
  }, [pathname, reducedMotion]);

  return <>{children}</>;
}
