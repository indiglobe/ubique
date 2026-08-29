import { z } from "zod";

/**
 * Zod validation schema for the welcome form.
 *
 * Defines the expected shape and types of the data submitted through
 * the welcome form.
 */
export const welcomeFormSchema = z.object({
  /** Full name of the user. */
  name: z.string(),

  /** Email address of the user. */
  email: z.email(),

  /** Age of the user. */
  age: z.number(),

  /** Phone number of the user. */
  phoneNo: z.number(),

  /** Optional referral code provided by the user. */
  referralCode: z.string(),

  /** URL of the user's avatar image. */
  avatarImageUrl: z.string(),
});

/**
 * TypeScript type inferred from {@link welcomeFormSchema}.
 *
 * Keeps the TypeScript representation synchronized with the Zod validation
 * schema.
 */
export type TWelcomeFormSchema = z.infer<typeof welcomeFormSchema>;
