# Sicher Team – Jekyll Site

Relaunch der Website von sicher-umzug.at auf Basis von [Jekyll](https://jekyllrb.com/) + `github-pages`. Ziel ist ein schnelles, SEO-optimiertes Setup mit klaren Collections für Leistungen, Bezirke und Ratgeber.

## Lokale Entwicklung

1. Ruby-Abhängigkeiten installieren
   ```bash
   bundle install
   ```
2. Tailwind/Node-Tools installieren und beobachten
   ```bash
   npm install
   npm run watch:css   # erzeugt assets/css/main.css
   ```
3. Jekyll starten
   ```bash
   bundle exec jekyll serve --livereload
   ```

> Hinweis: Für GitHub Pages-Deployments `url` + `baseurl` in `_config.yml` setzen (z. B. `baseurl: "/repo-name"` für Projektseiten).

## Projektstruktur (Kurzüberblick)

- `_layouts/` – Templates (`home`, `page`, `service`, `guide`, `service-index`, `guide-index`)
- `_includes/` – Header, Footer, Sticky-CTA, Anfrageformular, Structured Data
- `_data/` – Navigationsstruktur, Startseiten-Module (Cards, Steps, Why-Us, Trust-Bar), Testimonials, globale FAQs
- `_services/`, `_districts/`, `_guides/` – Collections für Leistungen, Bezirke & Ratgeber (alle mit eigenem Front Matter)
- `ablauf.md`, `angebot.md`, `preise.md`, `ratgeber.md`, `leistungen.md`, `bezirke.md`, `ueber-uns.md` … – eigenständige Seiten mit `layout: page`/`service-index`/`guide-index`
- `assets/` – Tailwind-Quellen (`assets/css/tailwind.css`), generiertes CSS (`assets/css/main.css`), JS (`assets/js/site.js`), Medien
- `llms.txt` & `llms-all.txt` – automatisch generierte Dateien für KI-Crawler
- `_site/` – Build-Ausgabe (lokal nützlich, für Commits ignorieren)

## Content-Workflow

### Allgemeine Seiten (`*.md` im Projektstamm)

Beispiele: `ablauf.md`, `preise.md`, `angebot.md`.

1. Neue Seite anlegen oder duplizieren (z. B. `ueber-uns.md`).
2. Front Matter setzen:
   ```yaml
   ---
   layout: page        # oder home/service-index/guide-index
   title: "Seitentitel"
   description: "Meta Description"
   kicker: "Kleinlabel über der Headline"
   include_form: true  # optional: Quote-Formular einblenden
   permalink: /slug/
   ---
   ```
3. Inhalt in Markdown schreiben. Rich-Content-Blöcke können HTML enthalten.
4. Optional `llm_exclude: true`, falls Seite nicht in den KI-Exports landen soll.

### Leistungen (`_services/`)

1. Datei nach dem Schema `_services/slug.md` erstellen (z. B. `_services/kellerraeumung.md`).
2. Front Matter befüllen:
   ```yaml
   ---
   title: "Service-Name"
   description: "Kurzbeschreibung für Hero + Meta"
   kicker: "Privat"        # steuert Gruppierung auf /leistungen/
   hero_image: /topbg.webp # optional, fallback ist site.images.hero
   highlights:
     - USP 1
     - USP 2
   checklist:
     - Punkt 1
   process:
     - title: Schritt
       description: Erklärung
   faqs:
     - question: Frage
       answer: Antwort
   schema_type: Service
   service_type: Haushaltsauflösung
   permalink: /leistungen/slug/
   ---
   ```
3. Nach dem Front Matter Markdown-Inhalt schreiben (`##`, Listen, Zitate …).
4. Services erscheinen automatisch
   - in `leistungen.md` nach `kicker`
   - im Sticky-Navigationsmenü (wenn in `_data/navigation.yml` verlinkt)
   - in `llms*.txt`

### Bezirke (`_districts/`)

1. Datei `_districts/haushaltsaufloesung-10xx-wien.md` duplizieren.
2. Front Matter wie bei Services, aber mit
   - `kicker: "Bezirk 1010"` (Steuerung der Sortierung)
   - angepasstem `description`/`process` für lokale Besonderheiten.
3. `permalink` bleibt im `leistungen`-Namespace: `/leistungen/haushaltsaufloesung-1010-wien/`.
4. `bezirke.md` listet alle District-Dateien automatisch (Sortierung über `kicker`), daher keine manuelle Pflege nötig.

### Ratgeber (`_guides/`)

1. Dateiname `YYYY-MM-DD-slug.md` (z. B. `_guides/2024-03-05-was-kostet-eine-haushaltsaufloesung.md`).
2. Front Matter:
   ```yaml
   ---
   title: "Headline"
   description: "Meta + Listen-Anriss"
   category: "Guide"     # Label über dem Titel
   tags:
     - haushaltsauflösung
   takeaways:            # optional
     - Wichtigster Punkt
   faqs:                 # optional
     - question: Frage
       answer: Antwort
   ---
   ```
3. Inhalt in Markdown strukturieren (`##`-Abschnitte, Listen, Tipp-Callouts).
4. Die Listing-Seite `ratgeber.md` + der Abschnitt auf der Startseite ziehen Guides automatisch nach `date`.

### Übersichtsseiten

- `leistungen.md` (Layout `service-index`) gruppiert Services per `categories`-Definition im Front Matter.
- `bezirke.md` zeigt alle District-Dateien als Karten.
- `ratgeber.md` (Layout `guide-index`) listet Guides chronologisch.
- Die Startseite (`index.md`) konsumiert Daten aus `_data` + `site.services` + `site.guides`. Neue Inhalte tauchen ohne manuellen Eingriff auf, solange Front Matter korrekt ist.

### Navigations- & UI-Daten (`_data/`)

- `navigation.yml` – Hauptnavigation inkl. Mega-Menü. Neue Seiten hier verlinken.
- `service_cards.yml` – Kartenraster auf der Startseite (`title`, `description`, `url`, `icon`).
- `steps.yml` – 4-Schritte-Prozess (`order`, `title`, `description`, `icon`).
- `why_us.yml` – USP-Kacheln auf der Startseite.
- `trust_bar.yml` – Badge-Leiste direkt unter dem Hero.
- `testimonials.yml` – Slider-Inhalte (Name, Rolle, Quote, Rating).
- `faqs.yml` – Globale FAQ-Liste; kann per `use_global_faqs: true` auf Seiten gezogen werden.

Änderungen an diesen YAML-Dateien wirken sofort auf allen Seiten, die den jeweiligen Include nutzen.

### Kontakt- & Formulardaten

- `_config.yml` enthält `phone`, `email`, `address`, Öffnungszeiten, Social Links und `quote_form_action`.
- Das Formular selbst liegt in `_includes/quote-form.html`. Felder dort anpassen, wenn zusätzliche Inputs oder andere Submission-Provider nötig sind.

## Styling & Assets

- Tailwind-Konfiguration: `tailwind.config.js` (Content-Pfade, Farben, Fonts, Plugins).
- Quell-CSS: `assets/css/tailwind.css`; generiert wird `assets/css/main.css` über `npm run build:css` oder `npm run watch:css`.
- JS-Interaktionen: `assets/js/site.js` (Mobile-Menü, FAQ-Toggle).
- Bilder, Icons & Logos unter `assets/images/`, `logo.svg`, `WhatsApp.svg` usw.

## LLM / AI Nutzung

- `/llms.txt` – Hierarchische Übersicht + Nutzungsrichtlinien.
- `/llms-all.txt` – Vollständige Textausgabe aller veröffentlichten Seiten/Collections.
- Beide Dateien generiert Jekyll automatisch; kein manuelles Update nötig.
- Einzelne Seiten können mit `llm_exclude: true` (im Front Matter) aus den Exporten ausgeschlossen werden. Mit `llm_updated: 2024-05-01` lässt sich ein benutzerdefiniertes Änderungsdatum setzen.

## Deployment

1. Änderungen committen & zu GitHub pushen.
2. Unter *Settings → Pages* `Deploy from branch` oder GitHub Actions aktivieren (z. B. `main` → `/`).
3. Bei Bedarf `bundle update github-pages` ausführen, damit die lokale Version den GitHub Pages-Gem-Versionen entspricht.
4. Custom Domain + SSL über GitHub Pages konfigurieren (CNAME liegt bereits im Repo).

Viel Erfolg beim Ausbau!
