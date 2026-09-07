import { Hono } from "hono";
import { indexRoutes } from "./index.controllers";
import { usersRoutes } from "./users/users.controller";
import { uploadRoutes } from "./upload/upload.contoller";

/**
 * Root application route collection.
 *
 * Registers the application's top-level route groups for:
 * - Index/root endpoints
 * - User-related endpoints
 * - File upload endpoints
 *
 * `strict: false` allows Hono to handle routes without requiring
 * a trailing slash to match exactly.
 *
 */
const routes = new Hono({ strict: false });

/**
 * Registers the root/index routes.
 */
routes.route("/", indexRoutes);

/**
 * Registers user-related routes under the `/users` prefix.
 */
routes.route("/users", usersRoutes);

/**
 * Registers file upload routes under the `/upload` prefix.
 */
routes.route("/upload", uploadRoutes);

/**
 * Exported application route collection.
 *
 * @type {Hono}
 */
export { routes };
