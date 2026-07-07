"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import ExperienceLeadershipCard from "./ExperienceLeadershipCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { getLeadershipIcon } from "./educationIcons";
import { leadershipParagraph, leadershipRoles } from "./data";

const BAND_INDEX = 2;
const band = sectionBand(BAND_INDEX);

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
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
    if (paragraphRef.current) {
      tl.add(fadeUp(paragraphRef.current, { duration: 0.65 }), "-=0.35");
    }
    if (panelRef.current) {
      tl.add(fadeUp(panelRef.current, { duration: 0.65, y: 20 }), "-=0.3");
    }
    if (cardsRef.current) {
      tl.add(
        staggerReveal(cardsRef.current.children, {
          stagger: 0.1,
          duration: 0.55,
          y: 16,
        }),
        "-=0.35"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} experience-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="experience-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="02" className="experience-section-label">
          Leadership
        </SectionLabel>

        <div ref={panelRef} className="leadership-panel experience-section-body">
          <div className="leadership-panel__intro">
            <EditorialHeading
              ref={headingRef}
              className="experience-section-heading leadership-panel__heading"
            >
              Leadership and Community
            </EditorialHeading>

            <p
              ref={paragraphRef}
              className="experience-section-lead experience-section-lead--after-heading"
            >
              {leadershipParagraph}
            </p>
          </div>

          <div ref={cardsRef} className="leadership-panel__cards">
            {leadershipRoles.map((role, index) => (
              <ExperienceLeadershipCard
                key={`${role.title}-${role.organization}`}
                role={role}
                icon={getLeadershipIcon(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
