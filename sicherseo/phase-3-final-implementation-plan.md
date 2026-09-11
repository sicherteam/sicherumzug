---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 3.7 - Final AI / LLM Optimization & Implementation Plan

This plan details the specific, non-destructive actions proposed to optimize the Sicher Team website for AI and LLM extraction, based on the site-wide audit.

## Strict Boundaries
*   **NO** new pages will be created.
*   **NO** pages will be deleted.
*   **NO** URLs or permalinks will be changed.
*   **NO** redirect rules will be introduced.
*   **NO** collections will be restructured.
*   **NO** raw Liquid tags will be placed inside Markdown body content (to prevent rendering errors).

## 1. Schema & Entity Data Alignment (Safe Updates)
*   **Action:** Review and align `_config.yml` with `_data/company.yml` to ensure the entity name "Sicher Team", phone numbers, and addresses are perfectly consistent across the core configuration.
*   **Action:** In `_includes/seo.html`, verify that the `LocalBusiness` schema accurately reflects the dual-core nature (Umzug & Entrümpelung) without diluting the primary focus on Umzug. Ensure `sameAs` properties strictly point to owned profiles (Facebook, Instagram) from `_config.yml`.

## 2. Semantic HTML & Landmark Improvements
*   **Action:** Inspect `_layouts/default.html` (and specific layouts like `service.html`, `guide.html`) to ensure the primary content area is wrapped in a `<main>` tag. This is a critical signal for AI crawlers to identify the core content vs. boilerplate.

## 3. "Entity Summary" Injection (Hardcoded Markdown)
To solve the Who/What/Where/Why/Next requirements for AI without breaking layouts or using risky Liquid:
*   **Action:** For top-tier Service pages (e.g., `_services/umzug-wien.md`, `_services/entruempelung.md`) and State pages (e.g., `_states/wien.md`), I will manually inject a fact-dense, natural language summary paragraph near the beginning or end of the main content body.
*   **Format Example (German):**
    *"Sicher Team ist Ihr verlässlicher Partner für Umzüge und Entrümpelungen in Wien und Umgebung. Mit über 15 Jahren Erfahrung und einer All-Risk-Transportversicherung bis zu 1.000.000 Euro garantieren wir Privat- und Firmenkunden einen stressfreien Ablauf zum transparenten Fixpreis. Kontaktieren Sie uns noch heute für eine kostenlose Besichtigung."*
*   This hardcoded text directly feeds the LLM exactly what it needs to know about the entity in a single, cohesive node.

## 4. Heading Hierarchy & Intent Optimization
*   **Action:** Review the H2 and H3 headings in the primary service files (`umzug-wien.md`, `entruempelung.md`) and top guides.
*   **Action:** Convert generic headings (e.g., "Unsere Leistungen") into natural, conversational, question-based headings (e.g., "Welche Umzugsdienste bietet Sicher Team an?") where it makes sense stylistically. This matches how users prompt AI (voice search / LLM prompts).

## 5. EEAT and Trust Signal Reinforcement
*   **Action:** Ensure that the specific numbers from `_data/company.yml` (15 years experience, 5000 projects, 1M EUR insurance) are explicitly written out in the Markdown text of the core service pages, rather than just relying on the frontend highlight boxes which AI might weigh differently.

## 6. Internal Linking Enhancement (Semantic Context)
*   **Action:** In the core service pages, I will review the text and add 2-3 contextual, natural internal links to relevant guides (e.g., linking "Kosten" to the cost guide, or "Wertausgleich" to the value-offset guide).
*   **Action:** Ensure anchor text is varied and descriptive (avoiding repetitive exact matches).

## 7. Next Action (CTA) Clarity in Text
*   **Action:** Ensure the concluding paragraphs of main pages contain clear, text-based directives for the next step, rather than relying solely on the HTML button components. (e.g., "Bereit für Ihren Umzug? Nutzen Sie unser Online-Formular für ein gratis Angebot.")

## Execution Workflow
Upon approval of this plan, I will:
1. Update configuration/schema files (if needed for alignment).
2. Edit the specific Markdown files for Services and States to inject the Entity Summaries and optimize headings/links.
3. Edit `_layouts/default.html` if `<main>` tags are missing.
4. Run `bundle exec jekyll build` to ensure no errors.
5. Provide the final `phase-3-final-implementation-report.md`.
