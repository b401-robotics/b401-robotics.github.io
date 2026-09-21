import { lecturers, assistants, alumni } from "./memberList";

export const membersID = {
  sectionLabel: "Orang Kami",
  heading: "Orang-Orang di Balik",
  headingAccent: "B401",
  body: "Laboratorium kami digerakkan oleh dosen berdedikasi, mahasiswa berbakat, dan komunitas alumni yang memiliki semangat terhadap robotika dan sistem cerdas.",
  lecturersLabel: "Dosen & Pembimbing",
  activeMembersLabel: "Anggota Laboratorium Aktif",
  studentsLabel: "Anggota Mahasiswa",
  lecturers: lecturers,
  studentRoles: [
    { label: "Asisten Laboratorium", count: 26, icon: "🧑‍💻" },
    { label: "Peneliti Aktif", count: 14, icon: "🔬" },
  ],
  assistantsLabel: "Asisten Laboratorium",
  assistants: assistants,
  alumniLabel: "Alumni Laboratorium",
  alumni: alumni,
  modalEducationLabel: "Pendidikan",
  modalResearchLabel: "Minat Penelitian",
  viewAll: "Lihat Semua Orang",
} as const;
