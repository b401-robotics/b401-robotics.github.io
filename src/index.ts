import { serve } from "bun";
import index from "./index.html";

const server = serve({
  port: 3001,
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/chat": {
      async POST(req) {
        const targetUrl =
          process.env.VITE_CHATBOT_API_URL ||
          process.env.CHATBOT_API_URL ||
          "https://b401-chatbot.b431.workers.dev/api/chat";

        try {
          const body = await req.text();
          const res = await fetch(targetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          });

          return new Response(res.body, {
            status: res.status,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Failed to connect to backend worker";
          return Response.json({ error: msg }, { status: 502 });
        }
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
