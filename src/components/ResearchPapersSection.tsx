import { alumni, assistants, lecturers } from "../contents/memberList";

interface ResearchPaper {
  title: string;
  year: number;
  authors: string;
  affiliations?: string[];
  category: string;
  venue: string;
  description: string;
  url: string;
  linkLabel: string;
}

const computerEngineeringAffiliation = [
  "Department of Computer Engineering, Institut Teknologi Sepuluh Nopember",
];

const researchPapers: ResearchPaper[] = [
  // ============================================================
  // 2026
  // ============================================================
  {
    title:
      "Augmented Reality as Contextual Support in Puzzle-Based Technical Simulation",
    year: 2026,
    authors:
      "Tri Ika Jaya Kusumawati, Mauridhi Hery Purnomo, Reza Fuad Rachmadi",
    affiliations: computerEngineeringAffiliation,
    category: "Augmented Reality",
    venue: "ISITIA 2026",
    description:
      "Explores augmented reality as contextual support for puzzle-based technical simulations, including the observation of user interaction and procedural behavior.",
    url: "https://scholar.its.ac.id/en/publications/augmented-reality-as-contextual-support-in-puzzle-based-technical/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "A Hybrid Computing Framework for LLM-Based Human-Robot Interaction: Generating Action Plans for Robotic Arms",
    year: 2026,
    authors:
      "Muhtadin, I. Ketut Eddy Purnama, Aryaduta Putra Perkasa, Imamah, Chastine Fatichah, Mauridhi Hery Purnomo",
    affiliations: computerEngineeringAffiliation,
    category: "Human-Robot Interaction",
    venue: "International Journal of Intelligent Engineering and Systems",
    description:
      "Combines high-performance and low-performance computers to run an LLM-based interaction framework for robotic arms. The system translates voice instructions into structured robot action plans.",
    url: "https://oaji.net/articles/2026/3603-1776493307.pdf",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Wireless Center of Pressure Feedback System for Humanoid Robot Balance Control Using ESP32-C3",
    year: 2026,
    authors:
      "Muhtadin, Faris Rafi Pramana, Dion Hayu Fandiantoro, Moh Ismarintan Zazuli, Atar Fuady Babgei",
    category: "Humanoid Robotics",
    venue: "International Conference on Artificial Intelligence in Information and Communication (ICAIIC 2026)",
    description:
      "Develops a wireless center-of-pressure feedback system using four load cells and an ESP32-C3 for humanoid robot balance control. The system uses PID feedback to improve stability during single-leg lifting.",
    url: "https://arxiv.org/abs/2512.21219",
    linkLabel: "Open arXiv",
  },
  {
    title:
      "BioPose-Based 3D Kinematic Feature Fusion for Multi-Person Abnormal Behavior Recognition in Skeleton-Based Video Analysis",
    year: 2026,
    authors:
      "Sofia Ariyani, Eko Mulyanto Yuniarno, Mauridhi Hery Purnomo",
    category: "Computer Vision",
    venue: "International Journal of Intelligent Engineering and Systems",
    description:
      "Uses biomechanically constrained 3D pose estimation and kinematic feature fusion to improve abnormal behavior recognition from multi-person skeleton data.",
    url: "https://scholar.its.ac.id/en/publications/biopose-based-3d-kinematic-feature-fusion-for-multi-person-abnorm/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "A Digital Microscopy System and New Sputum Dataset for Deep Learning-Based Tuberculosis Detection",
    year: 2026,
    authors:
      "Sari Ayu Wulandari, Feby Artwodini Muqtadiroh, Eko Mulyanto Yuniarno, I. Ketut Eddy Purnama, Mauridhi Hery Purnomo",
    category: "Deep Learning",
    venue: "International Journal of Intelligent Engineering and Systems",
    description:
      "Presents a digital microscopy system and sputum image dataset for deep learning-based tuberculosis detection.",
    url: "https://inass.org/wp-content/uploads/2025/10/2026033127-1.pdf",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Advancing Abnormal Human Activity Recognition through Fused Heuristic Deep Learning and 3D Joint Angle Orientation Analysis",
    year: 2026,
    authors:
      "Sofia Ariyani, Eko Mulyanto Yuniarno, Mauridhi Hery Purnomo",
    category: "Artificial Intelligence",
    venue: "International Journal of Intelligent Engineering and Systems",
    description:
      "Combines deep learning with 3D joint-angle analysis and heuristic reasoning to recognize abnormal human activities.",
    url: "https://scholar.its.ac.id/en/publications/advancing-abnormal-human-activity-recognition-through-fused-heuri/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Curvature Entropy Enhanced Principal Component Analysis for 3D LiDAR Human Head Segmentation",
    year: 2026,
    authors:
      "Muhtadin, I. Ketut Eddy Purnama, Nova Eka Budiyanta, Hanugra Aulia Sidharta, Mauridhi Hery Purnomo",
    category: "3D LiDAR",
    venue: "Engineering, Technology and Applied Science Research",
    description:
      "Introduces a curvature-entropy-enhanced PCA approach for segmenting human heads from 3D LiDAR point clouds.",
    url: "https://etasr.com/index.php/ETASR/article/view/17551",
    linkLabel: "Journal Page",
  },

  // ============================================================
  // 2025
  // ============================================================
  {
    title:
      "Behavioral Biometric-Based Human Identification from 3D Skeletal Motion Using Convolutional Neural Networks",
    year: 2025,
    authors: "Endang Sri Rahayu, Mauridhi Hery Purnomo",
    affiliations: computerEngineeringAffiliation,
    category: "Computer Vision",
    venue: "Engineering, Technology and Applied Science Research",
    description:
      "Investigates human identification using spatial and temporal features extracted from 3D skeletal motion.",
    url: "https://etasr.com/index.php/ETASR/article/download/12883/5775/70284",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Autonomous Grasping on Quadruped Robot with Task Level Interaction",
    year: 2025,
    authors:
      "Muhtadin, Mochammad Hilmi Rusydiansyah, Mauridhi Hery Purnomo, I. Ketut Eddy Purnama, Chastine Fatichah",
    category: "Robotic Manipulation",
    venue: "CENIM 2025",
    description:
      "Integrates a robotic arm, gripper, ROS-based control architecture, object detection, and task-level interaction to enable autonomous grasping on a quadruped robot.",
    url: "https://doi.org/10.1109/CENIM67940.2025.11326444",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title:
      "Quadrupped-Legged Robot Movement Plan Generation using Large Language Model",
    year: 2025,
    authors:
      "Muhtadin, V. G. A. B. M. Putu, Ahmad Zaini, Mauridhi Hery Purnomo, I. Ketut Eddy Purnama, Chastine Fatichah",
    category: "LLM & Robotics",
    venue: "CENIM 2025",
    description:
      "Explores the use of large language models to translate natural-language instructions into movement plans for a quadruped robot.",
    url: "https://arxiv.org/abs/2512.21293",
    linkLabel: "Open arXiv",
  },
  {
    title:
      "Web-Based Real-Time Interface and 3D Visualization for Revitalizing the Mentor Robot",
    year: 2025,
    authors:
      "Ahmad Zaini, Arrijal Istighfarotudzdzilal, Hany Boedinugroho, Eko Mulyanto Yuniarno",
    category: "Robotics Software",
    venue: "CENIM 2025",
    description:
      "Develops a web-based interface using WebSocket communication and Three.js visualization for real-time monitoring and control of the Mentor robotic manipulator.",
    url: "https://doi.org/10.1109/CENIM67940.2025.11326307",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title:
      "Neural Network-Based Ball Trajectory Control of Solenoid Kickers for Autonomous Soccer Robots",
    year: 2025,
    authors:
      "Muhammad Raihan Ramadhan, Azzam Wildan Maulana, Muhammad Navis Azka Atqiya, Rudy Dikairono, Ahmad Zaini, Mauridhi Hery Purnomo",
    category: "Robot Motion Control",
    venue: "ISITIA 2025",
    description:
      "Uses a multilayer perceptron to predict solenoid kicker height for an autonomous soccer robot, with a compact lookup-table implementation for real-time control.",
    url: "https://iris.its.ac.id/files/publications/Neural_Network-Based_Ball_Trajectory_Control_of_Solenoid_Kickers_for_Autonomous_Soccer_Robots.pdf",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Hand Gesture Recognition for Collaborative Robots Using Lightweight Deep Learning in Real-Time Robotic Systems",
    year: 2025,
    authors:
      "Muhtadin, I. Wayan Agus Darmawan, Mochammad Hilmi Rusydiansyah, I. Ketut Eddy Purnama, Chastine Fatichah, Mauridhi Hery Purnomo",
    category: "Human-Robot Interaction",
    venue: "ISITIA 2025",
    description:
      "Applies lightweight deep learning to recognize hand gestures for real-time interaction with collaborative robots.",
    url: "https://arxiv.org/abs/2507.10055",
    linkLabel: "Open arXiv",
  },
  {
    title:
      "Drowsiness Classification Using ResNet50 and Time Series Transformer Based on Blink Pattern Features",
    year: 2025,
    authors:
      "Ahmad Zaini, I. Ketut Eddy Purnama, Yoyon Kusnendar Suprapto, Eko Mulyanto Yuniarno",
    affiliations: computerEngineeringAffiliation,
    category: "Computer Vision",
    venue: "International Journal of Intelligent Engineering and Systems",
    description:
      "Combines ResNet50 and a time-series Transformer to classify drowsiness using statistical and temporal features extracted from eye-blink patterns.",
    url: "https://inass.org/wp-content/uploads/2024/10/2025022971-2.pdf",
    linkLabel: "Open PDF",
  },

  // ============================================================
  // 2024
  // ============================================================
  {
    title: "Omnivision Calibration on Mobile Robot Using Machine Learning",
    year: 2024,
    authors:
      "Muhtadin, Azzam Wildan Maulana, Rudy Dikairono, Ahmad Zaini",
    affiliations: computerEngineeringAffiliation,
    category: "Mobile Robotics",
    venue: "CENIM 2024",
    description:
      "Uses a multilayer perceptron and lookup-table implementation to calibrate an omnidirectional camera on a mobile robot, improving camera interpretation despite installation and orientation errors.",
    url: "https://iris.its.ac.id/files/publications/Omnivision_Calibration_on_Mobile_Robot_Using_Machine_Learning.pdf",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Multi-Robot Navigation Uses the Greedy Heuristic Algorithm Based on the ACO Algorithm",
    year: 2024,
    authors: "Ahmad Zaini, Muhtadin, Hansen Ade Rioza",
    category: "Multi-Robot Systems",
    venue: "CENIM 2024",
    description:
      "Investigates a greedy heuristic approach combined with ant colony optimization for multi-robot navigation.",
    url: "https://scholar.its.ac.id/en/publications/multi-robot-navigation-uses-the-greedy-heuristic-algorithm-based-/",
    linkLabel: "ITS Research Record",
  },
  {
    title: "Sensor Fusion System for Localization of Autonomous Car",
    year: 2024,
    authors:
      "Moh Ismarintan Zazuli, Rudy Dikairono, Djoko Purwanto, Muhtadin, Muhammad Lukman Hakim",
    affiliations: computerEngineeringAffiliation,
    category: "Autonomous Systems",
    venue: "GECOST 2024",
    description:
      "Investigates sensor fusion for localization in autonomous vehicles.",
    url: "https://scholar.its.ac.id/en/publications/sensor-fusion-system-for-localization-of-autonomous-car/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Automated LiDAR-Based Dataset Labelling Method for Road Image Segmentation in Autonomous Vehicles",
    year: 2024,
    authors:
      "Pandu Surya Tantra, Rudy Dikairono, Hendra Kusuma, Muhtadin, Tasripan",
    affiliations: computerEngineeringAffiliation,
    category: "LiDAR & Computer Vision",
    venue: "GECOST 2024",
    description:
      "Develops an automated LiDAR-based labelling approach to support road-scene image segmentation for autonomous vehicles.",
    url: "https://scholar.its.ac.id/en/publications/automated-lidar-based-dataset-labelling-method-for-road-image-seg/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Pengembangan Dead Reckoning Berbasis Multilayer Perceptron (MLP) yang Diimplementasikan di Raspberry Pi Pico",
    year: 2024,
    authors:
      "Gagah Putra Haryo Satrio, Dion Hayu Fandiantoro, Hany Boedinugroho",
    category: "Embedded Systems & Robotics",
    venue: "Jurnal Teknik ITS",
    description:
      "Implements an MLP-based dead-reckoning approach using IMU sensor data on a Raspberry Pi Pico for position estimation in mobile robots.",
    url: "https://doi.org/10.12962/j23373539.v13i1.126444",
    linkLabel: "DOI / Journal Page",
  },

  // ============================================================
  // 2023
  // ============================================================
  {
    title:
      "Assistive Robot Manipulator Pose Prediction Based on Object Orientation Using CNN",
    year: 2023,
    authors:
      "Nuryono S. Widodo, Eko Mulyanto Yuniarno, Mauridhi Hery Purnomo, Ronny Mardiyanto",
    affiliations: computerEngineeringAffiliation,
    category: "Robotic Manipulation",
    venue: "ISITIA 2023",
    description:
      "Predicts robotic manipulator poses from object orientation images using a convolutional neural network, supporting visual perception and object manipulation.",
    url: "https://eprints.uad.ac.id/47452/2/2023166942%28paperID-1570895245%29.pdf",
    linkLabel: "Open PDF",
  },
  {
    title:
      "ARKOMA Dataset: An Open-Source Dataset to Develop Neural Networks-Based Inverse Kinematics Model for NAO Robot Arms",
    year: 2023,
    authors:
      "Arif Nugroho, Eko Mulyanto Yuniarno, Mauridhi Hery Purnomo",
    affiliations: computerEngineeringAffiliation,
    category: "Robotics & Dataset",
    venue: "Data in Brief, Volume 51",
    description:
      "Introduces an open-source dataset for developing neural-network-based inverse kinematics models for NAO humanoid robot arms.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10661839/",
    linkLabel: "Open Access",
  },
  {
    title:
      "Fruit Recognition Through Active Grasping of Two-Fingered Gripper Using a Soft Skin Sensor",
    year: 2023,
    authors:
      "Oka Mahendra, Muhammad Arifin, Rian Putra Pratama, Aris Munandar, Catur Hilman A.H.B. Baskoro, Lista Eka Yulianti, Indra Sakti, Muhtadin",
    affiliations: computerEngineeringAffiliation,
    category: "Robotic Manipulation",
    venue: "ICRAMET 2023",
    description:
      "Explores fruit recognition during active grasping using a two-fingered gripper equipped with a soft tactile sensor.",
    url: "https://scholar.its.ac.id/en/publications/fruit-recognition-through-active-grasping-of-two-fingered-gripper/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "An Open-Source Parallel Gripper with an Embedded Soft Skin Fingertip Sensor",
    year: 2023,
    authors:
      "Muhammad Arifin, Rian Putra Pratama, Oka Mahendra, Aris Munandar, Muhtadin et al.",
    category: "Robotic Manipulation",
    venue: "Mechanical Engineering for Society",
    description:
      "Presents an open-source parallel gripper with embedded soft tactile sensors at the fingertips to support safer robotic grasping.",
    url: "https://mev.brin.go.id/mev/article/download/841/452",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Deep Reinforcement Learning Control Strategy at Roundabout for i-CAR Autonomous Car",
    year: 2023,
    authors:
      "Muhtadin, Muhammad Roychan Meliaz, Rudy Dikairono, I. Ketut Eddy Purnama, Mauridhi Hery Purnomo",
    affiliations: computerEngineeringAffiliation,
    category: "Reinforcement Learning",
    venue: "ISITIA 2023",
    description:
      "Investigates a deep reinforcement learning control strategy for autonomous vehicle navigation at roundabouts.",
    url: "https://doi.org/10.1109/ISITIA59021.2023.10221077",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title: "Nano Quadcopter for Autonomous Heat Source Detection",
    year: 2023,
    authors:
      "Egar Pambudi, Atar Fuady Babgei, Mohamad Abdul Hady, Rudy Dikairono",
    affiliations: computerEngineeringAffiliation,
    category: "Autonomous Systems",
    venue: "ISITIA 2023",
    description:
      "Develops a nano-quadcopter-based heat source detection system using thermal sensor arrays for indoor inspection applications.",
    url: "https://scholar.its.ac.id/en/publications/nano-quadcopter-for-autonomous-heat-source-detection/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Development of Inter-Vehicle Communication for Electric Bus",
    year: 2023,
    authors:
      "Dimas Fajar Uman Putra, Imam Wahyudi Farid, Vicky Andria Kusuma, Atar Fuady Babgei et al.",
    category: "Connected Vehicles",
    venue: "ISITIA 2023",
    description:
      "Presents an inter-vehicle communication system for electric buses.",
    url: "https://scholar.its.ac.id/en/publications/development-of-inter-vehicle-communication-for-electric-bus/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "An Improved Performance of the Designed Robotic Motion Control for NAO Robot Arms Using Hybrid Neural Network-Jacobian",
    year: 2023,
    authors:
      "Arif Nugroho, Eko Mulyanto Yuniarno, Mauridhi Hery Purnomo",
    category: "Robot Motion Control",
    venue: "International Journal of Intelligent Engineering and Systems",
    description:
      "Combines a neural network and Jacobian-based approach for inverse kinematics and improved motion control of NAO robot arms.",
    url: "https://inass.org/wp-content/uploads/2023/06/2023103145-2.pdf",
    linkLabel: "Open PDF",
  },

  // ============================================================
  // 2022
  // ============================================================
  {
    title:
      "Analisis Photoplethysmography Jarak Jauh dalam Berbagai Kondisi Pencahayaan",
    year: 2022,
    authors:
      "Atar Fuady Babgei, Muhammad Wikan Sasongko, Tri Arief Sardjono",
    affiliations: computerEngineeringAffiliation,
    category: "Biomedical Signal Processing",
    venue: "Indonesian Journal of Electronics and Instrumentation Systems",
    description:
      "Investigates remote photoplethysmography for heart-rate estimation under varying lighting conditions using image-based measurements.",
    url: "https://journal.ugm.ac.id/ijeis/article/download/78715/34998",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Virtual Reality Application for Co-Bot Training",
    year: 2022,
    authors:
      "Amma Liesvarastranta Haz, Muhtadin, I. Ketut Eddy Purnama, Mauridhi Hery Purnomo, Sritrusta Sukaridhoto",
    affiliations: computerEngineeringAffiliation,
    category: "Human-Robot Interaction",
    venue: "International Electronics Symposium (IES 2022)",
    description:
      "Presents a virtual-reality training environment for human-cobot interaction. The system simulates furniture assembly and implements robot path finding to follow and approach users.",
    url: "https://ies.pens.ac.id/2022/wp-content/uploads/2022/08/Program-Book-IES-2022.pdf",
    linkLabel: "Program Book / Abstract",
  },
  {
    title:
      "Path Planning Based on Deep Reinforcement Learning Towards Human-Robot Collaboration",
    year: 2022,
    authors:
      "Rokhmat Febrianto, Muhtadin, I. Ketut Eddy Purnama, Mauridhi Hery Purnomo",
    affiliations: computerEngineeringAffiliation,
    category: "Human-Robot Collaboration",
    venue: "International Electronics Symposium 2022",
    description:
      "Investigates deep reinforcement learning for visual-based path planning in environments involving human-robot collaboration.",
    url: "https://scholar.its.ac.id/en/publications/path-planning-based-on-deep-reinforcement-learning-towards-human-/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Design of Fuzzy-PI Controller for Shoulder Exoskeleton with Motoric Progress of Rehabilitation Subject Consideration",
    year: 2022,
    authors:
      "Khansa Nur Habiba, Achmad Arifin, Atar Fuady Babgei, Andra Risciawan, Moh Ismarintan Zazuli",
    category: "Rehabilitation Robotics",
    venue: "CENIM 2022",
    description:
      "Develops a Fuzzy-PI controller for shoulder exoskeleton movement, considering the rehabilitation subject's motoric progress.",
    url: "https://scholar.its.ac.id/en/publications/design-of-fuzzy-pi-controller-for-shoulder-exoskeleton-with-motor/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Design of Teleconsultation System with Artificial Intelligence Based Chatbot Using Docker Platform",
    year: 2022,
    authors:
      "Norma Hermawan, Atar Fuady Babgei, Salsanabilah",
    category: "Artificial Intelligence",
    venue: "CENIM 2022",
    description:
      "Presents a Docker-based teleconsultation platform with an AI chatbot for consultation workflows and disease information.",
    url: "https://scholar.its.ac.id/en/publications/design-of-teleconsultation-system-with-artificial-intelligence-ba/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Leak Detection Using Non-Intrusive Ultrasonic Water Flowmeter Sensor in Water Distribution Networks",
    year: 2022,
    authors:
      "Ary Mazharuddin Shiddiqi, Muhammad Baihaqi, Atar Fuady Babgei",
    category: "Sensors & Instrumentation",
    venue: "IC3INA 2022",
    description:
      "Investigates non-intrusive ultrasonic flow measurement for detecting leaks in water distribution networks.",
    url: "https://doi.org/10.1145/3575882.3575943",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title:
      "Implementation of MTCNN Facial Feature Extraction on Sleepiness Scale Classification Using CNN",
    year: 2022,
    authors:
      "A. M. Putra, Ahmad Zaini, Eko Pramunanto",
    category: "Computer Vision",
    venue: "CENIM 2022",
    description:
      "Combines MTCNN facial feature extraction and CNN classification to assess sleepiness levels.",
    url: "https://doi.org/10.1109/CENIM56801.2022.10037269",
    linkLabel: "DOI / Publisher Page",
  },

  // ============================================================
  // 2021
  // ============================================================
  {
    title:
      "Multi-input Multi-output Fuzzy Logic Controller for Hybrid Exoskeleton and Functional Electrical Stimulation for Hand Movements Rehabilitation of Hemiparesis Patients",
    year: 2021,
    authors:
      "Danar Agnanto, Achmad Arifin, Atar Fuady Babgei",
    affiliations: computerEngineeringAffiliation,
    category: "Rehabilitation Robotics",
    venue: "ISITIA 2021",
    description:
      "Develops a multiple-input multiple-output fuzzy logic controller to integrate soft-exoskeleton actuation and functional electrical stimulation for hand rehabilitation.",
    url: "https://doi.org/10.1109/ISITIA52817.2021.9502200",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title:
      "Design of Elbow Exoskeleton with Wireless System Control for Post Stroke Flexion-Extension Rehabilitation",
    year: 2021,
    authors:
      "L. Asna Safira, A. Arifin, Atar Fuady Babgei, E. A. Suprayitno",
    category: "Rehabilitation Robotics",
    venue: "BioSMART 2021",
    description:
      "Presents an elbow exoskeleton with wireless control for flexion-extension rehabilitation after stroke.",
    url: "https://doi.org/10.1109/BioSMART54244.2021.9677764",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title:
      "Robotic Hand Exoskeleton with Tactile Force Feedback for Post-Stroke Spasticity Rehabilitation",
    year: 2021,
    authors: "Hanan Yumna, Achmad Arifin, Atar Fuady Babgei",
    category: "Rehabilitation Robotics",
    venue: "ISITIA 2021",
    description:
      "Investigates a robotic hand exoskeleton with tactile force feedback for post-stroke spasticity rehabilitation.",
    url: "https://doi.org/10.1109/ISITIA52817.2021.9502261",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title:
      "Pembuatan Modul Deteksi Objek Manusia Menggunakan Metode YOLO untuk Mobile Robot",
    year: 2021,
    authors:
      "Khairunnas, Eko Mulyanto Yuniarno, Ahmad Zaini",
    category: "Computer Vision & Robotics",
    venue: "Jurnal Teknik ITS",
    description:
      "Develops a YOLO-based human detection module to support human-following functionality in mobile robots.",
    url: "https://ejurnal.its.ac.id/index.php/teknik/article/download/61622/6647",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Deteksi Kedipan dengan Metode CNN dan Percentage of Eyelid Closure (PERCLOS)",
    year: 2021,
    authors:
      "Lutfi Ananditya Septiandi, Eko Mulyanto Yuniarno, Ahmad Zaini",
    category: "Computer Vision",
    venue: "Jurnal Teknik ITS",
    description:
      "Uses CNN and PERCLOS to detect eye blinking as part of a visual monitoring approach.",
    url: "https://ejurnal.its.ac.id/index.php/teknik/article/download/61174/6648",
    linkLabel: "Open PDF",
  },
  {
    title:
      "Perhitungan Frekuensi Kedipan Mata Berbasis Convolutional Neural Network",
    year: 2021,
    authors:
      "Atyantagratia Vidyasmara Daryanto, Eko Mulyanto Yuniarno, Ahmad Zaini",
    category: "Computer Vision",
    venue: "Jurnal Teknik ITS",
    description:
      "Applies a convolutional neural network to estimate eye-blink frequency from visual data.",
    url: "https://ejurnal.its.ac.id/index.php/teknik/article/download/61937/6642",
    linkLabel: "Open PDF",
  },

  // ============================================================
  // 2020
  // ============================================================
  {
    title:
      "Building an Unmanned Aerial Vehicle for Humanitarian Aid Delivery",
    year: 2020,
    authors:
      "Atar Fuady Babgei, Heri Suryoatmojo",
    category: "Autonomous Systems",
    venue: "Indonesian Journal of Electronics and Instrumentation Systems",
    description:
      "Presents the design and development of a UAV for delivering humanitarian supplies to areas affected by emergencies and infrastructure damage.",
    url: "https://journal.ugm.ac.id/ijeis/article/view/55144",
    linkLabel: "Journal Page",
  },
  {
    title:
      "Real-Time Train Speed Prediction Using IP-Camera Based on Time Difference",
    year: 2020,
    authors:
      "Eko Pramunanto, Eko Mulyanto Yuniarno, Arifandi Putrawardana",
    category: "Computer Vision",
    venue: "CENIM 2020",
    description:
      "Uses IP-camera image sequences to detect trains and estimate their speed from the time difference between captured frames.",
    url: "https://scholar.its.ac.id/en/publications/real-time-train-speed-prediction-using-ip-camera-based-on-time-di/",
    linkLabel: "ITS Research Record",
  },

  // ============================================================
  // 2019
  // ============================================================
  {
    title:
      "Autonomous Navigation and Obstacle Avoidance for Service Robot",
    year: 2019,
    authors:
      "Muhtadin, Raden Marwan Zanuar, I. Ketut Eddy Purnama, Mauridhi Hery Purnomo",
    affiliations: computerEngineeringAffiliation,
    category: "Service Robotics",
    venue: "CENIM 2019",
    description:
      "Develops autonomous navigation for service robots using RTAB-Map for mapping and localization, A* for path planning, and Dynamic Window Approach for obstacle avoidance.",
    url: "https://doi.org/10.1109/CENIM48368.2019.8973360",
    linkLabel: "DOI / Publisher Page",
  },
  {
    title:
      "Ichiro Robots Winning RoboCup 2018 Humanoid TeenSize Soccer Competitions",
    year: 2019,
    authors:
      "Muhtadin, Muhammad Reza Arrazi, Sulaiman Ali, Tommy Pratama, Dhany Satrio Wicaksono, Ahmad Hernando Pradanatta Putra, I. Made Pande Ari, Alfi Maulana, Oktaviansyah Purwo Bramastyo, Syifaul Qolby Asshakina, Muhammad Attamimi, Muhammad Arifin, Mauridhi Hery Purnomo, Djoko Purwanto",
    affiliations: computerEngineeringAffiliation,
    category: "Humanoid Robotics",
    venue: "RoboCup 2018: Robot World Cup XXII, Springer Lecture Notes in Computer Science",
    description:
      "Describes the mechanical design, algorithms, and robotic behaviors of the ITS Ichiro humanoid robot team during the RoboCup TeenSize competition, where the team won four awards.",
    url: "https://doi.org/10.1007/978-3-030-27544-0_35",
    linkLabel: "DOI / Springer",
  },
  {
    title:
      "Integrated Smart Safety Home System Based on Wireless Sensor Network and Internet of Things as Emergency Preventive Efforts in Settlement Areas",
    year: 2019,
    authors:
      "Eko Pramunanto, Muhtadin, William Febrian",
    category: "IoT & Sensor Networks",
    venue: "CENIM 2019",
    description:
      "Integrates fire, gas, and motion sensors with a wireless monitoring system to provide notifications about household emergency conditions.",
    url: "https://scholar.its.ac.id/en/publications/integrated-smart-safety-home-system-based-on-wireless-sensor-netw/",
    linkLabel: "ITS Research Record",
  },
  {
    title:
      "Prototype of Driving Behavior Monitoring System Using Naïve Bayes Classification Method",
    year: 2019,
    authors:
      "Eko Pramunanto, Ahmad Zaini, Vathya Rizkiana",
    category: "Intelligent Transportation",
    venue: "CENIM 2019",
    description:
      "Classifies driving behavior into defensive, normal, and aggressive categories using event detection and Naïve Bayes classification.",
    url: "https://doi.org/10.1109/CENIM48368.2019.8973232",
    linkLabel: "DOI / Publisher Page",
  },

  // ============================================================
  // 2018
  // ============================================================
  {
    title:
      "Coast Panic: Emergency Situation Monitoring System on West and East Sailing Lane of Surabaya Using LoRaWAN Technology",
    year: 2018,
    authors:
      "Eko Pramunanto, M. Ulfa, A. Kurniawan",
    category: "IoT & Communication Systems",
    venue: "CENIM 2018",
    description:
      "Develops a LoRaWAN-based emergency monitoring system for the western and eastern shipping lanes of Surabaya.",
    url: "https://doi.org/10.1109/CENIM.2018.8710908",
    linkLabel: "DOI / Publisher Page",
  },

  // ============================================================
  // 2017
  // ============================================================
  {
    title:
      "Ekstraksi Permukaan Luar Tulang Tengkorak Menggunakan Compass Scanning",
    year: 2017,
    authors:
      "Pauladie Susanto, Hany Boedinugroho, Eko Pramunanto, Eko Mulyanto Yuniarno, Mauridhi Hery Purnomo",
    category: "Image Processing",
    venue: "Prosiding SENIATI 2017",
    description:
      "Explores skull-surface extraction using image thresholding, region-of-interest selection, and compass scanning.",
    url: "https://ejournal.itn.ac.id/seniati/article/view/1785",
    linkLabel: "Journal Page",
  },
];

