import { type Language } from "@/context/LanguageContext"

export interface I_lecturers {
    name: string,
    role: {en: string, id: string}
    specialty: {en: string, id: string}
    initials: string,
    education?: string[],
    expertise?: string,
    imageUrl?: string
}

// interface I_lecturersFiltered {
//     name: string,
//     role: string,
//     specialty: string,
//     initials: string
// }

// export function lecturersLangFilter(lang: Language, lecturers: Array<I_lecturersAll>) {
//     let role = [];
//     let specialty = [];
//     if(lang == "en")
//     {
//         for(let i = 0; i < lecturers.length; i++)
//         {
//             role.push(lecturers[i]?.roleEN);
//             specialty.push(lecturers[i]?.specialtyEN)
//         }
//     }
// }

export const lecturers: Array<I_lecturers> = [
    {
        name: "Dr. Ahmad Zaini, S.T., M.Sc.",
        role: {en:"Head of Laboratory", id: "Kepala Laboratorium"},
        specialty: {en: "", id: ""},
        initials: "AZ",
        education: [
            "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
            "S2: Teknik Elektronika, Institut Teknologi Sepuluh Nopember"
        ],
        expertise: "Digital Circuits, Telematics, Computer System Architecture, IoT, Image Processing, LoRa.",
        imageUrl: "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Pak-Zaini.jpg"
    },
    {
        name: "Muhtadin, S.T., M.T.",
        role: {en:"Lecturer", id: "Dosen"},
        specialty: {en: "", id: ""},
        initials: "M",
        education: [
            "S1: Teknik Sistem Komputer, Institut Teknologi Sepuluh Nopember",
            "S2: Teknologi Elektro dan Informatika (ITS & Hochschule Darmstadt Germany)"
        ],
        expertise: "Augmented Reality, Robotics (Service Robots, Object Following, Path Planning, YOLO), IoT, Smart Home, Wireless Sensor Networks.",
        imageUrl: "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Muhtadin-S.T.-M.T.Hany_.png"
    },
    {
        name: "Eko Pramunanto, S.T., M.T.",
        role: {en:"Lecturer", id: "Dosen"},
        specialty: {en: "", id: ""},
        initials: "EP",
        education: [
            "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
            "S2: Teknik Informatika, Institut Teknologi Bandung"
        ],
        expertise: "Basic Computer Programming, Embedded Systems, Numerical Methods, Digital Circuits, LoRaWAN, Android Apps, Pattern Recognition.",
        imageUrl: "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Pak-Eko-Pram.jpg"
    },
    {
        name: "Ir. Hany Boedinugroho, M.T.",
        role: {en:"Lecturer", id: "Dosen"},
        specialty: {en: "", id: ""},
        initials: "HB",
        education: [
            "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
            "S2: Teknik Elektro, Institut Teknologi Sepuluh Nopember"
        ],
        expertise: "Microprocessor Systems and Microcontrollers, Computer System Architecture and Organization, Numerical Methods, Embedded Systems, Digital Circuits.",
        imageUrl: "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Pak-Hany.jpg"
    },
    {
        name: "Prof. Dr. Ir. Mauridhi Hery Purnomo, M.Eng.",
        role: {en:"Lecturer", id: "Dosen"},
        specialty: {en: "", id: ""},
        initials: "MH",
        education: [
            "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
            "S2: Teknik Elektro, Osaka City University",
            "S3: Teknik Elektro, Osaka City University"
        ],
        expertise: "Machine Learning, Ubiquitous Computing, Soft Computing, Deep Learning, Genetic Algorithms, Utility-Based AI, Optimization.",
        imageUrl: "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Prof-Hery.jpg"
    },
    {
        name: "Atar Fuady Babgei, S.T., M.Sc.",
        role: {en:"Lecturer", id: "Dosen"},
        specialty: {en: "", id: ""},
        initials: "AF",
        education: [
            "S1: Teknik Elektro, Institut Teknologi Sepuluh Nopember",
            "S2: Aircraft Systems Design, University of Southampton, UK"
        ],
        expertise: "Aircraft Systems Design, Avionics, Autonomous Vehicles (Self-driving car navigation, Multi-agent systems), Blimp development, Smart Medical Instrumentation.",
        imageUrl: "https://www.its.ac.id/komputer/wp-content/uploads/sites/28/2026/02/Atar-Fuady-Babgei-S.T.-M.Sc_.jpg"
    },
]

