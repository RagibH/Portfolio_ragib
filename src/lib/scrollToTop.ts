import { getPrefersReducedMotion } from "@/lib/motion";

type ScrollController = (
  top: number,
  options?: { immediate?: boolean }
) => void;

let scrollController: ScrollController | null = null;

export function registerScrollController(controller: ScrollController | null) {
  scrollController = controller;
}

export function scrollToTop() {
  const immediate = getPrefersReducedMotion();

  if (scrollController) {
    scrollController(0, { immediate });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: immediate ? "auto" : "smooth",
  });
}