/**
 * Normalize names for consistent matching.
 * Handles capitalization, punctuation, and diacritics.
 */
const normalizeName = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * Remove academic titles from lecturer names before comparing them
 * with publication author names.
 */
const lecturerAuthorNames = lecturers
  .map(({ name }) =>
    normalizeName(
      name.replace(
        /\b(?:prof(?:essor)?|dr|ir|s\.?t|m\.?sc|m\.?t|m\.?eng)\b\.?/gi,
        " "
      )
    )
  )
  .filter(Boolean);

/**
 * Non-lecturer laboratory members:
 * - Current laboratory assistants
 * - Laboratory alumni
 */
const nonLecturerMemberNames = [
  ...assistants.map(({ name }) => name),
  ...alumni.map(({ name }) => name),

  // Author abbreviation used in the quadruped movement-plan publication.
  "V. G. A. B. M. Putu",
]
  .map(normalizeName)
  .filter(Boolean);

/**
 * Checks whether at least one known author name appears in the
 * publication's author list.
 */
const hasMatchingAuthor = (
  authors: string,
  knownNames: string[]
): boolean => {
  const normalizedAuthors = ` ${normalizeName(authors)} `;

  return knownNames.some((name) =>
    normalizedAuthors.includes(` ${name} `)
  );
};

