import { navEN } from "./NavContent";
import { heroEN } from "./HeroContent";
import { aboutEN } from "./AboutContent";
import { researchEN } from "./ResearchContent";
import { highlightEN } from "./HighlightContent";
import { activityEN } from "./ActivityContent";
import { practicumsEN } from "./PracticumsContent";
import { projectsEN } from "./ProjectsContent";
import { membersEN } from "./MembersContent";
import { equipmentEN } from "./EquipmentContent";
import { contactEN } from "./ContactContent";
import { footerEN } from "./FooterContent";
import { achievementsEN } from "./AchievementContent";

export const translations = {
  nav: navEN,
  hero: heroEN,
  about: aboutEN,
  research: researchEN,
  highlight: highlightEN,
  activity: activityEN,
  practicums: practicumsEN,
  projects: projectsEN,
  members: membersEN,
  equipment: equipmentEN,
  achievements: achievementsEN,
  contact: contactEN,
  footer: footerEN,
} as const;

export type Translations = typeof translations;