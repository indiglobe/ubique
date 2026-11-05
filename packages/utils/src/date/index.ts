/**
 * Extracts the month name from a JavaScript Date object.
 *
 * @param date - The date from which to extract the month name.
 * @param format - The desired month representation:
 *   - `"long"`: Full month name (e.g., `"January"`).
 *   - `"short"`: Abbreviated month name (e.g., `"Jan"`).
 *   - `"narrow"`: Single-character month representation (e.g., `"J"`).
 * @param locale - The locale used to format the month name. Defaults to `"en-IN"`.
 * @returns The formatted month name according to the specified locale and format.
 *
 * @example
 * extractMonthName(new Date("2026-01-15"));
 * // Returns: "January"
 *
 * @example
 * extractMonthName(new Date("2026-01-15"), "short");
 * // Returns: "Jan"
 *
 * @example
 * extractMonthName(new Date("2026-01-15"), "narrow");
 * // Returns: "J"
 *
 * @example
 * extractMonthName(new Date("2026-01-15"), "long", "en-US");
 * // Returns: "January"
 */
function extractMonthName(
  date: Date,
  format: "long" | "short" | "narrow" = "long",
  locale = "en-IN",
): string {
  return new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(date);
}

/**
 * Formats a date into a localized, human-readable date string.
 *
 * Uses the `en-IN` locale with a two-digit day, abbreviated month name,
 * and four-digit year.
 *
 * @param value - The date to format, provided as a JavaScript Date object
 *   or a date string accepted by the Date constructor.
 * @returns The formatted date string in `DD MMM YYYY` style.
 *
 * @example
 * formatDate("2026-01-15");
 * // Returns: "15 Jan 2026"
 *
 * @example
 * formatDate(new Date("2026-12-05"));
 * // Returns: "05 Dec 2026"
 */
function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

/**
 * Formats a date and time into a localized, human-readable date-time string.
 *
 * Uses the `en-IN` locale with a two-digit day, abbreviated month name,
 * four-digit year, and two-digit hour and minute.
 *
 * @param value - The date-time string accepted by the JavaScript Date constructor.
 * @returns The formatted date-time string containing the date and time.
 *
 * @example
 * formatDateTime("2026-01-15T14:30:00");
 * // Returns: "15 Jan 2026, 02:30 pm"
 *
 * @example
 * formatDateTime("2026-12-05T09:05:00");
 * // Returns: "05 Dec 2026, 09:05 am"
 */
function formatDateTime(value: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export { extractMonthName, formatDate, formatDateTime };
