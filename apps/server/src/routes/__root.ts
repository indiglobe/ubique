import { Hono } from "hono";
import { route as indexRoute } from "./index.js";

const routes = new Hono();

routes.route("/", indexRoute);

export { routes };
