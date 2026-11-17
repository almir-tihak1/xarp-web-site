import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, locales } from "@/lib/i18n";

// The 404 page for any URL that does not exist (out/404.html after `npm run build`).
// With one root layout per language there is no shared layout to build it from, so it renders
// the English frame and offers every language's home page (enabled by experimental.globalNotFound).

export const metadata: Metadata = {
  title: "404 — Xarp Tec",
};

export default function GlobalNotFound() {
  const t = getDictionary("en").notFound;

  return (
    <SiteLayout locale="en" languageLinksToHome>
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">404</div>
          <h1>{t.title}</h1>
          <p>{t.text}</p>
          <p lang="de">{getDictionary("de").notFound.title}</p>
          <div className="hero-actions">
            {locales.map((locale, i) => (
              <Link
                key={locale}
                href={localePath(locale, "/")}
                className={i === 0 ? "btn" : "btn btn-ghost"}
                hrefLang={locale}
                lang={locale}
              >
                {getDictionary(locale).notFound.home} {i === 0 && <span aria-hidden="true">→</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
