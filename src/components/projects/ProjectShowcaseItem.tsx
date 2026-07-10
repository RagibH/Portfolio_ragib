"use client";

import { useLayoutEffect, useRef, useState } from "react";
import ProjectShowcaseMedia from "./ProjectShowcaseMedia";
import MobileFullDetailsOverlay from "@/components/ui/MobileFullDetailsOverlay";
import { gsap } from "@/lib/gsap";
import { imageReveal, slideReveal } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SCROLL_REVEAL_ENABLED, SCROLL_REVEAL_START } from "@/lib/motion";
import type { FeaturedProjectData } from "./types";

type ProjectShowcaseItemProps = {
  project: FeaturedProjectData;
  reversed?: boolean;
};

export default function ProjectShowcaseItem({
  project,
  reversed = false,
}: ProjectShowcaseItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const hasActions =
    Boolean(project.liveDemo) ||
    Boolean(project.github) ||
    Boolean(project.visitWebsite);

  useLayoutEffect(() => {
    if (!SCROLL_REVEAL_ENABLED || reducedMotion || !itemRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: SCROLL_REVEAL_START,
          once: true,
        },
      });

      if (imageRef.current) {
        tl.add(
          imageReveal(imageRef.current, {
            fromDirection: reversed ? "left" : "right",
            duration: 1,
          })
        );
      }

      if (contentRef.current) {
        tl.add(
          slideReveal(contentRef.current, {
            fromDirection: reversed ? "right" : "left",
            duration: 0.85,
          }),
          "-=0.55"
        );
      }
    }, itemRef);

    return () => ctx.revert();
  }, [reducedMotion, reversed]);

  return (
    <article
      ref={itemRef}
      className={`project-showcase${reversed ? " project-showcase--reversed" : ""}`}
    >
      <div ref={imageRef} className="project-showcase__media">
        <ProjectShowcaseMedia
          items={project.media}
          link={project.mediaLink}
          label={project.name}
        />
      </div>

      <div ref={contentRef} className="project-showcase__content">
        <span className="project-showcase__status">{project.status}</span>

        <p className="project-showcase__category">{project.category}</p>

        <h3 className="project-showcase__title">{project.name}</h3>

        <p className="project-showcase__description mobile-full-text-summary">{project.description}</p>

        <button
          type="button"
          className="read-full-text__toggle mobile-full-text-toggle"
          onClick={() => setIsOpen(true)}
        >
          Read full
        </button>

        <ul className="project-showcase__tech">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <span className="project-pill">{tech}</span>
            </li>
          ))}
        </ul>

        {hasActions ? (
          <div className="project-showcase__actions">
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-showcase__btn"
              >
                Live Demo
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-showcase__btn"
              >
                GitHub
              </a>
            ) : null}
            {project.visitWebsite ? (
              <a
                href={project.visitWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="project-showcase__btn"
              >
                Visit Website
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <MobileFullDetailsOverlay
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={project.name}
        subtitle={project.category}
        status={project.status}
        description={project.description}
        pills={project.technologies}
        actions={
          hasActions ? (
            <>
              {project.liveDemo ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-showcase__btn"
                >
                  Live Demo
                </a>
              ) : null}
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-showcase__btn"
                >
                  GitHub
                </a>
              ) : null}
              {project.visitWebsite ? (
                <a
                  href={project.visitWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-showcase__btn"
                >
                  Visit Website
                </a>
              ) : null}
            </>
          ) : null
        }
      />
    </article>
  );
}
