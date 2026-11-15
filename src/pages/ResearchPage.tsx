import { ResearchHero } from "../components/ResearchHero";
import { ResearchPapersSection } from "../components/ResearchPapersSection";
import { ThesisSection } from "../components/ThesisSection";
import { ProjectsSection } from "../components/ProjectsSection";

export function ResearchPage() {
  return (
    <>
      <ResearchHero />

      <ResearchPapersSection />

      <div className="-mt-12 md:-mt-16">
        <ThesisSection />
      </div>

      <ProjectsSection />
    </>
  );
}