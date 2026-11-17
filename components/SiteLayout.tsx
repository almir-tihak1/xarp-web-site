import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/fonts.css";
import "@/app/globals.css";
import BulbSprite from "./BulbSprite";
import Footer from "./Footer";
import Header from "./Header";
import RevealOnScroll from "./RevealOnScroll";
import { getDictionary, getNavLinks } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// The page frame shared by every language. Each language has its own root layout
// (app/(en)/layout.tsx and app/de/layout.tsx) that renders this with its locale,
// so <html lang> is always right. Switching languages therefore reloads the page.

export function siteMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: `%s — ${site.name}` },
    description: meta.description,
    openGraph: { siteName: site.name, type: "website", locale: meta.ogLocale },
  };
}

type Props = {
  locale: Locale;
  children: ReactNode;
  /** The 404 page has no translated twin, so its language links go to each home page. */
  languageLinksToHome?: boolean;
};

export default function SiteLayout({ locale, children, languageLinksToHome }: Props) {
  const { nav } = getDictionary(locale);

  return (
    // `data-scroll-behavior` keeps the CSS smooth scrolling for #anchors but jumps instantly between pages.
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* This renders inside the root layouts; the lint rule only recognises <head> in files named layout. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Runs before first paint: lets the CSS hide `.reveal` elements until they scroll into view. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before React hydrates.
          This only silences mismatches on <body>'s own attributes, not its children. */}
      <body suppressHydrationWarning>
        <BulbSprite />
        <Header
          locale={locale}
          links={getNavLinks(locale)}
          menuLabel={nav.menu}
          languageLabel={nav.language}
          languageLinksToHome={languageLinksToHome}
        />
        <main id="top">{children}</main>
        <Footer locale={locale} />
        <RevealOnScroll />
      </body>
    </html>
  );
}
