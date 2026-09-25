import { navEN } from "./NavContent/en";
import { heroEN } from "./HeroContent/en";
import { aboutEN } from "./AboutContent/en";
import { researchEN } from "./ResearchContent/en";
import { highlightEN } from "./HighlightContent/en";
import { activityEN } from "./ActivityContent/en";
import { practicumsEN } from "./PracticumsContent/en";
import { projectsEN } from "./ProjectsContent/en";
import { membersEN } from "./MembersContent/en";
import { equipmentEN } from "./EquipmentContent/en";
import { contactEN } from "./ContactContent/en";
import { footerEN } from "./FooterContent/en";
import { achievementsEN } from "./AchievementContent/en";

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
