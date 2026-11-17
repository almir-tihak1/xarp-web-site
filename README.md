# Xarp Tec website

The new xarp-tec.com website: Next.js 16 (React 19, TypeScript), exported as a **fully static site**.
It was built by turning an HTML draft (a Claude artifact) into React components. The design and texts match the draft.

## Getting started

```bash
npm install
npm run dev      # development server on http://localhost:3000
npm run build    # finished site in the out/ folder
```

The contents of `out/` can be uploaded to any static host: GitHub Pages, Cloudflare Pages, Netlify or plain FTP
hosting. No server is needed.

## Publishing (GitHub Pages)

`.github/workflows/deploy-pages.yml` builds the site and publishes it on GitHub Pages after every push to `main`,
including a new blog post added through the GitHub website or Pages CMS.

One-time setup in the repository:

1. The repository must be **public** (GitHub Pages for private repositories needs a paid plan).
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Actions → "Deploy to GitHub Pages" → **Run workflow** (or push to `main`).

The address is shown in Settings → Pages. For a repository such as `owner/xarp-web-site` it is
`https://owner.github.io/xarp-web-site/`; the workflow passes that sub-folder to the build (`PAGES_BASE_PATH`),
so links and images work there as well as on a custom domain.

Optional: to make the contact form send messages, add a repository variable `CONTACT_ENDPOINT`
(Settings → Secrets and variables → Actions → Variables), see "Before going live" below.

## Structure

```
app/
  (en)/                 English version: /, /blog/, /blog/<slug>/ ("(en)" does not appear in the URL)
  de/                   German version: /de/, /de/blog/, /de/blog/<slug>/
  global-not-found.tsx  404 page (shared by both languages)
  globals.css           all styles (taken from the draft)
  fonts.css + fonts/    Inter, JetBrains Mono, Montserrat fonts — served locally, nothing is loaded from Google
components/
  SiteLayout.tsx        shared frame: header, footer, animations
  HomePage.tsx, BlogIndexPage.tsx, BlogPostPage.tsx   pages, shared by both languages
  Header, Footer, Hero, About, Services, TechStack, LatestPosts, Contact, ContactForm, ...
content/blog/*.md       blog posts (Markdown)
content/legal/en|de/    Privacy Policy / Datenschutzrichtlinie and Terms & Conditions / Allgemeine Geschäftsbedingungen (Markdown)
lib/dictionaries/       all site texts: en.ts (English) and de.ts (German)
lib/i18n.ts             languages and links between them
lib/base-path.ts        sub-folder prefix for images and plain links (GitHub Pages)
lib/site.ts             company details and technologies (the same in every language)
lib/posts.ts            reading and sorting blog posts
public/images/          images
scripts/                fix for the build on Windows (runs by itself after `npm run build`)
.github/workflows/      GitHub Pages deployment
```

## Languages (EN / DE)

English lives at `/…`, German at `/de/…`. Clicking EN / DE in the menu opens the same page in the other language.

- **Texts** are in `lib/dictionaries/en.ts` and `lib/dictionaries/de.ts`, with the same keys. When you change or add
  a text in `en.ts`, TypeScript (`npm run build`) reports an error until the same key exists in `de.ts` too.
- **Blog posts** exist in English only. On `/de/blog/` the menu, buttons and dates are German, while the post stays
  English and is marked "Nur auf Englisch verfügbar". Search engines are pointed at the English version of these pages.
- Translations of blog categories (e.g. Development → Entwicklung) are in `blog.tags` in `de.ts`.

## New blog post

Create `content/blog/post-name.md` (the file name becomes the URL `/blog/post-name/`):

```markdown
---
title: "Post title"
date: "2026-12-01"
tags: ["Development"]          # Agile, Development, Scrum, Teambuilding... a new category shows up in the filter by itself
hero: "/images/my-image.jpg"   # put the image in public/images/
---

Post text in **Markdown**.
```

Optional fields are `excerpt` (short teaser on the card, otherwise the start of the text is used), `description`
(for search engines), `cover` (image on the card, otherwise `hero`), `gallery` (list of images below the post) and
`readingTime`.

## Before going live

- **Contact form**: without configuration it opens the visitor's email app (as in the draft). To make it send
  messages, set `NEXT_PUBLIC_CONTACT_ENDPOINT` (see `.env.example`), e.g. to Formspree, Web3Forms or your own API.
- **Legal texts** (`content/legal/en|de/`) are copied word for word from the `/privacy-policy` and
  `/terms-conditions` pages of the old site (EN and DE). Edit the text directly in those Markdown files. With more
  than one `## ` heading a table of contents appears on the left automatically, and an `updated: "2026-12-01"` field
  in the frontmatter shows a date.
- Old Wix article URLs (`/post/<slug>`) still need to lead to the new ones (`/blog/<slug>/`). GitHub Pages cannot
  send 301 redirects, so this needs redirect pages or a host that supports redirects.
