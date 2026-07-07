"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isLenisEnabled } from "@/lib/motion";
import {
  cancelScheduledScrollTriggerRefresh,
  scheduleScrollTriggerRefresh,
} from "@/lib/scrollTriggerRefresh";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onLoad = () => scheduleScrollTriggerRefresh();
    window.addEventListener("load", onLoad);
    scheduleScrollTriggerRefresh();

    if (!isLenisEnabled()) {
      return () => {
        window.removeEventListener("load", onLoad);
        cancelScheduledScrollTriggerRefresh();
      };
    }

    const lenis = new Lenis({
      duration: 1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      window.removeEventListener("load", onLoad);
      cancelScheduledScrollTriggerRefresh();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      lenis.destroy();
      scheduleScrollTriggerRefresh();
    };
  }, []);

  return <>{children}</>;
}
