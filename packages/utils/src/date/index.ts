/**
 * Extract the month name from a Date.
 *
 * @param date - JavaScript Date object
 * @param format - Month format ("long", "short", or "narrow")
 * @param locale - Locale used for formatting (defaults to "en-US")
 * @returns Month name (e.g. "January", "Jan", or "J")
 */
export function extractMonthName(
  date: Date,
  format: "long" | "short" | "narrow" = "long",
  locale = "en-US",
): string {
  return new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(date);
}
