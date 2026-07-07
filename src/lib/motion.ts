export const SCROLL_REVEAL_ENABLED = true;
export const SCROLL_REVEAL_START = "top 90%";

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function prefersReducedMotionQuery(): MediaQueryList | null {
  if (typeof window === "undefined") return null;
  return window.matchMedia("(prefers-reduced-motion: reduce)");
}

/** Scroll-linked scrub effects are expensive on touch and narrow viewports. */
export function isScrollScrubEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (getPrefersReducedMotion()) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.innerWidth < 1024) return false;
  return true;
}

/** Lenis smooth scroll is best on desktop pointer devices only. */
export function isLenisEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (getPrefersReducedMotion()) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.innerWidth < 1024) return false;
  return true;
}
