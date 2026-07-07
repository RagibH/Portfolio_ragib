import type { ReactNode } from "react";

type ExperienceSectionIconProps = {
  variant:
    | "degree"
    | "department"
    | "institution"
    | "cgpa"
    | "status"
    | "leadership"
    | "research"
    | "community"
    | "journey-start"
    | "journey-learn"
    | "journey-research"
    | "journey-growth"
    | "journey-ahead";
  className?: string;
};

export default function ExperienceSectionIcon({
  variant,
  className = "",
}: ExperienceSectionIconProps) {
  return (
    <span className={`experience-section-icon ${className}`.trim()} aria-hidden="true">
      {icons[variant]}
    </span>
  );
}

const icons: Record<ExperienceSectionIconProps["variant"], ReactNode> = {
  degree: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 11v4.5c0 .9 2.7 2.5 6 2.5s6-1.6 6-2.5V11" />
      <path d="M20 8.5V14" />
    </svg>
  ),
  department: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  ),
  institution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
  cgpa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  ),
  status: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
  leadership: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3h6v7H9z" />
      <path d="M12 10v4" />
      <path d="M8 21h8" />
      <path d="M10 14h4l1 7H9l1-7Z" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "journey-start": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  ),
  "journey-learn": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  "journey-research": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 2v7.5L4 20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1l-6-10.5V2" />
      <path d="M8.5 2h7" />
    </svg>
  ),
  "journey-growth": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  "journey-ahead": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 16.5c1.5-4 6-7 11.5-7 2 0 4 .5 5.5 1.5" />
      <path d="M12 12V3" />
      <path d="m9 6 3-3 3 3" />
    </svg>
  ),
};
