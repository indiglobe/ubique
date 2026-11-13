import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { routes } from "@/routes/__root";
import { Server } from "socket.io";
import type { Server as HTTPServer } from "node:http";
import registerChat from "@/socket-namespace/coordination";
import { env } from "@repo/env/server";

const PORT = Number(process.env.PORT) || 3000;

const app = new Hono();

app.route("/", routes);

const httpServer = serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

const io = new Server(httpServer as HTTPServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "development"
        ? "*"
        : new URL(env.WEB_APP_HOST).hostname,
  },
});

registerChat(io);
