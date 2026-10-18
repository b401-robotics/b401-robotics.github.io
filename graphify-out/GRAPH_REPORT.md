# Graph Report - b401-robotics.github.io  (2026-10-17)

## Corpus Check
- Large corpus: 241 files · ~2,084,970 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 711 nodes · 1093 edges · 57 communities (39 shown, 18 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 102 edges (avg confidence: 0.9)
- Token cost: 865,000 input · 126,022 output

## Community Hubs (Navigation)
- React Website UI Components
- Content Editor API Client
- Image WebP Converter Pipeline
- Lab Members & Personnel Roster
- Content Editor Dependencies
- Frontend Tooling & Bundling
- Project Directory Structure
- Chatbot LLM Inference Providers
- TypeScript Client-Server Config
- Content Editor Form Fields
- Cloudflare Worker Dependencies
- TurtleBot3 Waffle Mobile Robots
- Lab About & Staff Content
- Cloudflare Worker TypeScript Config
- Autonomous Drone Fleet & Testbed
- UR5e Robot Arm & Lab Facilities
- Website Section Content Schemas
- Frontend Build Scripts & Config
- Chatbot RAG Knowledge Architecture
- Robotics Competition Awards & Teams
- Soldering & Electronics Workbench
- Digital Circuit Practicum Sessions
- Content Editor Backend Server
- Autonomous Drone Inspection & Awards
- Creality 3D Prototyping Equipment
- CI/CD Deployment & Automation
- Static Asset TypeScript Declarations
- Blueprint Editorial Design System
- B401 Brand & Logo Assets
- UR5 Arm & IoT Hardware Platform
- TurtleBot3 Burger Equipment Showcase
- B401 Lab Vector Logos & Emblems
- TurtleBot3 Differential Drive Robots
- UR5 High-Res Arm & Grippers
- Deployment Verification Scripts
- Chatbot Multi-Provider Fallback
- Vite Development Server Config
- Isaac Lab Simulation Workstation
- AEROVAL Lunar Rover Platform
- Code Fix & Migration Utilities
- DIKST Quadruped Robot Dog
- Member Collage & Assistant Photo
- Unitree Quadruped LiDAR Setup
- B401 Project Architecture Spec
- GitNexus Code Intelligence Spec
- Website Documentation Overview
- Ender-3 V2 Prototyping Asset
- Ender-3 V2 Variant Exposure A
- Ender-3 V2 Variant Exposure B
- Ender-3 V2 Low Light Capture A
- Ender-3 V2 Low Light Capture B
- Ender-3 V2 Ambient Exposure
- Isaac Lab Workstation Rig Shot A
- Isaac Lab Workstation Rig Shot B
- Isaac Lab Wide Exposure Shot
- NAO Humanoid Robot Dark Angle
- NAO Humanoid Robot Studio Angle

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `Translations` - 17 edges
3. `handleRequest()` - 16 edges
4. `compilerOptions` - 15 edges
5. `TurtleBot3 Waffle Mobile Robot Platform` - 15 edges
6. `equipmentEN` - 13 edges
7. `Chatbot Knowledge Ingestion Pipeline` - 12 edges
8. `Room TW2-901 Main Robotics Research Floor` - 12 edges
9. `EditorApp()` - 11 edges
10. `request()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Epson EcoTank L3250 Color Inkjet Printer TW2-901 Lab Asset` --conceptually_related_to--> `Room TW2-901 Main Robotics Research Floor`  [INFERRED]
  src/assets/webp/facility/ALF01433.webp → tools/chatbot/knowledge/room-tw2-901.md
- `NAO Humanoid Robotics Research and Interaction Platform` --conceptually_related_to--> `Core Research Domains and Expertise`  [INFERRED]
  src/assets/webp/facility/ALF01443.webp → tools/chatbot/knowledge/research-areas.md
- `3D Printer Station with Sunlu Filament Spools and Dobot Magician Box` --conceptually_related_to--> `Room TW2-901 Main Robotics Research Floor`  [INFERRED]
  src/assets/webp/facility/ALF01423.webp → tools/chatbot/knowledge/room-tw2-901.md
- `Creality Ender-3 V2 Neo 3D Printer with ITS Asset Inventory Label` --conceptually_related_to--> `Room TW2-901 Main Robotics Research Floor`  [INFERRED]
  src/assets/webp/facility/ALF01427.webp → tools/chatbot/knowledge/room-tw2-901.md
- `High-End RTX 4090 Workstation with NVIDIA Isaac Lab Simulation` --conceptually_related_to--> `Room TW2-901 Main Robotics Research Floor`  [INFERRED]
  src/assets/webp/facility/ALF01434.webp → tools/chatbot/knowledge/room-tw2-901.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **B401 Laboratory Facilities Ecosystem** — tools_chatbot_knowledge_room_a108_facility, tools_chatbot_knowledge_room_b401_facility, tools_chatbot_knowledge_room_tw2_901_facility [EXTRACTED 1.00]
- **Chatbot Multi-Provider Inference and Guardrail Pipeline** — chatbot_setup_gemini_provider, chatbot_setup_codecraft_fallback, chatbot_setup_typesafe_guardrail [EXTRACTED 1.00]
- **GitHub Pages SPA Client-Side Routing Architecture** — _github_workflows_main_deploy_to_github_pages, src_404_spa_redirect, src_index_spa_router_restore [EXTRACTED 1.00]
- **TW2-901 Rapid Prototyping and Fabrication Hardware Suite** — src_assets_webp_facility_alf01422_image, src_assets_webp_facility_alf01423_image, src_assets_webp_facility_alf01431_image, src_assets_webp_facility_alf01433_image [INFERRED 0.95]
- **TW2-901 NVIDIA Isaac Lab Robotics Simulation Workstation Cluster** — src_assets_webp_facility_alf01434_image, src_assets_webp_facility_alf01435_image, src_assets_webp_facility_alf01436_image, src_assets_webp_facility_alf01437_image, src_assets_webp_facility_alf01438_image [INFERRED 0.95]
- **TW2-901 SoftBank NAO Humanoid Robotic Platforms Fleet** — src_assets_webp_facility_alf01440_image, src_assets_webp_facility_alf01441_image, src_assets_webp_facility_alf01442_image, src_assets_webp_facility_alf01443_image [INFERRED 0.95]
- **TurtleBot3 Waffle Photographic Documentation Collection** — src_assets_webp_facility_alf01444_image, src_assets_webp_facility_alf01445_image, src_assets_webp_facility_alf01446_image, src_assets_webp_facility_alf01447_image, src_assets_webp_facility_alf01448_image, src_assets_webp_facility_alf01449_image, src_assets_webp_facility_alf01450_image, src_assets_webp_facility_alf01451_image, src_assets_webp_facility_alf01452_image, src_assets_webp_facility_alf01453_image, src_assets_webp_facility_alf01454_image, src_assets_webp_facility_alf01455_image, src_assets_webp_facility_alf01456_image, src_assets_webp_facility_alf01459_image [INFERRED 0.85]
- **TurtleBot3 Burger Multi-Robot Documentation Collection** — src_assets_webp_facility_alf01458_image, src_assets_webp_facility_alf01460_image, src_assets_webp_facility_alf01461_image, src_assets_webp_facility_alf01462_image, src_assets_webp_facility_alf01463_image, src_assets_webp_facility_alf01464_image [INFERRED 0.85]
- **TW2-901 Robotics and Manipulation Research Testbed** — src_assets_webp_facility_alf01476_ur5e_workstation, src_assets_webp_facility_alf01465_turtlebot3_burger_platform, src_assets_webp_facility_alf01485_dobot_magician_system [INFERRED 0.85]
- **UR5e Collaborative Robotics Research Workstation Session** — src_assets_webp_facility_alf01476_image, src_assets_webp_facility_alf01477_image, src_assets_webp_facility_alf01480_image [EXTRACTED 1.00]
- **Electronics Prototyping and SMD Soldering Rework Infrastructure** — src_assets_webp_facility_alf01471_image, src_assets_webp_facility_alf01472_image, src_assets_webp_facility_alf01474_image [EXTRACTED 1.00]
- **B401 Laboratory Assistants Batch 2023 Portrait Gallery** — src_assets_webp_people_akhul, src_assets_webp_people_devlin, src_assets_webp_people_edu, src_assets_webp_people_fila, src_assets_webp_people_malvin, src_assets_webp_people_nrf, src_assets_webp_people_na70, src_assets_webp_people_navis, src_assets_webp_people_nur, src_assets_webp_people_palel, src_assets_webp_people_rakan, src_assets_webp_people_rian, src_assets_webp_people_sultan, src_assets_webp_people_theo, src_assets_webp_people_xnand, src_assets_webp_people_risang, src_assets_webp_people_wildan, src_assets_webp_people_wildin [EXTRACTED 1.00]
- **B401 Laboratory Assistants Batch 2023 Active Members** — src_assets_webp_people_akhul_syella_akhul_khalimi, src_assets_webp_people_devlin_devlin_jeychovinn_saputra, src_assets_webp_people_edu_edward_natasaputra, src_assets_webp_people_fila_rafila, src_assets_webp_people_malvin_fioreno_malvin_t, src_assets_webp_people_nrf_nur_rahman_fauzan, src_assets_webp_people_na70_abraham_napitupulu, src_assets_webp_people_navis_muhammad_navis_azka_atqiya, src_assets_webp_people_nur_nur_anisa_hidayatul_masruroh, src_assets_webp_people_palel_farrel_ganendra, src_assets_webp_people_rakan_sultan_syafiq_rakan, src_assets_webp_people_rian_sebastian_adirian_nugraha, src_assets_webp_people_sultan_sultan_syarief_usman, src_assets_webp_people_theo_theo_pinem_kawalisa, src_assets_webp_people_xnand_akhmad_rizqullah, src_assets_webp_people_risang_muhammad_risang_radityatama, src_assets_webp_people_wildan_moh_wildan_risqi_maulidi, src_assets_webp_people_wildin_moh_wildan_risqi_maulidi [EXTRACTED 1.00]
- **B401 Embedded Hardware and Microcontroller Team** — src_assets_webp_people_edu_edward_natasaputra, src_assets_webp_people_na70_abraham_napitupulu, src_assets_webp_people_fila_rafila [INFERRED 0.85]
- **B401 Laboratory Brand Identity and Logo System** — logo_main_icon, src_assets_logo_b401_transparent_brand_mark, src_assets_logo_b401_white_cutout_brand_mark, src_assets_img_b401_white_dark_glyphs_logo, src_assets_img_b401_white_dark_visor_logo [INFERRED 0.95]
- **Student Robotics Competition Championship and Achievement Photography** — src_assets_img_highlight_3msgkop37tcjroklsizluiv163lpvquvhp6ce_zy9sgxcpxk1phz67x7xnjsw_pvvmqfaeheaufcjila6dyclhnsrwzxicgwnjfgy7zaihlhtu5qxyvrq6bebmostabnbnq7xxzaz7vm_lcvfuosxobgbuhmjk1minx1ucs1mhmcmzi9lipuddg0skfkuyhe_robocup_2026_photo, src_assets_img_highlight_tim_robotika_its_yang_berlaga_dan_sukses_meraih_16_penghargaan_juara_di_ajang_fira_roboworld_cup_2025_di_korea_selatan_fira_2025_photo, src_assets_img_highlight_unpr71_j3ljxblp76qh_ixqyxuhmkvt8j1kpk_tutawu6j_ydwqar7c1eegdtlpgjvcbaba0ss0bmgp8tvbeizoqls84sctejrxverfgbf8_abmknxhbyer2df3fxcnmewjr_ifwksez_ey4rj75x8wsvghkdg89ttrk5eeiyvidzjpxteohnxagd2_2v87h_aeroval_rover_field_photo, src_assets_img_highlight_4vx4ln1gms_5hg97aocimmicprqw_bldy5sib5g_ts9q79cig2sdsyu5vqzdlw1pn6wx8tdpefpbf_oo3cnd6dsyk0hbhlmmrcqqfexzwxvhykq31mrwtbv6fj39_g38rrrwciuajwncf7efzmebhohk_mx9egapg1r7bt6zq1sud_ebag5lx_of9tt9qkux_roboboat_2023_champion_photo, src_assets_img_highlight_c2grsed4_toqrbx9v4enioifkxf9tvhuc_o2qeyyj_5ickxprmvge3yiaamlq8fzowpa8iwu3t537cmvdafnfop55kgwithcx7uxgwyeljav_0qocxgzblhcor2t7aaksrluthhczvea94bu5wpdjava5_m8seim40hdsrpjprixsm379s2syddnne5jelx_krsti_2024_dance_photo, src_assets_img_highlight_ohrbxdx7jll0ka7xavs_b3qczlqo7z7q4gbzgcmsmz6vnpohnj3u8cifnjbm8qokwfd2srrz0k8gasz749u6urmdaznqu9qaq4wxa2nvc2gcutx2hwa9yzib1fgxu8thvd38tncyetdebxrxze83jeuo5sfrgr1fqvv6vccdgnclx12sch1fp_9e0w0596xc_krti_2025_aerial_awards_photo [INFERRED 0.95]
- **Laboratory Physical Robotics and Manipulation Equipment Inventory** — src_assets_img_ur5img_ur5e_live_demonstration, src_assets_img_drone_aerial_fleet_bench, src_assets_img_robodog_quadruped_platform_photo, src_assets_img_ur5_collaborative_arm_render, src_assets_img_nrf_wireless_networking_asset [INFERRED 0.95]
- **B401 Student Robotics Competition Highlights and Champions Gallery** — src_assets_webp_highlight_3msgkop37tcjroklsizluiv163lpvquvhp6ce_zy9sgxcpxk1phz67x7xnjsw_pvvmqfaeheaufcjila6dyclhnsrwzxicgwnjfgy7zaihlhtu5qxyvrq6bebmostabnbnq7xxzaz7vm_lcvfuosxobgbuhmjk1minx1ucs1mhmcmzi9lipuddg0skfkuyhe, src_assets_webp_highlight_4vx4ln1gms_5hg97aocimmicprqw_bldy5sib5g_ts9q79cig2sdsyu5vqzdlw1pn6wx8tdpefpbf_oo3cnd6dsyk0hbhlmmrcqqfexzwxvhykq31mrwtbv6fj39_g38rrrwciuajwncf7efzmebhohk_mx9egapg1r7bt6zq1sud_ebag5lx_of9tt9qkux, src_assets_webp_highlight_c2grsed4_toqrbx9v4enioifkxf9tvhuc_o2qeyyj_5ickxprmvge3yiaamlq8fzowpa8iwu3t537cmvdafnfop55kgwithcx7uxgwyeljav_0qocxgzblhcor2t7aaksrluthhczvea94bu5wpdjava5_m8seim40hdsrpjprixsm379s2syddnne5jelx, src_assets_webp_highlight_ohrbxdx7jll0ka7xavs_b3qczlqo7z7q4gbzgcmsmz6vnpohnj3u8cifnjbm8qokwfd2srrz0k8gasz749u6urmdaznqu9qaq4wxa2nvc2gcutx2hwa9yzib1fgxu8thvd38tncyetdebxrxze83jeuo5sfrgr1fqvv6vccdgnclx12sch1fp_9e0w0596xc, src_assets_webp_highlight_tim_robotika_its_yang_berlaga_dan_sukses_meraih_16_penghargaan_juara_di_ajang_fira_roboworld_cup_2025_di_korea_selatan, src_assets_webp_highlight_unpr71_j3ljxblp76qh_ixqyxuhmkvt8j1kpk_tutawu6j_ydwqar7c1eegdtlpgjvcbaba0ss0bmgp8tvbeizoqls84sctejrxverfgbf8_abmknxhbyer2df3fxcnmewjr_ifwksez_ey4rj75x8wsvghkdg89ttrk5eeiyvidzjpxteohnxagd2_2v87h [EXTRACTED 1.00]
- **P02 Digital Circuit Practicum Documentation and Classroom Environment** — src_assets_webp_practicum_20250926_193050, src_assets_webp_practicum_20251020_190750, src_assets_webp_practicum_20251020_190803, src_assets_webp_practicum_rdig [EXTRACTED 1.00]
- **B401 Robotics Hardware Platforms (Manipulators, UAVs, Quadrupeds)** — src_assets_webp_ur5, src_assets_webp_ur5img, src_assets_webp_drone, src_assets_webp_robodog, src_assets_webp_gemini_generated_image_3jmnq73jmnq73jmn [INFERRED 0.85]

## Communities (57 total, 18 thin omitted)

### Community 0 - "React Website UI Components"
Cohesion: 0.05
Nodes (40): App(), AboutSection(), AchievementSection(), ChatbotSection(), handleKeyDown(), handleSubmit(), ChatResponse, ChatSource (+32 more)

### Community 1 - "Content Editor API Client"
Cohesion: 0.07
Nodes (47): convertAssetsToWebp(), fetchConversionStats(), fetchSectionData(), fetchSectionDiff(), fetchSections(), reloadSections(), request(), saveSectionData() (+39 more)

### Community 2 - "Image WebP Converter Pipeline"
Cohesion: 0.09
Nodes (47): ConversionItemResult, ConversionStats, convertImages(), ConvertOptions, getConversionStats(), IMAGE_EXT_REGEX, scanRawImages(), toWebpRelPath() (+39 more)

### Community 3 - "Lab Members & Personnel Roster"
Cohesion: 0.06
Nodes (49): Syella Akhul Khalimi Portrait Photo, Syella Akhul Khalimi, Devlin Jeychovinn Saputra Portrait Photo, Devlin Jeychovinn Saputra, Edward Natasaputra Portrait Photo, Edward Natasaputra, Rafila Portrait Photo, Rafila (+41 more)

### Community 4 - "Content Editor Dependencies"
Cohesion: 0.05
Nodes (40): diff, lucide-react, prettier, @tailwindcss/vite, dependencies, diff, lucide-react, prettier (+32 more)

### Community 5 - "Frontend Tooling & Bundling"
Cohesion: 0.06
Nodes (33): bun-plugin-tailwind, framer-motion, dependencies, bun-plugin-tailwind, framer-motion, react, react-dom, react-helmet-async (+25 more)

### Community 6 - "Project Directory Structure"
Cohesion: 0.07
Nodes (27): dist, node_modules, services, tools, compilerOptions, allowImportingTsExtensions, allowJs, jsx (+19 more)

### Community 7 - "Chatbot LLM Inference Providers"
Cohesion: 0.11
Nodes (21): askCodeCraft(), CODECRAFT_MODELS, askGemini(), MODEL_CANDIDATES, SYSTEM_INSTRUCTION, getRandomVariant(), GuardrailResult, IMPOLITE_REFUSAL_VARIANTS (+13 more)

### Community 8 - "TypeScript Client-Server Config"
Cohesion: 0.08
Nodes (23): client, DOM.Iterable, index.ts, scripts, server, compilerOptions, allowSyntheticDefaultImports, baseUrl (+15 more)

### Community 9 - "Content Editor Form Fields"
Cohesion: 0.25
Nodes (13): fetchAssetsImages(), getAssetImagePreviewUrl(), ArrayFieldEditor(), ArrayFieldEditorProps, FieldEditor(), FieldEditorProps, ImageUrlEditor(), ImageUrlEditorProps (+5 more)

### Community 10 - "Cloudflare Worker Dependencies"
Cohesion: 0.13
Nodes (14): @cloudflare/workers-types, hono, dependencies, hono, devDependencies, @cloudflare/workers-types, wrangler, name (+6 more)

### Community 11 - "TurtleBot3 Waffle Mobile Robots"
Cohesion: 0.14
Nodes (14): TurtleBot3 Waffle Front Low-Angle Photo, TurtleBot3 Waffle Front Isometric Photo, TurtleBot3 Waffle Low-Light Isometric Photo, TurtleBot3 Waffle High-Key Front Photo, TurtleBot3 Waffle Studio Isometric Photo, TurtleBot3 Waffle Elevated High-Angle Photo, TurtleBot3 Waffle Elevated Overview Photo, TurtleBot3 Waffle Perspective Top-Angle Photo (+6 more)

### Community 12 - "Lab About & Staff Content"
Cohesion: 0.20
Nodes (11): aboutEN, alumni, assistants, lecturers, thesisEN, buildKnowledgeChunks(), generateTFEmbeddings(), KnowledgeChunk (+3 more)

### Community 13 - "Cloudflare Worker TypeScript Config"
Cohesion: 0.15
Nodes (12): @cloudflare/workers-types, src/**/*, compilerOptions, lib, module, moduleResolution, skipLibCheck, strict (+4 more)

### Community 14 - "Autonomous Drone Fleet & Testbed"
Cohesion: 0.21
Nodes (10): Autonomous UAV Drones Fleet Workbench Photo, Unmanned Aerial Vehicle (UAV) Research Fleet, B401 Lab Robotics Research Demonstration Photo, Robotics Teach Pendant Experimentation and Control, Universal Robots UR5 Collaborative Arm Hero Asset, UR5e 6-DOF Collaborative Robotic Arm System, UR5 Arm Legacy Thumbnail Asset, UR5 Collaborative Arm Legacy Media (+2 more)

### Community 15 - "UR5e Robot Arm & Lab Facilities"
Cohesion: 0.18
Nodes (13): Epson EcoTank L3250 Color Inkjet Printer TW2-901 Lab Asset, TurtleBot3 Waffle Lab Facility Showcase Photo, B401 Lab Researchers Working with UR5e Robotic Arm Image, UR5e Collaborative Robotic Arm Workstation and Manipulation Platform, UR5e Robotic Arm Research Workstation Table Image, UR5e Robotic Arm Workstation and Monitors Image, B401 Lab Collaborative Research Workstation Session Image, B401 Lab Team Researching at UR5e Workstation Image (+5 more)

### Community 16 - "Website Section Content Schemas"
Cohesion: 0.23
Nodes (6): activityEN, contactEN, footerEN, navEN, projectsEN, researchEN

### Community 17 - "Frontend Build Scripts & Config"
Cohesion: 0.21
Nodes (11): buildTime, cliConfig, end, entrypoints, formatFileSize(), outputTable, parseArgs(), parseValue() (+3 more)

### Community 18 - "Chatbot RAG Knowledge Architecture"
Cohesion: 0.21
Nodes (12): Chatbot Knowledge Ingestion Pipeline, In-Memory Vector Search and Cosine Similarity, B401 Lab Mission and Institutional Context, National and International Competition Record, ITS Robotics Competition Teams, Laboratory Leadership and Research Faculty, B401 Personnel and Organization Structure, B401 Academic Practicums Curriculum (+4 more)

### Community 19 - "Robotics Competition Awards & Teams"
Cohesion: 0.17
Nodes (11): RoboCup 2026 Middle Size League IRIS ITS Team Photo, RoboCup 2026 Middle Size League 3rd Place Award, Barunastra ITS RoboBoat 2023 Grand Champion Celebration Photo, International RoboBoat Competition 2023 Grand Champion, Vi-Rose ITS KRSTI 2024 Humanoid Dance Robot Photo, Kontes Robot Seni Tari Indonesia 2024 1st Place, Bayucaraka ITS KRTI 2025 Awards Ceremony Photo, KRTI 2025 Autonomous UAV Competition Awards (+3 more)

### Community 20 - "Soldering & Electronics Workbench"
Cohesion: 0.20
Nodes (10): YIHUA 898D+ Soldering and SMD Rework Station Setup Image, YIHUA 898D+ Soldering and SMD Hot Air Rework Station, YIHUA 898D+ Soldering Stations Front View Image, TW2-901 Robotics Laboratory Wide Interior Floor Image, YIHUA 898D+ Soldering Iron and Heat Gun Front Perspective Image, TW2-901 Robotics Laboratory Main Research Floor Overview Image, TW2-901 Robotics and Intelligent Systems Main Laboratory Floor, NEC Multimedia Ceiling Projector Installation Image (+2 more)

### Community 21 - "Digital Circuit Practicum Sessions"
Cohesion: 0.27
Nodes (9): Digital Circuit Practicum Logic Trainer Kit Student Session Photo, P02 Digital Circuit Practicum Hands-On Lab Work, Digital Circuit Breadboard Wiring and Logic Testing Photo, Combinational Circuit Wiring and Verification, Digital Circuit Practicum Team Collaborative Troubleshooting Photo, Sequential Logic Circuit Experimentation and Counter Design, B401 Digital Circuit Laboratory Room Overview Photo, Digital Circuit Practicum Facility and Environment (+1 more)

### Community 22 - "Content Editor Backend Server"
Cohesion: 0.22
Nodes (8): findFreePort(), isPortFree(), requestedApiPort, requestedVitePort, rootDir, serverProc, sharedEnv, viteProc

### Community 23 - "Autonomous Drone Inspection & Awards"
Cohesion: 0.25
Nodes (9): Laboratory Autonomous Drone and UAV Fleet Display, Autonomous Aerial Robotics and UAV Inspection System, RoboCup 2026 Middle Size League 3rd Place Award Ceremony Photo, International RoboBoat 2023 Grand Champion Award Ceremony Photo, KRSTI 2024 Humanoid Dancing Robotics Competition Performance Photo, ITS Student Competitive Robotics Championship Recognition, KRTI 2025 Indonesian Flying Robot Contest Closing Ceremony Photo, FIRA RoboWorld Cup 2025 16-Awards Delegation Photo (+1 more)

### Community 24 - "Creality 3D Prototyping Equipment"
Cohesion: 0.33
Nodes (9): Creality Ender-3 V2 Neo 3D Printer Prototyping Rig (Front View), FDM 3D Printing Prototyping Facility, 3D Printer Station with Sunlu Filament Spools and Dobot Magician Box, Creality Ender-3 V2 Neo 3D Printer with ITS Asset Inventory Label, Creality Ender-3 3D Printer Facility Asset, SoftBank NAO Humanoid Robots Dual Research Units (Dark Exposure), SoftBank NAO Humanoid Robots Dual Research Units (Clear Standard Exposure), NAO Humanoid Robotics Research and Interaction Platform (+1 more)

### Community 25 - "CI/CD Deployment & Automation"
Cohesion: 0.25
Nodes (8): GitHub Pages Deployment Workflow, Dynamic Section Discovery Rules, Deployment Exclusion and Isolation Guard, Internal Content Editor Architecture, Single Page Application 404 Route Encoding, SPA Path Restoration and Root Mounting, Content Editor Client HTML Shell, Content Editor Root Host HTML Shell

### Community 26 - "Static Asset TypeScript Declarations"
Cohesion: 0.25
Nodes (7): *.css, *.jpeg, *.jpg, *.module.css, *.png, *.svg, *.webp

### Community 27 - "Blueprint Editorial Design System"
Cohesion: 0.29
Nodes (8): Blueprint Editorial Design System, Deprecation of Card Glass in Favor of Hairline Rules, Blueprint Utility Primitives, Zinc Grayscale Typography and Space Tokens, Impeccable Technical Design Audit, Touch Target Accessibility Remediation, Design Inconsistency Inventory, Unused Prototype Component Removal

### Community 28 - "B401 Brand & Logo Assets"
Cohesion: 0.25
Nodes (8): B401 Laboratory Official Logo WebP Asset, B401 Laboratory Secondary Logo WebP Asset, B401 Laboratory Secondary Branding Variant, B401 Laboratory Visual Identity & Insignia, B401 Logo Terminal Face Dark Glyphs Asset, B401 Terminal Face Glyphs Graphic Element, B401 Logo Dark Visor Mask Asset, B401 Robot Visor Mask Graphic Element

### Community 29 - "UR5 Arm & IoT Hardware Platform"
Cohesion: 0.29
Nodes (7): Universal Robots UR5 Robotic Arm 3D Render, Wireless Networking and IoT Hardware Demonstration Photo, UR5e Collaborative Arm Live Operation High-Res Photograph, Universal Robots UR5 Manipulator Studio Render, UR5e Collaborative Manipulation and ROS 2 Control System, UR5e Collaborative Robot Arm Live Operation Photo, Universal Robots UR5 Manipulator Graphic Archive

### Community 30 - "TurtleBot3 Burger Equipment Showcase"
Cohesion: 0.29
Nodes (7): Dual TurtleBot3 Burger Low-Key Setup Photo, Dual TurtleBot3 Burger Lab Equipment Showcase Photo, Dual TurtleBot3 Burger Front-Angle Photo, Dual TurtleBot3 Burger Side-Perspective Photo, Dual TurtleBot3 Burger High-Exposure Studio Photo, Dual TurtleBot3 Burger Bright Lab Workbench Photo, TurtleBot3 Burger Multi-Robot System

### Community 31 - "B401 Lab Vector Logos & Emblems"
Cohesion: 0.47
Nodes (6): B401 Lab Root Logo Icon Asset, B401 Dark Glyphs White Logo Variant, B401 Dark Visor Logo Mascot, B401 Robotics Lab Transparent Brand Mark, B401 Robotics Lab Visual Identity and Mascot Design, B401 Robotics Lab White Cutout Brand Mark

### Community 32 - "TurtleBot3 Differential Drive Robots"
Cohesion: 0.33
Nodes (6): TurtleBot3 Burger Mobile Robots Bench Perspective Image, TurtleBot3 Burger Differential Drive Mobile Robot Platform, TurtleBot3 Burger Robots Front Lighting View Image, TurtleBot3 Burger Robots Low-Key Exposure Image, TurtleBot3 Burger Robots Workbench View Image, TurtleBot3 Burger Mobile Robots Studio Exposure Image

### Community 33 - "UR5 High-Res Arm & Grippers"
Cohesion: 0.33
Nodes (6): Universal Robots UR5 Cobot Arm High-Resolution Image, UR5 Collaborative Robot Arm Platform, UR5 Robot Arm Secondary Photo Asset, Robotic Manipulation and Grasping Research, UR5 Robot Arm with Robotiq Gripper Operation Photo, UR5e Manipulation Workcell and Teach Pendant Operation

### Community 34 - "Deployment Verification Scripts"
Cohesion: 0.33
Nodes (3): distDir, rootDir, srcDir

### Community 35 - "Chatbot Multi-Provider Fallback"
Cohesion: 0.40
Nodes (5): CodeCraft Secondary Fallback Provider, Google Gemini Primary AI Provider, Chatbot Backend Architecture and Setup, TypeSafe Jev Screening and Heuristic Guardrails, Cloudflare Chatbot Worker Service Specification

### Community 36 - "Vite Development Server Config"
Cohesion: 0.40
Nodes (4): apiPort, __dirname, strictPort, vitePort

### Community 37 - "Isaac Lab Simulation Workstation"
Cohesion: 0.67
Nodes (4): High-End RTX 4090 Workstation with NVIDIA Isaac Lab Simulation, NVIDIA Isaac Lab Physics and Robotics Simulation Environment, NVIDIA Isaac Lab Robotics Simulation Rig (Balanced Exposure), Room A108 Computing and Networking Facility

### Community 38 - "AEROVAL Lunar Rover Platform"
Cohesion: 0.50
Nodes (3): RIVAL ITS AEROVAL Rover Australian Rover Challenge 2026 Photo, AEROVAL Semi-Autonomous Lunar Exploration Rover, highlightEN

## Knowledge Gaps
- **294 isolated node(s):** `cliConfig`, `start`, `entrypoints`, `spa404Source`, `end` (+289 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 310 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `equipmentEN` connect `UR5e Robot Arm & Lab Facilities` to `Isaac Lab Simulation Workstation`, `Lab About & Staff Content`, `Autonomous Drone Fleet & Testbed`, `Website Section Content Schemas`, `Soldering & Electronics Workbench`, `Creality 3D Prototyping Equipment`, `TurtleBot3 Burger Equipment Showcase`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `Room TW2-901 Main Robotics Research Floor` connect `Creality 3D Prototyping Equipment` to `Chatbot RAG Knowledge Architecture`, `Soldering & Electronics Workbench`, `Isaac Lab Simulation Workstation`, `UR5e Robot Arm & Lab Facilities`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `Chatbot Knowledge Ingestion Pipeline` connect `Chatbot RAG Knowledge Architecture` to `Creality 3D Prototyping Equipment`, `Chatbot Multi-Provider Fallback`, `Isaac Lab Simulation Workstation`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 15 inferred relationships involving `TurtleBot3 Waffle Mobile Robot Platform` (e.g. with `TurtleBot3 Waffle Front Low-Angle Photo` and `TurtleBot3 Waffle Front Isometric Photo`) actually correct?**
  _`TurtleBot3 Waffle Mobile Robot Platform` has 15 INFERRED edges - model-reasoned connections that need verification._
- **What connects `cliConfig`, `start`, `entrypoints` to the rest of the system?**
  _294 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `React Website UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05179982440737489 - nodes in this community are weakly interconnected._
- **Should `Content Editor API Client` be split into smaller, more focused modules?**
  _Cohesion score 0.06648575305291723 - nodes in this community are weakly interconnected._