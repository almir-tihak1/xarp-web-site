import BlogIndexPage, { blogIndexMetadata } from "@/components/BlogIndexPage";

export const metadata = blogIndexMetadata("en");

export default function Page() {
  return <BlogIndexPage locale="en" />;
}
