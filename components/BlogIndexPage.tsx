import type { Metadata } from "next";
import BlogList from "./BlogList";
import { getDictionary } from "@/lib/dictionaries";
import { alternates, fill, type Locale } from "@/lib/i18n";
import { getAllPosts, getCategories, toMeta } from "@/lib/posts";

// Rendered by app/(en)/blog/page.tsx and app/de/blog/page.tsx.

export function blogIndexMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).blog;
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternates(locale, "/blog/") };
}

export default function BlogIndexPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).blog;
  const posts = getAllPosts().map(toMeta);

  return (
    <BlogList
      posts={posts}
      categories={getCategories()}
      locale={locale}
      labels={{ all: t.all, filterLabel: t.filterLabel, minRead: t.minRead, tags: t.tags }}
    >
      <div className="eyebrow">{t.eyebrow}</div>
      <h1>{t.title}</h1>
      <p>{fill(t.intro, { count: posts.length })}</p>
    </BlogList>
  );
}