export interface I_alumni {
    name: string,
    role: {en: string, id: string},
    initials: string,
    year?: string,
    education?: string[],
    expertise?: string,
    imageUrl?: string
}

export interface I_assistant {
    name: string,
    role: {en: string, id: string},
    initials: string,
    education?: string[],
    expertise?: string,
    imageUrl?: string
}

// Placeholder roster — replace names, roles, education, and expertise with
// the real data when available.
export const assistants: Array<I_assistant> = [
    {
        name: "John Doe",
        role: { en: "Lead Assistant", id: "Asisten Utama" },
        initials: "JD",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Team coordination, laboratory scheduling, and mentoring new assistants through their first research project.",
    },
    {
        name: "Jane Smith",
        role: { en: "Hardware Assistant", id: "Asisten Perangkat Keras" },
        initials: "JS",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "PCB design, soldering, and bring-up of custom embedded boards for laboratory projects.",
    },
    {
        name: "Michael Johnson",
        role: { en: "Software Assistant", id: "Asisten Perangkat Lunak" },
        initials: "MJ",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "ROS 2 packages, C++ and Python tooling, and CI setup for the lab's robot software stack.",
    },
    {
        name: "Emily Davis",
        role: { en: "Research Assistant", id: "Asisten Peneliti" },
        initials: "ED",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Literature review, experiment design, and writing support for ongoing lab publications.",
    },
    {
        name: "David Wilson",
        role: { en: "Network Assistant", id: "Asisten Jaringan" },
        initials: "DW",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "LoRaWAN and Wi-Fi mesh deployments, network diagnostics, and lab infrastructure maintenance.",
    },
    {
        name: "Sarah Brown",
        role: { en: "AI/ML Assistant", id: "Asisten AI/ML" },
        initials: "SB",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Training and deploying vision and perception models on edge devices using PyTorch and TensorRT.",
    },
    {
        name: "James Miller",
        role: { en: "IoT Assistant", id: "Asisten IoT" },
        initials: "JM",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "ESP32 firmware, MQTT pipelines, and dashboarding sensor data for lab and field deployments.",
    },
    {
        name: "Olivia Taylor",
        role: { en: "Robotics Assistant", id: "Asisten Robotika" },
        initials: "OT",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Kinematics, motion planning, and integration of manipulators and mobile platforms in simulation and hardware.",
    }
];

// Placeholder alumni list — replace the names, roles, and years with the
// real alumni data when available.
export const alumni: Array<I_alumni> = [
    {
        name: "Bagas Prakoso",
        role: { en: "Robotics Research Alumni", id: "Alumni Penelitian Robotika" },
        initials: "BP",
        year: "2024",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Mobile robot navigation and SLAM. Now working on autonomous systems in industry.",
    },
    {
        name: "Citra Lestari",
        role: { en: "Embedded Systems Alumni", id: "Alumni Sistem Tertanam" },
        initials: "CL",
        year: "2023",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Low-power embedded design and firmware for battery-operated sensor nodes.",
    },
    {
        name: "Dimas Saputra",
        role: { en: "IoT Research Alumni", id: "Alumni Penelitian IoT" },
        initials: "DS",
        year: "2023",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "End-to-end IoT systems with LoRa backhaul for agricultural monitoring.",
    },
    {
        name: "Eka Wijaya",
        role: { en: "Computer Vision Alumni", id: "Alumni Visi Komputer" },
        initials: "EW",
        year: "2022",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Object detection and pose estimation for robotic manipulation.",
    },
    {
        name: "Fitri Handayani",
        role: { en: "Wireless Sensor Networks Alumni", id: "Alumni Jaringan Sensor Nirkabel" },
        initials: "FH",
        year: "2022",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Mesh networking protocols and energy-aware routing for field deployments.",
    },
    {
        name: "Gilang Ramadhan",
        role: { en: "Automation Alumni", id: "Alumni Otomasi" },
        initials: "GR",
        year: "2021",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "PLC programming and industrial control systems for factory automation.",
    },
];
