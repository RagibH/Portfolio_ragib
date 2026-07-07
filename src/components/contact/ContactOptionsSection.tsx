"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import PremiumButton from "@/components/ui/PremiumButton";
import ContactDetailsPanel from "./ContactDetailsPanel";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import {
  contactActionLinks,
  contactEmailHref,
  contactStaticDetails,
  getInTouchHeading,
  getInTouchParagraph,
  resumeHref,
} from "./data";

export default function ContactOptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

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
    if (actionsRef.current) {
      tl.add(fadeUp(actionsRef.current, { duration: 0.55, y: 16 }), "-=0.3");
    }
    if (panelRef.current) {
      tl.add(fadeUp(panelRef.current, { duration: 0.65, y: 20 }), "-=0.45");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="contact-options"
      className={`${sectionSpacing.section} editorial-page-section w-full`}
    >
      <div className="editorial-page-container">
        <SectionLabel ref={labelRef} index="01" className="editorial-section-label">
          Contact
        </SectionLabel>

        <EditorialHeading
          ref={headingRef}
          className="editorial-section-heading contact-page-section-title"
        >
          Contact Options
        </EditorialHeading>

        <div className="contact-options-panel editorial-section-body">
          <div className="contact-options-panel__intro">
            <h3 className="contact-options-panel__heading">{getInTouchHeading}</h3>
            <p
              ref={paragraphRef}
              className="editorial-section-lead editorial-section-lead--after-heading"
            >
              {getInTouchParagraph}
            </p>

            <div ref={actionsRef} className="contact-options-panel__actions">
              <PremiumButton
                href={contactEmailHref}
                className="premium-button--filled"
              >
                Send Email
              </PremiumButton>
              <PremiumButton href={resumeHref}>Download CV</PremiumButton>
            </div>
          </div>

          <div ref={panelRef} className="contact-options-panel__details">
            <ContactDetailsPanel
              details={contactStaticDetails}
              actions={contactActionLinks}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
