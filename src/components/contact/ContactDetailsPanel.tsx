import { siteContact } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ContactActionLink, ContactStaticDetail } from "./types";

type ContactDetailsPanelProps = {
  details: ContactStaticDetail[];
  actions: ContactActionLink[];
};

function detailHref(label: string): string | null {
  if (label === "Email") return siteContact.emailHref;
  if (label === "Phone") return siteContact.phoneHref;
  return null;
}

export default function ContactDetailsPanel({
  details,
  actions,
}: ContactDetailsPanelProps) {
  return (
    <div className="contact-details-panel">
      <dl className="contact-details-panel__meta">
        {details.map((item) => {
          const href = detailHref(item.label);

          return (
            <div key={item.label} className="contact-details-panel__meta-item">
              <dt className="contact-details-panel__label">{item.label}</dt>
              <dd className="contact-details-panel__value">
                {href ? (
                  <a href={href} className="contact-details-panel__value-link">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="contact-details-panel__buttons">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={cn(
              "contact-details-panel__button",
              action.hideOnMobile && "contact-details-panel__button--hide-mobile"
            )}
            {...(action.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : undefined)}
          >
            {action.label}
          </a>
        ))}
      </div>
    </div>
  );
}
