import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Register plugins only in browser context */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.config({
    nullTargetWarn: false,
  });
}

export { gsap, ScrollTrigger };
