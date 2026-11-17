"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import Logo from "./Logo";
import { withBasePath } from "@/lib/base-path";
import { localePath, locales, switchLocale, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  links: { href: string; label: string }[];
  menuLabel: string;
  languageLabel: string;
  languageLinksToHome?: boolean;
};

export default function Header({ locale, links, menuLabel, languageLabel, languageLinksToHome }: Props) {
  const currentPath = usePathname();
  // Language links point at this page in the other language (or at the home page, see SiteLayout).
  const pathname = languageLinksToHome ? "/" : currentPath;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const blogHref = localePath(locale, "/blog/");

  return (
    <header>
      <div className="wrap nav">
        <Logo locale={locale} />
        <ul id="menu" className={open ? "open" : undefined}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={link.href === blogHref && currentPath.startsWith(blogHref.slice(0, -1)) ? "active" : undefined}
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="menu-lang">
            <LanguageLinks locale={locale} pathname={pathname} />
          </li>
        </ul>
        <div className="nav-right">
          <div className="lang" role="group" aria-label={languageLabel}>
            <LanguageLinks locale={locale} pathname={pathname} separator=" / " />
          </div>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            {menuLabel}
          </button>
        </div>
      </div>
    </header>
  );
}

// "EN / DE": the current language as plain text, the others link to the same page in that language.
// Plain <a> on purpose: every language has its own root layout, so this is a full page load anyway.
function LanguageLinks({ locale, pathname, separator }: { locale: Locale; pathname: string; separator?: string }) {
  return locales.map((l, i) => (
    <Fragment key={l}>
      {separator && i > 0 && separator}
      {l === locale ? (
        <span className="on">{l.toUpperCase()}</span>
      ) : (
        <a href={withBasePath(switchLocale(pathname, l))} hrefLang={l} lang={l}>
          {l.toUpperCase()}
        </a>
      )}
    </Fragment>
  ));
}
