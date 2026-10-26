import fs from "node:fs";
import path from "node:path";
import { getProjectRoot } from "./discoverSections";

export interface RawChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  aliases?: string;
  embedding?: number[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Read GEMINI_API_KEY from .dev.vars or process.env
function getGeminiApiKey(root: string): string | undefined {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const devVarsPath = path.join(root, "services/chatbot-worker/.dev.vars");
  if (fs.existsSync(devVarsPath)) {
    try {
      const content = fs.readFileSync(devVarsPath, "utf-8");
      for (const line of content.split("\n")) {
        const idx = line.indexOf("=");
        if (idx > -1 && line.slice(0, idx).trim() === "GEMINI_API_KEY") {
          return line.slice(idx + 1).trim();
        }
      }
    } catch {
      // ignore
    }
  }
  return undefined;
}

// Generate 256-dim embeddings in batches using batchEmbedContents with retry & backoff
async function fetchGeminiBatchEmbeddings(
  texts: string[],
  apiKey: string,
  modelName: string
): Promise<(number[] | null)[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:batchEmbedContents?key=${apiKey}`;
  const requests = texts.map((text) => ({
    model: `models/${modelName}`,
    content: { parts: [{ text }] },
    outputDimensionality: 256,
  }));

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(30000),
        body: JSON.stringify({ requests }),
      });

      if (res.ok) {
        const data = (await res.json()) as { embeddings?: Array<{ values?: number[] }> };
        if (data.embeddings && data.embeddings.length === texts.length) {
          return data.embeddings.map((e) => {
            if (!e.values || e.values.length === 0) return null;
            let sumSq = 0;
            for (const v of e.values) sumSq += v * v;
            const mag = Math.sqrt(sumSq) || 1;
            return e.values.map((v) => Number((v / mag).toFixed(5)));
          });
        }
      }

      if (res.status === 429) {
        const errJson = (await res.json().catch(() => null)) as any;
        const retryDelaySec = parseInt(errJson?.error?.details?.find((d: any) => d.retryDelay)?.retryDelay) || 35;
        console.warn(`Hit 100 RPM limit on ${modelName}. Backing off for ${retryDelaySec + 1}s (attempt ${attempt}/3)...`);
        await new Promise((r) => setTimeout(r, (retryDelaySec + 1) * 1000));
        continue;
      }

      const errText = await res.text();
      console.warn(`Model ${modelName} batchEmbedContents failed (HTTP ${res.status}): ${errText.slice(0, 100)}`);
      break;
    } catch (err) {
      console.warn(`Model ${modelName} batchEmbedContents error:`, err);
    }
  }

  return new Array(texts.length).fill(null);
}

export async function generateKnowledgeBase(): Promise<{
  chunksCount: number;
  outputPath: string;
}> {
  const root = getProjectRoot();
  const contentsDir = path.join(root, "src/contents");

  // Dynamically import content modules with timestamp cache buster
  const timestamp = Date.now();
  const [
    aboutMod,
    researchMod,
    thesisMod,
    projectsMod,
    achievementsMod,
    equipmentMod,
    practicumsMod,
    membersMod,
    footerMod,
  ] = await Promise.all([
    import(`${path.join(contentsDir, "AboutContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "ResearchContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "ThesisContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "ProjectsContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "AchievementContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "EquipmentContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "PracticumsContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "memberList.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "FooterContent.ts")}?t=${timestamp}`),
  ]);

  const rawChunks: RawChunk[] = [];

  // 1. About Lab
  const about = aboutMod.aboutEN;
  if (about) {
    const highlightsText = (about.highlights || [])
      .map((h: any) => `- **${h.title}**: ${h.description}`)
      .join("\n");
    rawChunks.push({
      id: "about-lab",
      category: "About",
      title: "About B401 Robotics & Intelligent Systems Lab",
      aliases: "tentang lab b401 profil profil lab visi misi sejarah",
      content: `# B401 Robotics & Intelligent Systems Laboratory
Department of Computer Engineering, Institut Teknologi Sepuluh Nopember (ITS), Surabaya.
Overview: ${about.body}
Key Highlights:
${highlightsText}`,
    });
  }

  // 2. Research Focus & Areas
  const research = researchMod.researchEN;
  if (research) {
    const areasList = (research.areas || [])
      .map((a: any) => `- **${a.title}** [${a.tag}]: ${a.description}`)
      .join("\n");
    rawChunks.push({
      id: "research-overview",
      category: "Research",
      title: "Research Focus & Areas of Expertise Overview",
      aliases: "riset penelitian fokus bidang kajian topik penelitian semua riset research areas",
      content: `# Research Areas & Focus Overview
${research.body}

All research areas:
${areasList}`,
    });

    if (Array.isArray(research.areas)) {
      for (const area of research.areas) {
        rawChunks.push({
          id: `research-${slugify(area.title)}`,
          category: "Research",
          title: `Research Area: ${area.title} [${area.tag}]`,
          aliases: `riset ${area.title} ${area.tag} penelitian topik`,
          content: `# Research Area: ${area.title} (${area.tag})
${area.description}`,
        });
      }
    }
  }

  // 3. Student Theses
  const thesis = thesisMod.thesisEN;
  if (thesis) {
    const thesisList = (thesis.items || [])
      .map((t: any) => `- **${t.title}** (${t.year}) by ${t.author}`)
      .join("\n");
    rawChunks.push({
      id: "thesis-overview",
      category: "Thesis",
      title: "Student Theses and Academic Research Overview",
      aliases: "tugas akhir skripsi ta tesis student thesis theses daftar skripsi semua tesis judul skripsi",
      content: `# Student Theses at B401 Lab Overview
${thesis.body}

List of all student theses:
${thesisList}`,
    });

    if (Array.isArray(thesis.items)) {
      for (const t of thesis.items) {
        rawChunks.push({
          id: `thesis-${slugify(t.title)}`,
          category: "Thesis",
          title: `Thesis: ${t.title} (${t.year})`,
          aliases: `skripsi tugas akhir ta tesis ${t.author}`,
          content: `# Thesis: ${t.title} (${t.year})
Author: ${t.author}
Abstract: ${t.abstract}`,
        });
      }
    }
  }

  // 4. Notable Work & Projects
  const projects = projectsMod.projectsEN;
  if (projects) {
    const projList = (projects.items || [])
      .map(
        (p: any) =>
          `- **${p.title}** [Status: ${p.status}]: ${(p.tags || []).join(", ")} — ${p.description}`
      )
      .join("\n");
    rawChunks.push({
      id: "projects-overview",
      category: "Projects",
      title: "Lab Projects & Works Overview",
      aliases: "proyek karya lab works daftar proyek semua project projects list",
      content: `# Notable Work & Projects Overview
${projects.body}

List of all projects:
${projList}`,
    });

    if (Array.isArray(projects.items)) {
      for (const p of projects.items) {
        rawChunks.push({
          id: `project-${slugify(p.title)}`,
          category: "Projects",
          title: `Project: ${p.title} [${p.status}]`,
          aliases: `proyek project ${(p.tags || []).join(" ")}`,
          content: `# Project: ${p.title} (Status: ${p.status})
Technologies / Tags: ${(p.tags || []).join(", ")}
Description: ${p.description}`,
        });
      }
    }
  }

  // 5. Competition Achievements & Awards
  const achievements = achievementsMod.achievementsEN;
  if (achievements) {
    const achList = (achievements.items || [])
      .map(
        (a: any) =>
          `- **${a.title}** (${a.year}): Members: ${(a.members || []).join(", ")}`
      )
      .join("\n");
    rawChunks.push({
      id: "achievements-overview",
      category: "Achievements",
      title: "Competition Achievements and Awards Overview",
      aliases: "prestasi lomba juara award penghargaan kompetisi robot achievements list",
      content: `# Member Achievements & Competitions Overview
${achievements.body}

List of all member achievements and awards:
${achList}`,
    });

    if (Array.isArray(achievements.items)) {
      for (const a of achievements.items) {
        rawChunks.push({
          id: `achievement-${slugify(a.title)}`,
          category: "Achievements",
          title: `Achievement: ${a.title} (${a.year})`,
          aliases: `prestasi lomba juara kompetisi robot ${(a.members || []).join(" ")}`,
          content: `# Achievement: ${a.title} (${a.year})
Members: ${(a.members || []).join(", ")}
Description: ${a.description}`,
        });
      }
    }
  }

  // 6. Facilities & Equipment
  const equipment = equipmentMod.equipmentEN;
  if (equipment && Array.isArray(equipment.labRooms)) {
    // 6a. Rooms Overview (Only rooms purpose, NO facility clutter)
    const roomsList = equipment.labRooms
      .map((r: any) => `- **${r.name} (${r.code})**: ${r.description}`)
      .join("\n");
    rawChunks.push({
      id: "rooms-overview",
      category: "Facilities",
      title: "Laboratory Rooms and Dedicated Spaces Overview",
      aliases: "ruang ruangan lab rooms dedicated spaces tempat lokasi lab apa saja ruangan",
      content: `# B401 Laboratory Rooms & Spaces Overview
The lab operates across three dedicated rooms:

${roomsList}`,
    });

    // 6b. Facilities Overview (Complete list grouped by room)
    const catalogList = equipment.labRooms
      .map((r: any) => {
        const fList = (r.facilities || []).map((f: any) => `  - **${f.name}** [${f.category}]: ${f.description}`).join("\n");
        return `### ${r.name} (${r.code}):\n${fList}`;
      })
      .join("\n\n");
    rawChunks.push({
      id: "facilities-overview",
      category: "Facilities",
      title: "Laboratory Facilities and Equipment Catalog",
      aliases: "fasilitas alat peralatan perlengkapan equipment facilities catalog semua alat daftar fasilitas tools gear",
      content: `# B401 Laboratory Facilities & Equipment Catalog
Comprehensive list of all lab tools, hardware, and facilities across rooms:

${catalogList}`,
    });

    // 6c. Per-room deep dives with full facility details
    for (const room of equipment.labRooms) {
      const roomSlug = slugify(room.code || room.name);
      const facDetails = (room.facilities || [])
        .map(
          (f: any, i: number) =>
            `${i + 1}. **${f.name}** [${f.category}]: ${f.description}${f.specs ? "\n   Specifications: " + f.specs.join(", ") : ""}`
        )
        .join("\n\n");

      rawChunks.push({
        id: `room-${roomSlug}`,
        category: "Facilities",
        title: `Laboratory Room: ${room.name} (${room.code}) Facilities & Overview`,
        aliases: `ruang ${room.name} ${room.code} fasilitas ${room.code} alat di ${room.code} room ${room.code}`,
        content: `# Laboratory Room: ${room.name} (${room.code})
${room.description}

### Complete Facilities located in ${room.name} (${room.facilities?.length || 0} items):
${facDetails}`,
      });

      if (Array.isArray(room.facilities)) {
        for (const f of room.facilities) {
          rawChunks.push({
            id: `facility-${slugify(f.name)}`,
            category: "Facilities",
            title: `Facility: ${f.name} (${room.code})`,
            aliases: `alat fasilitas perlengkapan ${f.name} ${f.category} ${room.code}`,
            content: `# Facility: ${f.name} [Category: ${f.category}]
Location: ${room.name} (${room.code})
Description: ${f.description}${f.specs ? "\nSpecifications: " + f.specs.join(", ") : ""}`,
          });
        }
      }
    }
  }

  // 7. Practicums
  const practicums = practicumsMod.practicumsEN;
  if (practicums) {
    const pracList = (practicums.items || [])
      .map(
        (p: any) =>
          `- **${p.code}: ${p.title}** (${p.sessions} sessions) — ${p.summary}`
      )
      .join("\n");
    rawChunks.push({
      id: "practicums-overview",
      category: "Practicums",
      title: "Lab Practicums Program Overview & Registration",
      aliases: "praktikum praktikum lab modul praktikum pendaftaran praktikum daftar praktikum practicums list",
      content: `# Practicums Program Overview
${practicums.body}
Registration link: ${practicums.registerUrl || "https://ceits.id/praktikum/pendaftaran"}

All practicum courses:
${pracList}`,
    });

    if (Array.isArray(practicums.items)) {
      for (const p of practicums.items) {
        const topics = (p.topics || []).map((t: any) => t.label).join(", ");
        rawChunks.push({
          id: `practicum-${slugify(p.code)}-${slugify(p.title)}`,
          category: "Practicums",
          title: `Practicum ${p.code}: ${p.title}`,
          aliases: `praktikum ${p.code} ${p.title} modul materi`,
          content: `# Practicum ${p.code}: ${p.title}
Sessions: ${p.sessions}
Summary: ${p.summary}
Description: ${p.description}
Topics covered: ${topics}`,
        });
      }
    }
  }

  // 8. People (Overview + Individual Chunks)
  const lecturers = membersMod.lecturers || [];
  const assistants = membersMod.assistants || [];
  const alumni = membersMod.alumni || [];

  // 8a. People Overview Chunk (Grouped by Batches / Role)
  const lecNames = lecturers.map((l: any) => `- **${l.name}** (${l.role})`).join("\n");

  // Group assistants by batch
  const astByBatch = new Map<string, string[]>();
  for (const a of assistants) {
    const match = a.role.match(/Batch\s*(\d+)/i);
    const batchKey = match ? `Batch ${match[1]}` : "Other Assistants";
    if (!astByBatch.has(batchKey)) astByBatch.set(batchKey, []);
    astByBatch.get(batchKey)!.push(a.name);
  }
  const astBatchSections = Array.from(astByBatch.entries())
    .map(([batch, names]) => `### Laboratory Assistants (${batch} — ${names.length} members):\n${names.map((n) => `- ${n}`).join("\n")}`)
    .join("\n\n");

  rawChunks.push({
    id: "people-overview",
    category: "People",
    title: "Laboratory Members, Assistants, Lecturers & Alumni Overview",
    aliases: "anggota asisten dosen alumni member members roster batch 2023 batch 2024 semua anggota daftar asisten",
    content: `# B401 Laboratory Members & Team Roster Overview

## Lecturers & Supervisors:
${lecNames}

${astBatchSections}`,
  });

  // 8b. Individual People Chunks
  for (const l of lecturers) {
    rawChunks.push({
      id: `lecturer-${slugify(l.name)}`,
      category: "People",
      title: `Lecturer: ${l.name} (${l.role})`,
      aliases: `dosen pembina ${l.name} ${l.role}`,
      content: `# ${l.name}
Role: ${l.role}
Expertise / Specialty: ${l.expertise || l.specialty || "Robotics & Intelligent Systems"}
Education: ${(l.education || []).join("; ") || "ITS"}`,
    });
  }

  for (const a of assistants) {
    const details = [
      `Role: ${a.role}`,
      `Research / Expertise: ${a.expertise || a.specialty || "Robotics"}`,
    ];
    if (a.education?.length) details.push(`Education: ${a.education.join("; ")}`);
    if (a.experience?.length) details.push(`Experience: ${a.experience.join("; ")}`);
    if (a.achievements?.length) details.push(`Achievements: ${a.achievements.join("; ")}`);

    rawChunks.push({
      id: `assistant-${slugify(a.name)}`,
      category: "People",
      title: `Lab Assistant: ${a.name} (${a.role})`,
      aliases: `asisten anggota lab ${a.name} ${a.role}`,
      content: `# ${a.name}
${details.join("\n")}`,
    });
  }

  for (const alm of alumni) {
    const details = [
      `Role: ${alm.role}${alm.year ? ` (Class of ${alm.year})` : ""}`,
      `Research / Expertise: ${alm.expertise || alm.specialty || "Robotics"}`,
    ];
    if (alm.thesis?.length) details.push(`Thesis: ${alm.thesis.join("; ")}`);
    if (alm.education?.length) details.push(`Education: ${alm.education.join("; ")}`);

    rawChunks.push({
      id: `alumnus-${slugify(alm.name)}`,
      category: "People",
      title: `Alumnus: ${alm.name} (${alm.role}${alm.year ? `, Class of ${alm.year}` : ""})`,
      aliases: `alumni lulusan ${alm.name} ${alm.year || ""}`,
      content: `# ${alm.name}
${details.join("\n")}`,
    });
  }

  // 9. Contact & Location
  const footer = footerMod.footerEN;
  if (footer) {
    const address = (footer.addressLines || []).join(", ");
    const emailSocial = (footer.socials || []).find((s: any) => s.type === "email")?.href || "b401robotics@gmail.com";
    rawChunks.push({
      id: "contact-location",
      category: "Contact",
      title: "Lab Contact, Location & Socials",
      aliases: "kontak lokasi alamat email instagram linkedin github contact address",
      content: `# B401 Laboratory Contact & Location
Address / Location: ${address}
Email / Inquiries: ${emailSocial}
Tagline: ${footer.tagline}
Department Website: ${footer.departmentWebsite?.href || "https://www.its.ac.id/komputer/"}`,
    });
  }

  // Generate 256-dim embeddings for all chunks if GEMINI_API_KEY available
  const apiKey = getGeminiApiKey(root);
  if (apiKey) {
    const model = "gemini-embedding-2-preview";
    console.log(`Embedding chunks using ${model} batchEmbedContents...`);
    let count = 0;
    const batchSize = 45;
    let sentInCurrentWindow = 0;
    let windowStart = Date.now();

    for (let i = 0; i < rawChunks.length; i += batchSize) {
      const slice = rawChunks.slice(i, i + batchSize);

      // Hardcode limit: max 80 sub-requests per 60s window (Google free tier limit is 100 RPM)
      if (sentInCurrentWindow + slice.length > 80) {
        const elapsed = (Date.now() - windowStart) / 1000;
        const waitTime = Math.max(0, Math.ceil(62 - elapsed));
        if (waitTime > 0) {
          console.log(`Approaching 100 RPM quota (${sentInCurrentWindow}/100 requests). Pausing ${waitTime}s for quota window reset...`);
          await new Promise((r) => setTimeout(r, waitTime * 1000));
        }
        sentInCurrentWindow = 0;
        windowStart = Date.now();
      }

      const texts = slice.map((c) => `${c.title}\n${c.aliases || ""}\n${c.content}`.slice(0, 2000));
      let vectors = await fetchGeminiBatchEmbeddings(texts, apiKey, model);

      // If gemini-embedding-2 fails completely, fallback to gemini-embedding-001
      if (vectors.every((v) => v === null) && model === "gemini-embedding-2-preview") {
        console.warn("gemini-embedding-2-preview failed, falling back to gemini-embedding-001...");
        vectors = await fetchGeminiBatchEmbeddings(texts, apiKey, "gemini-embedding-001");
      }

      for (let j = 0; j < slice.length; j++) {
        const vec = vectors[j];
        if (vec) {
          slice[j]!.embedding = vec;
          count++;
        }
      }

      sentInCurrentWindow += slice.length;
      console.log(`Embedded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rawChunks.length / batchSize)} (${count}/${rawChunks.length})`);

      if (i + batchSize < rawChunks.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    console.log(`Successfully embedded ${count}/${rawChunks.length} chunks.`);
  } else {
    console.warn("GEMINI_API_KEY not found. Chunks saved without embeddings (offline keyword search will be used).");
  }

  const knowledgeJson = {
    chunks: rawChunks,
  };

  const outputPath = path.join(
    root,
    "services/chatbot-worker/src/knowledge.json"
  );
  fs.writeFileSync(outputPath, JSON.stringify(knowledgeJson, null, 2), "utf-8");

  return {
    chunksCount: rawChunks.length,
    outputPath,
  };
}

if (import.meta.main) {
  generateKnowledgeBase()
    .then((res) => {
      console.log(`Successfully generated ${res.chunksCount} knowledge chunks.`);
      console.log(`Saved to: ${res.outputPath}`);
    })
    .catch((err) => {
      console.error("Knowledge generation failed:", err);
      process.exit(1);
    });
}
