"use client";

import { useState, type ReactNode } from "react";
import PostCard, { type PostCardLabels } from "./PostCard";
import type { Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

type Labels = PostCardLabels & { all: string; filterLabel: string };

// Page heading with the category filter buttons, followed by the grid of all posts on /blog.
export default function BlogList({
  posts,
  categories,
  locale,
  labels,
  children,
}: {
  posts: PostMeta[];
  categories: string[];
  locale: Locale;
  labels: Labels;
  children: ReactNode;
}) {
  const [active, setActive] = useState("");

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          {children}
          <div className="filters" role="group" aria-label={labels.filterLabel}>
            {["", ...categories].map((cat) => (
              <button
                key={cat || "all"}
                className={`filter${active === cat ? " on" : ""}`}
                aria-pressed={active === cat}
                onClick={() => setActive(cat)}
              >
                {cat ? (labels.tags[cat] ?? cat) : labels.all}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="blog-list">
        <div className="wrap">
          <div className="posts">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                labels={labels}
                hidden={active !== "" && !post.tags.includes(active)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
