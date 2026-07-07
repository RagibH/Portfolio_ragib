"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { futureVisionParagraph } from "./data";

const BAND_INDEX = 6;
const band = sectionBand(BAND_INDEX);

export default function FutureVisionSection() {
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
      id="future-vision"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} experience-page-section experience-page-vision w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="experience-page-container experience-page-vision__inner relative z-[1]">
        <SectionLabel ref={labelRef} index="06" className="experience-section-label">
          Vision
        </SectionLabel>

        <EditorialHeading
          ref={headingRef}
          className="experience-section-heading experience-page-vision__heading mt-8 md:mt-10"
        >
          Looking Ahead
        </EditorialHeading>

        <p
          ref={paragraphRef}
          className="experience-page-vision__text experience-section-lead--after-heading mt-8 md:mt-10"
        >
          {futureVisionParagraph}
        </p>
      </div>
    </section>
  );
}
