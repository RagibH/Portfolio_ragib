"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import PublicationCard from "./PublicationCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { featuredPublications } from "./data";

const BAND_INDEX = 2;
const band = sectionBand(BAND_INDEX);

export default function FeaturedPublications() {
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
          duration: 0.6,
          y: 22,
        }),
        "-=0.15"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="featured-publications"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="02" className="editorial-section-label">
          Publications
        </SectionLabel>

        <EditorialHeading ref={headingRef} className="editorial-section-heading">
          Featured publications.
        </EditorialHeading>

        <div ref={cardsRef} className="publications-grid editorial-section-body">
          {featuredPublications.map((publication) => (
            <PublicationCard
              key={publication.title}
              publication={publication}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
