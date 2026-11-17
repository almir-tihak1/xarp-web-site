import Link from "next/link";
import Logo from "./Logo";
import { getDictionary, getNavLinks } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="foot-info">
            <Logo locale={locale} onDark />
            <div>{[...site.address, t.contact.country].join(", ")}</div>
            <div>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <ul>
            {getNavLinks(locale).map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href={localePath(locale, "/#contact")}>{t.nav.careers}</Link>
            </li>
          </ul>
        </div>
        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <span>
            <Link href={localePath(locale, "/privacy-policy/")}>{t.footer.privacy}</Link> ·{" "}
            <Link href={localePath(locale, "/terms-conditions/")}>{t.footer.terms}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
