import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;

  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>
            {t.titleStart} <em>{t.titleEmphasis}</em>
            {t.titleEnd && ` ${t.titleEnd}`}
          </h1>
          <p>{t.text}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn">
              {t.cta} <span aria-hidden="true">→</span>
            </a>
            <a href="#services" className="btn btn-ghost">
              {t.secondary}
            </a>
          </div>
        </div>

        {/* Decorative, so it stays in English on every language version. */}
        <div className="terminal" aria-hidden="true">
          <div className="terminal-bar">
            <span></span>
            <span></span>
            <span></span>
            <small>xarp-tec ~ idea.cs</small>
          </div>
          <pre>
            <span className="k">$</span> xarp-tec build --from idea{"\n"}
            <span className="d">{"  › requirements ....."}</span> <span className="k">done</span>
            {"\n"}
            <span className="d">{"  › agile sprints ...."}</span> <span className="k">done</span>
            {"\n"}
            <span className="d">{"  › quality checks ..."}</span> <span className="k">passed</span>
            {"\n"}
            <span className="k">✓</span> idea → reality
          </pre>
        </div>
      </div>
    </div>
  );
}
