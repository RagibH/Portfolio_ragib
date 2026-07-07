"use client";

import { useRef } from "react";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialHeading from "@/components/ui/EditorialHeading";
import PremiumButton from "@/components/ui/PremiumButton";
import SectionBandDecor from "@/components/sections/SectionBandDecor";
import { sectionBand, withSectionBand } from "@/lib/sectionBand";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerFromSides, fadeFromRight, scaleIn, slideReveal } from "@/lib/animations";
import { sectionSpacing } from "@/lib/spacing";

const featuredResearchParagraph =
  "A selection of papers and ongoing studies, from handwritten character recognition to document intelligence, each one built on real datasets and evaluated against real-world conditions.";

const featuredResearch = [
  {
    title:
      "ChakmaCNN: A Pronunciation-Aware CNN for Handwritten Chakma Script Recognition",
    area: "Computer Vision",
    status: "Published",
    description:
      "A pronunciation-aware CNN for handwritten Chakma script recognition. First-author IEEE conference paper, now live on IEEE Xplore.",
    href: "https://ieeexplore.ieee.org/abstract/document/11491110",
  },
  {
    title:
      "DateFNet: From Pixels to Plates, Attention Based Multi-Stream CNN for Date Fruit Classification",
    area: "Computer Vision",
    status: "Published",
    description:
      "An attention-based multi-stream CNN for date fruit classification from image data, published at an IEEE conference.",
    href: "https://ieeexplore.ieee.org/abstract/document/11491249",
  },
  {
    title:
      "Towards Secure Digital Communication: Deep Learning-Based Automated Classification of Malicious Bangla Messages",
    area: "Natural Language Processing",
    status: "Published",
    description:
      "Deep learning-based automated classification of malicious Bangla messages for safer digital communication.",
    href: "https://ieeexplore.ieee.org/abstract/document/11545989",
  },
];

const BAND_INDEX = 3;
const band = sectionBand(BAND_INDEX);

export default function FeaturedResearch() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, (tl) => {
    if (labelRef.current) {
      tl.add(fadeFromRight(labelRef.current, { x: 32, duration: 0.7 }));
    }
    if (headingRef.current) {
      tl.add(
        slideReveal(headingRef.current, { fromDirection: "left", duration: 0.9 }),
        labelRef.current ? "-=0.35" : undefined
      );
    }
    if (paragraphRef.current) {
      tl.add(fadeUp(paragraphRef.current, { duration: 0.75 }), "-=0.45");
    }
    if (rowsRef.current) {
      tl.add(
        staggerFromSides(rowsRef.current.children, {
          stagger: 0.12,
          duration: 0.8,
        }),
        "-=0.3"
      );
    }
    if (ctaRef.current) {
      tl.add(scaleIn(ctaRef.current, { duration: 0.7 }), "-=0.15");
    }
  });

  return (
    <section
      ref={sectionRef}
      id="featured-research"
      className={withSectionBand(
        BAND_INDEX,
        `${sectionSpacing.section} editorial-page-section w-full`
      )}
    >
      <SectionBandDecor variant={band.decorVariant} />
      <div className="editorial-page-container relative z-[1]">
        <div className="featured-research-header">
          <div>
            <SectionLabel ref={labelRef} index="03" className="editorial-section-label">
              Publications
            </SectionLabel>

            <EditorialHeading ref={headingRef} className="editorial-section-heading">
              Selected papers and ongoing studies.
            </EditorialHeading>
          </div>

          <p
            ref={paragraphRef}
            className="featured-research-header__paragraph editorial-section-lead"
          >
            {featuredResearchParagraph}
          </p>
        </div>

        <div ref={rowsRef} className="featured-research-rows editorial-section-body">
          {featuredResearch.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="featured-research-row"
            >
              <span className="featured-research-row__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="featured-research-row__main">
                <div className="featured-research-row__meta">
                  <span className="featured-research-row__status">
                    {item.status}
                  </span>
                  <span className="featured-research-row__sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="featured-research-row__area">{item.area}</span>
                </div>
                <h3 className="featured-research-row__title">{item.title}</h3>
              </div>

              <div className="featured-research-row__side">
                <p className="featured-research-row__description">
                  {item.description}
                </p>
                <span className="featured-research-row__cta">
                  Read More
                  <svg
                    className="featured-research-row__arrow"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 13L13 3M13 3H5.5M13 3V10.5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div ref={ctaRef} className="featured-section-cta editorial-section-body">
          <PremiumButton href="/research" className="premium-button--filled">
            View All Research
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
