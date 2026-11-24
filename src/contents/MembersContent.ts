// Member arrays (`lecturers`, `assistants`, `alumni`) live in `./memberList`
// so both the UI and chatbot knowledge sync share one source of truth.
export const membersEN = {
  sectionLabel: "Our People",
  heading: "The People Behind",
  headingAccent: "B401",
  body: "Our laboratory is powered by dedicated lecturers, talented students, and a proud community of alumni who share a passion for robotics and intelligent systems.",
  lecturersLabel: "Lecturers & Supervisors",
  activeMembersLabel: "Active Laboratory Members",
  assistantsLabel: "Laboratory Assistants",
  alumniLabel: "Laboratory Alumni",
  modalAboutLabel: "About",
  modalEducationLabel: "Education",
  modalResearchLabel: "Research Interests",
  modalThesisLabel: "Thesis",
  modalExperienceLabel: "Experience",
  modalAchievementsLabel: "Achievements",
  modalContactLabel: "Contact",
  viewAll: "View All People",
} as const;
