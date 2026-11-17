import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "./PostCard";
import { withBasePath } from "@/lib/base-path";
import { getDictionary } from "@/lib/dictionaries";
import { formatDate } from "@/lib/format";
import { fill, localePath, type Locale } from "@/lib/i18n";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Rendered by app/(en)/blog/[slug]/page.tsx and app/de/blog/[slug]/page.tsx.
// Articles are written in English only: other languages show the same text inside a translated page.

export function blogPostParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function blogPostMetadata(slug: string, locale: Locale): Metadata {
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    // Every language version has the same English article, so search engines are pointed at the English page.
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: getDictionary(locale).meta.ogLocale,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: post.hero ?? post.cover,
    },
  };
}

export default function BlogPostPage({ slug, locale }: { slug: string; locale: Locale }) {
  const post = getPost(slug);
  if (!post) notFound();

  const t = getDictionary(locale).blog;
  const postLang = locale === "en" ? undefined : "en";

  return (
    <>
      <article className="article">
        <div className="wrap narrow">
          <Link className="back" href={localePath(locale, "/blog/")}>
            ← {t.back}
          </Link>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                {t.tags[tag] ?? tag}
              </span>
            ))}
          </div>
          <h1 lang={postLang}>{post.title}</h1>
          <div className="post-meta">
            {formatDate(post.date, locale)} · {fill(t.minRead, { minutes: post.readingTime })}
            {t.englishOnly && ` · ${t.englishOnly}`}
          </div>
        </div>

        {post.hero && (
          <div className="wrap article-hero">
            <img src={withBasePath(post.hero)} alt="" />
          </div>
        )}

        <div className="wrap narrow prose" lang={postLang} dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.gallery.length > 0 && (
          <div className="wrap gallery">
            {post.gallery.map((src) => (
              <a key={src} href={withBasePath(src)} target="_blank" rel="noopener">
                <img src={withBasePath(src)} alt="" loading="lazy" />
              </a>
            ))}
          </div>
        )}

        <div className="wrap narrow">
          <div className="article-cta">
            <div>
              <strong>{t.ctaTitle}</strong>
              <span>{t.ctaText}</span>
            </div>
            <Link className="btn" href={localePath(locale, "/#contact")}>
              {t.cta} →
            </Link>
          </div>
        </div>
      </article>

      <section className="more">
        <div className="wrap">
          <h2>{t.more}</h2>
          <div className="posts">
            {getRelatedPosts(post.slug).map((related) => (
              <PostCard key={related.slug} post={related} locale={locale} labels={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
