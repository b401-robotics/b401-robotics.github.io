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

export interface I_assistant {
    name: string,
    role: {en: string, id: string},
    initials: string,
    imageUrl?: string
}

export const assistants: Array<I_assistant> = [
    { name: "John Doe", role: { en: "Lead Assistant", id: "Asisten Utama" }, initials: "JD" },
    { name: "Jane Smith", role: { en: "Hardware Assistant", id: "Asisten Perangkat Keras" }, initials: "JS" },
    { name: "Michael Johnson", role: { en: "Software Assistant", id: "Asisten Perangkat Lunak" }, initials: "MJ" },
    { name: "Emily Davis", role: { en: "Research Assistant", id: "Asisten Peneliti" }, initials: "ED" },
    { name: "David Wilson", role: { en: "Network Assistant", id: "Asisten Jaringan" }, initials: "DW" },
    { name: "Sarah Brown", role: { en: "AI/ML Assistant", id: "Asisten AI/ML" }, initials: "SB" },
    { name: "James Miller", role: { en: "IoT Assistant", id: "Asisten IoT" }, initials: "JM" },
    { name: "Olivia Taylor", role: { en: "Robotics Assistant", id: "Asisten Robotika" }, initials: "OT" }
];
