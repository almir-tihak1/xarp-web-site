import type { Metadata } from "next";
import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import LatestPosts from "./LatestPosts";
import Services from "./Services";
import TechStack from "./TechStack";
import { alternates, type Locale } from "@/lib/i18n";

// Rendered by app/(en)/page.tsx and app/de/page.tsx.

export function homeMetadata(locale: Locale): Metadata {
  return { alternates: alternates(locale, "/") };
}

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Services locale={locale} />
      <TechStack locale={locale} />
      <LatestPosts locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
