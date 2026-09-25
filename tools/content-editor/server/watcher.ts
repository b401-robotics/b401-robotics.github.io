import fs from "node:fs";
import { discoverSections, getContentsDir } from "./discoverSections";

type ClientController = ReadableStreamDefaultController<Uint8Array>;
const clients = new Set<ClientController>();

const encoder = new TextEncoder();

export function addClient(controller: ClientController): void {
  clients.add(controller);
}

export function removeClient(controller: ClientController): void {
  clients.delete(controller);
}

export function broadcast(event: string, data: any): void {
  const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  const encoded = encoder.encode(message);

  for (const client of clients) {
    try {
      client.enqueue(encoded);
    } catch {
      clients.delete(client);
    }
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function startWatcher(): void {
  const contentsDir = getContentsDir();
  if (!fs.existsSync(contentsDir)) return;

  try {
    fs.watch(contentsDir, { recursive: true }, (_eventType, filename) => {
      if (!filename) return;
      if (filename.endsWith(".tmp") || filename.includes(".git")) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        try {
          const sections = discoverSections();
          broadcast("sections_updated", sections);
        } catch (err) {
          console.error("[Watcher] Error discovering sections after change:", err);
        }
      }, 150);
    });
    console.log(`[Watcher] Watching ${contentsDir} for content updates.`);
  } catch (err) {
    console.error("[Watcher] Failed to start filesystem watcher:", err);
  }
}
