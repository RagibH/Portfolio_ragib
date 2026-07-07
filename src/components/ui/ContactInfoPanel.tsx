import { cn } from "@/lib/utils";

import { siteContact } from "@/lib/site";

const contactDetails = [
  { label: "Location", value: siteContact.location },
  { label: "Education", value: "Sylhet Engineering College" },
  {
    label: "Focus",
    value: "Machine Learning · Computer Vision · Intelligent Healthcare",
  },
];

const contactLinks = [
  {
    label: "Email",
    href: siteContact.emailHref,
    external: false,
    hideOnMobile: true,
  },
  { label: "GitHub", href: siteContact.links.github, external: true },
  { label: "LinkedIn", href: siteContact.links.linkedin, external: true },
  {
    label: "Google Scholar",
    href: siteContact.links.googleScholar,
    external: true,
  },
];

type ContactInfoPanelProps = {
  className?: string;
};

export default function ContactInfoPanel({ className }: ContactInfoPanelProps) {
  return (
    <div className={cn("contact-info", className)}>
      <dl className="contact-info__meta">
        {contactDetails.map((item) => (
          <div key={item.label} className="contact-info__item">
            <dt className="contact-info__label">{item.label}</dt>
            <dd className="contact-info__value">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="contact-info__links">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={cn(
              "contact-info__link-btn",
              link.hideOnMobile && "contact-info__link-btn--hide-mobile"
            )}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : undefined)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
