import { lecturers, assistants, alumni } from "./memberList";

export const membersEN = {
  sectionLabel: "Our People",
  heading: "The People Behind",
  headingAccent: "B401",
  body: "Our laboratory is powered by dedicated lecturers, talented students, and a proud community of alumni who share a passion for robotics and intelligent systems.",
  lecturersLabel: "Lecturers & Supervisors",
  activeMembersLabel: "Active Laboratory Members",
  studentsLabel: "Student Members",
  lecturers: lecturers,
  studentRoles: [
    { label: "Laboratory Assistant", count: 26, icon: "🧑‍💻" },
    { label: "Active Researcher", count: 14, icon: "🔬" },
  ],
  assistantsLabel: "Laboratory Assistants",
  assistants: assistants,
  alumniLabel: "Laboratory Alumni",
  alumni: alumni,
  modalEducationLabel: "Education",
  modalResearchLabel: "Research Interests",
  viewAll: "View All People",
} as const;
