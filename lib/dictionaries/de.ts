import type { Dictionary } from "./en";

// German texts for /de/. Same keys as lib/dictionaries/en.ts — see the comments there.

export const de: Dictionary = {
  meta: {
    title: "Xarp Tec — Wir verwandeln Ideen in Realität",
    description:
      "Xarp Tec verbindet Wissen und technische Expertise, um herausragende Softwarelösungen zu entwickeln – mit klarem Fokus auf qualitätsorientierte Ergebnisse.",
    ogLocale: "de_DE",
  },

  nav: {
    about: "Über uns",
    services: "Leistungen",
    technologies: "Technologien",
    blog: "Blog",
    contact: "Kontakt",
    careers: "Karriere",
    menu: "Menü",
    language: "Sprache",
  },

  hero: {
    eyebrow: "Wir verwandeln Ideen in Realität",
    titleStart: "Der Weg, Ihr Geschäft zu",
    titleEmphasis: "beschleunigen",
    titleEnd: "",
    text: "Wir verbinden unser Wissen und unsere technische Expertise, um herausragende Softwarelösungen zu entwickeln – mit klarem Fokus auf qualitätsorientierte Ergebnisse.",
    cta: "Kontakt aufnehmen",
    secondary: "Unsere Leistungen",
  },

  about: {
    label: "über uns",
    title: "Wir behandeln jedes Projekt, als wäre es unser eigenes.",
    paragraphs: [
      "Unser Entwicklerteam ist bestrebt, die idealen Lösungen zu finden, um die Ziele unserer Partner zu erreichen. Dank der ausgeprägten Verantwortungskultur in unserem Unternehmen behandeln wir jedes Projekt, als wäre es unser eigenes.",
      "Indem wir kreative Lösungen für Ihre anspruchsvollsten Anforderungen entwickeln und Sie während des gesamten Entwicklungsprozesses zeitnah beraten, maximieren wir den Geschäftswert, den wir mit unseren Software-Outsourcing-Leistungen schaffen.",
    ],
  },

  services: {
    label: "leistungen",
    title: "Leidenschaftliche Entwickler für großartige Produkte.",
    lead: "Wir sind ein Team leidenschaftlicher Entwickler, die immer auf der Suche nach neuen Herausforderungen sind und sich dem Ziel verschrieben haben, großartige Produkte zu entwickeln. Mit unserer Erfahrung und unseren Fähigkeiten helfen wir Ihnen, das perfekte Produkt zu entwickeln.",
    items: [
      {
        title: "Neue Anwendungen & Features",
        text: "Entwicklung neuer Anwendungen und Features – von der ersten Idee bis zur produktionsreifen Software.",
      },
      {
        title: "Weiterentwicklung bestehender Software",
        text: "Erweiterung Ihrer bestehenden Software – wir bauen sie aus, verbessern sie und machen sie bereit für das, was als Nächstes kommt.",
      },
      {
        title: "Agile Beratung",
        text: "Gerne beraten wir Sie zu agiler Softwareentwicklung und dazu, wie Sie ein externes Team am besten in Ihr Projekt einbinden.",
      },
    ],
  },

  technologies: {
    label: "technologien",
    title: "Immer auf dem neuesten Stand.",
    lead: "Als Teil unserer Unternehmenskultur halten wir unsere Experten ständig auf dem Laufenden – neue Trends und Möglichkeiten verfolgen wir mit großem Interesse. Wenn unsere Kunden Wünsche haben, sprechen wir gerne über zusätzliche Lösungen und Tools, mit denen sich das bestmögliche Produkt entwickeln lässt.",
    categories: {
      backend: "backend",
      databases: "datenbanken",
      frontend: "frontend",
      desktop: "desktop",
      devops: "devops",
    },
  },

  latestPosts: {
    label: "blog",
    title: "Notizen aus der Softwareentwicklung.",
    lead: "Gedanken unseres Teams zu Agilität, Architektur und Produkten, die wirklich etwas bewirken. Unsere Artikel erscheinen auf Englisch.",
    all: "Alle Artikel",
  },

  contact: {
    label: "kontakt",
    title: "Sie haben eine Idee? Machen wir sie zur Realität.",
    lead: "Erzählen Sie uns von Ihrem Projekt, Ihrem Team oder Ihrer Idee – wir melden uns in Kürze bei Ihnen.",
    address: "Adresse",
    email: "E-Mail",
    social: "Social Media",
    country: "Bosnien und Herzegowina",
    form: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      message: "Nachricht",
      send: "Senden",
      sending: "Wird gesendet…",
      sent: "Vielen Dank! Wir melden uns in Kürze bei Ihnen.",
      error: "Leider konnte die Nachricht nicht gesendet werden. Bitte schreiben Sie uns an {email}.",
      subject: "Anfrage von {name}",
    },
  },

  footer: {
    privacy: "Datenschutz",
    terms: "AGB",
  },

  // Texts in content/legal/de/.
  legal: {
    eyebrow: "Rechtliches",
    updated: "Stand: {date}",
    toc: "Auf dieser Seite",
  },

  notFound: {
    title: "Diese Seite existiert nicht.",
    text: "Der Link ist möglicherweise veraltet – unsere Website hat ein neues Zuhause.",
    home: "Zur deutschen Startseite",
  },

  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Gedanken des Xarp-Tec-Teams zu Agilität, Scrum, Architektur und dem Aufbau großartiger Softwareteams.",
    eyebrow: "Blog",
    title: "Notizen aus der Softwareentwicklung.",
    intro:
      "Gedanken unseres Teams zu Agilität, Architektur und Produkten, die wirklich etwas bewirken. {count} Artikel, alle auf Englisch.",
    filterLabel: "Nach Kategorie filtern",
    all: "Alle",
    tags: {
      Agile: "Agilität",
      Development: "Entwicklung",
    },
    back: "Alle Artikel",
    minRead: "{minutes} Min. Lesezeit",
    englishOnly: "Nur auf Englisch verfügbar",
    ctaTitle: "Sie haben eine Idee? Machen wir sie zur Realität.",
    ctaText: "Erzählen Sie uns von Ihrem Projekt – wir melden uns in Kürze bei Ihnen.",
    cta: "Kontakt aufnehmen",
    more: "Mehr aus dem Blog",
  },
};
