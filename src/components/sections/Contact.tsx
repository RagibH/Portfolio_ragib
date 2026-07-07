"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import ContactPortraitVisual from "@/components/sections/ContactPortraitVisual";
import ContactForm from "@/components/ui/ContactForm";
import ContactInfoPanel from "@/components/ui/ContactInfoPanel";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeFromLeft, fadeFromRight, imageReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";

const contactParagraph =
  "Whether you want to discuss research, collaborate on a project or simply start a conversation, I would be happy to hear from you.";

const BAND_INDEX = 7;
const band = sectionBand(BAND_INDEX);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (labelRef.current) {
      tl.add(fadeFromLeft(labelRef.current, { x: -32, duration: 0.7 }));
    }
    if (headingRef.current) {
      tl.add(
        textReveal(headingRef.current, { duration: 0.9 }),
        labelRef.current ? "-=0.35" : undefined
      );
    }
    if (paragraphRef.current) {
      tl.add(fadeFromRight(paragraphRef.current, { x: 40, duration: 0.8 }), "-=0.45");
    }
    if (formRef.current) {
      tl.add(fadeFromLeft(formRef.current, { x: -48, duration: 0.85 }), "-=0.35");
    }
    if (asideRef.current) {
      tl.add(imageReveal(asideRef.current, { fromDirection: "right", duration: 1 }), "-=0.55");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <SectionLabel ref={labelRef} index="07" className="editorial-section-label">
          Contact
        </SectionLabel>

        <EditorialHeading ref={headingRef} className="editorial-section-heading">
          Let&apos;s create something meaningful.
        </EditorialHeading>

        <p
          ref={paragraphRef}
          className="editorial-section-lead editorial-section-lead--after-heading"
        >
          {contactParagraph}
        </p>

        <div className="contact-grid editorial-section-body">
          <div ref={formRef} className="contact-form-col">
            <ContactForm />
          </div>

          <div ref={asideRef} className="contact-aside">
            <ContactPortraitVisual />
            <ContactInfoPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
