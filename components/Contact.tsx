import ContactForm from "./ContactForm";
import SectionHead from "./SectionHead";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Contact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).contact;

  return (
    <section id="contact">
      <div className="wrap">
        <SectionHead number="05" label={t.label} title={t.title}>
          <p className="lead">{t.lead}</p>
        </SectionHead>
        <div className="contact-grid reveal">
          <dl className="info">
            <dt>{t.address}</dt>
            <dd>
              {[...site.address, t.country].map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </dd>
            <dt>{t.email}</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
            <dt>{t.social}</dt>
            <dd>
              <a href={site.linkedin} target="_blank" rel="noopener">
                LinkedIn ↗
              </a>
            </dd>
          </dl>
          <ContactForm t={t.form} />
        </div>
      </div>
    </section>
  );
}
