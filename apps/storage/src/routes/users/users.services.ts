import { read__OneUser } from "@repo/data/querries/users";
import { read__OneUserSchema } from "@repo/data/validators/users";
import { tryCatch } from "@repo/utils/try-catch";
import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";
import z from "zod";

/**
 * Schema describing the fields that can be requested through the
 * `fields` query parameter.
 *
 * The schema is derived from `read__OneUserSchema.selectedFields`
 * to ensure that the API-level validation stays synchronized with
 * the underlying user query schema.
 *
 * @example
 * `fields=["id","email","username"]`
 */
export const fieldsSchema = read__OneUserSchema.shape.selectedFields
  .unwrap()
  .optional();

/**
 * Schema defining the supported identifiers that can be used to
 * locate a user.
 *
 * Supported identifiers:
 * - `id` - User's unique ID.
 * - `email` - User's email address.
 * - `username` - User's username.
 *
 * Defaults to `id` when no identifier is explicitly provided.
 */
export const identifierSchema = z
  .enum(["email", "username", "id"])
  .default("id");

/**
 * Schema for validating supported query parameters used by the
 * user lookup endpoint.
 *
 * @property field
 * Optional list of user fields to return.
 *
 * @property identifier
 * Determines which user property should be used for lookup.
 */
export const allowedQueryParamSchema = z.object({
  field: fieldsSchema,
  identifier: identifierSchema,
});

/**
 * Inferred TypeScript type representing the validated query parameters
 * accepted by the user lookup endpoint.
 */
export type TAllowedQueryParamSchema = z.infer<typeof allowedQueryParamSchema>;

/**
 * Error thrown when a user lookup query parameter is invalid.
 *
 * This error extends the native `Error` class and additionally exposes
 * the expected query-parameter structure through `allowedQueryParamType`.
 *
 * @extends Error
 *
 * @example
 * ```ts
 * throw new QueryParamError("Invalid identifier query parameter");
 * ```
 */
export class QueryParamError extends Error {
  /**
   * Represents the expected structure/type of the supported query
   * parameters.
   */
  public readonly allowedQueryParamType: TAllowedQueryParamSchema;

  /**
   * Creates a new {@link QueryParamError}.
   *
   * @param message - Human-readable description of the validation failure.
   * @param allowedQueryParamType - Expected structure of the supported
   * query parameters.
   */
  constructor(
    message = "Invalid fields query parameter",
    allowedQueryParamType: TAllowedQueryParamSchema = {} as TAllowedQueryParamSchema,
  ) {
    super(message);

    /**
     * Assign a custom error name so consumers can distinguish this
     * error from generic JavaScript errors.
     */
    this.name = "QueryParamError";

    /**
     * Store the expected query-parameter type so it can be exposed
     * to error handlers or API responses.
     */
    this.allowedQueryParamType = allowedQueryParamType;
  }

  /**
   * Converts the error into a JSON-serializable representation.
   *
   * This is useful when the error is returned from an API error
   * handler or logged as structured data.
   *
   * @returns JSON-compatible representation of the error.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      allowedQueryParamType: this.allowedQueryParamType,
    };
  }
}

/**
 * Retrieves a single user's details based on a route identifier and
 * optional query parameters.
 *
 * The route identifier is obtained from `/:identifier`. The
 * `identifier` query parameter determines which user property should
 * be used for the lookup (`id`, `email`, or `username`).
 *
 * The optional `fields` query parameter can be used to restrict the
 * fields returned by the underlying user query.
 *
 * @param c - Hono request context containing the route and query
 * parameters.
 *
 * @returns A promise resolving to the user details returned by
 * {@link read__OneUser}.
 *
 * @throws {@link QueryParamError}
 * Thrown when the `fields` query parameter contains invalid JSON or
 * does not satisfy the fields schema.
 *
 * @throws {@link QueryParamError}
 * Thrown when the `identifier` query parameter is not one of the
 * supported identifier types.
 *
 * @throws
 * Propagates errors thrown by {@link read__OneUser}.
 *
 * @example
 * ```ts
 * // GET /users/123
 * // Uses the default identifier: "id"
 *
 * // GET /users/john?identifier=username
 * // Looks up the user using their username.
 *
 * // GET /users/john@example.com?identifier=email&fields=["id","username"]
 * // Looks up the user by email and returns only the requested fields.
 * ```
 */
export async function getOneUser(
  c: Context<BlankEnv, "/:identifier", BlankInput>,
) {
  /**
   * Initialize the options passed to the underlying user query.
   *
   * The object starts empty and is populated with `selectedFields`
   * when a valid `fields` query parameter is provided.
   */
  const options: z.infer<typeof read__OneUserSchema> = {} as z.infer<
    typeof read__OneUserSchema
  >;

  /**
   * Read the route identifier and optional query parameters from
   * the incoming HTTP request.
   *
   * `identifier` is the actual value used to find the user, while
   * `identifierQuery` determines which user property that value
   * represents.
   */
  const { identifier } = c.req.param();
  const fieldsQuery = c.req.query("fields");
  const identifierQuery = c.req.query("identifier");

  /**
   * Parse and validate the optional `fields` query parameter.
   *
   * The parameter is expected to contain a JSON-encoded value because
   * query parameters are received as strings.
   */
  if (fieldsQuery) {
    /**
     * Safely parse the JSON value so malformed JSON can be converted
     * into a domain-specific {@link QueryParamError}.
     */
    const [jsonParseError, fields] = tryCatch(() => JSON.parse(fieldsQuery));

    /**
     * Reject the request when the `fields` query parameter contains
     * malformed JSON.
     */
    if (jsonParseError) {
      throw new QueryParamError(
        "The 'fields' query parameter must contain valid JSON",
      );
    }

    /**
     * Validate the parsed fields against the allowed fields schema.
     *
     * `safeParse` is used so validation failures can be handled
     * explicitly instead of throwing a Zod error immediately.
     */
    const parsedFields = fieldsSchema.safeParse(fields);

    /**
     * Reject fields that do not conform to the expected schema.
     */
    if (parsedFields.error) {
      throw new QueryParamError("Invalid fields query parameter");
    }

    /**
     * Store the validated fields in the options passed to the
     * underlying user query.
     */
    options.selectedFields = parsedFields.data;
  }

  /**
   * Validate the optional identifier type.
   *
   * The identifier schema defaults to `id` when the query parameter
   * is undefined.
   */
  const parsedIdentifier = identifierSchema.safeParse(identifierQuery);

  /**
   * Reject unsupported identifier types before constructing the
   * database query.
   */
  if (parsedIdentifier.error) {
    throw new QueryParamError("Invalid identifier query parameter");
  }

  /**
   * Map the validated identifier type to the corresponding property
   * expected by the user query layer.
   *
   * The `as const` assertion preserves the exact keys and value types,
   * allowing TypeScript to safely index this mapping using the parsed
   * identifier.
   */
  const queryOptionsByIdentifier = {
    id: { userId: identifier },
    email: { userEmail: identifier },
    username: { userName: identifier },
  } as const;

  /**
   * Execute the user lookup with the validated query options.
   *
   * `tryCatch` converts a rejected promise into an error/value tuple,
   * allowing the function to explicitly propagate the original error.
   */
  const [userQuerryError, userDetails] = await tryCatch(
    read__OneUser({
      ...options,
      queryOptions: queryOptionsByIdentifier[parsedIdentifier.data],
    }),
  );

  /**
   * Propagate errors from the underlying user query layer.
   */
  if (userQuerryError) {
    throw userQuerryError;
  }

  /**
   * Return the successfully retrieved user details.
   */
  return userDetails;
}
