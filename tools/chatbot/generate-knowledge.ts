import { aboutEN } from "../../src/contents/AboutContent";
import { researchEN } from "../../src/contents/ResearchContent";
import { thesisEN } from "../../src/contents/ThesisContent";
import { achievementsEN } from "../../src/contents/AchievementContent";
import { equipmentEN } from "../../src/contents/EquipmentContent";
import { practicumsEN } from "../../src/contents/PracticumsContent";
import { projectsEN } from "../../src/contents/ProjectsContent";
import { lecturers, assistants, alumni } from "../../src/contents/memberList";
import fs from "node:fs";
import path from "node:path";

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  embedding?: number[];
}

export function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // 1. About
  chunks.push({
    id: "about-lab",
    category: "About",
    title: "About B401 Robotics & Intelligent Systems Lab",
    content: `# B401 Robotics & Intelligent Systems Laboratory
Department of Computer Engineering, Institut Teknologi Sepuluh Nopember (ITS), Surabaya.
Overview: ${aboutEN.body}
Mission & Focus: Research, practicums, final year projects, hardware-software integration, autonomous systems, and embedded connectivity.`,
  });

  // 2. Research Areas
  const researchText = researchEN.areas
    .map((a) => `- ${a.title} (${a.tag}): ${a.description}`)
    .join("\n");
  chunks.push({
    id: "research-areas",
    category: "Research",
    title: "Research Focus & Areas of Expertise",
    content: `# Research Areas & Expertise
${researchEN.body}
Key Domains:
${researchText}`,
  });

  // 3. Student Theses
  const thesisText = thesisEN.items
    .map((t) => `### ${t.title}\nAuthor: ${t.author}\nAbstract: ${t.abstract}`)
    .join("\n\n");
  chunks.push({
    id: "student-theses",
    category: "Thesis",
    title: "Student Theses and Academic Research",
    content: `# Student Theses at B401 Lab
${thesisEN.body}

${thesisText}`,
  });

  // 4. Projects
  const projectText = projectsEN.items
    .map(
      (p) =>
        `### ${p.title} [Status: ${p.status}]\n${p.description}\nTechnologies: ${p.tags.join(", ")}`
    )
    .join("\n\n");
  chunks.push({
    id: "projects-work",
    category: "Projects",
    title: "Lab Projects & Works",
    content: `# Notable Work & Projects
${projectsEN.body}

${projectText}`,
  });

  // 5. Achievements
  const achievementText = achievementsEN.items
    .map(
      (a) =>
        `### ${a.title} (${a.year})\nMembers: ${"members" in a && Array.isArray(a.members) ? a.members.join(", ") : "N/A"}\nDetails: ${a.description}`
    )
    .join("\n\n");
  chunks.push({
    id: "achievements-awards",
    category: "Achievements",
    title: "Competition Achievements and Awards",
    content: `# Member Achievements & Competitions
${achievementsEN.body}

${achievementText}`,
  });

  // 6. Facilities & Equipment
  for (const room of equipmentEN.labRooms) {
    const facilitiesText = room.facilities
      .map(
        (f) =>
          `#### ${f.name} (${f.category})\n${f.description}${f.specs ? "\nSpecifications: " + f.specs.join(", ") : ""}`
      )
      .join("\n\n");

    chunks.push({
      id: `room-${room.code.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      category: "Facilities",
      title: `${room.name} (${room.code}) Facilities & Equipment`,
      content: `# ${room.name} (${room.code})
${room.description}

### Equipment Available:
${facilitiesText}`,
    });
  }

  // 7. Practicums
  const practicumText = practicumsEN.items
    .map(
      (p) =>
        `### ${p.title} (${p.code})\n${p.description}\nSessions: ${p.sessions}\nTopics: ${p.topics.map((t) => t.label).join("; ")}`
    )
    .join("\n\n");

  chunks.push({
    id: "practicums-info",
    category: "Practicums",
    title: "Lab Practicums and Registration",
    content: `# Practicums Program
${practicumsEN.body}
Registration Link: ${practicumsEN.registerUrl}

Courses:
${practicumText}`,
  });

  // 8. People (Lecturers, Assistants, Alumni)
  const lecturersText = lecturers
    .map(
      (l) =>
        `- **${l.name}** (${l.role}): Expertise in ${l.expertise}. Education: ${l.education?.join(", ") || "ITS"}`
    )
    .join("\n");

  const assistantsText = assistants
    .map(
      (a) =>
        `- **${a.name}** (${a.role}): ${a.expertise}`
    )
    .join("\n");

  const alumniText = alumni
    .map(
      (al) =>
        `- **${al.name}** (${al.role}, Class of ${al.year || "N/A"}): ${al.expertise}`
    )
    .join("\n");

  chunks.push({
    id: "people-lecturers-assistants",
    category: "People",
    title: "Laboratory Lecturers, Supervisors, Assistants, and Alumni",
    content: `# The People Behind B401

## Lecturers & Supervisors
${lecturersText}

## Laboratory Assistants
${assistantsText}

## Notable Alumni
${alumniText}`,
  });

  return chunks;
}

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

function generateTFEmbeddings(chunks: KnowledgeChunk[]): { vocabulary: string[]; chunks: KnowledgeChunk[] } {
  const wordSet = new Set<string>();
  const tokenizedData = chunks.map((chunk) => {
    const titleTokens = tokenize(chunk.title);
    const contentTokens = tokenize(chunk.content);
    titleTokens.forEach((t) => wordSet.add(t));
    contentTokens.forEach((t) => wordSet.add(t));
    return { titleTokens, contentTokens };
  });

  const vocabulary = Array.from(wordSet).sort();
  const vocabIndex = new Map(vocabulary.map((w, i) => [w, i]));
  const numDocs = chunks.length;

  // Calculate document frequencies
  const docFreq = new Array(vocabulary.length).fill(0);
  for (const { titleTokens, contentTokens } of tokenizedData) {
    const unique = new Set([...titleTokens, ...contentTokens]);
    for (const t of unique) {
      const idx = vocabIndex.get(t);
      if (idx !== undefined) docFreq[idx]++;
    }
  }

  // Calculate TF-IDF vectors
  const vectorizedChunks = chunks.map((chunk, idx) => {
    const { titleTokens, contentTokens } = tokenizedData[idx];
    const vec = new Array(vocabulary.length).fill(0);

    for (const t of contentTokens) {
      const pos = vocabIndex.get(t);
      if (pos !== undefined) vec[pos] += 1;
    }
    for (const t of titleTokens) {
      const pos = vocabIndex.get(t);
      if (pos !== undefined) vec[pos] += 3; // Title boost
    }

    // Apply IDF
    for (let i = 0; i < vec.length; i++) {
      if (vec[i] > 0) {
        const idf = Math.log((numDocs + 1) / (docFreq[i] + 1)) + 1;
        vec[i] = vec[i] * idf;
      }
    }

    // Normalize
    const mag = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0)) || 1;
    const normalized = vec.map((v) => Number((v / mag).toFixed(5)));

    return {
      ...chunk,
      embedding: normalized,
    };
  });

  return { vocabulary, chunks: vectorizedChunks };
}

