import { ResearchHero } from "../components/ResearchHero";
import { ResearchPapersSection } from "../components/ResearchPapersSection";
import { ProjectsSection } from "../components/ProjectsSection";

export function ResearchPage() {
  return (
    <>
      <ResearchHero />

      <ResearchPapersSection />

      <ProjectsSection />
    </>
  );
}