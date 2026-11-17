import SectionHead from "./SectionHead";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

// Same order as services.items in lib/dictionaries/.
const icons = [
  <path key="plus" d="M12 5v14M5 12h14" />,
  <path key="refresh" d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" />,
  <g key="team">
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 14.5c3 0 5.5 1.7 5.5 4.5" />
  </g>,
];

export default function Services({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).services;

  return (
    <section id="services">
      <div className="wrap">
        <SectionHead number="02" label={t.label} title={t.title}>
          <p className="lead">{t.lead}</p>
        </SectionHead>
        <div className="grid-3 reveal">
          {t.items.map((service, i) => (
            <div className="card" key={service.title}>
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icons[i]}
                </svg>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
