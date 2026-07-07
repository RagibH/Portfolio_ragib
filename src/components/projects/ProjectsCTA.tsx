"use client";

import { useRef } from "react";
import EditorialHeading from "@/components/ui/EditorialHeading";
import PremiumButton from "@/components/ui/PremiumButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";

const BAND_INDEX = 4;
const band = sectionBand(BAND_INDEX);

export default function ProjectsCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (shellRef.current) {
      tl.add(fadeUp(shellRef.current, { duration: 0.65, y: 20 }));
    }
    if (headingRef.current) {
      tl.add(textReveal(headingRef.current), "-=0.35");
    }
    if (paragraphRef.current) {
      tl.add(fadeUp(paragraphRef.current, { duration: 0.6, y: 18 }), "-=0.3");
    }
    if (ctaRef.current) {
      tl.add(fadeUp(ctaRef.current, { duration: 0.55, y: 16 }), "-=0.25");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="projects-cta"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section editorial-page-cta w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <div ref={shellRef} className="editorial-page-cta__shell">
          <EditorialHeading
            ref={headingRef}
            className="editorial-page-cta__heading mx-auto text-center"
          >
            Interested in working together?
          </EditorialHeading>

          <p
            ref={paragraphRef}
            className="editorial-section-lead editorial-page-cta__text editorial-section-lead--after-heading mx-auto text-center"
          >
            Open to thoughtful collaboration across research, engineering and
            meaningful product work.
          </p>

          <div ref={ctaRef} className="editorial-page-cta__actions">
            <PremiumButton href="/research" className="premium-button--filled">
              Research
            </PremiumButton>
            <PremiumButton href="/contact">Contact</PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
