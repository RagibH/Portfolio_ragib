"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotionQuery } from "@/lib/motion";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = prefersReducedMotionQuery();
    if (!query) return;

    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
