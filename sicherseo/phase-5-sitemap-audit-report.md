---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 5 Sitemap & Indexing Architecture Audit

## 1. Sitemap Coverage
The sitemap (`sitemap.xml`) is correctly generating using the `jekyll-sitemap` plugin. The following critical pages have been verified as present in the sitemap:

**Important Service Pages:**
- `/leistungen/umzug-wien/`
- `/leistungen/entruempelung-wien/`
- `/leistungen/firmenumzug-wien/`
- `/leistungen/raeumung/`

**Important Guide Pages:**
- `/ratgeber/umzug-oesterreich-profi-guide/`
- `/ratgeber/was-kostet-eine-haushaltsaufloesung/`

**Geographic Pages:**
- `/bundesland/wien/`
- `/bundesland/niederoesterreich/`
- `/bundesland/burgenland/`
- `/bundesland/steiermark/`
- `/bundesland/kaernten/`
- `/bundesland/oberoesterreich/`
- `/bundesland/salzburg/`
- `/bundesland/tirol/`
- `/bundesland/vorarlberg/`

**New Commercial Pages:**
- `/leistungen/auslandsumzug/`
- `/leistungen/moebeltransport/`
- `/leistungen/verpackungsservice/`
- `/leistungen/klaviertransport/`
- `/leistungen/archivumzug/`
- `/leistungen/moebelmontage/`

## 2. Sitemap Exclusions

**Identify Thin/Duplicate Pages:**
Currently, several potential duplicate or low-value pages are being indexed via the sitemap because they lack exclusion flags. These were previously identified in `consolidation-plan.md` as candidates for consolidation but are still generating unique URLs. Examples:
- `/leistungen/entruempelung/`, `/leistungen/entruempelung/`, `/leistungen/entruempelungsfirma/`
- `/leistungen/gratis-entruempelung/`, `/leistungen/gratis-raeumung/`
- `/leistungen/wohnungsaufloesung/`, `/leistungen/haushaltsaufloesung/`, `/leistungen/haushaltsaufloesung-ueberblick/`
- `/leistungen/hausraeumung/`, `/leistungen/wien-hausraeumung/`
- `/leistungen/zimmer-raeumung/`, `/leistungen/dachbodenraeumung/`, `/leistungen/kellerraeumung/`, `/leistungen/lagerraeumung/`, `/leistungen/garagenraeumung/`
- `/leistungen/altwaren-ankauf/`, `/leistungen/antiquitaeten-ankauf/`, `/leistungen/moebel-ankauf/`

**Identify Draft/Unnecessary Files:**
The sitemap is also picking up documentation markdown files from the repository root because they lack `sitemap: false` in their frontmatter (or don't have frontmatter but are still processed by Jekyll).
- `/consolidation-plan/`
- `/content-architecture-map/`
- `/phase-2-final-report/`
- `/phase-3-commercial-implementation-report/`
- `/phase-3-commercial-intent-audit/`
- `/phase-3-completion-report/`
- `/phase-3-final-ai-audit/`
- `/phase-3-final-implementation-plan/`
- `/phase-3-final-implementation-report/`
- `/phase-3-geographic-authority-blueprint/`
- `/phase-3-geographic-implementation-plan/`
- `/phase-3-geographic-implementation-report/`
- `/phase-3-guides-audit-report/`
- `/phase-3-internal-linking-plan/`
- `/phase-3-internal-linking-report/`
- `/phase-3-priority-1-audit-report/`
- `/phase-4-1-implementation-plan/`
- `/phase-4-1-implementation-report/`
- `/phase-4-2-commercial-expansion-report/`
- `/phase-4-3-information-authority-audit/`
- `/phase-4-3-information-implementation-plan/`
- `/phase-4-3-priority-1-implementation-report/`
- `/phase-4-3-priority-1-report/`
- `/phase-4-4-ai-entity-audit/`
- `/phase-4-4-ai-entity-implementation-plan/`
- `/phase-4-4-ai-entity-implementation-report/`
- `/phase-4-growth-blueprint/`
- `/phase-5-final-authority-audit/`
- `/phase-5-final-implementation-roadmap/`
- `/phase-5-priority-1-execution-plan/`
- `/phase-5-priority-1-implementation-report/`
- `/plan-draft/`
- `/semantic-audit-report/`

## 3. Jekyll Sitemap Configuration Review

- **_config.yml:** `jekyll-sitemap` plugin is enabled. There are no global exclusions for `.md` files in the root that shouldn't be indexed. `robots.txt` points correctly to the `sitemap.xml`.
- **Front Matter Settings:** The `.md` report files currently do not have `sitemap: false` in their frontmatter, causing the plugin to include them as standard pages.
- **robots.txt:** Correctly allows all necessary user agents and points to the sitemaps. Excludes bad bots.

## 4. SEO Safety Confirmation
- No URLs have been changed.
- No canonicals have been changed.
- No redirects have been added or removed.
- No permalinks have been changed.
