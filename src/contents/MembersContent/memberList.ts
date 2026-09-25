export interface I_lecturers {
    name: string,
    role: string,
    specialty: string,
    initials: string,
    education?: string[],
    expertise?: string,
    imageUrl?: string
}

export const lecturers: Array<I_lecturers> = [
    {
        name: "Dr. Ahmad Zaini, S.T., M.Sc.",
        role: "Head of Laboratory",
        specialty: "",
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
        role: "Lecturer",
        specialty: "",
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
        role: "Lecturer",
        specialty: "",
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
        role: "Lecturer",
        specialty: "",
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
        role: "Lecturer",
        specialty: "",
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
        role: "Lecturer",
        specialty: "",
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
    role: string,
    initials: string,
    year?: string,
    education?: string[],
    expertise?: string,
    imageUrl?: string
}

export interface I_assistant {
    name: string,
    role: string,
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
        role: "Lead Assistant",
        initials: "JD",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Team coordination, laboratory scheduling, and mentoring new assistants through their first research project.",
    },
    {
        name: "Jane Smith",
        role: "Hardware Assistant",
        initials: "JS",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "PCB design, soldering, and bring-up of custom embedded boards for laboratory projects.",
    },
    {
        name: "Michael Johnson",
        role: "Software Assistant",
        initials: "MJ",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "ROS 2 packages, C++ and Python tooling, and CI setup for the lab's robot software stack.",
    },
    {
        name: "Emily Davis",
        role: "Research Assistant",
        initials: "ED",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Literature review, experiment design, and writing support for ongoing lab publications.",
    },
    {
        name: "David Wilson",
        role: "Network Assistant",
        initials: "DW",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "LoRaWAN and Wi-Fi mesh deployments, network diagnostics, and lab infrastructure maintenance.",
    },
    {
        name: "Sarah Brown",
        role: "AI/ML Assistant",
        initials: "SB",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Training and deploying vision and perception models on edge devices using PyTorch and TensorRT.",
    },
    {
        name: "James Miller",
        role: "IoT Assistant",
        initials: "JM",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "ESP32 firmware, MQTT pipelines, and dashboarding sensor data for lab and field deployments.",
    },
    {
        name: "Olivia Taylor",
        role: "Robotics Assistant",
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
        role: "Robotics Research Alumni",
        initials: "BP",
        year: "2024",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Mobile robot navigation and SLAM. Now working on autonomous systems in industry.",
    },
    {
        name: "Citra Lestari",
        role: "Embedded Systems Alumni",
        initials: "CL",
        year: "2023",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Low-power embedded design and firmware for battery-operated sensor nodes.",
    },
    {
        name: "Dimas Saputra",
        role: "IoT Research Alumni",
        initials: "DS",
        year: "2023",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "End-to-end IoT systems with LoRa backhaul for agricultural monitoring.",
    },
    {
        name: "Eka Wijaya",
        role: "Computer Vision Alumni",
        initials: "EW",
        year: "2022",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Object detection and pose estimation for robotic manipulation.",
    },
    {
        name: "Fitri Handayani",
        role: "Wireless Sensor Networks Alumni",
        initials: "FH",
        year: "2022",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "Mesh networking protocols and energy-aware routing for field deployments.",
    },
    {
        name: "Gilang Ramadhan",
        role: "Automation Alumni",
        initials: "GR",
        year: "2021",
        education: [
            "S1: Teknik Komputer, Institut Teknologi Sepuluh Nopember",
        ],
        expertise: "PLC programming and industrial control systems for factory automation.",
    },
];
