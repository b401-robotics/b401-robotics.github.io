import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { EquipmentSection } from "./EquipmentSection";
import { ResearchSection } from "./ResearchSection";
import { PracticumsSection } from "./PracticumsSection";
import { MembersSection } from "./MembersSection";

export function HomeSheets() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <EquipmentSection preview />
      <ResearchSection preview />
      <PracticumsSection preview />
      <MembersSection preview />
    </div>
  );
}