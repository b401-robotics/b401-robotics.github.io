import fs from "node:fs";
import path from "node:path";
import { discoverSections, getAssetsImgDir, listAssetImages } from "./discoverSections";
import { readSection } from "./readSection";
import { writeSection, generateSectionDiff } from "./writeSection";
import { validateContent } from "./validate";
import { scaffoldSection } from "./scaffold";
import { addClient, removeClient, broadcast } from "./watcher";

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Origin",
    },
  });
}

function verifySecurity(req: Request): Response | null {
  const host = req.headers.get("host") || "";
  const hostName = host.split(":")[0];
  if (hostName !== "localhost" && hostName !== "127.0.0.1") {
    return json({ error: "Forbidden host" }, 403);
  }

  if (req.method === "PUT" || req.method === "POST" || req.method === "DELETE") {
    const origin = req.headers.get("origin");
    if (origin) {
      try {
        const url = new URL(origin);
        if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
          return json({ error: "Forbidden origin" }, 403);
        }
      } catch {
        return json({ error: "Invalid origin" }, 403);
      }
    }
  }

  return null;
}

function resolveAssetPath(relPath: string): string | null {
  if (!relPath) return null;
  const normalized = relPath.replace(/\\/g, "/");
  if (normalized.startsWith("/")) return null;
  const segments = normalized.split("/");
  if (segments.some((seg) => seg === ".." || seg === "" || seg === ".")) {
    return null;
  }

  const baseDir = path.resolve(getAssetsImgDir());
  const resolved = path.resolve(baseDir, normalized);
  const rel = path.relative(baseDir, resolved);
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;

  return resolved;
}

export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const apiPort = process.env.EDITOR_API_PORT || "3100";
  const vitePort = process.env.EDITOR_VITE_PORT || "5174";
  const viteUrl = `http://127.0.0.1:${vitePort}`;

  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Origin",
      },
    });
  }

  const securityErr = verifySecurity(req);
  if (securityErr) return securityErr;

  // Root landing page redirect to Vite frontend
  if (pathname === "/" || pathname === "/index.html") {
    return new Response(
      `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting to B401 Content Editor...</title>
    <meta http-equiv="refresh" content="0; url=${viteUrl}/" />
  </head>
  <body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #09090b; color: #f4f4f5;">
    <div style="text-align: center; max-width: 480px; padding: 2rem;">
      <h2 style="margin-bottom: 0.5rem;">B401 Content Editor Server</h2>
      <p style="color: #a1a1aa; font-size: 0.9rem; margin-bottom: 1.5rem;">This port (${apiPort}) hosts the backend API. Redirecting you to the web editor interface...</p>
      <a href="${viteUrl}/" style="display: inline-block; padding: 0.6rem 1.2rem; background: #2563eb; color: white; text-decoration: none; border-radius: 0.5rem; font-weight: 600; font-size: 0.9rem;">Open Web Editor</a>
    </div>
    <script>window.location.href = "${viteUrl}/";</script>
  </body>
</html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  try {
    // GET /api/sections
    if (pathname === "/api/sections" && req.method === "GET") {
      const sections = discoverSections();
      return json(sections);
    }

    // GET /api/events
    if (pathname === "/api/events" && req.method === "GET") {
      let clientController: ReadableStreamDefaultController<Uint8Array>;
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          clientController = controller;
          addClient(controller);
          controller.enqueue(
            new TextEncoder().encode(`event: connected\ndata: {"status":"connected"}\n\n`)
          );
        },
        cancel() {
          if (clientController) removeClient(clientController);
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // GET /api/assets/images
    if (pathname === "/api/assets/images" && req.method === "GET") {
      return json({ images: listAssetImages() });
    }

    // GET /api/assets/images/<relative-path>
    const assetImgMatch = pathname.match(/^\/api\/assets\/images\/(.+)$/);
    if (assetImgMatch && req.method === "GET") {
      const relPath = decodeURIComponent(assetImgMatch[1]!);
      const resolved = resolveAssetPath(relPath);
      if (!resolved) {
        return json({ error: "Invalid asset path" }, 400);
      }
      if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
        return json({ error: "Not found" }, 404);
      }
      const file = Bun.file(resolved);
      return new Response(file, {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // POST /api/reload
    if (pathname === "/api/reload" && req.method === "POST") {
      const sections = discoverSections();
      broadcast("sections_updated", sections);
      return json({ success: true, sections });
    }

    // POST /api/validate
    if (pathname === "/api/validate" && req.method === "POST") {
      const report = await validateContent();
      return json(report);
    }

    // POST /api/section (scaffold)
    if (pathname === "/api/section" && req.method === "POST") {
      const body = await req.json();
      await scaffoldSection(body);
      const sections = discoverSections();
      broadcast("sections_updated", sections);
      return json({ success: true, sections });
    }

    // GET /api/members / PUT /api/members
    if (pathname === "/api/members") {
      if (req.method === "GET") {
        const { value: lecturers } = await readSection("lecturers");
        const { value: assistants } = await readSection("assistants");
        const { value: alumni } = await readSection("alumni");
        return json({ lecturers, assistants, alumni });
      }
      if (req.method === "PUT") {
        const body = await req.json();
        if (body.lecturers) await writeSection("lecturers", body.lecturers);
        if (body.assistants) await writeSection("assistants", body.assistants);
        if (body.alumni) await writeSection("alumni", body.alumni);
        return json({ success: true });
      }
    }

    // POST /api/section/:key/diff
    const diffMatch = pathname.match(/^\/api\/section\/([^/]+)\/diff$/);
    if (diffMatch && req.method === "POST") {
      const sectionKey = decodeURIComponent(diffMatch[1]!);
      const body = await req.json();
      const res = await generateSectionDiff(sectionKey, body.value);
      return json(res);
    }

    // GET /api/section/:key
    const sectionMatch = pathname.match(/^\/api\/section\/([^/]+)$/);
    if (sectionMatch && req.method === "GET") {
      const sectionKey = decodeURIComponent(sectionMatch[1]!);
      const res = await readSection(sectionKey);
      return json(res);
    }

    // PUT /api/section/:key
    if (sectionMatch && req.method === "PUT") {
      const sectionKey = decodeURIComponent(sectionMatch[1]!);
      const body = await req.json();
      const res = await writeSection(sectionKey, body.value);
      return json(res);
    }

    return json({ error: "Endpoint not found" }, 404);
  } catch (err: any) {
    console.error("[API Error]", err);
    return json({ error: err.message || "Internal server error" }, 500);
  }
}