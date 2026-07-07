"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import ToolkitVisual from "./ToolkitVisual";
import { toolkitGroups, toolkitParagraph } from "./data";

const BAND_INDEX = 4;
const band = sectionBand(BAND_INDEX);

export default function TechnicalToolkitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

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
    if (groupsRef.current) {
      tl.add(
        staggerReveal(groupsRef.current.children, {
          stagger: 0.1,
          duration: 0.55,
          y: 16,
        }),
        "-=0.2"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="technical-toolkit"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} experience-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="experience-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="04" className="experience-section-label">
          Toolkit
        </SectionLabel>

        <EditorialHeading
          ref={headingRef}
          className="experience-section-heading mt-8 md:mt-10"
        >
          Tools and Technologies
        </EditorialHeading>

        <div className="toolkit-panel experience-section-body">
          <div className="toolkit-panel__content">
            <p
              ref={paragraphRef}
              className="experience-section-lead toolkit-panel__lead"
            >
              {toolkitParagraph}
            </p>

            <div ref={groupsRef} className="experience-toolkit-groups">
              {toolkitGroups.map((group) => (
              <div key={group.name} className="experience-toolkit-group">
                <h3 className="experience-toolkit-group__label">{group.name}</h3>
                <ul className="experience-toolkit-group__pills">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="experience-toolkit-pill">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              ))}
            </div>
          </div>

          <ToolkitVisual />
        </div>
      </div>
    </section>
  );
}
