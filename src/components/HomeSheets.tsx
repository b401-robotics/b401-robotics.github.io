import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { HighlightSection } from "./HighlightSection";
import { ResearchSection } from "./ResearchSection";
import { EquipmentSection } from "./EquipmentSection";
import { PracticumsSection } from "./PracticumsSection";
import { MembersSection } from "./MembersSection";
import { ChatbotSection } from "./ChatbotSection";

export function HomeSheets() {
  return (
    <div className="relative flex flex-col">
      <HeroSection />
      <AboutSection />
      <ResearchSection />
      <HighlightSection />
      <EquipmentSection preview />
      <PracticumsSection preview />
      <MembersSection preview />
      <ChatbotSection />
    </div>
  );
}
