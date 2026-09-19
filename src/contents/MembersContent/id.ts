import { lecturers, assistants } from "./memberList";

export const membersID = {
  sectionLabel: "Tim Kami",
  heading: "Orang-Orang di Balik",
  headingAccent: "B401",
  body: "Laboratorium kami digerakkan oleh dosen berdedikasi dan mahasiswa berbakat yang memiliki semangat terhadap robotika dan sistem cerdas.",
  lecturersLabel: "Dosen & Pembimbing",
  studentsLabel: "Anggota Mahasiswa",
  lecturers: lecturers,
  studentRoles: [
    { label: "Asisten Laboratorium", count: 26, icon: "🧑‍💻" },
    { label: "Peneliti Aktif", count: 14, icon: "🔬" },
  ],
  assistantsLabel: "Asisten Laboratorium",
  assistants: assistants,
  modalEducationLabel: "Pendidikan",
  modalResearchLabel: "Minat Penelitian",
} as const;
