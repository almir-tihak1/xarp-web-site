# Xarp Tec web stranica

Nova web stranica xarp-tec.com: Next.js 16 (React 19, TypeScript), izvezena kao **potpuno statični sajt**.
Nastala je prebacivanjem HTML nacrta (Claude artifakt) u React komponente. Izgled i tekst su isti kao u nacrtu.

## Pokretanje

```bash
npm install
npm run dev      # razvoj na http://localhost:3000
npm run build    # gotov sajt u folderu out/
```

Sadržaj foldera `out/` se može postaviti na bilo koji hosting: Cloudflare Pages, Netlify, GitHub Pages ili
obični FTP hosting. Server nije potreban.

## Struktura

```
app/
  (en)/                 engleska verzija: /, /blog/, /blog/<slug>/ ("(en)" se ne vidi u URL-u)
  de/                   njemačka verzija: /de/, /de/blog/, /de/blog/<slug>/
  global-not-found.tsx  stranica 404 (ista za oba jezika)
  globals.css           svi stilovi (preuzeti iz nacrta)
  fonts.css + fonts/    fontovi Inter, JetBrains Mono, Montserrat — lokalno, ništa se ne učitava s Googlea
components/
  SiteLayout.tsx        zajednički okvir: header, footer, animacije
  HomePage.tsx, BlogIndexPage.tsx, BlogPostPage.tsx   stranice, iste za oba jezika
  Header, Footer, Hero, About, Services, TechStack, LatestPosts, Contact, ContactForm, ...
content/blog/*.md       blog članci (Markdown)
content/legal/en|de/    Privacy Policy / Datenschutzerklärung i Terms & Conditions / Nutzungsbedingungen (Markdown)
lib/dictionaries/       svi tekstovi sajta: en.ts (engleski) i de.ts (njemački)
lib/i18n.ts             jezici i linkovi između njih
lib/site.ts             podaci o firmi i tehnologije (isti na svim jezicima)
lib/posts.ts            čitanje i sortiranje članaka
public/images/          slike
scripts/                popravka za build na Windowsu (pokreće se sama poslije `npm run build`)
```

## Jezici (EN / DE)

Engleski je na `/…`, njemački na `/de/…`. Klik na EN / DE u meniju otvara istu stranicu na drugom jeziku.

- **Tekstovi** su u `lib/dictionaries/en.ts` i `lib/dictionaries/de.ts`, s istim ključevima. Kad promijeniš ili
  dodaš tekst u `en.ts`, TypeScript (`npm run build`) javlja grešku dok isti ključ ne postoji i u `de.ts`.
- **Blog članci** postoje samo na engleskom. Na `/de/blog/` su meni, dugmad i datumi na njemačkom, a članak ostaje
  engleski i označen je s „Nur auf Englisch verfügbar“. Google za te stranice dobije link na englesku verziju.
- Prevod kategorija bloga (npr. Development → Entwicklung) je u `blog.tags` u `de.ts`.

## Novi blog članak

Napravi `content/blog/naziv-clanka.md` (ime fajla postaje URL `/blog/naziv-clanka/`):

```markdown
---
title: "Naslov članka"
date: "2026-12-01"
tags: ["Development"]          # Agile, Development, Scrum, Teambuilding... nova kategorija se sama pojavi u filteru
hero: "/images/moja-slika.jpg" # slika stavi u public/images/
---

Tekst članka u **Markdownu**.
```

Neobavezna polja su `excerpt` (kratki opis na kartici, inače se uzme početak teksta), `description` (za Google),
`cover` (slika na kartici, inače `hero`), `gallery` (lista slika ispod članka) i `readingTime`.

## Prije objave

- **Kontakt forma**: bez podešavanja otvara posjetiocu email program (kao u nacrtu). Da bi slala poruke,
  postavi `NEXT_PUBLIC_CONTACT_ENDPOINT` (vidi `.env.example`), npr. na Formspree, Web3Forms ili vlastiti API.
- **Pravni tekstovi** (`content/legal/en|de/`) su preuzeti doslovno sa stranica `/privacy-policy` i
  `/terms-conditions` starog sajta (EN i DE). Tekst se mijenja direktno u tim Markdown fajlovima. Ako ima
  više `## ` naslova, lijevo se sam pojavi sadržaj, a polje `updated: "2026-12-01"` u zaglavlju prikazuje datum.
- Stari URL-ovi članaka trebaju 301 preusmjerenje na nove (`/blog/<slug>/`), ako se razlikuju.
