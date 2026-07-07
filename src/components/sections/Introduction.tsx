"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeFromLeft, fadeFromRight, slideReveal, staggerFromSides } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";

const introParagraph =
  "I am Md. Ragib Hasan, an undergraduate Computer Science student with a growing research interest in Machine Learning, Computer Vision, Image Processing and Intelligent Healthcare Systems. My long-term goal is to pursue a PhD and contribute to research that bridges academic innovation with practical real-world applications.";

const infoRows = [
  {
    label: "Currently",
    value: "Final Year Undergraduate Student",
  },
  {
    label: "Institution",
    value: "Sylhet Engineering College",
  },
  {
    label: "Research Focus",
    value: [
      "Computer Vision",
      "Image Processing",
      "Deep Learning",
      "Object Detection",
    ],
  },
  {
    label: "Future Goal",
    value: "PhD in Machine Learning",
  },
];

const BAND_INDEX = 1;
const band = sectionBand(BAND_INDEX);

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const factsRef = useRef<HTMLDListElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (labelRef.current) {
      tl.add(fadeFromLeft(labelRef.current, { x: -32, duration: 0.7 }));
    }
    if (headingRef.current) {
      tl.add(
        slideReveal(headingRef.current, { fromDirection: "right", duration: 0.9 }),
        labelRef.current ? "-=0.35" : undefined
      );
    }
    if (paragraphRef.current) {
      tl.add(fadeFromRight(paragraphRef.current, { x: 40, duration: 0.8 }), "-=0.45");
    }
    if (factsRef.current) {
      tl.add(staggerFromSides(factsRef.current.children, { stagger: 0.1, duration: 0.75 }), "-=0.35");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <div className="intro-header">
          <div className="intro-header__main">
            <SectionLabel ref={labelRef} index="01" className="editorial-section-label">
              Introduction
            </SectionLabel>

            <EditorialHeading ref={headingRef} className="editorial-section-heading">
              Building intelligent systems through machine learning research.
            </EditorialHeading>
          </div>

          <p
            ref={paragraphRef}
            className="intro-header__paragraph editorial-section-lead"
          >
            {introParagraph}
          </p>
        </div>

        <dl ref={factsRef} className="intro-facts editorial-section-body">
          {infoRows.map((row) => (
            <div key={row.label} className="intro-fact">
              <dt className="intro-fact__label">{row.label}</dt>
              <dd className="intro-fact__value">
                {Array.isArray(row.value) ? (
                  <ul className="intro-fact__list">
                    {row.value.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
