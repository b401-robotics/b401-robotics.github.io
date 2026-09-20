export const equipmentEN = {
  sectionLabel: "Facilities",
  heading: "Equipment &",
  headingAccent: "Infrastructure",
  body: "State-of-the-art tools and equipment to support cutting-edge research and practical learning.",
  items: [
    { name: "UR5e Collaborative Robot Arm", category: "Robotics", icon: "🦾" },
    { name: "ROS 2 Enabled Mobile Platforms", category: "Navigation", icon: "🤖" },
    { name: "Intel RealSense Depth Cameras", category: "Vision", icon: "📷" },
    { name: "NVIDIA Jetson Series GPUs", category: "Computing", icon: "💻" },
    { name: "DJI Matrice 300 RTK Drone", category: "UAV", icon: "🚁" },
    { name: "Festo Pneumatic Systems", category: "Automation", icon: "⚙️" },
    { name: "Oscilloscopes & Signal Analyzers", category: "Electronics", icon: "📡" },
    { name: "3D Printing Workstation", category: "Prototyping", icon: "🖨️" },
  ],
  viewAll: "View All Equipment",
  labFeatures: [
    {
      title: "Lab Space",
      value: "200 m²",
      desc: "Dedicated research and practicum workspace",
      icon: "🏢",
    },
    {
      title: "Workstations",
      value: "20+",
      desc: "High-performance computing stations for students",
      icon: "💻",
    },
    {
      title: "Open Access",
      value: "Mon–Sat",
      desc: "Lab accessible to registered members and students",
      icon: "🔓",
    },
  ],
} as const;
