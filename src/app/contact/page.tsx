import type { Metadata } from "next";
import ContactPageHero from "@/components/contact/ContactPageHero";
import ContactOptionsSection from "@/components/contact/ContactOptionsSection";
import ContactMessageSection from "@/components/contact/ContactMessageSection";
import ContactAvailabilitySection from "@/components/contact/ContactAvailabilitySection";
import ContactQuoteSection from "@/components/contact/ContactQuoteSection";
import ContactFinalCTA from "@/components/contact/ContactFinalCTA";
import PageSectionBreak from "@/components/ui/PageSectionBreak";

export const metadata: Metadata = {
  title: "Contact | Md. Ragib Hasan",
  description:
    "Get in touch with Md. Ragib Hasan for research collaboration, software development, machine learning projects or meaningful conversations.",
};

export default function ContactPage() {
  return (
    <div className="editorial-subpage contact-page">
      <ContactPageHero />
      <PageSectionBreak />
      <ContactOptionsSection />
      <PageSectionBreak />
      <ContactMessageSection />
      <PageSectionBreak />
      <ContactAvailabilitySection />
      <PageSectionBreak />
      <ContactQuoteSection />
      <PageSectionBreak />
      <ContactFinalCTA />
    </div>
  );
}
