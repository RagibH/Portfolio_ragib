"use client";

import { FormEvent, useState } from "react";
import ContactTurnstile from "@/components/ui/ContactTurnstile";
import {
  CONTACT_FIELD_LIMITS,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact-validation";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type ContactPageFormProps = {
  turnstileSiteKey?: string;
};

export default function ContactPageForm({
  turnstileSiteKey,
}: ContactPageFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormValues, boolean>>
  >({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const turnstileEnabled = Boolean(turnstileSiteKey);

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitStatus("idle");
    setSubmitError(null);
    setTurnstileToken(null);
    setTurnstileKey((current) => current + 1);
  }

  function handleChange(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));

    if (touched[field]) {
      setErrors((current) => {
        const next = validateContactForm({ ...values, [field]: value });
        const updated = { ...current };
        if (next[field]) {
          updated[field] = next[field];
        } else {
          delete updated[field];
        }
        return updated;
      });
    }
  }

  function handleBlur(field: keyof ContactFormValues) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => {
      const next = validateContactForm(values);
      const updated = { ...current };
      if (next[field]) {
        updated[field] = next[field];
      } else {
        delete updated[field];
      }
      return updated;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setSubmitStatus("idle");

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    if (turnstileEnabled && !turnstileToken) {
      setSubmitStatus("error");
      setSubmitError("Please complete the security check.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(formData.get("website") ?? ""),
          turnstileToken,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmitStatus("error");
        setSubmitError(
          data.error ?? "Your message was not sent. Please try again."
        );
        return;
      }

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setSubmitError("Your message was not sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="contact-page-form__shell contact-page-form__shell--status">
        <div className="contact-page-form__success" role="status">
          <p className="contact-page-form__success-title">Message sent successfully.</p>
          <p className="contact-page-form__success-text">
            Thank you for reaching out. I will get back to you within one or two
            days.
          </p>
          <button
            type="button"
            className="contact-page-form__reset"
            onClick={resetForm}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page-form__shell">
      {submitStatus === "error" && submitError ? (
        <p className="contact-page-form__status-banner contact-page-form__status-banner--error" role="alert">
          {submitError}
        </p>
      ) : null}

      <form className="contact-page-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__honeypot" aria-hidden="true">
          <label htmlFor="contact-page-website">Website</label>
          <input
            id="contact-page-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="contact-page-form__fields">
          <div className="contact-page-form__field">
            <label htmlFor="contact-page-name" className="contact-page-form__label">
              Name
            </label>
            <input
              id="contact-page-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              maxLength={CONTACT_FIELD_LIMITS.name}
              onChange={(event) => handleChange("name", event.target.value)}
              onBlur={() => handleBlur("name")}
              className={`contact-page-form__input${
                errors.name && touched.name ? " contact-page-form__input--error" : ""
              }`}
              aria-invalid={Boolean(errors.name && touched.name)}
              aria-describedby={
                errors.name && touched.name ? "contact-page-name-error" : undefined
              }
            />
            {errors.name && touched.name ? (
              <p id="contact-page-name-error" className="contact-page-form__error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="contact-page-form__field">
            <label htmlFor="contact-page-email" className="contact-page-form__label">
              Email
            </label>
            <input
              id="contact-page-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              maxLength={CONTACT_FIELD_LIMITS.email}
              onChange={(event) => handleChange("email", event.target.value)}
              onBlur={() => handleBlur("email")}
              className={`contact-page-form__input${
                errors.email && touched.email ? " contact-page-form__input--error" : ""
              }`}
              aria-invalid={Boolean(errors.email && touched.email)}
              aria-describedby={
                errors.email && touched.email ? "contact-page-email-error" : undefined
              }
            />
            {errors.email && touched.email ? (
              <p id="contact-page-email-error" className="contact-page-form__error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="contact-page-form__field">
            <label
              htmlFor="contact-page-subject"
              className="contact-page-form__label"
            >
              Subject
            </label>
            <input
              id="contact-page-subject"
              name="subject"
              type="text"
              value={values.subject}
              maxLength={CONTACT_FIELD_LIMITS.subject}
              onChange={(event) => handleChange("subject", event.target.value)}
              onBlur={() => handleBlur("subject")}
              className={`contact-page-form__input${
                errors.subject && touched.subject
                  ? " contact-page-form__input--error"
                  : ""
              }`}
              aria-invalid={Boolean(errors.subject && touched.subject)}
              aria-describedby={
                errors.subject && touched.subject
                  ? "contact-page-subject-error"
                  : undefined
              }
            />
            {errors.subject && touched.subject ? (
              <p id="contact-page-subject-error" className="contact-page-form__error">
                {errors.subject}
              </p>
            ) : null}
          </div>

          <div className="contact-page-form__field">
            <label
              htmlFor="contact-page-message"
              className="contact-page-form__label"
            >
              Message
            </label>
            <textarea
              id="contact-page-message"
              name="message"
              rows={7}
              value={values.message}
              maxLength={CONTACT_FIELD_LIMITS.message}
              onChange={(event) => handleChange("message", event.target.value)}
              onBlur={() => handleBlur("message")}
              className={`contact-page-form__input contact-page-form__textarea${
                errors.message && touched.message
                  ? " contact-page-form__input--error"
                  : ""
              }`}
              aria-invalid={Boolean(errors.message && touched.message)}
              aria-describedby={
                errors.message && touched.message
                  ? "contact-page-message-error"
                  : undefined
              }
            />
            {errors.message && touched.message ? (
              <p id="contact-page-message-error" className="contact-page-form__error">
                {errors.message}
              </p>
            ) : null}
          </div>
        </div>

        {turnstileSiteKey ? (
          <ContactTurnstile
            key={turnstileKey}
            siteKey={turnstileSiteKey}
            onTokenChange={setTurnstileToken}
          />
        ) : null}

        <div className="contact-page-form__actions">
          <button
            type="submit"
            className="contact-page-form__submit"
            disabled={isSubmitting || (turnstileEnabled && !turnstileToken)}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

