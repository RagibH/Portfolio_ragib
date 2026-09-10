"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import CompactResearchCard from "./CompactResearchCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { moreResearch } from "./data";

const BAND_INDEX = 3;
const band = sectionBand(BAND_INDEX);

export default function MoreResearch() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (labelRef.current) {
      tl.add(fadeUp(labelRef.current, { y: 16, duration: 0.5 }));
    }
    if (headingRef.current) {
      tl.add(
        textReveal(headingRef.current),
        labelRef.current ? "-=0.2" : undefined
      );
    }
    if (cardsRef.current) {
      tl.add(
        staggerReveal(cardsRef.current.children, {
          stagger: 0.1,
          duration: 0.55,
          y: 18,
        }),
        "-=0.15"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="more-research"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="03" className="editorial-section-label">
          Review
        </SectionLabel>

        <EditorialHeading ref={headingRef} className="editorial-section-heading">
          Under review and submissions.
        </EditorialHeading>

        <div ref={cardsRef} className="more-research-grid editorial-section-body">
          {moreResearch.map((item) => (
            <CompactResearchCard key={item.title} research={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
