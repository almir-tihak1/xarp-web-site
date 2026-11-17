import type { ReactNode } from "react";
import SiteLayout, { siteMetadata } from "@/components/SiteLayout";

// German version of every page: /de/, /de/blog/, /de/blog/<slug>/. Texts are in lib/dictionaries/de.ts.
export const metadata = siteMetadata("de");

export default function GermanLayout({ children }: { children: ReactNode }) {
  return <SiteLayout locale="de">{children}</SiteLayout>;
}
