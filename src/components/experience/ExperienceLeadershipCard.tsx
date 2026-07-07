import ExperienceSectionIcon from "./ExperienceSectionIcon";
import type { ComponentProps } from "react";
import type { LeadershipRole } from "./types";

type ExperienceLeadershipCardProps = {
  role: LeadershipRole;
  icon: ComponentProps<typeof ExperienceSectionIcon>["variant"];
};

export default function ExperienceLeadershipCard({
  role,
  icon,
}: ExperienceLeadershipCardProps) {
  return (
    <article className="experience-leadership-card group">
      <div className="experience-leadership-card__inner">
        <ExperienceSectionIcon variant={icon} />

        <h3 className="experience-leadership-card__title">{role.title}</h3>

        <p className="experience-leadership-card__org">{role.organization}</p>

        <p className="experience-leadership-card__description">
          {role.description}
        </p>
      </div>
    </article>
  );
}
