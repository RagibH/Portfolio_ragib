import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import MobileFullDetailsOverlay from "@/components/ui/MobileFullDetailsOverlay";

export type ProjectCardData = {
  name: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  buttonText: string;
  buttonHref: string;
};

type ProjectCardProps = {
  project: ProjectCardData;
  className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
  <>
    <article
      className={cn(
        "featured-card group h-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#1A1614]",
        "transition-[border-color,transform] duration-[450ms] ease-out",
        "hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.14)]",
        className
      )}
    >
      <div className="featured-card__inner flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-sans text-[1.0625rem] font-medium tracking-[-0.015em] text-[#F5F1EC] md:text-[1.125rem]">
            {project.name}
          </h3>
          <span className="featured-card__status shrink-0 font-mono text-[10px] tracking-[0.14em] text-[#C89B76] uppercase">
            {project.status}
          </span>
        </div>

        <p className="featured-card__meta mt-3 font-mono text-[10px] tracking-[0.18em] text-[#B8AA9C] uppercase">
          {project.category}
        </p>

        <div className="mt-5 mobile-full-text-summary text-[#B8AA9C] font-sans text-[0.875rem] font-light leading-[1.75] tracking-[0.01em] md:text-[0.9375rem]">
          {project.description}
        </div>
        <button
          type="button"
          className="read-full-text__toggle mobile-full-text-toggle"
          onClick={() => setIsOpen(true)}
        >
          Read full
        </button>

        <ul className="featured-pills mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <span className="featured-pill">{tech}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          {project.buttonHref.startsWith("http") ? (
            <a
              href={project.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-card__action"
            >
              {project.buttonText}
            </a>
          ) : (
            <Link href={project.buttonHref} className="featured-card__action">
              {project.buttonText}
            </Link>
          )}
        </div>
      </div>
    </article>
      <MobileFullDetailsOverlay
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={project.name}
        subtitle={project.category}
        status={project.status}
        description={project.description}
        pills={project.technologies}
        actions={
          project.buttonHref.startsWith("http") ? (
            <a
              href={project.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-card__action"
            >
              {project.buttonText}
            </a>
          ) : (
            <Link href={project.buttonHref} className="featured-card__action">
              {project.buttonText}
            </Link>
          )
        }
      />
    </>
  );
}
