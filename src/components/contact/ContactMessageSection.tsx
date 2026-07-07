"use client";

import { useLayoutEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import ContactPageForm from "./ContactPageForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeFromLeft, fadeUp, textReveal } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";
import { gsap } from "@/lib/gsap";
import { sectionSpacing } from "@/lib/spacing";
import { messageSectionHeading } from "./data";

export default function ContactMessageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

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
  });

  useLayoutEffect(() => {
    if (!SCROLL_REVEAL_ENABLED || reducedMotion || !formRef.current) return;

    const fields = formRef.current.querySelectorAll(".contact-page-form__field");
    if (!fields.length) return;

    const ctx = gsap.context(() => {
      fadeFromLeft(fields, {
        x: -32,
        duration: 0.75,
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: SCROLL_REVEAL_START,
          once: true,
        },
      });
    }, formRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact-message"
      className={`${sectionSpacing.section} editorial-page-section contact-message-section w-full`}
    >
      <div className="editorial-page-container contact-message-section__inner">
        <SectionLabel ref={labelRef} index="02" className="editorial-section-label">
          Message
        </SectionLabel>

        <EditorialHeading
          ref={headingRef}
          className="editorial-section-heading contact-page-section-title contact-message-section__heading"
        >
          {messageSectionHeading}
        </EditorialHeading>

        <div ref={formRef} className="contact-page-form-wrap editorial-section-body">
          <ContactPageForm />
        </div>
      </div>
    </section>
  );
}
