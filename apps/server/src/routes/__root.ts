import { Hono } from "hono";
import { route as indexRoute } from "@/routes/index";

const routes = new Hono();

routes.route("/", indexRoute);

export { routes };
