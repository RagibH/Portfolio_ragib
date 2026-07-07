import type { Metadata } from "next";
import ExperiencePageHero from "@/components/experience/ExperiencePageHero";
import EducationSection from "@/components/experience/EducationSection";
import LeadershipSection from "@/components/experience/LeadershipSection";
import CompetitiveProgrammingSection from "@/components/experience/CompetitiveProgrammingSection";
import TechnicalToolkitSection from "@/components/experience/TechnicalToolkitSection";
import JourneySection from "@/components/experience/JourneySection";
import FutureVisionSection from "@/components/experience/FutureVisionSection";
import ExperienceCTA from "@/components/experience/ExperienceCTA";
import ExperienceSectionBreak from "@/components/experience/ExperienceSectionBreak";

export const metadata: Metadata = {
  title: "Experience | Md. Ragib Hasan",
  description:
    "The experiences, leadership roles and technical foundation that continue shaping my journey as a machine learning researcher.",
};

export default function ExperiencePage() {
  return (
    <div className="experience-page">
      <ExperiencePageHero />
      <ExperienceSectionBreak />
      <EducationSection />
      <ExperienceSectionBreak />
      <LeadershipSection />
      <ExperienceSectionBreak />
      <CompetitiveProgrammingSection />
      <ExperienceSectionBreak />
      <TechnicalToolkitSection />
      <ExperienceSectionBreak />
      <JourneySection />
      <ExperienceSectionBreak />
      <FutureVisionSection />
      <ExperienceSectionBreak />
      <ExperienceCTA />
    </div>
  );
}
