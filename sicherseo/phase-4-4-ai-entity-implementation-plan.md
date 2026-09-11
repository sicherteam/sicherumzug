---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 4.4: AI & Entity Leadership Implementation Plan

## Overview
This document outlines the actionable steps to improve AI extraction readiness and entity clarity for Sicher Team based on the Phase 4.4 audit. All improvements prioritize safety, meaning no URLs will change, no new pages will be created, and no schema architectures will be fundamentally rewritten. The focus is on content injections and semantic tightening.

---

## Priority 1 — Critical Entity Clarity Improvements

**Focus Areas:**
- **Brand Entity Consistency:** Ensure "Sicher Team" is explicitly identified as a "Wien based moving company" and a premier "Umzugsunternehmen Österreich".
- **Organization Identity Clarity:** Explicitly answer WHO we are, WHAT we provide, WHERE we operate, and WHY users should trust us in key commercial pages.
- **Service Entity Relationships:** Maintain strict hierarchy. Primary (Organization → Umzug → Locations → Guides) vs. Secondary (Organization → Entrümpelung → Räumung → Wohnungsauflösung).

**Action Items:**
1. **Homepage (`_pages/index.md`):** Inject a strong, declarative EEAT statement immediately in the hero section or first text block explicitly naming "Sicher Team", the services offered, and the coverage area (Austria/Vienna).
2. **Main Services (`_services/umzug-wien.md`, `_services/umzug-oesterreich.md`):** Review the introductory paragraphs to replace vague "wir" references with "Die Experten von Sicher Team". Ensure the WHO/WHAT/WHERE/WHY framework is hardcoded in natural text at the top of these markdown bodies.
3. **Secondary Services (`_services/raeumung.md`, `_services/entruempelung.md`):** Ensure these pages clearly frame the service as a secondary offering provided by the moving experts at Sicher Team, preventing semantic cannibalization of the primary moving intent.

---

## Priority 2 — Schema & Structured Data Improvements

**Audit Recommendations for Implementation:**
- **Organization Schema:** Verify that `_data/company.yml` fields (especially `brand_name` and `legal_name`) are strictly pulled into the base schema.
- **LocalBusiness Schema:** Ensure the `areaServed` property correctly maps to the exact regions (Wien, Niederösterreich, etc.) without unsupported placeholder data.
- **Service Schema:** Confirm that `mainEntityOfPage` and `provider` relationships consistently link back to `#localbusiness`. Ensure `serviceType` matches the explicit commercial intent (Umzug vs. Entrümpelung).
- **FAQ Schema:** Maintain the `acceptedAnswer.author` linkage to `#organization` to attribute expertise to Sicher Team.
- **Breadcrumb Schema:** No changes needed; current structural implementation correctly reflects parent/child hierarchies.

*Note: No direct schema code rewrites are required; this priority focuses on ensuring data fields populating the existing schema are flawless and correctly categorized.*

---

## Priority 3 — AI Retrieval Optimization

**Focus Areas:**
- Clearer service definitions
- Factual statements & answer extraction
- FAQ opportunities
- Trust signals & entity summaries

**Action Items:**
1. **Guide Injections (TL;DRs):** Edit high-traffic informational guides in `_guides/` to include an explicit, bolded "TL;DR" or "Kurzfassung" paragraph at the very top. This paragraph must succinctly answer the core search intent to facilitate easy extraction by LLMs.
2. **Hardcoded Trust Signals:** Remove any reliance on Liquid (like `{% raw %}{{ site.data.company... }}{% endraw %}`) in Markdown bodies. Hardcode key trust metrics (e.g., "15 Jahre Erfahrung", "100% Fixpreisgarantie", "1.000.000 EUR Transportversicherung") directly into the text of core service and location pages.
3. **Factual Statements:** Ensure the next logical step (e.g., "Kostenlose Besichtigung anfordern") is explicitly stated as a factual directive at the end of key service descriptions, matching the user's decision stage.

---

## Priority 4 — Internal Entity Graph

**Focus Areas:**
- Service pages linking to related guides
- Location pages linking to services
- Guides supporting commercial pages

**Action Items:**
1. **Guides → Commercial Support:** Edit top informational guides to ensure they contain natural, contextually relevant internal links back to the primary service pages (e.g., a guide on "Umzugskosten" must link to `/leistungen/umzug-wien/` or `/leistungen/umzug-oesterreich/`).
2. **Services → Guides Linking:** On primary service pages, add subtle "Weiterführende Informationen" links pointing to relevant guides to strengthen topical clusters.
3. **Location → Service Bridging:** In specific district pages (`_districts/`), ensure links pointing back to the parent service utilize natural semantic variations rather than repetitive exact-match anchor texts (avoiding "Umzugsfirma Wien" stuffing).

---

## Execution Rules
- No URL, permalink, or canonical changes.
- No page creation, deletion, or redirects.
- Preserve existing SEO structure (headings, meta data).
- No large content rewrites; focus only on targeted injections and tweaks.
- No Liquid syntax within Markdown body text; use hardcoded natural text.

*Awaiting approval before beginning the implementation of these priorities.*