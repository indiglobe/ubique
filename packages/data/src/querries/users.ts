import { Table__Users } from "@/schema";
import { db } from "..";
import { eq, getTableColumns } from "drizzle-orm";
import { tryCatch } from "@repo/utils/try-catch";

type TRead__OneUser = {
  identifier: {
    email: string;
  };
};

export async function read__OneUser(options: TRead__OneUser) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { createdAt, updatedAt, tableIdentifierToken, ...rest } =
    getTableColumns(Table__Users);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const baseQuery = db
    .select(rest)
    .from(Table__Users)
    .where(eq(Table__Users.email, options.identifier.email));

  const [queryError, queryResponse] = await tryCatch(baseQuery);

  if (queryError) {
    console.log(`Error in queryError in read__OneUser`);
    throw queryError;
  }

  const [user] = queryResponse;

  return user ? user : null;
}
