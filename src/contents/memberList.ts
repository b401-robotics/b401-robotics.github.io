// Member photos accept two source forms — pick whichever fits:
//
//   1. External URL string, e.g.
//        image: "https://example.com/photo.jpg"
//      (the lecturers below use this form, pointing at the ITS site)
//
//   2. Local asset imported from `src/assets/img/`, e.g.
//        import photo from "../assets/img/photo.webp";
//        image: photo
//      The bundler resolves the import to a hashed URL string at build
//      time, so `image` remains a `string` in both cases.
//
// When `image` is omitted or empty, the card and modal fall back to
// rendering the person's `initials` on a dark placeholder.
import ur5Image from "../assets/webp/ur5.webp";
import nrfImage from "../assets/webp/nrf.webp";
import droneImage from "../assets/webp/drone.webp";
import nrfImage2 from "../assets/webp/people/NRF.webp";
import na70Image from "../assets/webp/people/Na70.webp";
import senimanImage from "../assets/webp/Seniman.webp";
import risangImage from "../assets/webp/people/risang.webp";
import rakanImage from "../assets/webp/people/Rakan.webp";
import wildinImage from "../assets/webp/people/wildin.webp";
import filaImage from "../assets/webp/people/Fila.webp";
import eduImage from "../assets/webp/people/Edu.webp";
import theoImage from "../assets/webp/people/Theo.webp";
import xnandImage from "../assets/webp/people/Xnand.webp";
import navisImage from "../assets/webp/people/Navis.webp";
import nurImage from "../assets/webp/people/Nur.webp";
import akhulImage from "../assets/webp/people/Akhul.webp";
import sultanImage from "../assets/webp/people/Sultan.webp";
import malvinImage from "../assets/webp/people/Malvin.webp";
import devlinImage from "../assets/webp/people/Devlin.webp";
import palelImage from "../assets/webp/people/Palel.webp";
import rianImage from "../assets/webp/people/Rian.webp";

export interface I_lecturers {
  name: string;
  role: string;
  specialty: string;
  initials: string;
  education?: string[];
  expertise?: string;
  image?: string;
}

export const lecturers: Array<I_lecturers> = [
  {
    name: "Dr. Ahmad Zaini, S.T., M.Sc.",
    role: "Head of Laboratory",
    specialty: "",
    initials: "AZ",
    education: [
      "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
      "S2: Teknik Elektronika, Institut Teknologi Sepuluh Nopember",
    ],
    expertise:
      "Digital Circuits, Telematics, Computer System Architecture, IoT, Image Processing, LoRa.",
    image:
      "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Pak-Zaini.jpg",
  },
  {
    name: "Muhtadin, S.T., M.T.",
    role: "Lecturer",
    specialty: "",
    initials: "M",
    education: [
      "S1: Teknik Sistem Komputer, Institut Teknologi Sepuluh Nopember",
      "S2: Teknologi Elektro dan Informatika (ITS & Hochschule Darmstadt Germany)",
    ],
    expertise:
      "Augmented Reality, Robotics (Service Robots, Object Following, Path Planning, YOLO), IoT, Smart Home, Wireless Sensor Networks.",
    image:
      "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Muhtadin-S.T.-M.T.Hany_.png",
  },
  {
    name: "Eko Pramunanto, S.T., M.T.",
    role: "Lecturer",
    specialty: "",
    initials: "EP",
    education: [
      "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
      "S2: Teknik Informatika, Institut Teknologi Bandung",
    ],
    expertise:
      "Basic Computer Programming, Embedded Systems, Numerical Methods, Digital Circuits, LoRaWAN, Android Apps, Pattern Recognition.",
    image:
      "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Pak-Eko-Pram.jpg",
  },
  {
    name: "Ir. Hany Boedinugroho, M.T.",
    role: "Lecturer",
    specialty: "",
    initials: "HB",
    education: [
      "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
      "S2: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
    ],
    expertise:
      "Microprocessor Systems and Microcontrollers, Computer System Architecture and Organization, Numerical Methods, Embedded Systems, Digital Circuits.",
    image:
      "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Pak-Hany.jpg",
  },
  {
    name: "Prof. Dr. Ir. Mauridhi Hery Purnomo, M.Eng.",
    role: "Lecturer",
    specialty: "",
    initials: "MH",
    education: [
      "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
      "S2: Teknik Elektro, Osaka City University",
      "S3: Teknik Elektro, Osaka City University",
    ],
    expertise:
      "Machine Learning, Ubiquitous Computing, Soft Computing, Deep Learning, Genetic Algorithms, Utility-Based AI, Optimization.",
    image:
      "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Prof-Hery.jpg",
  },
  {
    name: "Atar Fuady Babgei, S.T., M.Sc.",
    role: "Lecturer",
    specialty: "",
    initials: "AF",
    education: [
      "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
      "S2: Aircraft Systems Design, University of Southampton, UK",
    ],
    expertise:
      "Aircraft Systems Design, Avionics, Autonomous Vehicles (Self-driving car navigation, Multi-agent systems), Blimp development, Smart Medical Instrumentation.",
    image:
      "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Atar-Fuady-Babgei-S.T.-M.Sc_.jpg",
  },
];

