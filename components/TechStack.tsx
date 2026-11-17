import SectionHead from "./SectionHead";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { techStack } from "@/lib/site";

export default function TechStack({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).technologies;

  return (
    <section id="technologies" className="alt">
      <div className="wrap">
        <SectionHead number="03" label={t.label} title={t.title}>
          <p className="lead">{t.lead}</p>
        </SectionHead>
        <div className="stack reveal">
          {techStack.map((row) => (
            <div className="stack-row" key={row.category}>
              <div className="cat">{t.categories[row.category]}</div>
              <div className="chips">
                {row.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
