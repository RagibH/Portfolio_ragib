import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Research from "@/components/sections/Research";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Experience from "@/components/sections/Experience";
import Leadership from "@/components/sections/Leadership";
import FeaturedResearch from "@/components/sections/FeaturedResearch";
import Contact from "@/components/sections/Contact";
import PageSectionBreak from "@/components/ui/PageSectionBreak";

export default function Home() {
  return (
    <div className="editorial-subpage home-page">
      <Hero />
      <Introduction />
      <PageSectionBreak />
      <Research />
      <PageSectionBreak />
      <FeaturedResearch />
      <PageSectionBreak />
      <FeaturedProjects />
      <PageSectionBreak />
      <Experience />
      <PageSectionBreak />
      <Leadership />
      <PageSectionBreak />
      <Contact />
    </div>
  );
}
