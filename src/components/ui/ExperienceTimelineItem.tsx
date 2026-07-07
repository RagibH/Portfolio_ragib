"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { slideReveal } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";

export type ExperienceEntry = {
  year: string;
  title: string;
  organization?: string;
  description: string;
};

type ExperienceTimelineItemProps = {
  entry: ExperienceEntry;
  index?: number;
};

export default function ExperienceTimelineItem({
  entry,
  index = 0,
}: ExperienceTimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!SCROLL_REVEAL_ENABLED || reducedMotion || !itemRef.current) return;

    const ctx = gsap.context(() => {
      slideReveal(itemRef.current, {
        fromDirection: index % 2 === 0 ? "left" : "right",
        duration: 0.85,
        scrollTrigger: {
          trigger: itemRef.current,
          start: SCROLL_REVEAL_START,
          once: true,
        },
      });
    }, itemRef);

    return () => ctx.revert();
  }, [reducedMotion, index]);

  return (
    <div ref={itemRef} className="experience-row">
      <div className="experience-row__marker">
        <span className="experience-row__year">{entry.year}</span>
        <span className="experience-row__dot" aria-hidden="true" />
      </div>

      <div className="experience-row__main">
        <h3 className="experience-row__title">{entry.title}</h3>
        {entry.organization ? (
          <p className="experience-row__org">{entry.organization}</p>
        ) : null}
      </div>

      <p className="experience-row__description">{entry.description}</p>
    </div>
  );
}
