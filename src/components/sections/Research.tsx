"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import ResearchSectionVisual from "@/components/sections/ResearchSectionVisual";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import ResearchCard from "@/components/ui/ResearchCard";
import EditorialQuote from "@/components/ui/EditorialQuote";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  fadeUp,
  fadeFromLeft,
  scaleIn,
  slideReveal,
  textReveal,
  imageReveal,
} from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";

const researchParagraph =
  "My research focuses on developing reliable machine learning systems for healthcare, intelligent transportation and document understanding. I enjoy building datasets, evaluating deep learning architectures and creating models that remain reliable beyond controlled laboratory settings.";

const researchCards = [
  {
    title: "Computer Vision",
    items: [
      "Object Detection",
      "Image Classification",
      "Medical Imaging",
      "OCR",
    ],
  },
  {
    title: "Machine Learning",
    items: [
      "Deep Learning",
      "CNN",
      "Transfer Learning",
      "Model Evaluation",
    ],
  },
  {
    title: "Research Interests",
    items: [
      "Healthcare AI",
      "Document Intelligence",
      "Intelligent Transportation",
      "Natural Language Processing",
    ],
  },
];

const BAND_INDEX = 2;
const band = sectionBand(BAND_INDEX);

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      tl.add(fadeUp(paragraphRef.current, { duration: 0.75 }), "-=0.45");
    }
    if (quoteRef.current) {
      tl.add(fadeFromLeft(quoteRef.current, { x: -36, duration: 0.8 }), "-=0.4");
    }
    if (imageRef.current) {
      tl.add(imageReveal(imageRef.current, { fromDirection: "right", duration: 1.05 }), "-=0.55");
    }
    if (cardsRef.current) {
      tl.add(
        scaleIn(cardsRef.current.children, {
          stagger: 0.12,
          duration: 0.75,
        }),
        "-=0.35"
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="research"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <div className="research-top">
          <div className="research-top__content">
            <SectionLabel ref={labelRef} index="02" className="editorial-section-label">
              Research
            </SectionLabel>

            <EditorialHeading ref={headingRef} className="editorial-section-heading">
              Research driven by practical problems.
            </EditorialHeading>

            <p
              ref={paragraphRef}
              className="editorial-section-lead editorial-section-lead--after-heading"
            >
              {researchParagraph}
            </p>

            <EditorialQuote
              ref={quoteRef}
              className="editorial-section-body max-w-[520px]"
              quote="I believe research should solve practical problems while maintaining scientific rigor."
            />
          </div>

          <div ref={imageRef} className="research-top__visual">
            <ResearchSectionVisual />
          </div>
        </div>

        <div ref={cardsRef} className="research-cards">
          {researchCards.map((card) => (
            <ResearchCard
              key={card.title}
              title={card.title}
              items={card.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
