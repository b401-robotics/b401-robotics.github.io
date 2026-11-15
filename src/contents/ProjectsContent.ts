import smartPingImage from "../assets/webp/projects/smart-ping.webp";
import riceMeshImage from "../assets/webp/projects/ricemesh.webp";
import medisyncImage from "../assets/webp/projects/medisync.webp";
import zendriveImage from "../assets/webp/projects/zendrive.webp";
import windowCleanerImage from "../assets/webp/projects/window-cleaner.webp";
import wayfinderImage from "../assets/webp/projects/wayfinder.webp";
import smartcoopImage from "../assets/webp/projects/smartcoop.webp";
import smdImage from "../assets/webp/projects/smd-drivethru.webp";

export const projectsEN = {
  sectionLabel: "Projects",
  heading: "Notable",
  headingAccent: "Work",
  body: "A showcase of student and faculty projects spanning robotics, AI, and embedded systems.",
  statusCompleted: "Completed",
  statusActive: "Active",
  statusResearch: "Research",
  // `image` on each item may be either an external URL string or a local
  // asset imported from `src/assets/webp/projects/`.
  items: [
    {
      title: "SmartPing: Vision-Based Table Tennis Trainer",
      image: smartPingImage,
      description: "An adaptive table tennis training system integrating an automated ball launcher, computer vision with YOLO object detection, and an interactive dashboard to analyze player returns, shot accuracy, and weak zones in real time.",
      tags: ["Fioreno Malvin T", "Devlin Jeychovinn Saputra"],
      status: "Completed",
    },
    {
      title: "RiceMesh: Smart AWD Irrigation Network",
      image: riceMeshImage,
      description: "An intelligent irrigation recommendation system using Alternate Wetting and Drying (AWD) for precision paddy field water management, combining solar-powered STM32 sensor nodes, ultrasonic water level telemetry via NRF24L01, and an ESP8266 MQTT web platform.",
      tags: ["Muhammad Risang Radityatama", "Rafila"],
      status: "Completed",
    },
    {
      title: "MediSync: Elderly Fall Detection System",
      image: medisyncImage,
      description: "A smart wearable sleeve and health monitoring platform for elderly emergency detection, utilizing ESP32 RTOS, MPU6050 and MAX30100 biometric sensors, a 1D-CNN deep learning model for real-time fall detection, and an integrated Flutter mobile emergency app.",
      tags: ["Sultan Syafiq Rakan"],
      status: "Completed",
    },
    {
      title: "ZenDrive: mmWave Driver Drowsiness Detection",
      image: zendriveImage,
      description: "A contactless in-cabin automotive safety system utilizing 60GHz mmWave radar sensors to extract driver vital signs (heart rate and respiration rate) in real time, analyzed by edge machine learning models to detect drowsiness and micro-sleep with immediate alerts.",
      tags: ["Sebastian Adirian Nugraha", "Edward Natasaputra", "Nur Anisa Hidayatul Masruroh"],
      status: "Completed",
    },
    {
      title: "WinBot: V-Plotter Window Cleaning Robot",
      image: windowCleanerImage,
      description: "A cable-driven parallel robot (CDPR) window cleaner designed for high-rise glass facades, utilizing dual stepper-controlled suspension cables in a V-plotter arrangement, motorized active cleaning modules, and wireless web dashboard control.",
      tags: ["Syella Akhul Khalimi", "Muhammad Navis Azka Atqiya"],
      status: "Completed",
    },
    {
      title: "Wayfinder: Interactive Indoor Hospital Navigator",
      image: wayfinderImage,
      description: "A kiosk-based indoor wayfinding system for large healthcare facilities featuring multi-floor A* pathfinding, Natural Language Processing (NLP) symptom-to-department recommendations, and seamless mobile handoff via QR code with real-time cloud map synchronization.",
      tags: ["Theo Pinem Kawalisa"],
      status: "Completed",
    },
    {
      title: "SmartCoop: AI Poultry Health & Biosecurity",
      image: smartcoopImage,
      description: "A poultry farm management platform combining AI computer vision for early chicken disease detection from images, NFC-tagged individual coop medical records, automated 8-phase biosecurity SOP scheduling, and real-time environmental monitoring.",
      tags: ["Muhammad Zia Alhambra"],
      status: "Completed",
    },
    {
      title: "SMD: Smart Minimarket Drive-Thru",
      image: smdImage,
      description: "An automated retail drive-thru system enabling queue-free contactless shopping. Customers order via AI web assistant, processed by a cloud backend over MQTT to ESP32 firmware that autonomously controls stepper motors, conveyors, and sorting gates to dispense goods.",
      tags: ["Ahmad Faiq Fawwaz", "Akhmad Rizqullah", "Moh. Wildan Risqi Maulidi"],
      status: "Completed",
    },
  ],
} as const;
