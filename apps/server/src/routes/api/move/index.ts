import { Hono } from "hono";
import z from "zod";

const route = new Hono();

const routeSearchParams = z.object({
  "current-location": z.url(),
  "final-location": z.url(),
});

route.get("/", async (c) => {
  const { url } = c.req;

  const searchParamsObject = Object.fromEntries(new URL(url).searchParams);

  const parsedSearchParamsObject =
    routeSearchParams.safeParse(searchParamsObject);

  if (parsedSearchParamsObject.error) {
    return c.json(
      {
        message:
          "Required data is not present. Please provide 'current-location' and 'final-location' ",
      },
      404,
    );
  }

  // const {
  //   "current-location": currentLocation,
  //   "final-location": finalLocation,
  // } = parsedSearchParamsObject.data;

  return c.text("Hello");
});

export { route };
