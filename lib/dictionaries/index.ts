// Use from Server Components only; client components get the texts they need as props,
// so the translations never end up in the browser's JavaScript.
import { localePath, type Locale } from "@/lib/i18n";
import { de } from "./de";
import { en, type Dictionary } from "./en";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Main menu, shared by the header and the footer. */
export function getNavLinks(locale: Locale) {
  const { nav } = getDictionary(locale);
  return [
    { href: localePath(locale, "/#about"), label: nav.about },
    { href: localePath(locale, "/#services"), label: nav.services },
    { href: localePath(locale, "/#technologies"), label: nav.technologies },
    { href: localePath(locale, "/blog/"), label: nav.blog },
    { href: localePath(locale, "/#contact"), label: nav.contact },
  ];
}
