export const projectsID = {
  sectionLabel: "Proyek",
  heading: "Karya",
  headingAccent: "Unggulan",
  body: "Etalase proyek mahasiswa dan dosen yang mencakup robotika, AI, dan sistem tertanam.",
  statusCompleted: "Selesai",
  statusActive: "Aktif",
  statusResearch: "Penelitian",
  items: [
    {
      title: "Robot Pengikut Garis Otonom",
      desc: "Robot navigasi mandiri menggunakan kendali PID dan sensor inframerah untuk pelacakan garis presisi di jalur kompleks.",
      tags: ["Embedded C", "Kendali PID", "Sensor Fusion"],
      status: "Completed",
    },
    {
      title: "Lengan Robot dengan Panduan Visi",
      desc: "Lengan robot 6-DOF yang menggunakan visi komputer untuk mengidentifikasi dan mengambil objek dari ban berjalan secara otonom.",
      tags: ["ROS 2", "OpenCV", "Python", "Kinematika Balik"],
      status: "Active",
    },
    {
      title: "Sistem Otomasi Rumah Pintar",
      desc: "Sistem rumah pintar berbasis IoT dengan pengenalan suara, pemantauan energi, dan integrasi aplikasi mobile.",
      tags: ["ESP32", "MQTT", "React Native", "TensorFlow Lite"],
      status: "Active",
    },
    {
      title: "Penerbangan Formasi Drone",
      desc: "Sistem koordinasi multi-UAV yang memungkinkan penerbangan formasi tersinkronisasi menggunakan algoritma kendali terdistribusi.",
      tags: ["PX4", "MAVLink", "Kendali Formasi"],
      status: "Research",
    },
    {
      title: "Pengenalan Aktivitas Manusia",
      desc: "Model deep learning untuk pengenalan aktivitas manusia secara real-time menggunakan data sensor IMU dari perangkat wearable.",
      tags: ["PyTorch", "LSTM", "Sensor IMU"],
      status: "Completed",
    },
    {
      title: "Kursi Roda Kendali Gestur",
      desc: "Proyek teknologi bantu yang memungkinkan kendali kursi roda melalui pengenalan gestur tangan menggunakan kamera kedalaman.",
      tags: ["MediaPipe", "RealSense", "ROS 2"],
      status: "Active",
    },
    {
      title: "Robot Berjalan Bipedal",
      desc: "Bagian bawah robot humanoid yang dirancang untuk mempelajari cara berjalan dinamis dan keseimbangan.",
      tags: ["ROS", "C++", "Simscape"],
      status: "Research",
    },
    {
      title: "Pemantau Lingkungan LoRaWAN",
      desc: "Jaringan sensor nirkabel terdistribusi untuk pemantauan pertanian skala besar menggunakan LoRa.",
      tags: ["ESP32", "LoRa", "InfluxDB"],
      status: "Completed",
    },
  ],
} as const;
