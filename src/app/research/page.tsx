import type { Metadata } from "next";
import ResearchPageHero from "@/components/research/ResearchPageHero";
import ResearchPhilosophy from "@/components/research/ResearchPhilosophy";
import FeaturedPublications from "@/components/research/FeaturedPublications";
import MoreResearch from "@/components/research/MoreResearch";
import CurrentResearch from "@/components/research/CurrentResearch";
import ResearchInterests from "@/components/research/ResearchInterests";
import ResearchCTA from "@/components/research/ResearchCTA";
import PageSectionBreak from "@/components/ui/PageSectionBreak";

export const metadata: Metadata = {
  title: "Research | Md. Ragib Hasan",
  description:
    "Publications, ongoing work and research interests in machine learning, computer vision and intelligent healthcare.",
};

export default function ResearchPage() {
  return (
    <div className="editorial-subpage research-page">
      <ResearchPageHero />
      <PageSectionBreak />
      <ResearchPhilosophy />
      <PageSectionBreak />
      <FeaturedPublications />
      <PageSectionBreak />
      <MoreResearch />
      <PageSectionBreak />
      <CurrentResearch />
      <PageSectionBreak />
      <ResearchInterests />
      <PageSectionBreak />
      <ResearchCTA />
    </div>
  );
}
