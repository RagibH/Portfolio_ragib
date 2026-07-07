import type { ComponentProps } from "react";
import type ExperienceSectionIcon from "./ExperienceSectionIcon";

type IconVariant = ComponentProps<typeof ExperienceSectionIcon>["variant"];

const educationIconMap: Record<string, IconVariant> = {
  Degree: "degree",
  Department: "department",
  Institution: "institution",
  "Current CGPA": "cgpa",
  Status: "status",
};

export function getEducationIcon(label: string): IconVariant {
  return educationIconMap[label] ?? "degree";
}

const leadershipIcons: IconVariant[] = ["leadership", "research", "community"];

export function getLeadershipIcon(index: number): IconVariant {
  return leadershipIcons[index % leadershipIcons.length];
}

const journeyIcons: IconVariant[] = [
  "journey-start",
  "journey-learn",
  "journey-research",
  "journey-growth",
  "journey-ahead",
];

export function getJourneyIcon(index: number): IconVariant {
  return journeyIcons[index % journeyIcons.length];
}
