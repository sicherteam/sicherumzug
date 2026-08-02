# Phase 2 Final Global Verification Report

## Summary
The global verification audit of the Phase 2 implementation confirms that the technical and semantic foundation is extremely robust. The H1 logic is enforced automatically by the Jekyll templates preventing H1 duplication, entity usage ("Sicher Team", "Wertanrechnung") is completely unified, and literal trust acronyms have been expunged. Service pages successfully integrate descriptive images.

However, before executing the Phase 3 merges (as outlined in `consolidation-plan.md`), some systemic minor content weaknesses across the older legacy pages remain.

## Priority Findings

### Critical Issues
*   **None.** There are no breaking build issues, duplicate H1 tags, or conflicting canonicals. The brand entity is correctly unified as "Sicher Team".

### High Priority Issues
*   **Missing Intent Declarations on Legacy Services:** While the core pages (`umzug-wien.md`, `entruempelung.md`, etc.) have perfectly defined `intent_primary` and `intent_secondary` schema variables, approximately 17 legacy pages in `_services/` (e.g., `garagenraeumung.md`, `altwaren-ankauf.md`) are missing these attributes.
    *   *Impact:* AI retrieval systems may misclassify the intent of the long-tail pages.

### Medium Priority Issues
*   **Orphaned Guides & Internal Links:** Several older guides (e.g., `2025-10-15-messie-raeumung-diskret.md`) currently only link generically to the homepage or lack a direct contextual link to their respective sub-service (e.g., `/leistungen/messie-entruempelung/`).
    *   *Impact:* PageRank flow is sub-optimal.
*   **Image SEO on Long-tail Services:** We improved the Image SEO by embedding `<figure>` tags into the primary pages (Wien, Entrümpelung). However, the 30+ regional or specific pages (e.g., `dachbodenraeumung.md`, `umzug-salzburg.md`) currently lack localized or specific inline imagery, relying entirely on the generic CSS hero background.

### Low Priority Issues
*   **Duplicate Title Strings in Guides:** The file `moebel-verkaufen-willhaben-vs-sofort-ankauf.md` and `gebrauchte-moebel-verkaufen-wien.md` overlap in title string context. (This will be resolved naturally via the Phase 3 consolidation).

---

# Phase 3 Implementation Plan

**Objective:** Execute the structural optimizations, eliminate cannibalization, expand the geographic hierarchy cleanly, and finalize all long-tail SEO attributes based on the audit findings.

**Step 1: Execute Consolidations & Redirects**
*   Merge `entruempelungsdienst.md` and `entruempelungsfirma.md` into `entruempelung.md`.
*   Merge `gratis-raeumung.md` into `gratis-entruempelung.md`.
*   Merge `haushaltsaufloesung.md` and `haushaltsaufloesung-ueberblick.md` into `wohnungsaufloesung.md`.
*   Merge `altwaren-ankauf.md`, `moebel-ankauf.md`, and `antiquitaeten-ankauf.md` into a new comprehensive `wertanrechnung-ankauf.md` pillar page.
*   *Action:* Delete the redundant files and write the corresponding 301 rules into `_redirects`.

**Step 2: Fix Legacy Service Attributes**
*   Audit all remaining `_services/*.md` files and ensure `intent_primary`, `intent_secondary`, `schema_price_from`, and `schema_price_to` are explicitly set for accurate JSON-LD generation.

**Step 3: Resolve Internal Linking (Siloing)**
*   Run a script to systematically link specific guides to their exact parent service. (e.g., `2026-08-18-messie-raeumung-wien-diskret.md` must link to `messie-entruempelung.md` using varied anchor texts like "diskrete Messie-Räumung beauftragen").

**Step 4: Image SEO Expansion**
*   Inject contextual `<figure>` elements into the secondary service pages (e.g., `dachbodenraeumung.md`) with explicit `alt` texts relevant to that specific task.

**Step 5: Geographic Preparation**
*   Ensure the `_states/` structure matches the required "Bundesland → Stadt → Service" hierarchy (e.g., `umzug-niederoesterreich.md` is structured to link down to specific NÖ cities, rather than acting as a flat doorway page).

**Approval Required:** Await explicit user approval before executing Phase 3.
