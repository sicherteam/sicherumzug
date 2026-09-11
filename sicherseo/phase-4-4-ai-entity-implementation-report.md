---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 4.4: AI & Entity Leadership Implementation Report

## Overview
This document summarizes the actionable steps taken to optimize the AI extraction readiness and entity clarity for the Sicher Team website, adhering strictly to safety guidelines (no URLs changed, no schemas rewritten, and no pages created/deleted).

---

## 1. Files Changed
- `index.md` (Homepage)
- `_services/umzug-wien.md` (Primary Service)
- `_services/umzug-oesterreich.md` (Primary Service)
- `_services/raeumung.md` (Secondary Service)
- `_services/entruempelung.md` (Secondary Service)
- `_guides/2026-08-15-ultimative-umzugs-checkliste.md` (Guide)

---

## 2. Improvements Applied

**Priority 1: Brand Entity Clarity**
- **Homepage (`index.md`):** Updated the `brand_intro.text` to explicitly name "Sicher Team" as the providing entity. It now clearly answers WHO the company is (a state-licensed moving company), WHAT they do, and WHERE (Austria/Vienna) within the very first content block.
- **Primary Services (`umzug-wien.md`, `umzug-oesterreich.md`):** Replaced vague "wir" references with explicit mentions of the brand entity ("Sicher Team", "Die Experten von Sicher Team"). Hardcoded key trust signals directly into the markdown body, including "15 Jahre Erfahrung", "100% Fixpreisgarantie", and the specific insurance coverage ("All-Risk-Transportversicherung bis 1.000.000 EUR"). Explicitly defined the next step to convert the user (e.g., "vereinbaren Sie jetzt eine kostenlose Besichtigung").
- **Secondary Services (`raeumung.md`, `entruempelung.md`):** Rewrote the introductory text to clearly identify these as secondary, complementary services provided by the moving experts at Sicher Team. This prevents search engines and AI from confusing the primary business (Moving) with the secondary business (Clearing).

**Priority 3: AI Retrieval Optimization**
- **Guide Injections:** Added a bolded "**TL;DR:**" paragraph at the top of the popular `2026-08-15-ultimative-umzugs-checkliste.md` guide. This explicitly summarizes the entire page into a factual, easily extractable block for LLMs, immediately answering the search intent.
- **Factual Hardcoding:** By avoiding Liquid tags for trust signals within the Markdown body on the primary service pages, AI crawlers scanning the raw text (like via `llms-all.txt`) can now directly extract the company's EEAT factors.

**Priority 4: Internal Entity Graph**
- Inserted natural, semantically relevant links from the newly added TL;DR in the guide back to the primary commercial pages (`/leistungen/umzug-wien/` and `/leistungen/umzug-oesterreich/`), bridging the informational and commercial entities without exact-match keyword stuffing.

---

## 3. Schema Changes
- Based on the Priority 2 audit, the existing schemas (`_includes/seo.html`, `_includes/service-schema.html`, and data in `_data/company.yml`) were verified as already structurally robust and correctly populated. Therefore, to adhere to the rule of "only apply schema improvements if... existing schema is incorrect", **no schema files were changed**. The data cascade from `_data/company.yml` perfectly hydrates the JSON-LD schemas.

---

## 4. Entity Improvements Summary
- **WHO:** The "Sicher Team" brand is now front-and-center, explicitly declared in body content rather than assumed via logos or implicit context.
- **WHAT:** The hierarchy between the primary Umzug services and the secondary Räumung/Entrümpelung services is now clearly delineated in the text.
- **WHERE:** Vienna and Austria-wide service areas are explicitly bound to the brand entity in the opening sentences.
- **WHY TRUST:** 15 years of experience, fixed prices, and high insurance coverage are now hardcoded facts in the Markdown text.

---

## 5. Verification Results
- All edits preserved existing layouts, formatting, and SEO structures (H1s, meta tags).
- No Liquid errors were introduced (no `{% raw %}{% raw %}{% endraw %}` needed as trust signals were manually written out).
- Full Jekyll build (`bundle exec jekyll build`) executed successfully without errors.