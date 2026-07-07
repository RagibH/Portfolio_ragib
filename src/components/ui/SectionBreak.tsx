"use client";

import { useRef } from "react";
import { useSectionLineReveal } from "@/hooks/useSectionLineReveal";

export default function SectionBreak() {
  const breakRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useSectionLineReveal(breakRef, lineRef, "left center");

  return (
    <div ref={breakRef} className="section-break" aria-hidden="true">
      <div className="site-container">
        <div ref={lineRef} className="section-break__line">
          <span className="section-break__dot" />
        </div>
      </div>
    </div>
  );
}
