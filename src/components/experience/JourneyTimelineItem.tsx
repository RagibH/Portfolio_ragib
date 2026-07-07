"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { scaleIn, slideReveal } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";
import ExperienceSectionIcon from "./ExperienceSectionIcon";
import { getJourneyIcon } from "./educationIcons";
import type { JourneyEntry } from "./types";

type JourneyTimelineItemProps = {
  entry: JourneyEntry;
  align?: "left" | "right";
  index?: number;
  isLast?: boolean;
};

export default function JourneyTimelineItem({
  entry,
  align = "left",
  index = 0,
  isLast = false,
}: JourneyTimelineItemProps) {
  const itemRef = useRef<HTMLElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const descriptions = entry.description
    ? Array.isArray(entry.description)
      ? entry.description
      : [entry.description]
    : [];

  useLayoutEffect(() => {
    if (!SCROLL_REVEAL_ENABLED || reducedMotion || !itemRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: SCROLL_REVEAL_START,
          once: true,
        },
      });

      if (yearRef.current) {
        tl.add(scaleIn(yearRef.current, { duration: 0.65 }));
      }

      if (cardRef.current) {
        tl.add(
          slideReveal(cardRef.current, {
            fromDirection: align === "left" ? "right" : "left",
            duration: 0.85,
          }),
          "-=0.4"
        );
      }
    }, itemRef);

    return () => ctx.revert();
  }, [reducedMotion, align, index]);

  return (
    <article
      ref={itemRef}
      className={`journey-node journey-node--${align}${isLast ? " journey-node--last" : ""}`}
    >
      <div ref={yearRef} className="journey-node__year-wrap">
        <span className="journey-node__year">{entry.year}</span>
        <span className="journey-node__dot" aria-hidden="true" />
      </div>

      <div ref={cardRef} className="journey-node__card">
        <ExperienceSectionIcon variant={getJourneyIcon(index)} />
        <h3 className="journey-node__title">{entry.title}</h3>
        {descriptions.length > 0 ? (
          descriptions.length === 1 ? (
            <p className="journey-node__description">{descriptions[0]}</p>
          ) : (
            <ul className="journey-node__list">
              {descriptions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )
        ) : null}
      </div>
    </article>
  );
}
