export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > CONTACT_FIELD_LIMITS.name) {
    errors.name = `Name must be ${CONTACT_FIELD_LIMITS.name} characters or fewer.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > CONTACT_FIELD_LIMITS.email) {
    errors.email = `Email must be ${CONTACT_FIELD_LIMITS.email} characters or fewer.`;
  }

  if (!subject) {
    errors.subject = "Please add a subject.";
  } else if (subject.length > CONTACT_FIELD_LIMITS.subject) {
    errors.subject = `Subject must be ${CONTACT_FIELD_LIMITS.subject} characters or fewer.`;
  }

  if (!message) {
    errors.message = "Please write a message.";
  } else if (message.length < 12) {
    errors.message = "Your message should be at least 12 characters.";
  } else if (message.length > CONTACT_FIELD_LIMITS.message) {
    errors.message = `Message must be ${CONTACT_FIELD_LIMITS.message} characters or fewer.`;
  }

  return errors;
}

export function getFirstContactValidationError(
  values: ContactFormValues
): string | null {
  const errors = validateContactForm(values);
  const firstKey = (Object.keys(errors) as (keyof ContactFormValues)[])[0];
  return firstKey ? (errors[firstKey] ?? null) : null;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
