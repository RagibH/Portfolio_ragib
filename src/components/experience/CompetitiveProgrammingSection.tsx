"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import CPStatsDisplay from "./CPStatsDisplay";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { competitiveProgrammingParagraph } from "./data";

const BAND_INDEX = 3;
const band = sectionBand(BAND_INDEX);

export default function CompetitiveProgrammingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
    if (panelRef.current) {
      tl.add(fadeUp(panelRef.current, { duration: 0.65, y: 20 }), "-=0.25");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="competitive-programming"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} experience-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="experience-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="03" className="experience-section-label">
          Programming
        </SectionLabel>

        <div ref={panelRef} className="cp-panel experience-section-body">
          <div className="cp-panel__intro">
            <EditorialHeading
              ref={headingRef}
              className="experience-section-heading cp-panel__heading"
            >
              Algorithmic Foundation
            </EditorialHeading>

            <p className="experience-section-lead experience-section-lead--after-heading">
              {competitiveProgrammingParagraph}
            </p>
          </div>

          <div className="cp-panel__stats">
            <CPStatsDisplay />
          </div>
        </div>
      </div>
    </section>
  );
}
