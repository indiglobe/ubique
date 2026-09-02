import { UsersTable } from "@/schema";
import { db } from "..";
import { and, eq, getTableColumns, SQL } from "drizzle-orm";

type Tread__OneUser = {
  /**
   * Criteria used to identify the user.
   *
   * Exactly one lookup criterion can be provided:
   * - `userId` — the user's unique ID
   * - `userEmail` — the user's email address
   * - `userName` — the user's username
   */
  queryOptions:
    | { userEmail: string }
    | { userId: string }
    | { userName: string };

  /**
   * Optional fields to return from the user record.
   *
   * Only fields whose value is `true` will be included in the result.
   * If omitted, all user fields are returned.
   */
  selectedFields?: Partial<
    Record<keyof typeof UsersTable.$inferSelect, true>
  >;
};

/**
 * Retrieves a single user from the database using a user ID, email,
 * or username.
 *
 * The lookup criterion is provided through `queryOptions`. Since
 * `queryOptions` is a union type, only one lookup criterion can be
 * provided at a time.
 *
 * By default, all columns from the user record are returned. Specific
 * columns can be selected using the optional `selectedFields` property.
 *
 * @param {Tread__OneUser} options - Options used to query the user.
 * @param {Tread__OneUser["queryOptions"]} options.queryOptions -
 * The criteria used to identify the user. Accepts `userId`, `userEmail`,
 * or `userName`.
 * @param {Tread__OneUser["selectedFields"]} [options.selectedFields] -
 * Optional fields to include in the returned user object. If omitted,
 * all user columns are selected.
 *
 * @returns {Promise<object | null>} The matching user record, or `null`
 * if no user matches the provided lookup criterion.
 *
 * @throws {Error} If the database query fails.
 *
 * @example
 * // Find a user by ID.
 * const user = await read__OneUser({
 *   queryOptions: {
 *     userId: "user_123",
 *   },
 * });
 *
 * @example
 * // Find a user by email.
 * const user = await read__OneUser({
 *   queryOptions: {
 *     userEmail: "john@example.com",
 *   },
 * });
 *
 * @example
 * // Find a user by username.
 * const user = await read__OneUser({
 *   queryOptions: {
 *     userName: "john_doe",
 *   },
 * });
 *
 * @example
 * // Find a user by ID and return only selected fields.
 * const user = await read__OneUser({
 *   queryOptions: {
 *     userId: "user_123",
 *   },
 *   selectedFields: {
 *     id: true,
 *     email: true,
 *     name: true,
 *   },
 * });
 */
export async function read__OneUser(options: Tread__OneUser) {
  const userTableColumns = getTableColumns(UsersTable);

  const { queryOptions, selectedFields } = options;

  const conditions: SQL[] = [];

  if ("userId" in queryOptions) {
    conditions.push(eq(UsersTable.id, queryOptions.userId));
  }

  if ("userEmail" in queryOptions) {
    conditions.push(eq(UsersTable.email, queryOptions.userEmail));
  }

  if ("userName" in queryOptions) {
    conditions.push(eq(UsersTable.name, queryOptions.userName));
  }

  if (conditions.length === 0) {
    return null;
  }

  const filteredFields = selectedFields
    ? Object.fromEntries(
        Object.entries(selectedFields)
          .filter(([, value]) => value)
          .map(([key]) => [
            key,
            userTableColumns[key as keyof typeof userTableColumns],
          ]),
      )
    : userTableColumns;

  const [user] = await db
    .select({ ...filteredFields })
    .from(UsersTable)
    .where(and(...conditions));

  if (!user) {
    return null;
  }

  return user;
}
