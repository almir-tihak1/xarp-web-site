import type { ReactNode } from "react";
import SiteLayout, { siteMetadata } from "@/components/SiteLayout";

// English is the default language and lives at the root: /, /blog/, /blog/<slug>/.
// The "(en)" folder name is a route group, so it does not show up in the URL.
export const metadata = siteMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
