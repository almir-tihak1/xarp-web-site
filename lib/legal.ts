// Legal pages live as Markdown in content/legal/<locale>/<page>.md, read at build time like the blog.
// Every "## heading" becomes a section with an id, listed in the page's table of contents.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { withBasePathInHtml } from "./base-path";
import type { Locale } from "./i18n";

const LEGAL_DIR = path.join(process.cwd(), "content", "legal");

/** File names in content/legal/<locale>/ — also the URLs: /privacy-policy/, /de/privacy-policy/, … */
export type LegalDoc = "privacy-policy" | "terms-conditions";

export type LegalPage = {
  title: string;
  /** Optional subtitle under the heading */
  description?: string;
  /** Optional "last updated" date, ISO, e.g. "2026-11-14" */
  updated?: string;
  /** <meta name="description">: `description`, or else the start of the text */
  metaDescription: string;
  html: string;
  sections: { id: string; title: string }[];
};

function decodeEntities(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** "7. Ihre Rechte" → "7-ihre-rechte" */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getLegalPage(doc: LegalDoc, locale: Locale): LegalPage {
  const file = path.join(LEGAL_DIR, locale, `${doc}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const fm = data as Partial<Pick<LegalPage, "title" | "description" | "updated">>;

  if (!fm.title) {
    throw new Error(`content/legal/${locale}/${doc}.md: "title" is required in the frontmatter`);
  }

  const sections: LegalPage["sections"] = [];
  const html = withBasePathInHtml(marked.parse(content, { async: false })).replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => {
    const title = decodeEntities(inner);
    const id = slugify(title);
    sections.push({ id, title });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // gray-matter turns unquoted YAML dates into Date objects
  const updated =
    fm.updated === undefined
      ? undefined
      : (fm.updated as unknown) instanceof Date
        ? (fm.updated as unknown as Date).toISOString().slice(0, 10)
        : String(fm.updated);

  const firstParagraph = decodeEntities(html.match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? "").trim();
  const metaDescription =
    fm.description ??
    (firstParagraph.length <= 160
      ? firstParagraph
      : firstParagraph.slice(0, firstParagraph.lastIndexOf(" ", 160)).replace(/[\s,.;:]+$/, "") + "…");

  return { title: fm.title, description: fm.description, updated, metaDescription, html, sections };
}
