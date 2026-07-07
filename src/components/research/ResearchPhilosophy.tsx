"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeFromRight, fadeUp, slideReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { philosophyParagraph } from "./data";

const BAND_INDEX = 1;
const band = sectionBand(BAND_INDEX);

export default function ResearchPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (labelRef.current) {
      tl.add(fadeFromRight(labelRef.current, { x: 32, duration: 0.7 }));
    }
    if (headingRef.current) {
      tl.add(
        slideReveal(headingRef.current, { fromDirection: "left", duration: 0.9 }),
        labelRef.current ? "-=0.35" : undefined
      );
    }
    if (paragraphRef.current) {
      tl.add(fadeUp(paragraphRef.current, { duration: 0.75 }), "-=0.45");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="research-philosophy"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="01" className="editorial-section-label">
          Philosophy
        </SectionLabel>

        <EditorialHeading ref={headingRef} className="editorial-section-heading">
          Research with practical impact.
        </EditorialHeading>

        <p
          ref={paragraphRef}
          className="editorial-section-lead editorial-section-lead--after-heading"
        >
          {philosophyParagraph}
        </p>
      </div>
    </section>
  );
}
