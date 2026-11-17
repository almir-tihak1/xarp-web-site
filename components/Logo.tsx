"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// On the home page the logo scrolls to the top; elsewhere it links home (in the current language).
export default function Logo({ locale, onDark = false }: { locale: Locale; onDark?: boolean }) {
  const pathname = usePathname();
  const home = localePath(locale, "/");
  const isHome = pathname === home || `${pathname}/` === home;
  const className = onDark ? "logo on-dark" : "logo";
  const label = onDark ? site.name : `${site.name} — ${site.slogan}`;
  const content = (
    <>
      <span className="logo-row">
        XARP
        <svg aria-hidden="true">
          <use href="#bulb" />
        </svg>
        TEC
      </span>
      <span className="logo-slogan">{site.slogan}</span>
    </>
  );

  return isHome ? (
    <a href="#top" className={className} aria-label={label}>
      {content}
    </a>
  ) : (
    <Link href={home} className={className} aria-label={label}>
      {content}
    </Link>
  );
}
