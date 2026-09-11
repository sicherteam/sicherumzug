---
layout: null
sitemap: false
llm_exclude: true
---
# Consolidation Plan: Semantic Authority & Cannibalization Resolution

*Note: No pages have been merged or deleted. This document serves as the roadmap for future structural optimizations after explicit approval.*

## 1. The "Entrümpelung / Räumung" Cluster

### Candidate 1: Entrümpelungsdienst vs. Entrümpelungsfirma vs. Entrümpelung
*   **URLs:**
    *   `/leistungen/entruempelung/`
    *   `/leistungen/entruempelung/`
    *   `/leistungen/entruempelungsfirma/`
*   **Primary Intent:** Transactional/Informational – Users looking to hire a company to clear out a space.
*   **Cannibalization Risk:** High. Google and AI search engines view these three URLs as targeting the exact same semantic intent. This splits authority and link equity.
*   **Recommendation:** **Merge**
    *   **Keep:** `/leistungen/entruempelung/` (Broadest and most authoritative term).
    *   **Merge into Keep:** Take unique content from `entruempelungsdienst.md` and `entruempelungsfirma.md` and add it as H2/H3 sections to `entruempelung.md`.
    *   **Remove:** Delete `entruempelungsdienst.md` and `entruempelungsfirma.md`.
*   **Reason:** Consolidating these into one "Pillar Page" makes it the definitive, longest, and most valuable resource for this topic, matching EEAT standards.
*   **SEO & AI Impact:** Massive boost. Prevents keyword cannibalization, focuses internal link equity, and provides AI (ChatGPT/Gemini) with a single source of truth for the company's clearing services.

### Candidate 2: Gratis Räumung vs. Gratis Entrümpelung
*   **URLs:**
    *   `/leistungen/gratis-raeumung/`
    *   `/leistungen/gratis-entruempelung/`
*   **Primary Intent:** Transactional – Users wanting a free clearance via value offset (Wertanrechnung).
*   **Cannibalization Risk:** Extremely High. Exact same user intent, exact same business model explained on both pages.
*   **Recommendation:** **Merge**
    *   **Keep:** `/leistungen/gratis-entruempelung/` (Historically higher search volume for Entrümpelung).
    *   **Merge into Keep:** Combine the best text and FAQs from both into the retained page.
    *   **Remove:** Delete `gratis-raeumung.md`.
*   **Reason:** Having two identical service offerings confuses both users and search engines. A single, strong page about "Kostenlose Räumung durch Wertanrechnung" is vastly superior.
*   **SEO & AI Impact:** Eliminates duplicate content penalties. Strengthens the "Wertanrechnung" entity.

## 2. The "Wohnungsauflösung / Haushaltsauflösung" Cluster

### Candidate 3: Wohnungsauflösung vs. Haushaltsauflösung
*   **URLs:**
    *   `/leistungen/wohnungsaufloesung/`
    *   `/leistungen/haushaltsaufloesung/`
    *   `/leistungen/haushaltsaufloesung-ueberblick/`
*   **Primary Intent:** Transactional – Users needing to liquidate a complete household/apartment (often due to relocation or death).
*   **Cannibalization Risk:** High. The terms are used completely synonymously by users.
*   **Recommendation:** **Merge**
    *   **Keep:** `/leistungen/wohnungsaufloesung/` (Often preferred in urban areas like Vienna).
    *   **Merge into Keep:** Move the excellent data tables and structured steps from `haushaltsaufloesung-ueberblick.md` into the main `wohnungsaufloesung.md` page.
    *   **Remove:** Delete `haushaltsaufloesung.md` and `haushaltsaufloesung-ueberblick.md`.
*   **Reason:** A single, incredibly detailed guide/service page that handles the entire lifecycle (costs, process, MA48, value offset) is much better than three thin pages.
*   **SEO & AI Impact:** Creates an undeniable authority page that AI systems will reliably cite when users ask "Wie funktioniert eine Wohnungsauflösung in Wien?".

## 3. The "Ankauf" (Buying) Cluster

### Candidate 4: Altwaren Ankauf vs. Antiquitäten Ankauf vs. Möbel Ankauf
*   **URLs:**
    *   `/leistungen/altwaren-ankauf/`
    *   `/leistungen/antiquitaeten-ankauf/`
    *   `/leistungen/moebel-ankauf/`
*   **Primary Intent:** Transactional/Informational – Users wanting to sell old items during a move/clearance.
*   **Cannibalization Risk:** Medium. While technically different sub-niches, the pages currently lack sufficient depth to stand alone.
*   **Recommendation:** **Merge**
    *   **Keep:** `/leistungen/wertanrechnung-ankauf/` (New URL or repurpose `altwaren-ankauf.md`).
    *   **Merge into Keep:** Create one comprehensive "Wertanrechnung & Altwaren-Ankauf" page with specific H2s for Antiquities, Furniture, and Collections.
    *   **Remove:** Delete the thin individual pages.
*   **Reason:** Thin content pages hurt overall site authority. Grouping them under the strong semantic entity of "Wertanrechnung" builds trust.
*   **SEO & AI Impact:** Consolidates authority and perfectly aligns with the core unique selling proposition (USP) of the business.

---
**Next Steps Post-Approval:**
1. Perform the text merges.
2. Setup the necessary `_redirects` (301) to ensure no lost traffic.
3. Delete the redundant files.
4. Update internal links across all guides to point to the new Pillar pages.
