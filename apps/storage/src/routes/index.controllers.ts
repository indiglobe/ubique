import { Hono } from "hono";

export const indexRoutes = new Hono();

indexRoutes.get("/", (c) => {
  return c.text("Hiii index");
});
