"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import JourneyTimelineItem from "./JourneyTimelineItem";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeFromLeft, slideReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { journeyEntries } from "./data";

const BAND_INDEX = 5;
const band = sectionBand(BAND_INDEX);

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (labelRef.current) {
      tl.add(fadeFromLeft(labelRef.current, { x: -32, duration: 0.7 }));
    }
    if (headingRef.current) {
      tl.add(
        slideReveal(headingRef.current, { fromDirection: "right", duration: 0.9 }),
        labelRef.current ? "-=0.35" : undefined
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} experience-page-section experience-page-journey w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="experience-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="05" className="experience-section-label">
          Journey
        </SectionLabel>

        <EditorialHeading
          ref={headingRef}
          className="experience-section-heading mt-8 md:mt-10"
        >
          My journey.
        </EditorialHeading>

        <div className="journey-timeline experience-section-body">
          {journeyEntries.map((entry, index) => (
            <JourneyTimelineItem
              key={entry.year}
              entry={entry}
              index={index}
              align={index % 2 === 0 ? "left" : "right"}
              isLast={index === journeyEntries.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
