export interface FooterSocial {
  name: string;
  href: string;
  type: "email" | "instagram" | "linkedin" | "github";
}

export const footerEN = {
  labName: "Robotics & Intelligent\nSystems Lab",
  tagline:
    "Advancing the frontier of robotics and intelligent systems through research, education, and innovation.",
  findUsLabel: "Find Us",
  addressLines: [
    "Departemen Teknik Komputer",
    "Fakultas Teknologi Elektro dan Informatika Cerdas",
    "Institut Teknologi Sepuluh Nopember",
    "Surabaya, Jawa Timur, Indonesia",
  ],
  contactLabel: "Contact Us",
  socials: [
    {
      name: "Email",
      href: "mailto:b401robotics@gmail.com",
      type: "email",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/itsb401lab/",
      type: "instagram",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/b401-robotics/",
      type: "linkedin",
    },
    {
      name: "GitHub",
      href: "https://github.com/b401-robotics",
      type: "github",
    },
  ] as const satisfies readonly FooterSocial[],
  departmentWebsite: {
    label: "its.ac.id/komputer ↗",
    href: "https://www.its.ac.id/komputer/",
  },
  copyright: "B401 Robotics & Intelligent Systems Laboratory. All rights reserved.",
} as const;