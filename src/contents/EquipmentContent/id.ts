export const equipmentID = {
  sectionLabel: "Fasilitas",
  heading: "Peralatan &",
  headingAccent: "Infrastruktur",
  body: "Peralatan dan infrastruktur mutakhir untuk mendukung penelitian dan pembelajaran praktis.",
  items: [
    { name: "Lengan Robot Kolaboratif UR5e", category: "Robotika", icon: "🦾" },
    { name: "Platform Bergerak Berbasis ROS 2", category: "Navigasi", icon: "🤖" },
    { name: "Kamera Kedalaman Intel RealSense", category: "Visi", icon: "📷" },
    { name: "GPU NVIDIA Seri Jetson", category: "Komputasi", icon: "💻" },
    { name: "Drone DJI Matrice 300 RTK", category: "UAV", icon: "🚁" },
    { name: "Sistem Pneumatik Festo", category: "Otomasi", icon: "⚙️" },
    { name: "Osiloskop & Penganalisis Sinyal", category: "Elektronika", icon: "📡" },
    { name: "Workstation Cetak 3D", category: "Prototipe", icon: "🖨️" },
  ],
  viewAll: "Lihat Semua Peralatan",
  labFeatures: [
    {
      title: "Luas Lab",
      value: "200 m²",
      desc: "Ruang kerja penelitian dan praktikum khusus",
      icon: "🏢",
    },
    {
      title: "Workstation",
      value: "20+",
      desc: "Stasiun komputasi berperforma tinggi untuk mahasiswa",
      icon: "💻",
    },
    {
      title: "Akses Terbuka",
      value: "Sen–Sab",
      desc: "Lab dapat diakses oleh anggota dan mahasiswa terdaftar",
      icon: "🔓",
    },
  ],
} as const;