async function main() {
  console.log("Extracting lab knowledge chunks...");
  const rawChunks = buildKnowledgeChunks();
  console.log(`Extracted ${rawChunks.length} knowledge chunks.`);

  // Save markdown files for reference
  const mdDir = path.resolve(import.meta.dir, "knowledge");
  if (!fs.existsSync(mdDir)) fs.mkdirSync(mdDir, { recursive: true });

  for (const chunk of rawChunks) {
    fs.writeFileSync(path.join(mdDir, `${chunk.id}.md`), chunk.content, "utf-8");
  }

  // Generate lightweight vectorized knowledge for Cloudflare Worker
  console.log("Vectorizing chunks for Cloudflare Worker...");
  const knowledgeBase = generateTFEmbeddings(rawChunks);

  const workerSrcDir = path.resolve(import.meta.dir, "../../services/chatbot-worker/src");
  if (!fs.existsSync(workerSrcDir)) fs.mkdirSync(workerSrcDir, { recursive: true });

  const targetPath = path.join(workerSrcDir, "knowledge.json");
  fs.writeFileSync(targetPath, JSON.stringify(knowledgeBase, null, 2), "utf-8");
  console.log(`Saved knowledge base with vectors to ${targetPath}`);
}

if (import.meta.main) {
  main().catch(console.error);
}
