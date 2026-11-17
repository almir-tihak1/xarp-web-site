import BlogIndexPage, { blogIndexMetadata } from "@/components/BlogIndexPage";

export const metadata = blogIndexMetadata("de");

export default function Page() {
  return <BlogIndexPage locale="de" />;
}
