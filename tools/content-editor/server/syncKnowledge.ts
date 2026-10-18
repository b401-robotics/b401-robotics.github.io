import fs from "node:fs";
import path from "node:path";
import { getProjectRoot } from "./discoverSections";

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "are", "who", "from", "has", "have",
  "you", "can", "our", "all", "was", "were", "been", "will", "what", "how", "when",
  "where", "why", "which", "about", "into", "their", "them", "then", "there", "some",
  "yang", "dan", "untuk", "dari", "ini", "itu", "pada", "adalah", "b401"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

interface RawChunk {
  id: string;
  category: string;
  title: string;
  content: string;
}

export async function generateKnowledgeBase(): Promise<{
  chunksCount: number;
  vocabCount: number;
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
    contactMod,
  ] = await Promise.all([
    import(`${path.join(contentsDir, "AboutContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "ResearchContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "ThesisContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "ProjectsContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "AchievementContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "EquipmentContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "PracticumsContent.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "memberList.ts")}?t=${timestamp}`),
    import(`${path.join(contentsDir, "ContactContent.ts")}?t=${timestamp}`),
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
      content: `# B401 Robotics & Intelligent Systems Laboratory
Department of Computer Engineering, Institut Teknologi Sepuluh Nopember (ITS), Surabaya.
Overview: ${about.body}
Key Highlights:
${highlightsText}`,
    });
  }

  // 2. Research Areas
  const research = researchMod.researchEN;
  if (research) {
    const areasText = (research.areas || [])
      .map((a: any) => `- **${a.title}** [${a.tag}]: ${a.description}`)
      .join("\n");
    rawChunks.push({
      id: "research-areas",
      category: "Research",
      title: "Research Focus & Areas of Expertise",
      content: `# Research Areas & Expertise
${research.body}
Areas:
${areasText}`,
    });
  }

  // 3. Student Theses
  const thesis = thesisMod.thesisEN;
  if (thesis && Array.isArray(thesis.items)) {
    const thesesText = thesis.items
      .map(
        (t: any) =>
          `### ${t.title} (${t.year})\nAuthor: ${t.author}\nAbstract: ${t.abstract}`
      )
      .join("\n\n");
    rawChunks.push({
      id: "student-theses",
      category: "Thesis",
      title: "Student Theses and Academic Research",
      content: `# Student Theses at B401 Lab
${thesis.body}

${thesesText}`,
    });
  }

  // 4. Projects Work
  const projects = projectsMod.projectsEN;
  if (projects && Array.isArray(projects.items)) {
    const projText = projects.items
      .map(
        (p: any) =>
          `### ${p.title} (${p.status})\nTags: ${(p.tags || []).join(", ")}\nDescription: ${p.description}`
      )
      .join("\n\n");
    rawChunks.push({
      id: "projects-work",
      category: "Projects",
      title: "Lab Projects & Works",
      content: `# Notable Work & Projects
${projects.body}

${projText}`,
    });
  }

  // 5. Achievements
  const achievements = achievementsMod.achievementsEN;
  if (achievements && Array.isArray(achievements.items)) {
    const achText = achievements.items
      .map(
        (a: any) =>
          `### ${a.title} (${a.year})\nMembers: ${(a.members || []).join(", ")}\nDescription: ${a.description}`
      )
      .join("\n\n");
    rawChunks.push({
      id: "achievements-awards",
      category: "Achievements",
      title: "Competition Achievements and Awards",
      content: `# Member Achievements & Competitions
${achievements.body}

${achText}`,
    });
  }

  // 6. Facilities & Equipment (One chunk per room for targeted retrieval)
  const equipment = equipmentMod.equipmentEN;
  if (equipment && Array.isArray(equipment.labRooms)) {
    for (const room of equipment.labRooms) {
      const id = `room-${(room.code || room.name).toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      const facText = (room.facilities || [])
        .map(
          (f: any) =>
            `- **${f.name}** [${f.category}]: ${f.description}`
        )
        .join("\n");
      rawChunks.push({
        id,
        category: "Facilities",
        title: `${room.name} (${room.code}) Facilities & Equipment`,
        content: `# ${room.name} (${room.code})
${room.description}

Facilities & Equipment:
${facText}`,
      });
    }
  }

  // 7. Practicums
  const practicums = practicumsMod.practicumsEN;
  if (practicums && Array.isArray(practicums.items)) {
    const pracText = practicums.items
      .map((p: any) => {
        const topics = (p.topics || []).map((t: any) => t.label).join(", ");
        return `### ${p.title} (${p.code})\nSessions: ${p.sessions}\nSummary: ${p.summary}\nDescription: ${p.description}\nTopics: ${topics}`;
      })
      .join("\n\n");
    rawChunks.push({
      id: "practicums-info",
      category: "Practicums",
      title: "Lab Practicums and Registration",
      content: `# Practicums Program
${practicums.body}
Registration link: ${practicums.registerUrl || "https://ceits.id/praktikum/pendaftaran"}

${pracText}`,
    });
  }

  // 8. People (Lecturers, Assistants, Alumni)
  const lecturers = membersMod.lecturers || [];
  const assistants = membersMod.assistants || [];
  const alumni = membersMod.alumni || [];

  const lecText = lecturers
    .map(
      (l: any) =>
        `- **${l.name}** (${l.role}): Expertise in ${l.expertise || l.specialty}. Education: ${(l.education || []).join("; ")}`
    )
    .join("\n");

  const astText = assistants
    .map(
      (a: any) =>
        `- **${a.name}** (${a.role}): Research in ${a.expertise || a.specialty || "Robotics"}`
    )
    .join("\n");

  const almText = alumni
    .map(
      (m: any) =>
        `- **${m.name}** (${m.role}): Research in ${m.expertise || m.specialty || "Robotics"}`
    )
    .join("\n");

  rawChunks.push({
    id: "people-lecturers-assistants",
    category: "People",
    title: "Laboratory Lecturers, Supervisors, Assistants, and Alumni",
    content: `# The People Behind B401

## Lecturers & Supervisors
${lecText}

## Active Laboratory Assistants
${astText}

## Alumni
${almText}`,
  });

  // 9. Contact & Location
  const contact = contactMod.contactEN;
  if (contact) {
    rawChunks.push({
      id: "contact-location",
      category: "Contact",
      title: "Lab Contact, Location & Office Hours",
      content: `# B401 Laboratory Contact & Location
Location: ${contact.locationValue}
Email: ${contact.emailValue}
Office Hours: ${contact.hoursValue}
Inquiries: ${contact.body}`,
    });
  }

  // Build unified vocabulary across all chunks
  const vocabSet = new Set<string>();
  const chunkTokens: string[][] = [];

  for (const chunk of rawChunks) {
    const fullText = `${chunk.title} ${chunk.category} ${chunk.content}`;
    const tokens = tokenize(fullText);
    chunkTokens.push(tokens);
    for (const t of tokens) {
      vocabSet.add(t);
    }
  }

  const vocabulary = Array.from(vocabSet).sort();
  const vocabIndex = new Map<string, number>(vocabulary.map((w, i) => [w, i]));

  // Compute normalized TF vectors
  const chunksWithEmbeddings = rawChunks.map((chunk, cIdx) => {
    const tokens = chunkTokens[cIdx]!;
    const counts = new Map<number, number>();
    for (const t of tokens) {
      const pos = vocabIndex.get(t);
      if (pos !== undefined) {
        counts.set(pos, (counts.get(pos) || 0) + 1);
      }
    }

    let sumSq = 0;
    for (const count of counts.values()) {
      sumSq += count * count;
    }
    const mag = Math.sqrt(sumSq) || 1;

    // Sparse representation as array indexed by vocab position
    const embedding = new Array<number>(vocabulary.length).fill(0);
    for (const [pos, count] of counts.entries()) {
      embedding[pos] = Number((count / mag).toFixed(5));
    }

    return {
      ...chunk,
      embedding,
    };
  });

  const knowledgeJson = {
    vocabulary,
    chunks: chunksWithEmbeddings,
  };

  const outputPath = path.join(
    root,
    "services/chatbot-worker/src/knowledge.json"
  );
  fs.writeFileSync(outputPath, JSON.stringify(knowledgeJson, null, 2), "utf-8");

  return {
    chunksCount: chunksWithEmbeddings.length,
    vocabCount: vocabulary.length,
    outputPath,
  };
}
