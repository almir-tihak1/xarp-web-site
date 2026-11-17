// The site can be served from a sub-folder (GitHub Pages: https://<owner>.github.io/<repo>/, see next.config.ts).
// next/link adds that folder by itself; everything else that starts with "/" goes through these helpers:
// images from public/ and plain <a> links.

/** "" normally, "/<repo>" on a GitHub Pages project site. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** withBasePath("/images/a.jpg") → "/<repo>/images/a.jpg". Full URLs, "#…" and "mailto:" stay unchanged. */
export function withBasePath(url: string) {
  return basePath && url.startsWith("/") && !url.startsWith("//") ? basePath + url : url;
}

/** The same for every src="/…" and href="/…" in HTML rendered from Markdown. */
export function withBasePathInHtml(html: string) {
  return basePath ? html.replace(/\b(src|href)="\/(?!\/)/g, `$1="${basePath}/`) : html;
}
