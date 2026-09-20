import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { EquipmentSection } from "./EquipmentSection";
import { ResearchSection } from "./ResearchSection";
import { PracticumsSection } from "./PracticumsSection";
import { MembersSection } from "./MembersSection";
import { ContactSection } from "./ContactSection";

export function HomeSheets() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <EquipmentSection />
      <ResearchSection />
      <PracticumsSection />
      <MembersSection />
      <ContactSection />
    </div>
  );
}