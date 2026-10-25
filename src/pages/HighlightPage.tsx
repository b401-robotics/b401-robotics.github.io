import { HighlightHero } from "../components/HighlightHero";
import { AchievementSection } from "../components/AchievementSection";

export function HighlightPage() {
  return (
    <>
      <HighlightHero />
      <div className="-mt-12 md:-mt-16">
        <AchievementSection />
      </div>
    </>
  );
}
