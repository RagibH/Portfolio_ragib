"use client";



import { useRef } from "react";

import SectionLabel from "@/components/ui/SectionLabel";

import EditorialHeading from "@/components/ui/EditorialHeading";

import ProjectCard from "@/components/ui/ProjectCard";

import PremiumButton from "@/components/ui/PremiumButton";

import SectionBandDecor from "@/components/sections/SectionBandDecor";

import { sectionBand, withSectionBand } from "@/lib/sectionBand";

import { useScrollReveal } from "@/hooks/useScrollReveal";

import { fadeUp, staggerFromSides, fadeFromLeft, slideReveal } from "@/lib/animations";

import { sectionSpacing } from "@/lib/spacing";



const projectsParagraph =

  "My projects focus on solving practical problems through machine learning, intelligent systems and modern web technologies. Every product is designed with usability, performance and long-term maintainability in mind.";



const featuredProjects = [

  {

    name: "BloBax",

    category: "AI Healthcare Platform",

    status: "Active Development",

    description:

      "Django-based AI healthcare platform with health predictions, Gemini-powered emergency guidance, prescription medicine recognition, and a Bangladesh doctor directory.",

    technologies: [

      "Python",

      "Django",

      "Gemini API",

      "Machine Learning",

      "MySQL",

    ],

    buttonText: "View on GitHub",

    buttonHref: "https://github.com/RagibH/BloBax",

  },

  {

    name: "BioEnclave",

    category: "Official Company Website",

    status: "Live",

    description:

      "Official website for BioEnclave, a paid client project built with Next.js, premium editorial design, and optimized performance.",

    technologies: [

      "Next.js",

      "TypeScript",

      "Tailwind CSS",

      "Cloudflare",

      "Vercel",

    ],

    buttonText: "Visit Website",

    buttonHref: "https://bioenclave.com",

  },

  {

    name: "BizTrade Venture",

    category: "Business Management Platform",

    status: "Completed",

    description:

      "Product management and admin management web application developed for BizTrade Venture as a paid client project.",

    technologies: ["Next.js", "React", "Node.js", "Tailwind CSS"],

    buttonText: "View Details",

    buttonHref: "/projects",

  },

  {

    name: "Baymax",

    category: "AI Medical Assistant",

    status: "Research Prototype",

    description:

      "Desktop AI medical assistant with first-aid chatbot, prescription recognition, disease predictions, and an emergency hospital directory for Bangladesh.",

    technologies: ["Python", "TensorFlow", "Scikit-learn", "MySQL"],

    buttonText: "View on GitHub",

    buttonHref:

      "https://github.com/RagibH/Baymax--Your-personal-AI-powered-medical-assistant",

  },

];



const BAND_INDEX = 4;

const band = sectionBand(BAND_INDEX);



export default function FeaturedProjects() {

  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const cardsRef = useRef<HTMLDivElement>(null);

  const ctaRef = useRef<HTMLDivElement>(null);



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
      tl.add(fadeFromLeft(paragraphRef.current, { x: -40, duration: 0.8 }), "-=0.45");
    }
    if (cardsRef.current) {
      tl.add(
        staggerFromSides(cardsRef.current.children, {
          stagger: 0.1,
          duration: 0.8,
        }),
        "-=0.3"
      );
    }
    if (ctaRef.current) {
      tl.add(fadeUp(ctaRef.current, { duration: 0.7, y: 20 }), "-=0.15");
    }
  });



  return (

    <section

      ref={sectionRef}

      id="projects"

      className={withSectionBand(

        BAND_INDEX,

        `${sectionSpacing.section} editorial-page-section w-full`

      )}

    >

      <SectionBandDecor variant={band.decorVariant} />

      <div className="editorial-page-container relative z-[1]">

        <SectionLabel ref={labelRef} index="04" className="editorial-section-label">

          Projects

        </SectionLabel>



        <EditorialHeading ref={headingRef} className="editorial-section-heading">

          Selected work built for real users.

        </EditorialHeading>



        <p

          ref={paragraphRef}

          className="editorial-section-lead editorial-section-lead--after-heading"

        >

          {projectsParagraph}

        </p>



        <div ref={cardsRef} className="featured-projects-grid editorial-section-body">

          {featuredProjects.map((project) => (

            <ProjectCard key={project.name} project={project} />

          ))}

        </div>



        <div ref={ctaRef} className="featured-section-cta editorial-section-body">

          <PremiumButton href="/projects" className="premium-button--filled">

            View All Projects

          </PremiumButton>

        </div>

      </div>

    </section>

  );

}


