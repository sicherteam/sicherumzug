---
layout: null
sitemap: false
llm_exclude: true
---
# Content Gap Analysis & Semantic Audit Report

## 1. Executive Summary
This audit reviews the current state of Phase 2 semantic authority implementation. While the technical SEO baseline (schemas, intents, H1s) is strong, the content architecture requires significant cleanup to reach true Topical Authority. There are multiple overlapping pages causing keyword cannibalization, inconsistent entity usage, and isolated guides that need stronger semantic linking to core services.

## 2. Weak Pages & Overlapping Content (Cannibalization Risks)

### The "Räumung / Entrümpelung" Cluster
Currently, there are too many pages targeting the same intent without providing unique value. This dilutes topical authority.
*   **Overlapping Entrümpelung pages:**
    *   `entruempelung.md`
    *   `entruempelungsdienst.md`
    *   `entruempelungsfirma.md`
    *   `entruempelungsdienst-oder-entruempelungsfirma.md` (Guide)
    *   *Issue:* These target the exact same intent (hiring someone to clear a space). They should be consolidated into one definitive "Entrümpelung Österreich" page, with the guide acting as a supporting article linking to it.
*   **Overlapping Gratis Räumung pages:**
    *   `gratis-entruempelung.md`
    *   `gratis-raeumung.md`
    *   *Issue:* Exact same intent (getting a free clearance via value offset/Wertanrechnung). Must be consolidated into one definitive "Gratis Entrümpelung & Räumung durch Wertanrechnung" page.
*   **Overlapping Wohnungsauflösung pages:**
    *   `wohnungsaufloesung.md`
    *   `haushaltsaufloesung.md`
    *   `haushaltsaufloesung-ueberblick.md`
    *   *Issue:* Users do not differentiate between "Wohnung" and "Haushalt" in this context. These need to be merged into one authoritative "Wohnungs- & Haushaltsauflösung" page.

### The "Ankauf / Wertanrechnung" Cluster
*   `altwaren-ankauf.md`, `antiquitaeten-ankauf.md`, `moebel-ankauf.md`
*   *Issue:* These are very thin, specific pages. They should either be significantly expanded to be definitive guides on valuing these items, or consolidated into a robust "Wertanrechnung & Altwaren Ankauf" pillar page.

## 3. Missing Topics (Content Gaps)

### Commercial Intent (Services)
*   **Packmaterial / Umzugskartons:** While mentioned in guides, there is no clear service page offering packing materials or box delivery/rental, which is a high-intent commercial query.
*   **Montageservice (Möbelmontage):** Standalone assembly/disassembly service for users who only need help with heavy furniture but not the transport itself.

### Informational Intent (Guides)
*   **Kosten-Guides per City:** e.g., "Was kostet ein Umzug in Wien? (2026 Guide)".
*   **Checkliste für Firmenumzüge:** We have private checklists, but B2B requires a specific IT & Employee checklist.

## 4. Entity & Terminology Consistency
*   **Wertanrechnung vs. Wertausgleich:** The site switches between "Wertanrechnung" (value offset) and "Wertausgleich". We must pick one primary entity term (recommendation: "Wertanrechnung") and use it consistently, explaining the other as a synonym.
*   **Company Name:** The YAML uses "Sicher Team", but the user prompt mentioned "Sicher Umzug". We need to ensure the exact legal/brand entity is used consistently in text, schemas, and meta tags. (Requires user confirmation).
*   **Trust Signals (EEAT):** Many service pages mention "Erfahrene Räumungsfirma" but fail to inject actual trust data (e.g., "15 Jahre Erfahrung", "1.000.000 EUR Transportversicherung"). This needs to be explicitly pulled from `company.yml` into the body text.

## 5. CTAs and Search Intent Mismatch
*   Currently, many informational guides end with a generic "Gratis Angebot anfordern".
*   *Fix:* Informational guides should have soft-CTAs first (e.g., "Laden Sie unsere Checkliste herunter" or "Lesen Sie mehr über unsere Preise"), followed by a hard-CTA.

## 6. Internal Linking & Orphan Pages
*   Many older guides (e.g., `2025-10-15-messie-raeumung-diskret.md`) are orphaned or only linked via pagination.
*   *Fix:* Implement a strict Silo structure. The "Entrümpelung" service page must link to the "Messie-Räumung" guide, and the guide must link back to the service page with contextual anchor text (not just "Hier klicken").

## 7. Image SEO
*   `hero_image: /topbg.webp` is reused across almost every single service page. This hurts AI image understanding and topical relevance.
*   *Fix:* Even if using a placeholder, images should be specific (e.g., `/assets/images/services/firmenumzug-wien.webp`) with descriptive alt texts directly related to the H1 of that page.

## 8. Action Plan for Next Steps
1.  **Consolidate Overlapping Pages:** Merge the redundant Entrümpelung, Gratis Räumung, and Haushaltsauflösung pages. Add 301 redirects to `_redirects` to preserve SEO value.
2.  **Enforce Entity Consistency:** Standardize on "Wertanrechnung" and confirm the Brand name (Sicher Team vs. Sicher Umzug). Inject EEAT data dynamically from `company.yml`.
3.  **Improve Silo Linking:** Edit the markdown of top guides to naturally link to their parent service pages.
4.  **Update Image References:** Adjust markdown frontmatter to reference contextually relevant image paths.
