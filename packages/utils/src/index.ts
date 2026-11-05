/**
 * Extracts the initials from a person's name using the first two words.
 *
 * Leading and trailing whitespace is ignored, and consecutive whitespace
 * characters are treated as a single separator.
 *
 * @param name - The person's full name.
 * @returns The uppercase initials of the first two name parts.
 *
 * @example
 * getInitials("John Doe");
 * // Returns: "JD"
 *
 * @example
 * getInitials("John Michael Doe");
 * // Returns: "JM"
 *
 * @example
 * getInitials("  Jane   Smith  ");
 * // Returns: "JS"
 *
 * @example
 * getInitials("alex");
 * // Returns: "A"
 */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export {
  //
  getInitials,
};
