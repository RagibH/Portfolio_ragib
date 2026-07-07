"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { developmentPhilosophyParagraph } from "./data";

const BAND_INDEX = 3;
const band = sectionBand(BAND_INDEX);

export default function DevelopmentPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

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
    if (paragraphRef.current) {
      tl.add(fadeUp(paragraphRef.current, { duration: 0.65 }), "-=0.35");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="development-philosophy"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section editorial-page-vision w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container editorial-page-vision__inner relative z-[1]">
        <SectionLabel ref={labelRef} index="03" className="editorial-section-label">
          Philosophy
        </SectionLabel>

        <EditorialHeading
          ref={headingRef}
          className="editorial-section-heading editorial-page-vision__heading"
        >
          Building with purpose.
        </EditorialHeading>

        <p
          ref={paragraphRef}
          className="editorial-page-vision__text editorial-section-lead--after-heading"
        >
          {developmentPhilosophyParagraph}
        </p>
      </div>
    </section>
  );
}
