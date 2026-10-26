import rdigImage from "../assets/webp/practicum/Rdig.webp";
import _20250926193050Image from "../assets/webp/practicum/20250926_193050.webp";
import _20251020190750Image from "../assets/webp/practicum/20251020_190750.webp";
import _20251020190803Image from "../assets/webp/practicum/20251020_190803.webp";

// Workshop Telematika PDFs
import telematikaGuidebook from "../assets/pdf/workshoptelematika/guidebook.pdf";
import telematikaModul1 from "../assets/pdf/workshoptelematika/Modul 1.pdf";
import telematikaModul2 from "../assets/pdf/workshoptelematika/Modul 2.pdf";
import telematikaModul3 from "../assets/pdf/workshoptelematika/Modul 3.pdf";
import telematikaModul4 from "../assets/pdf/workshoptelematika/Modul 4.pdf";

// Digital Circuit PDFs
import digitalCircuitGuidebook from "../assets/pdf/digitalcircuit/Guidebook Praktikum Rangkaian Digital Gasal 2026_2027.pdf";
import digitalCircuitModul1 from "../assets/pdf/digitalcircuit/Modul 1.pdf";
import digitalCircuitModul2 from "../assets/pdf/digitalcircuit/modul 2.pdf";
import digitalCircuitModul3 from "../assets/pdf/digitalcircuit/Modul 3.pdf";
import digitalCircuitModul4 from "../assets/pdf/digitalcircuit/Modul 4.pdf";
import digitalCircuitModul5 from "../assets/pdf/digitalcircuit/Modul 5.pdf";

// The `images` array on each practicum accepts either:
//   1. External URL strings (shown below), or
//   2. Locally imported assets from `src/assets/webp/`, e.g.:
//        import someImage from "../assets/webp/some-image.webp";
//        images: [someImage, "https://example.com/photo.jpg"],
// The bundler resolves local imports to hashed URL strings at build time, so
// the array type stays `readonly string[]` regardless of source. Use
// `images` (plural) because a practicum can hold more than one photo.
export const practicumsEN = {
  sectionLabel: "Practicums",
  heading: "Structured",
  headingAccent: "Learning",
  body: "Our practicum program is designed to complement theoretical coursework with hands on, real world engineering experience.",
  sessions: "sessions",
  viewAll: "View All Practicums",
  registerLabel: "Register",
  registerUrl: "https://ceits.id/praktikum/pendaftaran",
  image: rdigImage,
  items: [
    {
      code: "P01",
      title: "Telematics Workshop",
      images: [rdigImage],
      summary:
        "Foundations of telematics, PCB design, and ESP8266 development boards.",
      description:
        "Introduces students to the fundamentals of telematics, from reading and drawing schematics through to laying out a printed circuit board. Students also get hands on with 3D enclosure design in Fusion 360 before writing their first firmware for the ESP8266 development board.",
      sessions: "4",
      guidebookUrl: telematikaGuidebook,
      topics: [
        {
          label: "Telematic Basics",
          url: telematikaModul1,
        },
        {
          label: "Schematic and PCB Design Basics",
          url: telematikaModul2,
        },
        {
          label: "3D Design Fusion 360 Basics",
          url: telematikaModul3,
        },
        {
          label: "ESP8266 Development Board",
          url: telematikaModul4,
        },
      ],
    },
    {
      code: "P02",
      title: "Digital Circuit",
      images: [
        _20250926193050Image,
        _20251020190750Image,
        _20251020190803Image,
      ],
      summary:
        "Combinational and sequential logic, from Karnaugh maps to counters.",
      description:
        "Builds a solid grounding in digital logic design. Students work through decoders, multiplexers, and demultiplexers, learn to simplify Boolean expressions with Karnaugh maps, and finish by implementing sequential circuits such as registers and synchronous and asynchronous counters.",
      sessions: "5",
      guidebookUrl: digitalCircuitGuidebook,
      topics: [
        {
          label: "Dasar Rangkaian Digital",
          url: digitalCircuitModul1,
        },
        {
          label: "Decoder, Demux, dan Mux",
          url: digitalCircuitModul2,
        },
        {
          label: "Karnough Map",
          url: digitalCircuitModul3,
        },
        {
          label: "Rangkaian Sequential",
          url: digitalCircuitModul4,
        },
        {
          label: "Register and Counter",
          url: digitalCircuitModul5,
        },
      ],
    },
    {
      code: "P03",
      title: "Embedded Systems",
      images: [],
      summary:
        "Programming microcontrollers and interfacing with the physical world.",
      description: "Still in development.",
      sessions: "-",
      topics: [],
    },
  ],
} as const;
