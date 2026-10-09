import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { routes } from "./routes/__root.js";
import { cors } from "hono/cors";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  }),
);

app.route("/", routes);

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