/**
 * Checks explicit publication affiliation metadata.
 * This deliberately does not inspect the venue or description.
 */
const hasComputerEngineeringAffiliation = (
  paper: ResearchPaper
): boolean =>
  paper.affiliations?.some((affiliation) => {
    const normalized = normalizeName(affiliation);

    return (
      normalized.includes("department of computer engineering") ||
      normalized.includes("departemen teknik komputer")
    );
  }) ?? false;

/**
 * Publication inclusion criteria:
 *
 * 1. Department attribution:
 *    The publication explicitly identifies the Department of Computer
 *    Engineering AND at least one of the six laboratory lecturers
 *    appears in its author list.
 *
 * 2. Non-lecturer laboratory member:
 *    At least one current laboratory assistant or alumnus appears
 *    in the author list.
 *
 * Lecturer authorship alone is NOT sufficient.
 */
const sortedResearchPapers = researchPapers
  .filter((paper) => {
    const departmentAndLecturer =
      hasComputerEngineeringAffiliation(paper) &&
      hasMatchingAuthor(paper.authors, lecturerAuthorNames);

    const laboratoryMemberPublication = hasMatchingAuthor(
      paper.authors,
      nonLecturerMemberNames
    );

    return departmentAndLecturer || laboratoryMemberPublication;
  })
  .sort((a, b) => b.year - a.year);

