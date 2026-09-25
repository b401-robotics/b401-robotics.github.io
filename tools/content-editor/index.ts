import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";

const editorDir = import.meta.dir;
const rootDir = path.resolve(editorDir, "../..");
const HOST = "127.0.0.1";

function isPortFree(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once("error", () => resolve(false));
    tester.once("listening", () => {
      tester.close(() => resolve(true));
    });
    tester.listen(port, HOST);
  });
}

async function findFreePort(startPort: number, maxTries = 50): Promise<number> {
  for (let i = 0; i < maxTries; i++) {
    const port = startPort + i;
    if (await isPortFree(port)) return port;
  }
  throw new Error(`No free port found starting from ${startPort} (tried ${maxTries}).`);
}

const requestedApiPort = Number(process.env.EDITOR_API_PORT || 3100);
const requestedVitePort = Number(process.env.EDITOR_VITE_PORT || 5174);

const apiPort = await findFreePort(requestedApiPort);
const vitePort = await findFreePort(requestedVitePort);

console.log("=========================================");
console.log("   B401 Bilingual Content Editor         ");
console.log("=========================================");
if (apiPort !== requestedApiPort) {
  console.log(`   API port ${requestedApiPort} busy -> using ${apiPort}`);
}
if (vitePort !== requestedVitePort) {
  console.log(`   Vite port ${requestedVitePort} busy -> using ${vitePort}`);
}
console.log(`   API:  http://${HOST}:${apiPort}`);
console.log(`   Web:  http://${HOST}:${vitePort}`);
console.log("=========================================");

const sharedEnv = {
  ...process.env,
  NODE_ENV: "development",
  EDITOR_API_PORT: String(apiPort),
  EDITOR_VITE_PORT: String(vitePort),
};

// 1. Start Server
const serverProc = spawn("bun", ["run", path.join(editorDir, "server/index.ts")], {
  cwd: editorDir,
  stdio: "inherit",
  env: sharedEnv,
});

// 2. Start Vite
const viteProc = spawn("bunx", ["vite", "--config", path.join(editorDir, "vite.config.ts"), editorDir], {
  cwd: editorDir,
  stdio: "inherit",
  env: sharedEnv,
});

const cleanup = () => {
  console.log("\nShutting down Content Editor...");
  serverProc.kill("SIGTERM");
  viteProc.kill("SIGTERM");
  process.exit(0);
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

// Attempt to open browser after short delay
setTimeout(() => {
  const url = `http://${HOST}:${vitePort}`;
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  try {
    spawn(cmd, [url], { stdio: "ignore", detached: true });
  } catch {}
}, 2000);