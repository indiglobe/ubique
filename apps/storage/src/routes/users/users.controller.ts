import { Hono } from "hono";
import { getOneUser, QueryParamError } from "./users.services";
import { tryCatch } from "@repo/utils/try-catch";

export const usersRoutes = new Hono();

// GET /users/:identifier
usersRoutes.get("/:identifier", async (c) => {
  const [err, user] = await tryCatch(getOneUser(c));

  if (err) {
    if (err instanceof QueryParamError) return c.json(err.toJSON(), 406);

    return c.text("Something went wrong, try again", 500);
  }

  return c.json(user);
});
