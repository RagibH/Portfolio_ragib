"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import ProjectShowcaseItem from "./ProjectShowcaseItem";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { featuredProjects, featuredProjectsIntro } from "./data";

const BAND_INDEX = 1;
const band = sectionBand(BAND_INDEX);

export default function FeaturedProjectsShowcase() {
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
      id="featured-projects"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="01" className="editorial-section-label">
          Featured
        </SectionLabel>

        <EditorialHeading ref={headingRef} className="editorial-section-heading">
          Selected Work
        </EditorialHeading>

        <p
          ref={paragraphRef}
          className="editorial-section-lead editorial-section-lead--after-heading"
        >
          {featuredProjectsIntro}
        </p>

        <div className="project-showcase-list editorial-section-body">
          {featuredProjects.map((project, index) => (
            <ProjectShowcaseItem
              key={project.name}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
