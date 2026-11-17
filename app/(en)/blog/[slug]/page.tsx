import BlogPostPage, { blogPostMetadata, blogPostParams } from "@/components/BlogPostPage";

// Only the posts in content/blog exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPostParams();
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  return blogPostMetadata((await params).slug, "en");
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  return <BlogPostPage slug={(await params).slug} locale="en" />;
}