export interface I_alumni {
  name: string;
  role: string;
  initials: string;
  year?: string;
  education?: string[];
  expertise?: string;
  thesis?: string[];
  experience?: string[];
  achievements?: string[];
  contact?: string;
  image?: string;
}

export interface I_assistant {
  name: string;
  role: string;
  initials: string;
  education?: string[];
  expertise?: string;
  experience?: string[];
  achievements?: string[];
  contact?: string;
  image?: string;
}

// Placeholder roster — replace names, roles, education, and expertise with
// the real data when available. The first two entries demonstrate the local
// asset form: `ur5Image` / `nrfImage` are imported from `src/assets/img/`.
//
// `contact` is dummy placeholder data (email • instagram • linkedin) shown at
// the bottom of the card info modal. Replace with real personal contact info
// when available.
//
// `experience` and `achievements` are dummy placeholder lists rendered as
// vertical bullet lists inside the card info modal. Replace with real data
// when available.

export const assistants: Array<I_assistant> = [
  {
    name: "Nur Rahman Fauzan",
    role: "Assistant Coordinator",
    initials: "JD",
    education: [],
    expertise:
      "Team coordination, laboratory scheduling, and mentoring new assistants through their first research project.",
    experience: [
      "Assistant Coordinator, B401 Robotics Laboratory (2023 – Present)",
      "Laboratory Assistant, B401 Robotics Laboratory (2022 – 2023)",
      "Teaching Assistant, Embedded Systems Practicum",
    ],
    achievements: [
      "Best Laboratory Assistant Award 2024",
      "1st Place, National Embedded Systems Competition 2023",
      "Finalist, ITS Robotics Innovation Challenge 2022",
    ],
    contact: "nur.fauzan@example.com • @nur.fauzan • linkedin.com/in/nur-fauzan",
    image: nrfImage2,
  },
  {
    name: "Abraham Napitupulu",
    role: "Laboratory Assistant Batch 2023",
    initials: "JS",
    education: [],
    expertise:
      "PCB design, soldering, and bring-up of custom embedded boards for laboratory projects.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Hardware Intern, PT Elektronika Nusantara (2023)",
    ],
    achievements: [
      "2nd Place, National PCB Design Contest 2023",
      "Certified Altium Associate Designer",
    ],
    contact: "abraham.napitupulu@example.com • @abraham.napitupulu • linkedin.com/in/abraham-napitupulu",
    image: na70Image,
  },
  {
    name: "Sultan Syafiq Rakan",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Robotics Research Intern, B401 Laboratory (2022)",
    ],
    achievements: [
      "Finalist, Indonesian Robot Contest (KRI) 2023",
      "Best Project Award, Robotics Practicum 2022",
    ],
    contact: "sultan.rakan@example.com • @sultan.rakan • linkedin.com/in/sultan-rakan",
    image: rakanImage,
  },
  {
    name: "Muhammad Risang Radityatama",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Autonomous Systems Intern, PT Teknologi Otomasi (2023)",
    ],
    achievements: [
      "1st Place, Regional Line Follower Competition 2023",
      "Dean's List Award 2023",
    ],
    contact: "risang.radityatama@example.com • @risang.radityatama • linkedin.com/in/risang-radityatama",
    image: risangImage,
  },
  {
    name: "Moh. Wildan Risqi Maulidi",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Research Assistant, Computer Vision Project (2022)",
    ],
    achievements: [
      "Top 10, National AI & Robotics Hackathon 2023",
      "Best Poster, ITS Research Week 2022",
    ],
    contact: "wildan.maulidi@example.com • @wildan.maulidi • linkedin.com/in/wildan-maulidi",
    image: wildinImage,
  },
  {
    name: "Rafila ",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "IoT Development Intern, PT Sinar Digital (2023)",
    ],
    achievements: [
      "2nd Place, National IoT Innovation Challenge 2023",
      "Outstanding Student Award 2022",
    ],
    contact: "rafila@example.com • @rafila • linkedin.com/in/rafila",
    image: filaImage,
  },
  {
    name: "Edward Natasaputra",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Embedded Firmware Intern, PT Cipta Karya (2023)",
    ],
    achievements: [
      "1st Place, National Microcontroller Contest 2023",
      "Best Final Project, Embedded Systems Course 2022",
    ],
    contact: "edward.natasaputra@example.com • @edward.natasaputra • linkedin.com/in/edward-natasaputra",
    image: eduImage,
  },
  {
    name: "Theo Pinem Kawalisa",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Teaching Assistant, Digital Systems Practicum (2022)",
    ],
    achievements: [
      "Finalist, Indonesian Robot Contest (KRI) 2023",
      "Best Teaching Assistant Award 2022",
    ],
    contact: "theo.kawalisa@example.com • @theo.kawalisa • linkedin.com/in/theo-kawalisa",
    image: theoImage,
  },
  {
    name: "Ahmad Faiq Fawwaz",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Software Engineering Intern, PT Solusi Digital (2023)",
    ],
    achievements: [
      "1st Place, Web Development Competition 2023",
      "Dean's List Award 2023",
    ],
    contact: "ahmad.faiq@example.com • @ahmad.faiq • linkedin.com/in/ahmad-faiq",
    image: senimanImage,
  },
  {
    name: "Akhmad Rizqullah",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Robotics Competition Team Member (2022 – 2023)",
    ],
    achievements: [
      "2nd Place, National Robotics Competition 2023",
      "Best Innovation Award, ITS Expo 2022",
    ],
    contact: "akhmad.rizqullah@example.com • @akhmad.rizqullah • linkedin.com/in/akhmad-rizqullah",
    image: xnandImage,
  },
  {
    name: "Muhammad Navis Azka Atqiya",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Network Engineering Intern, PT Telkom Indonesia (2023)",
    ],
    achievements: [
      "CCNA Certified",
      "Top 5, National Network Security Competition 2023",
    ],
    contact: "navis.atqiya@example.com • @navis.atqiya • linkedin.com/in/navis-atqiya",
    image: navisImage,
  },
  {
    name: "Nur Anisa Hidayatul Masruroh",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Data Science Intern, PT Analitika Data (2023)",
    ],
    achievements: [
      "1st Place, National Data Science Competition 2023",
      "Best Research Paper, ITS Student Conference 2022",
    ],
    contact: "nur.anisa@example.com • @nur.anisa • linkedin.com/in/nur-anisa",
    image: nurImage,
  },
  {
    name: "Syella Akhul Khalimi",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "UI/UX Design Intern, PT Kreatif Digital (2023)",
    ],
    achievements: [
      "Best UI Design Award, National Design Competition 2023",
      "Dean's List Award 2023",
    ],
    contact: "syella.akhul@example.com • @syella.akhul • linkedin.com/in/syella-akhul",
    image: akhulImage,
  },
  {
    name: "Sultan Syarief Usman",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Automation Intern, PT Manufaktur Cerdas (2023)",
    ],
    achievements: [
      "1st Place, National Automation Competition 2023",
      "Best Project Award, Control Systems Course 2022",
    ],
    contact: "sultan.usman@example.com • @sultan.usman • linkedin.com/in/sultan-usman",
    image: sultanImage,
  },
  {
    name: "Fioreno Malvin T",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Game Development Intern, PT Studio Kreatif (2023)",
    ],
    achievements: [
      "Finalist, National Game Development Competition 2023",
      "Best Innovation Award, ITS Expo 2022",
    ],
    contact: "fioreno.malvin@example.com • @fioreno.malvin • linkedin.com/in/fioreno-malvin",
    image: malvinImage,
  },
  {
    name: "Devlin Jeychovinn Saputra",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Cybersecurity Intern, PT Secure Net (2023)",
    ],
    achievements: [
      "Top 10, National Capture The Flag Competition 2023",
      "Certified Ethical Hacker (CEH)",
    ],
    contact: "devlin.saputra@example.com • @devlin.saputra • linkedin.com/in/devlin-saputra",
    image: devlinImage,
  },
  {
    name: "Farrel Ganendra",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Mobile Development Intern, PT Aplikasi Nusantara (2023)",
    ],
    achievements: [
      "1st Place, National Mobile App Competition 2023",
      "Dean's List Award 2023",
    ],
    contact: "farrel.ganendra@example.com • @farrel.ganendra • linkedin.com/in/farrel-ganendra",
    image: palelImage,
  },
  {
    name: "Sebastian Adirian Nugraha",
    role: "Laboratory Asisstant Batch 2023",
    initials: "OT",
    education: [],
    expertise:
      "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    experience: [
      "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      "Cloud Engineering Intern, PT Cloud Indonesia (2023)",
    ],
    achievements: [
      "AWS Certified Solutions Architect",
      "Top 5, National Cloud Computing Competition 2023",
    ],
    contact: "sebastian.nugraha@example.com • @sebastian.nugraha • linkedin.com/in/sebastian-nugraha",
    image: rianImage,
  },
];

