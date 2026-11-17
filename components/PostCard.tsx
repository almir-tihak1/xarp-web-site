import Link from "next/link";
import { withBasePath } from "@/lib/base-path";
import { formatDate } from "@/lib/format";
import { fill, localePath, type Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

/** The bits of the blog dictionary a card needs (passed in, because BlogList is a client component). */
export type PostCardLabels = { minRead: string; tags: Record<string, string> };

export default function PostCard({
  post,
  locale,
  labels,
  hidden,
}: {
  post: PostMeta;
  locale: Locale;
  labels: PostCardLabels;
  hidden?: boolean;
}) {
  // Articles are written in English only; mark them so screen readers and translators know.
  const postLang = locale === "en" ? undefined : "en";

  return (
    <Link className="post" href={localePath(locale, `/blog/${post.slug}/`)} hidden={hidden}>
      <div className="post-img">{post.cover && <img src={withBasePath(post.cover)} alt="" loading="lazy" />}</div>
      <div className="post-tags">
        {post.tags.map((tag) => (
          <span className="tag" key={tag}>
            {labels.tags[tag] ?? tag}
          </span>
        ))}
      </div>
      <h3 lang={postLang}>{post.title}</h3>
      <p lang={postLang}>{post.excerpt}</p>
      <span className="post-meta">
        {formatDate(post.date, locale)} · {fill(labels.minRead, { minutes: post.readingTime })}
      </span>
    </Link>
  );
}
