// Blog posts live as Markdown files in content/blog/<slug>.md.
// They are read at build time only (server components), so nothing here ships to the browser.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { withBasePathInHtml } from "./base-path";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-03" */
  date: string;
  tags: string[];
  /** Short teaser shown on the post cards */
  excerpt: string;
  /** <meta name="description"> for the article page */
  description: string;
  /** Image on the post card */
  cover?: string;
  /** Large image at the top of the article */
  hero?: string;
  /** Extra photos shown under the article */
  gallery: string[];
  readingTime: number;
};

export type Post = PostMeta & { html: string };

type Frontmatter = Partial<Omit<PostMeta, "slug">>;

let cache: Post[] | null = null;

function plainText(markdown: string) {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[\\*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max = 200) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)).replace(/[\s,.;:]+$/, "") + "…";
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  if (!fm.title || !fm.date) {
    throw new Error(`content/blog/${file}: "title" and "date" are required in the frontmatter`);
  }

  const text = plainText(content);
  const excerpt = fm.excerpt ?? truncate(text);
  // gray-matter turns unquoted YAML dates into Date objects
  const date = (fm.date as unknown) instanceof Date ? (fm.date as unknown as Date).toISOString().slice(0, 10) : String(fm.date);

  return {
    slug,
    title: fm.title,
    date,
    tags: fm.tags ?? [],
    excerpt,
    description: fm.description ?? excerpt,
    cover: fm.cover ?? fm.hero,
    hero: fm.hero,
    gallery: fm.gallery ?? [],
    readingTime: fm.readingTime ?? Math.max(1, Math.round(text.split(" ").length / 225)),
    html: withBasePathInHtml(marked.parse(content, { async: false })),
  };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith(".md"))
      .map(readPost)
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  }
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Categories used by at least one post, alphabetically. */
export function getCategories(): string[] {
  return [...new Set(getAllPosts().flatMap((p) => p.tags))].sort();
}

/** Newest posts that share a category with `slug`, topped up with the latest posts. */
export function getRelatedPosts(slug: string, count = 3): Post[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  const related = others.filter((p) => p.tags.some((t) => current?.tags.includes(t)));
  const fill = others.filter((p) => !related.includes(p));
  return [...related, ...fill].slice(0, count);
}

/** Post without its rendered body — what cards need, small enough to send to client components. */
export function toMeta(post: Post): PostMeta {
  const meta: Partial<Post> = { ...post };
  delete meta.html;
  return meta as PostMeta;
}
