import type { NextConfig } from "next";

// Sub-folder the site is served from. Empty locally, on https://xarp-tec.github.io/ and on a custom domain;
// "/<repo>" when GitHub Pages serves it as https://<owner>.github.io/<repo>/
// (set by .github/workflows/deploy-pages.yml).
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static site: `npm run build` writes plain HTML/CSS/JS to `out/`,
  // which can be uploaded to any static host (GitHub Pages, Cloudflare Pages, Netlify, FTP...).
  output: "export",
  // next/link adds this by itself; images and plain <a> links use lib/base-path.ts.
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Emit `/blog/slug/index.html` so pretty URLs work on every web server.
  trailingSlash: true,
  images: { unoptimized: true },
  // Pin the project root (there is a stray package-lock.json higher up in the user folder).
  turbopack: { root: __dirname },
  // Hide the "N" dev-mode indicator; compile/runtime errors still show up in an overlay.
  devIndicators: false,
  // Every language has its own root layout, so the 404 page is app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
