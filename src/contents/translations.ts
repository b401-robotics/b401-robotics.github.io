import { navEN } from "./NavContent/en";
import { navID } from "./NavContent/id";
import { heroEN } from "./HeroContent/en";
import { heroID } from "./HeroContent/id";
import { aboutEN } from "./AboutContent/en";
import { aboutID } from "./AboutContent/id";
import { researchEN } from "./ResearchContent/en";
import { researchID } from "./ResearchContent/id";
import { practicumsEN } from "./PracticumsContent/en";
import { practicumsID } from "./PracticumsContent/id";
import { projectsEN } from "./ProjectsContent/en";
import { projectsID } from "./ProjectsContent/id";
import { membersEN } from "./MembersContent/en";
import { membersID } from "./MembersContent/id";
import { equipmentEN } from "./EquipmentContent/en";
import { equipmentID } from "./EquipmentContent/id";
import { contactEN } from "./ContactContent/en";
import { contactID } from "./ContactContent/id";
import { footerEN } from "./FooterContent/en";
import { footerID } from "./FooterContent/id";
import { achievementsEN } from "./AchievementContent/en";
import { achievementsID } from "./AchievementContent/id";

export const translations = {
  en: {
    nav: navEN,
    hero: heroEN,
    about: aboutEN,
    research: researchEN,
    practicums: practicumsEN,
    projects: projectsEN,
    members: membersEN,
    equipment: equipmentEN,
    achievements: achievementsEN,
    contact: contactEN,
    footer: footerEN,
  },
  id: {
    nav: navID,
    hero: heroID,
    about: aboutID,
    research: researchID,
    practicums: practicumsID,
    projects: projectsID,
    members: membersID,
    equipment: equipmentID,
    achievements: achievementsID,
    contact: contactID,
    footer: footerID,
  },
} as const;

export type Translations = typeof translations.en;
