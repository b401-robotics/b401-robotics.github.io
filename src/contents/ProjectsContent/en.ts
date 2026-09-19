export const projectsEN = {
  sectionLabel: "Projects",
  heading: "Notable",
  headingAccent: "Work",
  body: "A showcase of student and faculty projects spanning robotics, AI, and embedded systems.",
  statusCompleted: "Completed",
  statusActive: "Active",
  statusResearch: "Research",
  items: [
    {
      title: "Autonomous Line-Following Robot",
      desc: "A self-navigating robot using PID control and infrared sensors for precise line tracking on complex tracks.",
      tags: ["Embedded C", "PID Control", "Sensor Fusion"],
      status: "Completed",
    },
    {
      title: "Robotic Arm with Vision Guidance",
      desc: "A 6-DOF robotic arm that uses computer vision to identify and pick objects from a conveyor belt autonomously.",
      tags: ["ROS 2", "OpenCV", "Python", "Inverse Kinematics"],
      status: "Active",
    },
    {
      title: "Smart Home Automation System",
      desc: "IoT-based smart home system with voice recognition, energy monitoring, and mobile app integration.",
      tags: ["ESP32", "MQTT", "React Native", "TensorFlow Lite"],
      status: "Active",
    },
    {
      title: "Drone Formation Flight",
      desc: "Multi-UAV coordination system enabling synchronized formation flight using distributed control algorithms.",
      tags: ["PX4", "MAVLink", "Formation Control"],
      status: "Research",
    },
    {
      title: "Human Activity Recognition",
      desc: "Deep learning model for real-time human activity recognition using IMU sensor data from wearable devices.",
      tags: ["PyTorch", "LSTM", "IMU Sensors"],
      status: "Completed",
    },
    {
      title: "Gesture-Controlled Wheelchair",
      desc: "Assistive technology project enabling wheelchair control through hand gesture recognition using a depth camera.",
      tags: ["MediaPipe", "RealSense", "ROS 2"],
      status: "Active",
    },
    {
      title: "Bipedal Walking Robot",
      desc: "A humanoid robot lower body designed to study dynamic walking and balance using zero moment point control.",
      tags: ["ROS", "C++", "Simscape"],
      status: "Research",
    },
    {
      title: "LoRaWAN Environmental Monitor",
      desc: "Distributed wireless sensor network for large-scale agricultural monitoring using low power wide area networks.",
      tags: ["ESP32", "LoRa", "InfluxDB"],
      status: "Completed",
    },
  ],
} as const;
