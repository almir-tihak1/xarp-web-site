import SectionHead from "./SectionHead";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).about;

  return (
    <section id="about" className="alt">
      <SectionHead className="wrap" number="01" label={t.label} title={t.title}>
        {t.paragraphs.map((text) => (
          <p className="lead" key={text}>
            {text}
          </p>
        ))}
      </SectionHead>
    </section>
  );
}
