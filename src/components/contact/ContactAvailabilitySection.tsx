"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerReveal, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import { availabilityHeading, availabilityItems } from "./data";

export default function ContactAvailabilitySection() {
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
          y: 20,
        }),
        "-=0.2"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="contact-availability"
      className={`${sectionSpacing.section} editorial-page-section w-full`}
    >
      <div className="editorial-page-container">
        <SectionLabel ref={labelRef} index="03" className="editorial-section-label">
          Availability
        </SectionLabel>

        <EditorialHeading
          ref={headingRef}
          className="editorial-section-heading contact-page-section-title"
        >
          {availabilityHeading}
        </EditorialHeading>

        <div ref={cardsRef} className="contact-availability-grid editorial-section-body">
          {availabilityItems.map((item) => (
            <article key={item.label} className="contact-availability-card">
              <p className="contact-availability-card__label">{item.label}</p>
              <p className="contact-availability-card__description">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
