import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { routes } from "@/routes/__root";
import { Server } from "socket.io";
import registerChat from "@/socket-namespace/coordination";
import { env } from "@repo/env/server";
import { cors } from "hono/cors";

const PORT = Number(process.env.PORT) || 3000;

const app = new Hono();

app.use(
  "*",
  cors({
    origin: [env.WEB_APP_HOST, env.STORAGE_APP_HOST],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  }),
);

app.route("/", routes);

const httpServer = serve({
  fetch: app.fetch,
  port: PORT,
  hostname: "0.0.0.0",
});

const io = new Server(httpServer, {
  cors: {
    origin: [env.WEB_APP_HOST, env.STORAGE_APP_HOST],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.engine.on("connection_error", (err) => {
  console.error("Socket.IO connection error:", {
    code: err.code,
    message: err.message,
    context: err.context,
  });
});

httpServer.on("listening", () => {
  console.log(`Server listening on port ${PORT}`);
});

registerChat(io);

export { app };
