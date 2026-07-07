import { siteContact } from "@/lib/site";
import type { AvailabilityItem, ContactActionLink, ContactStaticDetail } from "./types";

export const heroHeading = "Let's build something meaningful.";

export const heroParagraph =
  "Whether it is research, collaboration, software development or simply exchanging ideas, I am always happy to connect with people who enjoy solving meaningful problems.";

export const getInTouchHeading = "Get in Touch";

export const getInTouchParagraph =
  "The easiest way to reach me is by email. I usually respond within one or two days. You can also connect with me through LinkedIn or explore my research and projects online.";

export const contactEmail = siteContact.email;
export const contactEmailHref = siteContact.emailHref;
export const resumeHref = siteContact.resumeHref;

export const contactStaticDetails: ContactStaticDetail[] = [
  { label: "Email", value: siteContact.email },
  { label: "Phone", value: siteContact.phone },
  { label: "Location", value: siteContact.location },
];

export const contactActionLinks: ContactActionLink[] = [
  {
    label: "Send Email",
    href: siteContact.emailHref,
    external: false,
    hideOnMobile: true,
  },
  {
    label: "GitHub",
    href: siteContact.links.github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: siteContact.links.linkedin,
    external: true,
  },
  {
    label: "Facebook",
    href: siteContact.links.facebook,
    external: true,
  },
  {
    label: "Google Scholar",
    href: siteContact.links.googleScholar,
    external: true,
  },
  {
    label: "ORCID",
    href: siteContact.links.orcid,
    external: true,
  },
  {
    label: "ResearchGate",
    href: siteContact.links.researchGate,
    external: true,
  },
];

export const messageSectionHeading = "Send a Message";

export const availabilityHeading = "Currently Open To";

export const availabilityItems: AvailabilityItem[] = [
  {
    label: "Research Collaboration",
    description:
      "Joint research, co-authorship and academic partnerships in machine learning and computer vision.",
  },
  {
    label: "Machine Learning Projects",
    description:
      "Applied ML systems, datasets and research-oriented projects with practical real-world impact.",
  },
  {
    label: "Software Development",
    description:
      "Thoughtful engineering work on web platforms, AI products and scalable applications.",
  },
  {
    label: "Speaking Opportunities",
    description:
      "Seminars, workshops and student events on research, technology and academic growth.",
  },
];

export const editorialQuote =
  "I believe meaningful technology begins with meaningful conversations.";

export const finalCtaHeading = "Thank you for visiting.";

export const finalCtaParagraph =
  "I appreciate you taking the time to explore my work. If something here resonates with you, I would be glad to hear from you.";
