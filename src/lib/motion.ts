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
