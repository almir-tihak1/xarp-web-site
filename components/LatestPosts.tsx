import Link from "next/link";
import PostCard from "./PostCard";
import SectionHead from "./SectionHead";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";

export default function LatestPosts({ locale }: { locale: Locale }) {
  const { latestPosts: t, blog } = getDictionary(locale);
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog">
      <div className="wrap">
        <SectionHead number="04" label={t.label} title={t.title}>
          <p className="lead">{t.lead}</p>
        </SectionHead>
        <div className="posts reveal">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} labels={blog} />
          ))}
        </div>
        <div className="blog-all reveal">
          <Link href={localePath(locale, "/blog/")} className="btn btn-ghost">
            {t.all} →
          </Link>
        </div>
      </div>
    </section>
  );
}
