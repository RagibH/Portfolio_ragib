"use client";

import { useRef } from "react";
import EditorialHeading from "@/components/ui/EditorialHeading";
import PremiumButton from "@/components/ui/PremiumButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";

const BAND_INDEX = 6;
const band = sectionBand(BAND_INDEX);

export default function ResearchCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (shellRef.current) {
      tl.add(fadeUp(shellRef.current, { duration: 0.65, y: 20 }));
    }
    if (headingRef.current) {
      tl.add(textReveal(headingRef.current), "-=0.35");
    }
    if (ctaRef.current) {
      tl.add(fadeUp(ctaRef.current, { duration: 0.55, y: 16 }), "-=0.25");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="research-cta"
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
            Interested in collaborating on research?
          </EditorialHeading>

          <div ref={ctaRef} className="editorial-page-cta__actions">
            <PremiumButton href="/contact" className="premium-button--filled">
              Contact Me
            </PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
