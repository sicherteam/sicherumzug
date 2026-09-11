---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 3.3 Internal Linking Plan

## 1. Service <-> Guide Authority Network

### Primary Cluster: Umzug
**Cost Guides -> Service Pages:**
- `_guides/umzugskosten-oesterreich-sparen.md` -> Link to `_services/umzug-wien.md` and `_services/umzug-oesterreich.md` using semantic anchors like "professionelle Unterstützung beim Wohnungswechsel".
- `_guides/2026-07-20-umzugskosten-steuer-absetzen.md` -> Link to `_services/umzug-oesterreich.md`.

**Checklist Guides -> Service Pages:**
- `_guides/umzug-checkliste-ultimativ.md` -> Link to `_services/umzug-wien.md` ("zuverlässiger Partner für Ihre Übersiedlung").
- `_guides/2026-08-15-ultimative-umzugs-checkliste.md` -> Link to `_services/umzug-oesterreich.md` ("Unterstützung bei der gesamten Vorbereitung").

**Company Decision Guides -> Umzugsfirma related pages:**
- `_guides/moebelpacker-vs-diy-umzug.md` / `_guides/2026-04-12-moebelpacker-vs-diy-umzug.md` -> Link to `_services/umzug-wien.md` ("eine erfahrene Umzugsfirma für Ihren Standortwechsel").

**Business Move Guides -> Firmenumzug:**
- `_guides/firmenumzug-oesterreich-profi-planung.md` -> Link to `_services/firmenumzug-wien.md` ("professionelle Durchführung Ihres B2B-Standortwechsels").

### Secondary Cluster: Entrümpelung & Räumung
**Guides -> Services:**
- `_guides/was-kostet-eine-haushaltsaufloesung.md` -> Link to `_services/haushaltsaufloesung.md` ("Hilfe bei der kompletten Haushaltsauflösung").
- `_guides/checkliste-wohnungsraeumung-7-schritte.md` -> Link to `_services/wohnungsaufloesung.md` ("stressfreie und besenreine Räumung").
- `_guides/wertanrechnung-guide.md` (or similar) -> Link to `_services/gratis-entruempelung.md` / `_services/gratis-raeumung.md`.

## 2. Remove Orphan Problems
Targeting pages with 0 or 1 incoming links by adding contextually relevant internal links:
- `_services/studentenumzug.md` -> Add link from `_guides/studentenumzug-oesterreich-wg-tipps.md` and `_services/umzug-wien.md`.
- `_services/express-notdienst.md` -> Add link from `_guides/express-entruempelung-container-logistik.md`.
- State-level pages (`_services/umzug-graz.md`, `_services/umzug-salzburg.md`, etc.) -> Add links from `_guides/umzug-oesterreich-profi-guide.md` and `_services/umzug-oesterreich.md`.
- `_guides/verpackungstipps-umzug-anleitung.md` -> Add link from `_services/umzug-wien.md`.

## 3. Anchor Text Optimization
Review existing pages and replace repeated exact-match anchors (e.g., "Umzugsfirma Wien", "Räumung Wien") with natural semantic variations:
- "professionelle Unterstützung beim Wohnungswechsel"
- "eine erfahrene Umzugsfirma für Ihren Standortwechsel"
- "Hilfe bei der kompletten Haushaltsauflösung"
- "sichere und effiziente Firmenübersiedlung"

## 4. Add Reverse Authority Links
Important service pages will link back to relevant informational guides to complete the loop:
- `_services/umzug-wien.md` -> `_guides/umzug-checkliste-ultimativ.md` ("mehr Informationen zur Vorbereitung Ihres Umzugs").
- `_services/firmenumzug-wien.md` -> `_guides/firmenumzug-oesterreich-profi-planung.md` ("detaillierter Planungs-Leitfaden für Unternehmen").
- `_services/entruempelung-wien.md` / `_services/raeumung.md` -> `_guides/checkliste-wohnungsraeumung-7-schritte.md` ("Schritt-für-Schritt Vorbereitung der Räumung").
- `_services/seniorenumzug.md` -> `_guides/seniorenumzug-oesterreich-profi-hilfe.md`.

## 5. Entity Graph Consistency
Ensure all new and modified content maintains "Sicher Team" as the primary entity. Strictly distinguish between the primary authority (Umzug / Übersiedlung) and secondary (Entrümpelung & Räumung) without mixing their intents within the same context.
