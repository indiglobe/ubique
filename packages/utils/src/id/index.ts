import { uid } from "uid/secure";

/**
 * Generates a cryptographically secure, random identifier.
 *
 * @param options - Optional configuration for the generated identifier.
 * @param options.length - The length of the identifier. Defaults to `10`.
 * @returns A randomly generated identifier of the requested length.
 */

export function id(options?: { length: number }) {
  const length = options?.length ?? 10;

  return uid(length);
}
