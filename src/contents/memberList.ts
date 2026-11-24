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
import nrfImage2 from "../assets/webp/people/NRF.webp";
import na70Image from "../assets/webp/people/Na70.webp";
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
  specialty?: string;
  initials: string;
  education?: readonly string[];
  expertise?: string;
  image?: string;
}

export const lecturers: Array<I_lecturers> = [
  {
    name: "Dr. Ahmad Zaini, S.T., M.Sc.",
    role: "Head of Laboratory",
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
  about?: string;
  year?: string;
  education?: readonly string[];
  expertise?: string;
  thesis?: readonly string[];
  experience?: readonly string[];
  achievements?: readonly string[];
  contact?: string;
  image?: string;
}

export interface I_assistant {
  name: string;
  role: string;
  initials: string;
  about?: string;
  education?: readonly string[];
  expertise?: string;
  experience?: readonly string[];
  achievements?: readonly string[];
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
    about: "A traveler in their journey...",
    image: nrfImage2,
  },
  {
    name: "Abraham Napitupulu",
    role: "Laboratory Assistant Batch 2023",
    initials: "JS",
    about: "A traveler in their journey...",
    image: na70Image,
  },
  {
    name: "Sultan Syafiq Rakan",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: rakanImage,
  },
  {
    name: "Muhammad Risang Radityatama",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: risangImage,
  },
  {
    name: "Moh. Wildan Risqi Maulidi",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: wildinImage,
  },
  {
    name: "Rafila",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: filaImage,
  },
  {
    name: "Edward Natasaputra",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: eduImage,
  },
  {
    name: "Theo Pinem Kawalisa",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: theoImage,
  },
  {
    name: "Ahmad Faiq Fawwaz",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
  },
  {
    name: "Akhmad Rizqullah",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: xnandImage,
  },
  {
    name: "Muhammad Navis Azka Atqiya",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: navisImage,
  },
  {
    name: "Nur Anisa Hidayatul Masruroh",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: nurImage,
  },
  {
    name: "Syella Akhul Khalimi",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: akhulImage,
  },
  {
    name: "Sultan Syarief Usman",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: sultanImage,
  },
  {
    name: "Fioreno Malvin T",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: malvinImage,
  },
  {
    name: "Devlin Jeychovinn Saputra",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: devlinImage,
  },
  {
    name: "Farrel Ganendra",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: palelImage,
  },
  {
    name: "Sebastian Adirian Nugraha",
    role: "Laboratory Assistant Batch 2023",
    initials: "OT",
    about: "A traveler in their journey...",
    image: rianImage,
  },
  {
    name: "Muhammad Zia Alhambra",
    role: "Laboratory Assistant Batch 2023",
    initials: "MZ",
    about: "A traveler in their journey...",
  },
  {
    name: "Muhammad Abdullah",
    role: "Laboratory Member Batch 2024",
    initials: "MA",
    about: "A traveler in their journey...",
  },
  {
    name: "Hans Jovan",
    role: "Laboratory Member Batch 2024",
    initials: "HJ",
    about: "A traveler in their journey...",
  },
  {
    name: "Mohammad Khirz El Jausyan",
    role: "Laboratory Member Batch 2024",
    initials: "MK",
    about: "A traveler in their journey...",
  },
  {
    name: "Rahmat Maulana Ansori",
    role: "Laboratory Member Batch 2024",
    initials: "RM",
    about: "A traveler in their journey...",
  },
  {
    name: "Yuke Brilliant Hestiavin",
    role: "Laboratory Member Batch 2024",
    initials: "YB",
    about: "A traveler in their journey...",
  },
  {
    name: "Faruq Awliya Labiib",
    role: "Laboratory Member Batch 2024",
    initials: "FA",
    about: "A traveler in their journey...",
  },
  {
    name: "Christopher Joenathan Hindarto",
    role: "Laboratory Member Batch 2024",
    initials: "CJ",
    about: "A traveler in their journey...",
  },
  {
    name: "Bagas Aryo Dananjoyo",
    role: "Laboratory Member Batch 2024",
    initials: "BA",
    about: "A traveler in their journey...",
  },
  {
    name: "Farhat Azzam",
    role: "Laboratory Member Batch 2024",
    initials: "FA",
    about: "A traveler in their journey...",
  },
  {
    name: "Hasya Rihadatul Aiza",
    role: "Laboratory Member Batch 2024",
    initials: "HR",
    about: "A traveler in their journey...",
  },
  {
    name: "Abrar Rafi Dwianto",
    role: "Laboratory Member Batch 2024",
    initials: "AR",
    about: "A traveler in their journey...",
  },
  {
    name: "Dhafin Ardra Madany",
    role: "Laboratory Member Batch 2024",
    initials: "DA",
    about: "A traveler in their journey...",
  },
  {
    name: "Samuel Hideaki Tangke Arung",
    role: "Laboratory Member Batch 2024",
    initials: "SH",
    about: "A traveler in their journey...",
  },
  {
    name: "Alfin Hadi Komarudin",
    role: "Laboratory Member Batch 2024",
    initials: "AH",
    about: "A traveler in their journey...",
  },
  {
    name: "Athallah Ramadhan",
    role: "Laboratory Member Batch 2024",
    initials: "AR",
    about: "A traveler in their journey...",
  },
  {
    name: "Fauzian Ramadhan",
    role: "Laboratory Member Batch 2024",
    initials: "FR",
    about: "A traveler in their journey...",
  },
  {
    name: "Anak Agung Ngurah Agung Kresna Ananta",
    role: "Laboratory Member Batch 2024",
    initials: "AA",
    about: "A traveler in their journey...",
  },
  {
    name: "Alif Aryo Pradipto",
    role: "Laboratory Member Batch 2024",
    initials: "AA",
    about: "A traveler in their journey...",
  },
  {
    name: "Andre Adelfi Stevena",
    role: "Laboratory Member Batch 2024",
    initials: "AA",
    about: "A traveler in their journey...",
  },
  {
    name: "Ihsan Maulana Harjanto",
    role: "Laboratory Member Batch 2024",
    initials: "IM",
    about: "A traveler in their journey...",
  },
  {
    name: "Vinsen Dwi Putra",
    role: "Laboratory Member Batch 2024",
    initials: "VD",
    about: "A traveler in their journey...",
  },
  {
    name: "Lucky Adhi Suardhana",
    role: "Laboratory Member Batch 2024",
    initials: "LA",
    about: "A traveler in their journey...",
  },
];

