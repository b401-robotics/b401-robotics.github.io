import { HighlightHero } from "../components/HighlightHero";
import { AchievementSection } from "../components/AchievementSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ActivityLabSection } from "../components/ActivityLabSection";

export function HighlightPage() {
  return (
    <>
      <HighlightHero />
      <AchievementSection />
      <ProjectsSection />
      <ActivityLabSection />
    </>
  );
}