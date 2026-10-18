import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { read__OneUser } from "@repo/data/querries/users";
import { tryCatch } from "@repo/utils/try-catch";
import { verifyPassword } from "@repo/utils/password";
import { setUserDetailsCookie } from "@/integrations/auth/session";

export const serverFn__loginUser = createServerFn()
  .validator(z.object({ email: z.string(), password: z.string() }))
  .handler(async ({ data }): Promise<{ success: boolean; message: string }> => {
    const { email, password } = data;

    const [queryError, queryResponse] = await tryCatch(
      read__OneUser({ identifier: { email }, include: { password } }),
    );

    if (queryError) {
      console.log(`Error in queryError in serverFn__loginUser`);
      throw queryError;
    }

    const userDetails = queryResponse;

    if (!userDetails) {
      return { success: false, message: "No user exists." };
    }

    const [passwordComparisonError, isValidPassword] = await tryCatch(
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      verifyPassword(password, userDetails.password!),
    );

    if (passwordComparisonError) {
      console.log(`Error in passwordComparisonError in serverFn__loginUser`);
      throw passwordComparisonError;
    }

    if (isValidPassword) {
      const {
        avatarUrl,
        email: userEmail,
        employeeCode,
        id,
        name,
        organizationId,
        phone,
        status,
        username,
        role,
      } = userDetails;

      await setUserDetailsCookie({
        data: {
          avatarUrl: avatarUrl!,
          email: userEmail,
          employeeCode,
          fullName: name,
          organizationId: organizationId ?? "",
          phone,
          role,
          status,
          userId: id,
          username,
        },
      });

      return { message: "Sucessful login", success: true };
    }

    return { message: "Wrong password", success: false };
  });
