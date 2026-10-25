# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Prospective & Current Students:** Undergraduate and graduate computer engineering students at ITS looking to join B401 lab, find research supervisors, select thesis topics, or register for practicum courses.
2. **Academic & Industry Collaborators:** Researchers, industry partners, and grant agencies reviewing the lab's capabilities, robotic hardware testbeds, and publication track record.
3. **Lab Members & Alumni:** Current assistants and alumni maintaining ties, tracking alumni thesis archives, and referencing past robotics competition milestones.

## Product Purpose

The official digital presence for the B401 Robotics & Intelligent Systems Laboratory (Departemen Teknik Komputer FTEIC ITS Surabaya). It presents the lab's academic identity, state-of-the-art robotic testbeds, student research theses, competitive achievements, and lab member directory to elevate the laboratory's national and international visibility.

## Positioning

The premier robotics and intelligent systems academic laboratory at Institut Teknologi Sepuluh Nopember, uniquely combining high-end physical robotic manipulators (UR5e), autonomous mobile robots (TurtleBot3), quadrupeds, aerial UAV fleets, and physical AI simulation environments (NVIDIA Isaac Lab) with a proven championship record (FIRA RoboWorld Cup, RoboCup MSL, RoboBoat, KRSTI, KRTI).

## Operating Context

- **Environment:** Public web platform accessible on desktop and mobile devices.
- **Content Operations:** Content maintained directly in TypeScript source modules (`src/contents/`) or managed locally via the built-in Content Editor tool (`tools/content-editor`).
- **AI Integration:** Integrated edge AI chatbot running on Cloudflare Workers (`services/chatbot-worker`), answering visitor inquiries via vector search over laboratory knowledge base chunks.

## Capabilities and Constraints

- **Single Page Application (SPA):** Built with React 19, React Router v7, Vite / Bun runtime, and Tailwind CSS v4.
- **Section-Driven Architecture:** Tabbed view structure covering Hero, About, Research & Thesis Archive, Facilities & Lab Rooms, Competition Highlights, Practicums, Projects, Members & Alumni, and Contact.
- **Data Integrity:** Strict 1:1 typing and schema validation across content files, translation layers, and chatbot vector knowledge store. No placeholder or fictitious data.
- **Build & Deployment:** Client-side compiled static bundle deployed to GitHub Pages with SPA 404 redirection fallback.

## Brand Commitments

- **Institutional Identity:** Institut Teknologi Sepuluh Nopember (ITS), Departemen Teknik Komputer, Fakultas Teknologi Elektro dan Informatika Cerdas (FTEIC).
- **Laboratory Name:** B401 Robotics & Intelligent Systems Laboratory / Laboratorium Robotika dan Sistem Cerdas.
- **Visual Language:** Blueprint editorial design system: high-contrast monochrome zinc scale, technical typography (Poppins display headings, monospace kickers and metadata labels, sans body), hairline framing, and corner tick visual framing.

## Evidence on Hand

- Verified academic alumni records with real thesis titles, student IDs (NRP), and supervisor names (`src/contents/memberList.ts`).
- Authentic laboratory facility photographs and hardware inventories across Room TW2-901, Room A108, and Room B401 (`src/contents/EquipmentContent.ts`).
- Competition championship records from national (KRTI, KRSTI) and international (FIRA, RoboCup, RoboBoat) robotics tournaments (`src/contents/AchievementContent.ts`, `src/contents/HighlightContent.ts`).

## Product Principles

1. **Authenticity First:** Only genuine research titles, student credentials, equipment specs, and real lab photos. Never substitute placeholder or speculative claims.
2. **Technical Rigor & Elegance:** Reflect the engineering discipline of robotics through clean visual hierarchy, precise typography, and functional layouts.
3. **Accessible Information Architecture:** Enable visitors to effortlessly explore thesis topics, inspect room facilities, browse member profiles, and access practicum details.
4. **Performance & Light Footprint:** Fast initial load, optimized WebP imagery, and snappy tab transitions without unnecessary client overhead.
