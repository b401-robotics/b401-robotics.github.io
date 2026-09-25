import { handleRequest } from "./routes";
import { startWatcher } from "./watcher";

// Defense-in-depth: Never run in production
if (process.env.NODE_ENV === "production") {
  console.error("Content Editor is strictly dev-only and cannot run when NODE_ENV is production.");
  process.exit(1);
}

const HOST = "127.0.0.1";
const START_PORT = Number(process.env.EDITOR_API_PORT || 3100);
const MAX_PORT_TRIES = 50;

startWatcher();

function isPortInUseError(err: any): boolean {
  if (!err) return false;
  if (err.code === "EADDRINUSE" || err.code === "EACCES") return true;
  const msg = String(err.message || err);
  return (
    msg.includes("EADDRINUSE") ||
    msg.toLowerCase().includes("address already in use") ||
    msg.toLowerCase().includes("is port") // Bun's wording: "Failed to start server. Is port XXXX in use?"
  );
}

let server: ReturnType<typeof Bun.serve> | null = null;
let lastError: any = null;

for (let i = 0; i < MAX_PORT_TRIES; i++) {
  const port = START_PORT + i;
  try {
    server = Bun.serve({
      port,
      hostname: HOST,
      fetch(req) {
        return handleRequest(req);
      },
    });
    if (port !== START_PORT) {
      console.log(`[Content Editor Server] Port ${START_PORT} busy; using ${port} instead.`);
    }
    console.log(`[Content Editor Server] Running on http://${HOST}:${server.port}`);
    break;
  } catch (err: any) {
    lastError = err;
    if (isPortInUseError(err)) {
      continue;
    }
    throw err;
  }
}

if (!server) {
  console.error(
    `[Content Editor Server] Failed to bind after ${MAX_PORT_TRIES} attempts starting at ${START_PORT}.`,
    lastError
  );
  process.exit(1);
}

export default server;