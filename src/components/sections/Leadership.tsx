"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import LeadershipCard, {
  type LeadershipCardData,
} from "@/components/ui/LeadershipCard";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, scaleIn, fadeFromRight, slideReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";

const leadershipParagraph =
  "Leadership has helped me grow beyond technical knowledge. Organizing events, collaborating with teams and mentoring fellow students have strengthened my communication, planning and decision-making skills.";

const leadershipCards: LeadershipCardData[] = [
  {
    title: "General Secretary",
    organization: "CSE Society",
    description:
      "Leading technical events, seminars, competitions and student initiatives.",
  },
  {
    title: "Technical Event Organizer",
    description:
      "Organized workshops, programming contests and academic sessions for students.",
  },
  {
    title: "Research Collaboration",
    description:
      "Worked with research teammates on machine learning and computer vision projects from idea to publication.",
  },
];

const BAND_INDEX = 6;
const band = sectionBand(BAND_INDEX);

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
    if (cardsRef.current) {
      tl.add(
        scaleIn(cardsRef.current.children, {
          stagger: 0.12,
          duration: 0.75,
        }),
        "-=0.3"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="06" className="editorial-section-label">
          Leadership
        </SectionLabel>

        <EditorialHeading ref={headingRef} className="editorial-section-heading">
          Building communities beyond the classroom.
        </EditorialHeading>

        <p
          ref={paragraphRef}
          className="editorial-section-lead editorial-section-lead--after-heading"
        >
          {leadershipParagraph}
        </p>

        <div ref={cardsRef} className="leadership-grid editorial-section-body">
          {leadershipCards.map((card) => (
            <LeadershipCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