// B401 Robotics Laboratory Alumni list.
// Batch is determined by the two digits immediately following "5024" in the NIM.
// Alumni profiles are currently kept empty, except for the specified contact.
export const alumni: Array<I_alumni> = [
  {
    name: "Itqan Fikri Assagaf",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "IF",
    about:
      "IoT & Web Development | Artificial Intelligence | Machine Learning | Robotics | Problem Solver\n\nI am a fresh graduate from Sepuluh Nopember Institute of Technology with a degree in Computer Engineering. I was part of the Bangkit 2023 Batch 2 Cloud Computing Cohort. My interests include Web Development, Game Development, IoT, and Robotics. I am proficient in programming languages such as C, C++, C#, JavaScript, and Python.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/itqan-fikri/",
  },
  {
    name: "Edward Alexander",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "EA",
    about:
      "A Computer Engineering graduate from Institut Teknologi Sepuluh Nopember with a passion for technology and robotics. Through his experience as a laboratory assistant, he has developed programming skills and gained experience collaborating on technical projects. He has also been actively involved in student organizations, where he developed his management and teamwork abilities. His learning journey includes machine learning training through Bangkit Academy and TensorFlow Developer certification.",
    year: "2025",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/edward-alex/",
  },
  {
    name: "Faris Rafi Pramana",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "FR",
    about:
      "I have experience in robotics development, hardware engineering, and IoT product development. I was involved in the VI-ROSE ITS Robotics Team, where I held roles as a Mechanical Technician, Hardware Engineer, and Research and Development member. I also served as a Laboratory Assistant and Coordinator of Laboratory Assistants at B401 Robotics Laboratory. My professional experience includes IoT Product Development at XL Axiata and IoT Solutions at XLSMART, where my work involves developing IoT solution architectures and supporting product incubation. One of the projects I contributed to was X-Bright, a smart street lighting solution for smart city applications. I was also part of the VI-ROSE team that secured first place in both the regional and national KRSTI competitions in 2024.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/farisrafp/",
  },
  {
    name: "Azzam Wildan Maulana",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "AW",
    about:
      "I have gained experience in robotics programming, software development, and laboratory research through several roles at Institut Teknologi Sepuluh Nopember. As a Robotics Programmer, I worked on the RAISA-ITS project, developing its user interface. I also served as a Laboratory Research Assistant at B401 Multimedia Computing Laboratory, where my activities involved robotics projects and server management. Previously, I worked as a Laboratory Assistant at B201 Telematics Laboratory and as a Senior Programmer at IRIS ITS.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/azzam-wildan-maulana-72953a207/",
  },
  {
    name: "Joel Napitupulu",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "JN",
    about:
      "Graduate from Computer Engineering at Sepuluh Nopember Institute of Technology. I am a hardworking, disciplined, and highly motivated to explore any knowledge to be a better person. Ability to work independently or as part of a team. I am enthusiastic about learning and developing all new knowledge, especially about IoT,IT Infrastructure,Automation. worked as IT Officer in mining environment",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/joel-napitupulu-649076220/",
  },
  {
    name: "Hansen Ade Rioza",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "HA",
    about:
      "I have been involved in research on multi-robot systems and industrial automation. I co-authored a research paper on multi-robot navigation using a Greedy Heuristic Algorithm based on Ant Colony Optimization (ACO), which was presented in the CENIM 2024 proceedings. I also completed an internship at PPSDM Migas Cepu, where my assigned project focused on designing a PLC-based automation system for crude-oil filling and withdrawal processes in tanks T101 and T102.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/hansen-ade/",
  },
  {
    name: "Moses Mannuel Paliyama",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "MP",
    about:
      "I completed an internship at PT Chandra Asri, where my assigned project focused on analyzing the network infrastructure of the company's laboratory. My academic project at Institut Teknologi Sepuluh Nopember also involved developing an embedded system for controlling the Mentor Robot.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/moses-mannuel-paliyama/",
  },
  {
    name: "Faruq Putra Rahardjo",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "FP",
    about:
      "A Computer Engineering graduate from Institut Teknologi Sepuluh Nopember with a strong foundation in programming, problem-solving, and system development. He has worked on academic and personal projects involving software development, embedded systems, and data processing. Proficient in C/C++, Python, SQL, and object-oriented programming, he is interested in software engineering, system development, and IT. He values collaborative environments, continuous learning, and building technology that delivers practical impact.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/faruqpr/",
  },
  {
    name: "Andhika Putra",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "AP",
    about:
      "An IoT Engineer focused on developing reliable, production-grade industrial IoT systems, covering embedded firmware, field integration, cloud deployment, and system monitoring. He has experience building real-time water and power monitoring solutions using ESP32, cellular connectivity, MQTT, and Modbus. His technical work also includes full-stack IoT service deployment using Docker Compose, infrastructure monitoring, secure OTA firmware updates, and industrial sensor integration. He is particularly interested in developing systems that extend beyond monitoring into automation, control, and operational decision support.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/andhika-marbun/",
  },
  {
    name: "Muhammad Rafi Raihandika",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "MR",
    about:
      "I have professional experience in cybersecurity, backend development, and technical support. My experience includes working as a Bug Hunter at HackerOne, Technical Support at Kata.ai, and Backend Developer at Kamar Pelajar. I also served as a Laboratory Assistant at ITS B401 Multimedia Computing Laboratory, where I assisted students in learning digital circuit assembly, soldering, and troubleshooting. These roles have given me experience across software development, technical support, and practical laboratory activities.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/muhammad-rafi-raihandika/",
  },
  {
    name: "Aryaduta Putra Perkasa",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "AP",
    about:
      "My activities at Institut Teknologi Sepuluh Nopember have included research, student organizations, software development, and robotics projects. I served in the Research and Profession Division of HIMATEKKOM ITS, including as its secretary, and was involved in the Hydrone Team ITS as an Electrical Interface Production Intern and Staff. I also participated in the Backend Engineering Independent Study program at Ruangguru CAMP. In 2023, I was listed among ITS participants in the Pekan Ilmiah Mahasiswa Nasional (PIMNAS). My robotics research also explored the use of Large Language Models to translate natural-language commands into action plans for robotic arms.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/aryaduta-putra-perkasa/",
  },
  {
    name: "Muhammad Risyad Ibenzani",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "MR",
    about:
      "I have experience in software testing, robotics simulation, and interactive application development. I completed a Test Management internship at CIMB Niaga, working in the Daily Operational ITTM Environment Control area. My project experience includes developing a 4D virtual reality game as a Hardware Designer and Programmer, as well as building a Dobot Magician robotic arm system for color-based pick-and-place using OpenCV. I also worked on a ROS-based multi-robot simulation integrating OpenManipulator-X and UR5 for robotics learning. In addition, I completed RevoU's Data Analytics Mini Course in 2025.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/muhammad-risyad-ibenzani-975717220/",
  },
  {
    name: "Muhammad Rasyid Ibenzani",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "MR",
    about:
      "A Computer Engineering graduate from Institut Teknologi Sepuluh Nopember with experience as a VR Game Programmer at M-Knows Consulting. His technical background includes C, C++, Python, ROS, Unity, and Blender, which he has applied in game development and interactive digital projects. He describes himself as adaptable and comfortable working in teams, while also pursuing freelance artistic work alongside his technical interests.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/mhdrasyid/",
  },
  {
    name: "Muhammad Faris Rahmansyah",
    role: "Alumni Lab Assistant",
    initials: "MF",
    about:
      "I have experience in educational technology and embedded robotics projects. During my internship at the Multimedia and Internet of Things Laboratory at ITS, I was involved in a project introducing analog robots as learning materials for elementary school students. I also developed an indoor nano-drone project using the Crazyflie 2.1 and AI-deck 1.1 for image acquisition and object detection. The system integrated PID-based drone control, YOLOv5, OpenCV, and an ESP32-based warning mechanism.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/rahmansyahfaris/",
  },
  {
    name: "Arrijal Istighfarotudzdzilal",
    role: "Alumni Lab Assistant Batch 2020",
    initials: "AI",
    about:
      "I have been involved in developing software interfaces for robotic systems, particularly the Mentor Robot at Institut Teknologi Sepuluh Nopember. I co-authored a research contribution on revitalizing the Mentor Robot through a web-based real-time interface and 3D visualization. The project used Next.js, WebSocket communication, and Three.js to provide manual and sequence control modes, live status monitoring, and synchronized 3D visualization. I also participated in an internship program at PT Disty Teknologi Indonesia.",
    year: "2024",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/arrijal-ifal/",
  },
  {
    name: "Mochammad Hilmi Rusydiansyah",
    role: "Alumni Lab Assistant Batch 2021",
    initials: "MH",
    about:
      "A Computer Engineering graduate from Institut Teknologi Sepuluh Nopember with a strong foundation in robotics, IoT, and embedded systems. He has hands-on experience developing autonomous navigation systems for UAVs and quadruped robots, as well as manipulation systems for robotic arms. His technical interests also include robot perception using LiDAR and computer vision. He is passionate about robotics, artificial intelligence, and automation, with a focus on applying intelligent technologies to practical, real-world problems.",
    year: "2025",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/mhilmir/",
  },
  {
    name: "Fariq Javier Nugraha",
    role: "Alumni Lab Assistant Batch 2021",
    initials: "FJ",
    about: "A traveler in their journey...",
    year: "2025",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/fariqjavier/",
  },
  {
    name: "I Wayan Agus Darmawan",
    role: "Alumni Lab Assistant Batch 2021",
    initials: "WA",
    about:
      "I work as a Robotics Engineer at PT Ezra Robotics Teknologi, with previous experience as a Robotics Software Engineer at iCar ITS, a Research Mentor at ASEEC Education, and a Laboratory Assistant at B401 Robotics Laboratory. I have worked on several robotics and software projects, including Pashupati and NETRA for autonomous quadruped patrol and inspection, PASUPASASTRA for multi-drone command and monitoring, and Proteus V2, an autonomous surface vessel developed with Barunastra ITS. I led the ROS workspace for Proteus V2, which contributed to the team's Grand Champion achievement at the International Roboboat Competition 2023. Other recognitions include first place in the Unmanned Water Vessel category at KKI 2023 and second place in Design Documentation at IRC 2023.",
    year: "2025",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/agusdarmawnn/",
  },
  {
    name: "Vincentius Gusti Putu Agung Bagus Mahendra",
    role: "Alumni Lab Assistant Batch 2021",
    initials: "VG",
    about:
      "I have experience in robotics, embedded systems, IoT product development, and software engineering. I previously served as Head Coordinator of B401 Robotics Laboratory and worked as a Programmer in the VTOL Division of Bayucaraka UAV Research Team, applying ROS and computer vision to drone development. During my internship at PT XL Axiata's X-Camp, I contributed to the development of AIoT products, including a 5G-based delivery drone, BTS energy monitoring, construction-site safety detection, crowd counting, and road damage analysis. I also worked as a Senior Frontend Developer for the MAGE 9 event website and currently work as a Core Engineer at Huawei Indonesia. My competition experience includes achievements at the Singapore Amazing Flying Machine Competition 2023 and FIRA AIR Simulcup 2022.",
    year: "2025",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/vincentius-mahendra/",
  },
  {
    name: "Yohana Magdalena Franklin Harianja",
    role: "Alumni Lab Assistant Batch 2022",
    initials: "YH",
    about:
      "I was a core member of the VI-ROSE ITS Robotics Team, which won first place in both the regional and national Kontes Robot Seni Tari Indonesia (KRSTI) in 2024. As part of the team, I was involved in the development and preparation of a humanoid dance robot for the competition, where stability, reliable robot components, and coordinated movements were important to the team's performance. My academic work also explored the use of Vision-Language Models for robotic object retrieval in cluttered environments using a collaborative UR5 robot.",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/yohana-harianja/",
  },
  {
    name: "Muhammad Habib Abdullah",
    role: "Alumni Lab Assistant Batch 2022",
    initials: "MH",
    about: "A traveler in their journey...",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/muhammad-habib-abdullah-428445291/",
  },
  {
    name: "Tabitha Natasya Cyntia Dewi",
    role: "Alumni Lab Assistant Batch 2022",
    initials: "TD",
    about: "A traveler in their journey...",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "",
  },
  {
    name: "Muhamad Rizano Alamsyah",
    role: "Alumni Lab Assistant Batch 2022",
    initials: "MR",
    about:
      "A Computer Engineering student passionate about developing software that connects intelligent systems with real-world applications. His experience includes building scalable backend services, AI-powered applications, full-stack web platforms, and robotics software across academic, research, and industry projects. He is familiar with the software development lifecycle, including system architecture, API design, frontend development, AI integration, and deployment. He is particularly interested in distributed systems, artificial intelligence, and robotics, while continuously developing his capabilities as a software engineer.",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/muhamad-rizano-alamsyah-414b12241/",
  },
  {
    name: "Cedric Anthony Edysa",
    role: "Alumni Lab Assistant Batch 2022",
    initials: "CA",
    about:
      "A Computer Engineering student at Institut Teknologi Sepuluh Nopember with a strong interest in developing meaningful and impactful technological solutions. He has experience working on diverse projects and programming in multiple languages. He approaches new challenges with curiosity and a willingness to explore innovative ideas, while emphasizing continuous learning and making positive contributions through technology.",
    education: [],
    thesis: [],
    expertise: "",
    experience: [],
    achievements: [],
    contact: "https://www.linkedin.com/in/cedric-anthony/",
  },
];