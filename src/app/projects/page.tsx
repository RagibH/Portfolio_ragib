import type { Metadata } from "next";
import ProjectsPageHero from "@/components/projects/ProjectsPageHero";
import FeaturedProjectsShowcase from "@/components/projects/FeaturedProjectsShowcase";
import OtherProjects from "@/components/projects/OtherProjects";
import DevelopmentPhilosophy from "@/components/projects/DevelopmentPhilosophy";
import ProjectsCTA from "@/components/projects/ProjectsCTA";
import PageSectionBreak from "@/components/ui/PageSectionBreak";

export const metadata: Metadata = {
  title: "Projects | Md. Ragib Hasan",
  description:
    "A collection of research prototypes, AI systems and production-ready applications built to solve practical problems.",
};

export default function ProjectsPage() {
  return (
    <div className="editorial-subpage projects-page">
      <ProjectsPageHero />
      <PageSectionBreak />
      <FeaturedProjectsShowcase />
      <PageSectionBreak />
      <OtherProjects />
      <PageSectionBreak />
      <DevelopmentPhilosophy />
      <PageSectionBreak />
      <ProjectsCTA />
    </div>
  );
}
