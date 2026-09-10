"use client";



import { useRef } from "react";

import SectionLabel from "@/components/ui/SectionLabel";

import EditorialHeading from "@/components/ui/EditorialHeading";

import ExperienceTimelineItem, {

  type ExperienceEntry,

} from "@/components/ui/ExperienceTimelineItem";

import SectionBandDecor from "@/components/sections/SectionBandDecor";

import { sectionBand, withSectionBand } from "@/lib/sectionBand";

import { useScrollReveal } from "@/hooks/useScrollReveal";

import { fadeFromLeft, fadeFromRight, slideReveal } from "@/lib/animations";

import { sectionSpacing } from "@/lib/spacing";



const experienceParagraph =

  "My journey combines academic research, software engineering and student leadership. Every stage has strengthened my technical foundation while teaching me how to collaborate, communicate and deliver meaningful work.";



const experienceEntries: ExperienceEntry[] = [

  {

    year: "2022",

    title: "Started Bachelor of Science in Computer Science and Engineering",

    organization: "Sylhet Engineering College",

    description:

      "Focused on programming fundamentals, algorithms, C++ and competitive programming.",

  },

  {

    year: "2023",

    title: "Competitive Programming with C++",

    description:

      "Built strong problem-solving skills through C++ on Codeforces, CodeChef and related platforms.",

  },

  {

    year: "2024",

    title: "Machine Learning, Python and Java Projects",

    description:

      "Started learning machine learning and Python in depth; built Java-based academic projects alongside coursework.",

  },

  {

    year: "2025",

    title: "Research, AI Projects and Client Work",

    description:

      "Published IEEE conference papers; built ML and AI projects; delivered paid web project for BizTrade Venture; continued student leadership roles.",

  },

  {

    year: "2026",

    title: "Graduation, Academic Roles and Research",

    description:

      "Graduated with BSc in CSE; joined as Research Assistant and Adjunct Lecturer; completed thesis on vehicle detection and Bangla license plate recognition; advancing journal and ICCIT 2026 submissions.",

  },

];



const BAND_INDEX = 5;

const band = sectionBand(BAND_INDEX);



export default function Experience() {

  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const paragraphRef = useRef<HTMLParagraphElement>(null);



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
  });



  return (

    <section

      ref={sectionRef}

      id="experience"

      className={withSectionBand(

        BAND_INDEX,

        `${sectionSpacing.section} editorial-page-section w-full`

      )}

    >

      <SectionBandDecor variant={band.decorVariant} />

      <div className="editorial-page-container relative z-[1]">

        <div className="experience-header">

          <div className="experience-header__main">

            <SectionLabel ref={labelRef} index="05" className="editorial-section-label">

              Experience

            </SectionLabel>



            <EditorialHeading ref={headingRef} className="editorial-section-heading">

              Growing through research, engineering and leadership.

            </EditorialHeading>

          </div>



          <p

            ref={paragraphRef}

            className="experience-header__paragraph editorial-section-lead"

          >

            {experienceParagraph}

          </p>

        </div>



        <div className="experience-rows editorial-section-body">

          {experienceEntries.map((entry, index) => (

            <ExperienceTimelineItem
              key={`${entry.year}-${entry.title}`}
              entry={entry}
              index={index}
            />

          ))}

        </div>

      </div>

    </section>

  );

}


