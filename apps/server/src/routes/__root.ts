import { Hono } from "hono";
import { route as indexRoute } from "@/routes/index";
import { route as apiUploadRoute } from "@/routes/api/upload/index";
import { route as apiMoveRoute } from "@/routes/api/move/index";

const routes = new Hono();

routes.route("/", indexRoute);

routes.route("/api/upload", apiUploadRoute);

routes.route("/api/move", apiMoveRoute);

export { routes };
