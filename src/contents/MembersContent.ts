import { lecturers, assistants, alumni } from "./memberList";
import na70Image from "../assets/webp/people/Na70.webp";

export const membersEN = {
  sectionLabel: "Our People",
  heading: "The People Behind",
  headingAccent: "B401",
  body: "Our laboratory is powered by dedicated lecturers, talented students, and a proud community of alumni who share a passion for robotics and intelligent systems.",
  lecturersLabel: "Lecturers & Supervisors",
  activeMembersLabel: "Active Laboratory Members",
  studentsLabel: "Student Members",
  image: na70Image,
  lecturers,
  assistantsLabel: "Laboratory Assistants",
  assistants,
  alumniLabel: "Laboratory Alumni",
  alumni,
  modalEducationLabel: "Education",
  modalResearchLabel: "Research Interests",
  modalThesisLabel: "Thesis",
  modalExperienceLabel: "Experience",
  modalAchievementsLabel: "Achievements",
  modalContactLabel: "Contact",
  viewAll: "View All People",
} as const;
