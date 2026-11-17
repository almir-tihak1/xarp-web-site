import type { TechCategory } from "@/lib/site";

// Every English text on the site. lib/dictionaries/de.ts has the same keys in German —
// TypeScript reports any key that is missing there.
// "{name}"-style placeholders are filled in by the code (see `fill` in lib/i18n.ts).
// Blog articles are not in here: they are Markdown files in content/blog/ and exist in English only.

export const en = {
  meta: {
    title: "Xarp Tec — Transforming ideas into reality",
    description:
      "Xarp Tec combines knowledge and tech expertise to develop outstanding software solutions, with a sharp focus on quality-driven results.",
    ogLocale: "en_GB",
  },

  nav: {
    about: "About us",
    services: "Services",
    technologies: "Technologies",
    blog: "Blog",
    contact: "Get in touch",
    careers: "Careers",
    menu: "menu",
    language: "Language",
  },

  hero: {
    eyebrow: "Transforming ideas into reality",
    // Heading = titleStart + <em>titleEmphasis</em> + titleEnd
    titleStart: "The way to",
    titleEmphasis: "accelerate",
    titleEnd: "business",
    text: "We combine our knowledge and tech expertise to develop outstanding software solutions. With a sharp focus on quality-driven results.",
    cta: "Get in touch",
    secondary: "Our services",
  },

  about: {
    label: "about us",
    title: "We treat each project as though it’s our own.",
    paragraphs: [
      "Our team of developers is committed to finding the ideal solutions to accomplish our partners’ goals. We treat each project as though it’s our own, thanks to the strong culture of ownership fostered in our company.",
      "By coming up with creative solutions to your most stringent requirements and offering you timely advice along the development process, we maximize the business value we bring to the table through our software outsourcing services.",
    ],
  },

  services: {
    label: "services",
    title: "Passionate developers, committed to great products.",
    lead: "We are a team of passionate developers who are always looking for new challenges and committed to build great products. With our experience and skills, we can help you create the perfect product.",
    // Same order as the icons in components/Services.tsx
    items: [
      {
        title: "New applications & features",
        text: "Development of new applications and features, from first idea to production-ready software.",
      },
      {
        title: "Enhancing existing software",
        text: "Enhancement of your existing software — extending, improving and keeping it ready for what comes next.",
      },
      {
        title: "Agile consulting",
        text: "We are happy to consult you in the area of agile software development and how to best implement an external team into your project.",
      },
    ],
  },

  technologies: {
    label: "technologies",
    title: "Always up to date.",
    lead: "As part of our corporate culture, we constantly keep our experts up to date — we are interested in keeping up with new trends and opportunities. If our customers have any requests, we’re always happy to speak about additional solutions and tools that can be used to develop the best product possible.",
    categories: {
      backend: "backend",
      databases: "databases",
      frontend: "frontend",
      desktop: "desktop",
      devops: "devops",
    } satisfies Record<TechCategory, string>,
  },

  latestPosts: {
    label: "blog",
    title: "Notes on building software.",
    lead: "Thoughts from our team on agile, architecture and delivering products that matter.",
    all: "All articles",
  },

  contact: {
    label: "get in touch",
    title: "Have an idea? Let’s make it reality.",
    lead: "Tell us about your project, your team or your idea — we’ll get back to you shortly.",
    address: "Address",
    email: "Email",
    social: "Social",
    country: "Bosnia and Herzegovina",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending…",
      sent: "Thank you! We’ll get back to you shortly.",
      error: "Sorry, the message could not be sent. Please email us at {email}.",
      subject: "Inquiry from {name}",
    },
  },

  footer: {
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
  },

  // Privacy policy and terms pages; the texts themselves are in content/legal/en/.
  legal: {
    eyebrow: "Legal",
    // Only shown when the page's Markdown has an `updated:` date
    updated: "Last updated: {date}",
    toc: "On this page",
  },

  // app/global-not-found.tsx — one 404 page for every language, so it shows each language's text.
  notFound: {
    title: "This page doesn’t exist.",
    text: "The link may be outdated — our website has moved to a new home.",
    home: "Go to the home page",
  },

  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Thoughts from the Xarp Tec team on agile, Scrum, architecture and building great software teams.",
    eyebrow: "Blog",
    title: "Notes on building software.",
    intro: "Thoughts from our team on agile, architecture and delivering products that matter. {count} articles.",
    filterLabel: "Filter by category",
    all: "All",
    // Display names for the categories in the posts' `tags`; a category not listed here is shown as written.
    tags: {} as Record<string, string>,
    back: "All articles",
    minRead: "{minutes} min read",
    // Added to the date line of an article when the page language is not English. Empty here.
    englishOnly: "",
    ctaTitle: "Have an idea? Let’s make it reality.",
    ctaText: "Tell us about your project — we’ll get back to you shortly.",
    cta: "Get in touch",
    more: "More from the blog",
  },
};

export type Dictionary = typeof en;
