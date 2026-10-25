import { lecturers, assistants, alumni } from "./memberList";
import na70Image from "../assets/webp/people/Na70.webp";
import nrfImage from "../assets/webp/people/NRF.webp";
import rakanImage from "../assets/webp/people/Rakan.webp";
import risangImage from "../assets/webp/people/risang.webp";
import wildanImage from "../assets/webp/people/wildan.webp";
import filaImage from "../assets/webp/people/Fila.webp";
import eduImage from "../assets/webp/people/Edu.webp";
import theoImage from "../assets/webp/people/Theo.webp";
import senimanImage from "../assets/webp/Seniman.webp";
import xnandImage from "../assets/webp/people/Xnand.webp";
import navisImage from "../assets/webp/people/Navis.webp";
import nurImage from "../assets/webp/people/Nur.webp";
import akhulImage from "../assets/webp/people/Akhul.webp";
import sultanImage from "../assets/webp/people/Sultan.webp";
import malvinImage from "../assets/webp/people/Malvin.webp";
import devlinImage from "../assets/webp/people/Devlin.webp";
import palelImage from "../assets/webp/people/Palel.webp";
import rianImage from "../assets/webp/people/Rian.webp";

export const membersEN = {
  sectionLabel: "Our People",
  heading: "The People Behind",
  headingAccent: "B401",
  body: "Our laboratory is powered by dedicated lecturers, talented students, and a proud community of alumni who share a passion for robotics and intelligent systems.",
  lecturersLabel: "Lecturers & Supervisors",
  activeMembersLabel: "Active Laboratory Members",
  studentsLabel: "Student Members",
  image: na70Image,
  lecturers: [
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
  ],
  assistantsLabel: "Laboratory Assistants",
  assistants: [
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
      contact:
        "nur.fauzan@example.com • @nur.fauzan • linkedin.com/in/nur-fauzan",
      image: nrfImage,
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
      contact:
        "abraham.napitupulu@example.com • @abraham.napitupulu • linkedin.com/in/abraham-napitupulu",
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
      contact:
        "sultan.rakan@example.com • @sultan.rakan • linkedin.com/in/sultan-rakan",
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
      contact:
        "risang.radityatama@example.com • @risang.radityatama • linkedin.com/in/risang-radityatama",
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
      contact:
        "wildan.maulidi@example.com • @wildan.maulidi • linkedin.com/in/wildan-maulidi",
      image: wildanImage,
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
      contact:
        "edward.natasaputra@example.com • @edward.natasaputra • linkedin.com/in/edward-natasaputra",
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
      contact:
        "theo.kawalisa@example.com • @theo.kawalisa • linkedin.com/in/theo-kawalisa",
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
      contact:
        "ahmad.faiq@example.com • @ahmad.faiq • linkedin.com/in/ahmad-faiq",
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
      contact:
        "akhmad.rizqullah@example.com • @akhmad.rizqullah • linkedin.com/in/akhmad-rizqullah",
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
      contact:
        "navis.atqiya@example.com • @navis.atqiya • linkedin.com/in/navis-atqiya",
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
      contact:
        "syella.akhul@example.com • @syella.akhul • linkedin.com/in/syella-akhul",
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
      contact:
        "sultan.usman@example.com • @sultan.usman • linkedin.com/in/sultan-usman",
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
      contact:
        "fioreno.malvin@example.com • @fioreno.malvin • linkedin.com/in/fioreno-malvin",
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
      contact:
        "devlin.saputra@example.com • @devlin.saputra • linkedin.com/in/devlin-saputra",
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
      contact:
        "farrel.ganendra@example.com • @farrel.ganendra • linkedin.com/in/farrel-ganendra",
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
      contact:
        "sebastian.nugraha@example.com • @sebastian.nugraha • linkedin.com/in/sebastian-nugraha",
      image: rianImage,
    },
    {
      name: "Muhammad Zia Alhambra",
      role: "Laboratory Assistant Batch 2023",
      initials: "MZ",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Kinematics, embedded systems, and robotics research.",
      experience: [
        "Laboratory Assistant, B401 Robotics Laboratory (2023 – Present)",
      ],
      contact: "zia.alhambra@example.com",
    },
    {
      name: "Muhammad Abdullah",
      role: "Laboratory Member Batch 2024",
      initials: "MA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241002@student.its.ac.id",
    },
    {
      name: "Hans Jovan",
      role: "Laboratory Member Batch 2024",
      initials: "HJ",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241005@student.its.ac.id",
    },
    {
      name: "Mohammad Khirz El Jausyan",
      role: "Laboratory Member Batch 2024",
      initials: "MK",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241009@student.its.ac.id",
    },
    {
      name: "Rahmat Maulana Ansori",
      role: "Laboratory Member Batch 2024",
      initials: "RM",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241011@student.its.ac.id",
    },
    {
      name: "Yuke Brilliant Hestiavin",
      role: "Laboratory Member Batch 2024",
      initials: "YB",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241016@student.its.ac.id",
    },
    {
      name: "Faruq Awliya Labiib",
      role: "Laboratory Member Batch 2024",
      initials: "FA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241020@student.its.ac.id",
    },
    {
      name: "Christopher Joenathan Hindarto",
      role: "Laboratory Member Batch 2024",
      initials: "CJ",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241028@student.its.ac.id",
    },
    {
      name: "Bagas Aryo Dananjoyo",
      role: "Laboratory Member Batch 2024",
      initials: "BA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241031@student.its.ac.id",
    },
    {
      name: "Farhat Azzam",
      role: "Laboratory Member Batch 2024",
      initials: "FA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241033@student.its.ac.id",
    },
    {
      name: "Hasya Rihadatul Aiza",
      role: "Laboratory Member Batch 2024",
      initials: "HR",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241036@student.its.ac.id",
    },
    {
      name: "Abrar Rafi Dwianto",
      role: "Laboratory Member Batch 2024",
      initials: "AR",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241046@student.its.ac.id",
    },
    {
      name: "Dhafin Ardra Madany",
      role: "Laboratory Member Batch 2024",
      initials: "DA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241054@student.its.ac.id",
    },
    {
      name: "Samuel Hideaki Tangke Arung",
      role: "Laboratory Member Batch 2024",
      initials: "SH",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241062@student.its.ac.id",
    },
    {
      name: "Alfin Hadi Komarudin",
      role: "Laboratory Member Batch 2024",
      initials: "AH",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241069@student.its.ac.id",
    },
    {
      name: "Athallah Ramadhan",
      role: "Laboratory Member Batch 2024",
      initials: "AR",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241074@student.its.ac.id",
    },
    {
      name: "Fauzian Ramadhan",
      role: "Laboratory Member Batch 2024",
      initials: "FR",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241080@student.its.ac.id",
    },
    {
      name: "Anak Agung Ngurah Agung Kresna Ananta",
      role: "Laboratory Member Batch 2024",
      initials: "AA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241085@student.its.ac.id",
    },
    {
      name: "Alif Aryo Pradipto",
      role: "Laboratory Member Batch 2024",
      initials: "AA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241086@student.its.ac.id",
    },
    {
      name: "Andre Adelfi Stevena",
      role: "Laboratory Member Batch 2024",
      initials: "AA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241089@student.its.ac.id",
    },
    {
      name: "Ihsan Maulana Harjanto",
      role: "Laboratory Member Batch 2024",
      initials: "IM",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241090@student.its.ac.id",
    },
    {
      name: "Vinsen Dwi Putra",
      role: "Laboratory Member Batch 2024",
      initials: "VD",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241094@student.its.ac.id",
    },
    {
      name: "Lucky Adhi Suardhana",
      role: "Laboratory Member Batch 2024",
      initials: "LA",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      expertise: "Robotics and Intelligent Systems Research.",
      experience: [
        "Laboratory Member, B401 Robotics Laboratory (2024 – Present)",
      ],
      contact: "5024241095@student.its.ac.id",
    },
  ],
  alumniLabel: "Laboratory Alumni",
  alumni: [
    {
      name: "Itqan Fikri Assagaf",
      role: "Robotics & Intelligent Systems Alumni",
      initials: "IF",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Implementasi Klasifikasi Kantuk Menggunakan IndRNN Pada Single Board Computer"',
        "Dosen Pembimbing: Ahmad Zaini, S.T., M.Sc. & Eko Pramunanto, S.T., M.T.",
      ],
      expertise:
        "Single Board Computer, Embedded Deep Learning, IndRNN, and Computer Vision.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201008)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201008@student.its.ac.id",
    },
    {
      name: "Edward Alexander",
      role: "Service Robotics Alumni",
      initials: "EA",
      year: "2025",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Interaksi Manusia Dengan Robot Service Berbasis Estimasi Pose Pada Komputasi Terbatas"',
        "Dosen Pembimbing: Muhtadin, S.T., M.T. & Ahmad Zaini, S.T., M.Sc.",
      ],
      expertise:
        "Human-Robot Interaction, Service Robots, Pose Estimation, and Edge Computing.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2025)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201020)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2025",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201020@student.its.ac.id",
    },
    {
      name: "Faris Rafi Pramana",
      role: "Humanoid Robotics Alumni",
      initials: "FR",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Pengembangan Sistem Keseimbangan Robot Humanoid Berbasis Load Cell"',
        "Dosen Pembimbing: Muhtadin, S.T., M.T. & Dion Hayu Fandiantoro, S.T., M.Eng.",
      ],
      expertise:
        "Humanoid Balance Systems, Load Cell Feedback, Dynamic Stability, Robot Kinematics.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201004)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201004@student.its.ac.id",
    },
    {
      name: "Azzam Wildan Maulana",
      role: "Mobile Robotics Alumni",
      initials: "AW",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Kalibrasi Kamera Omnivision Pada Mobile Robot Menggunakan Machine Learning"',
        "Dosen Pembimbing: Muhtadin, S.T., M.T. & Ahmad Zaini, S.T., M.Sc.",
      ],
      expertise:
        "Omnidirectional Vision Calibration, Machine Learning, Mobile Robotics Perception.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201010)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201010@student.its.ac.id",
    },
    {
      name: "Joel Napitupulu",
      role: "Biomedical & Intelligent Systems Alumni",
      initials: "JN",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Klasifikasi Kantuk Berdasarkan Nilai Bukaan Mata (PERCLOS) Dan Nilai Bukaan Mulut (MAR) Menggunakan Skala Karolinska Dan Support Vector Machine"',
        "Dosen Pembimbing: Ahmad Zaini, S.T., M.Sc. & Eko Pramunanto, S.T., M.T.",
      ],
      expertise:
        "PERCLOS, Mouth Aspect Ratio (MAR), Support Vector Machine (SVM), Karolinska Sleepiness Scale.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201017)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201017@student.its.ac.id",
    },
    {
      name: "Hansen Ade Rioza",
      role: "Multi-Robot Systems Alumni",
      initials: "HA",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Navigasi Multi-Robot Menggunakan Greedy Heuristic Algorithm Berbasis ACO Algorithm"',
        "Dosen Pembimbing: Ahmad Zaini, S.T., M.Sc. & Muhtadin, S.T., M.T.",
      ],
      expertise:
        "Multi-Robot Navigation, Ant Colony Optimization (ACO), Greedy Heuristic Path Planning.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201030)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201030@student.its.ac.id",
    },
    {
      name: "Moses Mannuel Paliyama",
      role: "Embedded Systems Alumni",
      initials: "MP",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Pengembangan Sistem Tertanam Untuk Kontrol Robot Mentor"',
        "Dosen Pembimbing: Ahmad Zaini, S.T., M.Sc. & Ir. Hanny Budinugroho, M.T.",
      ],
      expertise:
        "Embedded Systems, Microcontroller Programming, Hardware-in-the-Loop, Mentor Robot Control.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201048)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201048@student.its.ac.id",
    },
    {
      name: "Faruq Putra Rahardjo",
      role: "Assistive Technology Alumni",
      initials: "FP",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Sistem Kendali Kursi Roda Elektrik Menggunakan Touchpad Berbasis Raspberry Pi"',
        "Dosen Pembimbing: Eko Pramunanto, S.T., M.T. & Dr. Eko Mulyanto Yuniarno, S.T., M.T.",
      ],
      expertise:
        "Raspberry Pi Embedded Control, Electric Wheelchair Interfacing, Touchpad Input Systems.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201049)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201049@student.its.ac.id",
    },
    {
      name: "Andhika Putra",
      role: "Intelligent Systems Alumni",
      initials: "AP",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Klasifikasi Kantuk Berdasarkan Skala Kantuk Karolinska Menggunakan Eye Aspect Ratio Dan Multilayer Perceptron"',
        "Dosen Pembimbing: Ahmad Zaini, S.T., M.Sc. & Eko Pramunanto, S.T., M.T.",
      ],
      expertise:
        "Eye Aspect Ratio (EAR), Multilayer Perceptron (MLP), Drowsiness Detection, Neural Networks.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201063)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201063@student.its.ac.id",
    },
    {
      name: "Muhammad Rafi Raihandika",
      role: "Swarm Robotics Alumni",
      initials: "MR",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Optimasi Kontrol Formasi Robot Swarm Dengan Markov Decision Process Menggunakan Algoritma Proximal Policy Optimization"',
        "Dosen Pembimbing: Ahmad Zaini, S.T., M.Sc. & Muhtadin, S.T., M.T.",
      ],
      expertise:
        "Swarm Robotics, Reinforcement Learning, Proximal Policy Optimization (PPO), Markov Decision Process.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201064)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201064@student.its.ac.id",
    },
    {
      name: "Aryaduta Putra Perkasa",
      role: "Robot Manipulation & AI Alumni",
      initials: "AP",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Interaksi Manusia Robot Berbasis Large Language Model Untuk Pembangkitan Action Plan Pada Robot Lengan"',
        "Dosen Pembimbing: Prof. Dr. Ir. Mauridhi Hery P., M.Eng. & Muhtadin, S.T., M.T.",
      ],
      expertise:
        "Large Language Models (LLM) for Robotics, Action Planning, Robotic Manipulator Arm.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201077)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201077@student.its.ac.id",
    },
    {
      name: "Muhammad Risyad Ibenzani",
      role: "Robotics Simulation & Systems Alumni",
      initials: "MR",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Integrasi Simulator Pada Sistem Multi-Robot Openmanipulator-X Dan UR5 Berbasis ROS Untuk Pembelajaran Robotika"',
        "Dosen Pembimbing: Prof. Dr. Ir. Mauridhi Hery P., M.Eng. & Muhtadin, S.T., M.T.",
      ],
      expertise:
        "ROS, Gazebo Simulation, OpenManipulator-X, UR5 Industrial Arm, Educational Robotics.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201043)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201043@student.its.ac.id",
    },
    {
      name: "Muhammad Rasyid Ibenzani",
      role: "Multi-Robot Systems Alumni",
      initials: "MR",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Integrasi Multi-Robot Berbasis ROS Untuk Pembelajaran Robotika"',
        "Dosen Pembimbing: Muhtadin, S.T., M.T. & Ahmad Zaini, S.T., M.Sc.",
      ],
      expertise:
        "Multi-Robot Integration, Robot Operating System (ROS), Distributed Robotic Systems.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201044)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201044@student.its.ac.id",
    },
    {
      name: "Muhammad Faris Rahmansyah",
      role: "Autonomous Aerial Vehicles Alumni",
      initials: "MF",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Deteksi Objek, Sistem Peringatan, dan Navigasi Pada Nano Drone Quadcopter Berbasis Komputer"',
        "Dosen Pembimbing: Ahmad Zaini, S.T., M.Sc. & Muhtadin, S.T., M.T.",
      ],
      expertise:
        "Nano Drone Navigation, Object Detection, Collision Warning, Autonomous UAV.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2019 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 07211940000075)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "07211940000075@student.its.ac.id",
    },
    {
      name: "Arrijal Istighfarotudzdzilal",
      role: "Web-Based Robotic Control Alumni",
      initials: "AI",
      year: "2024",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Pengembangan Sistem Kendali Dan Antarmuka Grafis Robot Mentor Berbasis Web"',
        "Dosen Pembimbing: Dr. Ahmad Zaini, S.T., M.Sc. & Ir. Hanny Budinugroho, M.T.",
      ],
      expertise:
        "Web-Based Robot Control GUI, Mentor Robot Interface, Teleoperation.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2020 – 2024)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024201059)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2024",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024201059@student.its.ac.id",
    },
    {
      name: "Mochammad Hilmi Rusydiansyah",
      role: "Legged Robotics Alumni",
      initials: "MH",
      year: "2025",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Autonomous Grasping Pada Quadruped Robot Dengan Interaksi Berbasis Task Level"',
        "Dosen Pembimbing: Muhtadin, S.T., M.T. & Prof. Dr. Ir. Mauridhi Hery P., M.Eng.",
      ],
      expertise:
        "Quadruped Robots, Autonomous Grasping, Task-Level Planning, Mobile Manipulation.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2021 – 2025)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024211008)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2025",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024211008@student.its.ac.id",
    },
    {
      name: "Fariq Javier Nugraha",
      role: "Visual-Linguistic Robotic Manipulation Alumni",
      initials: "FJ",
      year: "2025",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Pengembangan Sistem Berbasis Persepsi Visual-Linguistik Pada Robot Lengan Untuk Proses Pick-And-Place Menggunakan OVGNet"',
        "Dosen Pembimbing: Eko Pramunanto, S.T., M.T. & Muhtadin, S.T., M.T.",
      ],
      expertise:
        "Visual Grounding, OVGNet, Pick-and-Place Robotic Arm, Vision-Language Perception.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2021 – 2025)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024211010)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2025",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024211010@student.its.ac.id",
    },
    {
      name: "I Wayan Agus Darmawan",
      role: "Thermal Inspection Robotics Alumni",
      initials: "WA",
      year: "2025",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Pengembangan Robot Quadruped-Legged Untuk Estimasi Komponen Overheat Pada Gardu Induk Berbasis Kamera Termal"',
        "Dosen Pembimbing: Prof. Dr. Ir. Mauridhi Hery P., M.Eng. & Muhtadin, S.T., M.T.",
      ],
      expertise:
        "Quadruped Inspection Robot, Thermal Imaging, Overheat Component Estimation, Substation Monitoring.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2021 – 2025)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024211070)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2025",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024211070@student.its.ac.id",
    },
    {
      name: "Vincentius Gusti Putu Agung Bagus Mahendra",
      role: "LLM & Legged Locomotion Alumni",
      initials: "VG",
      year: "2025",
      education: ["S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember"],
      thesis: [
        'S1 Thesis: "Interaksi Robot Manusia Berbasis Large Language Model Untuk Pembuatan Movement Plan Pada Robot Quadrupped-Legged"',
        "Dosen Pembimbing: Muhtadin, S.T., M.T. & Ahmad Zaini, S.T., M.Sc.",
      ],
      expertise:
        "Human-Robot Interaction, LLM Movement Planning, Quadruped Gait Control.",
      experience: [
        "Researcher, B401 Robotics Laboratory (2021 – 2025)",
        "Departemen Teknik Komputer FTEIC ITS (NRP: 5024211071)",
      ],
      achievements: [
        "Published Undergraduate Thesis, Teknik Komputer ITS 2025",
        "Laboratorium Robotika dan Sistem Cerdas",
      ],
      contact: "5024211071@student.its.ac.id",
    },
  ],
  modalEducationLabel: "Education",
  modalResearchLabel: "Research Interests",
  modalThesisLabel: "Thesis",
  modalExperienceLabel: "Experience",
  modalAchievementsLabel: "Achievements",
  modalContactLabel: "Contact",
  viewAll: "View All People",
} as const;
