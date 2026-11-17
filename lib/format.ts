// Kept separate from lib/posts.ts (which reads files with Node's fs) so client components can use it.
import type { Locale } from "./i18n";

const intlLocales: Record<Locale, string> = { en: "en-GB", de: "de-DE" };
const styles = {
  short: { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
  long: { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

/**
 * "2026-11-03" → short: "3 Nov 2026" / "3. Nov. 2026"; long: "3 November 2026" / "3. November 2026"
 */
export function formatDate(iso: string, locale: Locale, style: keyof typeof styles = "short") {
  return new Intl.DateTimeFormat(intlLocales[locale], styles[style]).format(new Date(`${iso}T00:00:00Z`));
}
