// Languages the site is published in. English lives at the root (/, /blog/…), every other
// language under its own prefix (/de/, /de/blog/…). The texts themselves are in lib/dictionaries/.
// This file only has routing helpers, so client components can import it without pulling in translations.

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** localePath("de", "/blog/") → "/de/blog/". English paths come back unchanged. */
export function localePath(locale: Locale, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** "/de/blog/x/" → "/blog/x/" */
function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (locale !== defaultLocale && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname;
}

/** The same page in another language: switchLocale("/de/blog/x/", "en") → "/blog/x/". */
export function switchLocale(pathname: string, to: Locale): string {
  const path = stripLocale(pathname);
  return localePath(to, path.endsWith("/") ? path : `${path}/`);
}

/** Fills "{name}"-style placeholders in a translated text. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** Canonical URL plus hreflang links for a page that exists in every language. */
export function alternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
      "x-default": path,
    },
  };
}
