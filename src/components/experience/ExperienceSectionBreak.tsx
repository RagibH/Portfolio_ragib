"use client";

import { useRef } from "react";
import { useSectionLineReveal } from "@/hooks/useSectionLineReveal";

export default function ExperienceSectionBreak() {
  const breakRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useSectionLineReveal(breakRef, lineRef, "right center");

  return (
    <div ref={breakRef} className="experience-section-break" aria-hidden="true">
      <div className="experience-page-container">
        <div ref={lineRef} className="experience-section-break__line">
          <span className="experience-section-break__dot" />
        </div>
      </div>
    </div>
  );
}
