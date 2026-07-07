"use client";

import { useRef } from "react";
import { useSectionLineReveal } from "@/hooks/useSectionLineReveal";

export default function PageSectionBreak() {
  const breakRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useSectionLineReveal(breakRef, lineRef, "left center");

  return (
    <div ref={breakRef} className="editorial-section-break" aria-hidden="true">
      <div className="editorial-page-container">
        <div ref={lineRef} className="editorial-section-break__line">
          <span className="editorial-section-break__dot" />
        </div>
      </div>
    </div>
  );
}
