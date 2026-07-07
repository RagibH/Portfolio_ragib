"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import EducationInfoCard from "./EducationInfoCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { getEducationIcon } from "./educationIcons";
import { educationInfo, educationParagraph } from "./data";

const BAND_INDEX = 1;
const band = sectionBand(BAND_INDEX);

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
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
    if (panelRef.current) {
      tl.add(fadeUp(panelRef.current, { duration: 0.65, y: 20 }), "-=0.3");
    }
    if (cardsRef.current) {
      tl.add(
        staggerReveal(cardsRef.current.children, {
          stagger: 0.08,
          duration: 0.55,
          y: 18,
        }),
        "-=0.4"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="education"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} experience-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="experience-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="01" className="experience-section-label">
          Education
        </SectionLabel>

        <div ref={panelRef} className="education-panel experience-section-body">
          <div className="education-panel__intro">
            <EditorialHeading
              ref={headingRef}
              className="experience-section-heading education-panel__heading"
            >
              Academic Journey
            </EditorialHeading>
            <p className="experience-section-lead experience-section-lead--after-heading">
              {educationParagraph}
            </p>
          </div>

          <div className="education-panel__cards-shell">
            <div ref={cardsRef} className="education-panel__cards">
              {educationInfo.map((item, index) => (
                <EducationInfoCard
                  key={item.label}
                  label={item.label}
                  icon={getEducationIcon(item.label)}
                  wide={index === educationInfo.length - 1}
                  value={
                    Array.isArray(item.value)
                      ? item.value.join(", ")
                      : item.value
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
