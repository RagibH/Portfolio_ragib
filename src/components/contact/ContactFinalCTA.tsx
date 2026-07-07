"use client";

import { useRef } from "react";
import EditorialHeading from "@/components/ui/EditorialHeading";
import PremiumButton from "@/components/ui/PremiumButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import { finalCtaHeading, finalCtaParagraph } from "./data";

export default function ContactFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (shellRef.current) {
      tl.add(fadeUp(shellRef.current, { duration: 0.65, y: 20 }));
    }
    if (headingRef.current) {
      tl.add(textReveal(headingRef.current), "-=0.35");
    }
    if (paragraphRef.current) {
      tl.add(fadeUp(paragraphRef.current, { duration: 0.6, y: 16 }), "-=0.3");
    }
    if (actionsRef.current) {
      tl.add(fadeUp(actionsRef.current, { duration: 0.55, y: 14 }), "-=0.25");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="contact-closing"
      className={`${sectionSpacing.section} editorial-page-section editorial-page-cta contact-page-closing w-full`}
    >
      <div className="editorial-page-container">
        <div ref={shellRef} className="editorial-page-cta__shell contact-page-closing__shell">
          <EditorialHeading
            ref={headingRef}
            className="editorial-page-cta__heading mx-auto text-center"
          >
            {finalCtaHeading}
          </EditorialHeading>

          <p
            ref={paragraphRef}
            className="editorial-section-lead editorial-page-cta__text editorial-section-lead--after-heading mx-auto text-center"
          >
            {finalCtaParagraph}
          </p>

          <div ref={actionsRef} className="editorial-page-cta__actions">
            <PremiumButton href="/" className="premium-button--filled">
              Back to Home
            </PremiumButton>
            <PremiumButton href="/research">View Research</PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
