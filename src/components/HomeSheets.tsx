import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { HighlightSection } from "./HighlightSection";
import { ResearchSection } from "./ResearchSection";
import { EquipmentSection } from "./EquipmentSection";
import { PracticumsSection } from "./PracticumsSection";
import { MembersSection } from "./MembersSection";

export function HomeSheets() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ResearchSection preview />
      <HighlightSection />
      <EquipmentSection preview />
      <PracticumsSection preview />
      <MembersSection preview />
    </div>
  );
}