import ExperienceSectionIcon from "./ExperienceSectionIcon";
import type { ComponentProps } from "react";

type EducationInfoCardProps = {
  label: string;
  value: string;
  icon: ComponentProps<typeof ExperienceSectionIcon>["variant"];
  wide?: boolean;
};

export default function EducationInfoCard({
  label,
  value,
  icon,
  wide = false,
}: EducationInfoCardProps) {
  return (
    <article
      className={`education-info-card${wide ? " education-info-card--wide" : ""}`}
    >
      <ExperienceSectionIcon variant={icon} />
      <p className="education-info-card__label">{label}</p>
      <p className="education-info-card__value">{value}</p>
    </article>
  );
}