const lecturerProfiles = [
  {
    name: "Ahmad Zaini",
    url: "https://scholar.its.ac.id/en/persons/ahmad-zaini/",
  },
  {
    name: "Muhtadin",
    url: "https://scholar.its.ac.id/en/persons/muhtadin/",
  },
  {
    name: "Eko Pramunanto",
    url: "https://scholar.its.ac.id/en/persons/eko-pramunanto/",
  },
  {
    name: "Hany Boedinugroho",
    url: "https://garuda.kemdiktisaintek.go.id/author/view/7621988",
  },
  {
    name: "Mauridhi Hery Purnomo",
    url: "https://scholar.its.ac.id/en/persons/mauridhi-hery-purnomo/",
  },
  {
    name: "Atar Fuady Babgei",
    url: "https://scholar.its.ac.id/en/persons/atar-fuady-babgei/",
  },
];

export function ResearchPapersSection() {
  const years = sortedResearchPapers.map((paper) => paper.year);
  const newestYear = Math.max(...years);
  const oldestYear = Math.min(...years);

  return (
    <section id="research-papers" className="section-padding flex flex-col">
      <div className="max-w-[85rem] w-full mx-auto">
        {/* Section Header */}
        <div
          className="mb-10 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="section-heading mb-3 text-2xl md:text-3xl">
            Research Papers{" "}
            <span className="fg-muted">& Publications</span>
          </h2>

          <p className="fg-muted text-sm md:text-base max-w-2xl leading-relaxed">
            Explore research publications authored by members of the Robotics
            and Intelligent Systems Laboratory and researchers affiliated with
            the Department of Computer Engineering at ITS. These works cover
            robotics, artificial intelligence, computer vision, embedded
            systems, autonomous systems, and intelligent automation.
          </p>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] fg-muted">
            {sortedResearchPapers.length} PUBLICATIONS · {oldestYear}–
            {newestYear} · NEWEST FIRST
          </p>
        </div>

        {/* Publications Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {sortedResearchPapers.map((paper, index) => (
            <article
              key={`${paper.year}-${paper.title}`}
              className="group flex flex-col border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5 md:p-6 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/30 hover:bg-white dark:hover:bg-zinc-900/70"
            >
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] fg-meta">
                  {paper.category}
                </span>

                <span className="fg-meta">•</span>

                <span className="font-mono text-[10px] fg-muted">
                  {paper.year}
                </span>

                <span className="fg-meta">•</span>

                <span className="font-mono text-[10px] fg-muted">
                  #{index + 1}
                </span>
              </div>

              {/* Paper Title */}
              <h3 className="font-display font-bold text-lg md:text-xl tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                {paper.title}
              </h3>

              {/* Authors */}
              <div className="mb-4">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] fg-muted mb-1.5">
                  AUTHORS
                </span>

                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {paper.authors}
                </p>
              </div>

              {/* Description */}
              <p className="fg-muted text-sm leading-relaxed mb-5">
                {paper.description}
              </p>

              {/* Venue and Link */}
              <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-white/10">
                <p className="text-[11px] fg-muted leading-relaxed mb-4">
                  {paper.venue}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider fg-muted border border-zinc-300 dark:border-white/15 px-2 py-1">
                    {paper.linkLabel}
                  </span>

                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open publication: ${paper.title}`}
                    className="inline-flex items-center gap-2 min-h-[44px] text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
                  >
                    View Paper
                    <span
                      aria-hidden="true"
                      className="text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Lecturer Publication Profiles */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/10">
          <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-3">
            Lecturer Publication Profiles
          </h3>

          <p className="fg-muted text-sm leading-relaxed mb-5 max-w-3xl">
            Browse the indexed research outputs of the six lecturers. Their
            profiles may contain additional publications beyond the
            laboratory-related papers listed above.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lecturerProfiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border border-zinc-200 dark:border-white/10 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/30 transition-colors"
              >
                <span>{profile.name}</span>
                <span aria-hidden="true" className="shrink-0">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Access Note */}
        <p className="mt-8 text-[11px] md:text-xs fg-muted leading-relaxed">
          Links lead to publisher pages, DOI records, official ITS research
          records, conference program books, journal pages, or directly
          accessible PDFs. A publication record may be publicly viewable even
          when the publisher restricts access to the full-text paper.
          Publications are included when they explicitly identify the
          Department of Computer Engineering and list one of its lecturers as
          an author, or when at least one non-lecturer laboratory member or
          alumnus is listed as an author.
        </p>
      </div>
    </section>
  );
}