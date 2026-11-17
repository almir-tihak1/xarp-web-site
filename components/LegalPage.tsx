import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { formatDate } from "@/lib/format";
import { alternates, fill, type Locale } from "@/lib/i18n";
import { getLegalPage, type LegalDoc } from "@/lib/legal";

// Privacy policy and terms, in every language: app/(en)/<doc>/page.tsx and app/de/<doc>/page.tsx.
// The text itself is in content/legal/<locale>/<doc>.md.

export function legalMetadata(doc: LegalDoc, locale: Locale): Metadata {
  const page = getLegalPage(doc, locale);
  return { title: page.title, description: page.metaDescription, alternates: alternates(locale, `/${doc}/`) };
}

export default function LegalPage({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  const page = getLegalPage(doc, locale);
  const t = getDictionary(locale).legal;
  // A table of contents only helps once the text has several "## " sections.
  const showToc = page.sections.length > 1;
  const body = <div className="prose legal-body" dangerouslySetInnerHTML={{ __html: page.html }} />;

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{page.title}</h1>
          {page.description && <p>{page.description}</p>}
          {page.updated && (
            <div className="post-meta">{fill(t.updated, { date: formatDate(page.updated, locale, "long") })}</div>
          )}
        </div>
      </div>
      <section className="legal">
        {showToc ? (
          <div className="wrap legal-grid">
            <nav className="legal-toc" aria-label={t.toc}>
              <div className="legal-toc-title">{t.toc}</div>
              <ul>
                {page.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            {body}
          </div>
        ) : (
          <div className="wrap">{body}</div>
        )}
      </section>
    </>
  );
}
