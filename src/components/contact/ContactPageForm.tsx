"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "@/lib/gsap";
import {
  CONTACT_FIELD_LIMITS,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact-validation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPageForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>(
    {}
  );
  const successRef = useRef<HTMLDivElement>(null);
  const formShellRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!submitted || !successRef.current) return;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(successRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.75,
        ease: "power2.out",
      });
    }, successRef);

    return () => ctx.revert();
  }, [submitted, reducedMotion]);

  function handleChange(
    field: keyof ContactFormValues,
    value: string
  ) {
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

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(formData.get("website") ?? ""),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmitError(
          data.error ?? "Unable to send your message. Please try again."
        );
        return;
      }

      if (!reducedMotion && formShellRef.current) {
        gsap.to(formShellRef.current, {
          opacity: 0,
          y: -12,
          duration: 0.45,
          ease: "power2.inOut",
          onComplete: () => setSubmitted(true),
        });
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Unable to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div ref={successRef} className="contact-page-form__success" role="status">
        <p className="contact-page-form__success-title">Message sent.</p>
        <p className="contact-page-form__success-text">
          Thank you for reaching out. I will get back to you within one or two
          days.
        </p>
      </div>
    );
  }

  return (
    <div ref={formShellRef} className="contact-page-form__shell">
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

        <div className="contact-page-form__actions">
          {submitError ? (
            <p className="contact-page-form__submit-error" role="alert">
              {submitError}
            </p>
          ) : null}
          <button
            type="submit"
            className="contact-page-form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
