"use client";



import { FormEvent, useState } from "react";

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



export default function ContactForm() {

  const [values, setValues] = useState<ContactFormValues>(initialValues);

  const [errors, setErrors] = useState<ContactFormErrors>({});

  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const [touched, setTouched] = useState<

    Partial<Record<keyof ContactFormValues, boolean>>

  >({});



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



      setSubmitted(true);

    } catch {

      setSubmitError("Unable to send your message. Please try again.");

    } finally {

      setIsSubmitting(false);

    }

  }



  if (submitted) {

    return (

      <div className="contact-form__success" role="status">

        <p className="contact-form__success-title">Message sent.</p>

        <p className="contact-form__success-text">

          Thank you for reaching out. I will get back to you within one or two

          days.

        </p>

      </div>

    );

  }



  return (

    <form className="contact-form" onSubmit={handleSubmit} noValidate>

      <div className="contact-form__honeypot" aria-hidden="true">

        <label htmlFor="contact-website">Website</label>

        <input

          id="contact-website"

          name="website"

          type="text"

          tabIndex={-1}

          autoComplete="off"

        />

      </div>



      <div className="contact-form__fields">

        <div className="contact-form__field">

          <label htmlFor="contact-name" className="contact-form__label">

            Name

          </label>

          <input

            id="contact-name"

            name="name"

            type="text"

            autoComplete="name"

            value={values.name}

            maxLength={CONTACT_FIELD_LIMITS.name}

            onChange={(event) => handleChange("name", event.target.value)}

            onBlur={() => handleBlur("name")}

            className={`contact-form__input${

              errors.name && touched.name ? " contact-form__input--error" : ""

            }`}

            placeholder="Your name"

            aria-invalid={Boolean(errors.name && touched.name)}

          />

          {errors.name && touched.name ? (

            <p className="contact-form__error">{errors.name}</p>

          ) : null}

        </div>



        <div className="contact-form__field">

          <label htmlFor="contact-email" className="contact-form__label">

            Email

          </label>

          <input

            id="contact-email"

            name="email"

            type="email"

            autoComplete="email"

            value={values.email}

            maxLength={CONTACT_FIELD_LIMITS.email}

            onChange={(event) => handleChange("email", event.target.value)}

            onBlur={() => handleBlur("email")}

            className={`contact-form__input${

              errors.email && touched.email ? " contact-form__input--error" : ""

            }`}

            placeholder="you@example.com"

            aria-invalid={Boolean(errors.email && touched.email)}

          />

          {errors.email && touched.email ? (

            <p className="contact-form__error">{errors.email}</p>

          ) : null}

        </div>



        <div className="contact-form__field">

          <label htmlFor="contact-subject" className="contact-form__label">

            Subject

          </label>

          <input

            id="contact-subject"

            name="subject"

            type="text"

            value={values.subject}

            maxLength={CONTACT_FIELD_LIMITS.subject}

            onChange={(event) => handleChange("subject", event.target.value)}

            onBlur={() => handleBlur("subject")}

            className={`contact-form__input${

              errors.subject && touched.subject

                ? " contact-form__input--error"

                : ""

            }`}

            placeholder="What would you like to discuss?"

            aria-invalid={Boolean(errors.subject && touched.subject)}

          />

          {errors.subject && touched.subject ? (

            <p className="contact-form__error">{errors.subject}</p>

          ) : null}

        </div>



        <div className="contact-form__field">

          <label htmlFor="contact-message" className="contact-form__label">

            Message

          </label>

          <textarea

            id="contact-message"

            name="message"

            rows={6}

            value={values.message}

            maxLength={CONTACT_FIELD_LIMITS.message}

            onChange={(event) => handleChange("message", event.target.value)}

            onBlur={() => handleBlur("message")}

            className={`contact-form__input contact-form__textarea${

              errors.message && touched.message

                ? " contact-form__input--error"

                : ""

            }`}

            placeholder="Share your thoughts..."

            aria-invalid={Boolean(errors.message && touched.message)}

          />

          {errors.message && touched.message ? (

            <p className="contact-form__error">{errors.message}</p>

          ) : null}

        </div>

      </div>



      <div className="contact-form__actions">

        {submitError ? (

          <p className="contact-form__submit-error" role="alert">

            {submitError}

          </p>

        ) : null}

        <button

          type="submit"

          className="contact-button contact-button--primary"

          disabled={isSubmitting}

        >

          {isSubmitting ? "Sending..." : "Send Message"}

        </button>

        <a href="/resume.pdf" className="contact-button contact-button--secondary">

          Download Resume

        </a>

      </div>

    </form>

  );

}

