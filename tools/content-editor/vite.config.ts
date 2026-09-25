import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apiPort = Number(process.env.EDITOR_API_PORT || 3100);
const vitePort = Number(process.env.EDITOR_VITE_PORT || 5174);
// If the parent orchestrator (index.ts) already reserved a free Vite port,
// pin it so the proxy target and printed URL stay in sync. Otherwise, let
// Vite fall back to its default auto-increment behaviour.
const strictPort = Boolean(process.env.EDITOR_VITE_PORT);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: vitePort,
    strictPort,
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${apiPort}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});