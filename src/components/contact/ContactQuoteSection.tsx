"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, textReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";
import { editorialQuote } from "./data";

export default function ContactQuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (labelRef.current) {
      tl.add(fadeUp(labelRef.current, { y: 16, duration: 0.5 }));
    }
    if (quoteRef.current) {
      tl.add(textReveal(quoteRef.current), "-=0.2");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="contact-quote"
      className={`${sectionSpacing.section} editorial-page-section contact-page-quote w-full`}
    >
      <div className="editorial-page-container contact-page-quote__inner">
        <SectionLabel ref={labelRef} index="04" className="editorial-section-label">
          Reflection
        </SectionLabel>

        <blockquote ref={quoteRef} className="contact-page-quote__text">
          <p>&ldquo;{editorialQuote}&rdquo;</p>
        </blockquote>
      </div>
    </section>
  );
}
