import { cn } from "@/lib/utils";
import type { OtherProjectData } from "./types";

type OtherProjectCardProps = {
  project: OtherProjectData;
  className?: string;
};

export default function OtherProjectCard({
  project,
  className,
}: OtherProjectCardProps) {
  const hasActions = Boolean(project.github) || Boolean(project.liveDemo);

  return (
    <article
      className={cn(
        "other-project-card group h-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1A1614]",
        "transition-[border-color,transform,box-shadow] duration-[500ms] ease-out",
        "hover:-translate-y-1.5 hover:border-[rgba(200,155,118,0.2)] hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)]",
        className
      )}
    >
      <div className="other-project-card__inner flex h-full flex-col">
        <span className="other-project-card__status">{project.status}</span>

        <h3 className="other-project-card__title">{project.title}</h3>

        <p className="other-project-card__category">{project.category}</p>

        <p className="other-project-card__description">{project.description}</p>

        {hasActions ? (
          <div className="other-project-card__actions mt-auto flex flex-wrap gap-3 pt-6">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-card__action"
              >
                GitHub
              </a>
            ) : null}
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-card__action"
              >
                Live Demo
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
