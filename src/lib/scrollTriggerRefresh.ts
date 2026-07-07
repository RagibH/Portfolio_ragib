import { ScrollTrigger } from "@/lib/gsap";

let refreshFrameOne = 0;
let refreshFrameTwo = 0;

/** Coalesce multiple refresh calls into a single layout pass. */
export function scheduleScrollTriggerRefresh() {
  if (refreshFrameOne) return;

  refreshFrameOne = requestAnimationFrame(() => {
    refreshFrameTwo = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      refreshFrameOne = 0;
      refreshFrameTwo = 0;
    });
  });
}

export function cancelScheduledScrollTriggerRefresh() {
  if (refreshFrameOne) cancelAnimationFrame(refreshFrameOne);
  if (refreshFrameTwo) cancelAnimationFrame(refreshFrameTwo);
  refreshFrameOne = 0;
  refreshFrameTwo = 0;
}