// Placeholder alumni list — replace the names, roles, and years with the
// real alumni data when available. Same image-source rules apply here.
// `contact` uses the same dummy placeholder convention as the assistants.
// `thesis`, `experience`, and `achievements` are dummy placeholder lists
// rendered as vertical bullet lists inside the card info modal.
export const alumni: Array<I_alumni> = [
  {
    name: "Bagas Prakoso",
    role: "Robotics Research Alumni",
    initials: "BP",
    year: "2024",
    education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
    thesis: [
      "S1 Thesis: \"Vision-Based SLAM for Indoor Mobile Robots Using ORB-SLAM3\"",
      "Developed and validated a monocular SLAM pipeline on the B401 TurtleBot platform.",
    ],
    expertise:
      "Mobile robot navigation and SLAM. Now working on autonomous systems in industry.",
    experience: [
      "Robotics Research Alumni, B401 Robotics Laboratory (2020 – 2024)",
      "Autonomous Systems Engineer, PT Teknologi Otomasi (2024 – Present)",
      "Robotics Intern, PT Manufaktur Cerdas (2023)",
    ],
    achievements: [
      "Best Thesis Award, Teknik Komputer ITS 2024",
      "1st Place, Indonesian Robot Contest (KRI) 2023",
      "Published paper at IEEE ICRS 2023",
    ],
    contact: "bagas.prakoso@example.com • @bagas.prakoso • linkedin.com/in/bagas-prakoso",
    // Local asset from src/assets/img/ — resolved by the bundler to a URL.
    image: droneImage,
  },
  {
    name: "Citra Lestari",
    role: "Embedded Systems Alumni",
    initials: "CL",
    year: "2023",
    education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
    thesis: [
      "S1 Thesis: \"Energy-Efficient Duty Cycling for Battery-Powered Wireless Sensor Nodes\"",
      "Achieved 40% power reduction on a custom STM32-based sensor node.",
    ],
    expertise:
      "Low-power embedded design and firmware for battery-operated sensor nodes.",
    experience: [
      "Embedded Systems Alumni, B401 Robotics Laboratory (2019 – 2023)",
      "Firmware Engineer, PT Elektronika Nusantara (2023 – Present)",
    ],
    achievements: [
      "Best Final Project, Teknik Komputer ITS 2023",
      "2nd Place, National Embedded Systems Competition 2022",
    ],
    contact: "citra.lestari@example.com • @citra.lestari • linkedin.com/in/citra-lestari",
  },
  {
    name: "Dimas Saputra",
    role: "IoT Research Alumni",
    initials: "DS",
    year: "2023",
    education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
    thesis: [
      "S1 Thesis: \"LoRa-Based Soil Moisture Monitoring System for Precision Agriculture\"",
      "Deployed a 12-node LoRa network on a local farm with a web dashboard.",
    ],
    expertise:
      "End-to-end IoT systems with LoRa backhaul for agricultural monitoring.",
    experience: [
      "IoT Research Alumni, B401 Robotics Laboratory (2019 – 2023)",
      "IoT Engineer, PT Sinar Digital (2023 – Present)",
    ],
    achievements: [
      "1st Place, National IoT Innovation Challenge 2022",
      "Dean's List Award 2022",
    ],
    contact: "dimas.saputra@example.com • @dimas.saputra • linkedin.com/in/dimas-saputra",
  },
  {
    name: "Eka Wijaya",
    role: "Computer Vision Alumni",
    initials: "EW",
    year: "2022",
    education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
    thesis: [
      "S1 Thesis: \"6-DoF Object Pose Estimation for Robotic Grasping Using RGB-D Fusion\"",
      "Trained a pose estimation model and integrated it with a UR5 robotic arm.",
    ],
    expertise: "Object detection and pose estimation for robotic manipulation.",
    experience: [
      "Computer Vision Alumni, B401 Robotics Laboratory (2018 – 2022)",
      "Computer Vision Engineer, PT Analitika Data (2022 – Present)",
    ],
    achievements: [
      "Best Thesis Award, Teknik Komputer ITS 2022",
      "Top 10, National AI Competition 2021",
    ],
    contact: "eka.wijaya@example.com • @eka.wijaya • linkedin.com/in/eka-wijaya",
  },
  {
    name: "Fitri Handayani",
    role: "Wireless Sensor Networks Alumni",
    initials: "FH",
    year: "2022",
    education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
    thesis: [
      "S1 Thesis: \"Energy-Aware Mesh Routing Protocol for Wireless Sensor Networks\"",
      "Simulated and validated the protocol on a 20-node physical testbed.",
    ],
    expertise:
      "Mesh networking protocols and energy-aware routing for field deployments.",
    experience: [
      "Wireless Sensor Networks Alumni, B401 Robotics Laboratory (2018 – 2022)",
      "Network Engineer, PT Telkom Indonesia (2022 – Present)",
    ],
    achievements: [
      "1st Place, National Network Design Competition 2021",
      "Outstanding Student Award 2021",
    ],
    contact: "fitri.handayani@example.com • @fitri.handayani • linkedin.com/in/fitri-handayani",
  },
  {
    name: "Gilang Ramadhan",
    role: "Automation Alumni",
    initials: "GR",
    year: "2021",
    education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
    thesis: [
      "S1 Thesis: \"PLC-Based Automated Sorting System for Small-Scale Manufacturing\"",
      "Designed and commissioned a conveyor sorting line using a Siemens S7-1200.",
    ],
    expertise:
      "PLC programming and industrial control systems for factory automation.",
    experience: [
      "Automation Alumni, B401 Robotics Laboratory (2017 – 2021)",
      "Automation Engineer, PT Manufaktur Cerdas (2021 – Present)",
    ],
    achievements: [
      "Best Final Project, Teknik Komputer ITS 2021",
      "2nd Place, National Automation Competition 2020",
    ],
    contact: "gilang.ramadhan@example.com • @gilang.ramadhan • linkedin.com/in/gilang-ramadhan",
  },
];
