"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { researchInterests } from "./data";

const BAND_INDEX = 5;
const band = sectionBand(BAND_INDEX);

export default function ResearchInterests() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLUListElement>(null);

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
    if (tagsRef.current) {
      tl.add(
        staggerReveal(tagsRef.current.children, {
          stagger: 0.05,
          duration: 0.45,
          y: 12,
        }),
        "-=0.2"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="research-interests"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="05" className="editorial-section-label">
          Interests
        </SectionLabel>

        <EditorialHeading ref={headingRef} className="editorial-section-heading">
          Research interests.
        </EditorialHeading>

        <ul ref={tagsRef} className="research-interests editorial-section-body">
          {researchInterests.map((interest) => (
            <li key={interest}>
              <span className="research-interest-tag">{interest}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
