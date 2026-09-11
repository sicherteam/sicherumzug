---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 5 Sitemap Implementation Plan

## What should be changed

1.  **Exclude Audit/Documentation Reports from Sitemap:**
    *   We need to add `sitemap: false` and `llm_exclude: true` to the front matter of all audit, planning, and report markdown files located in the root directory (e.g., `phase-*.md`, `consolidation-plan.md`, `content-architecture-map.md`, `semantic-audit-report.md`, `plan-draft.md`).
    *   *Note: If these files currently lack front matter, we will add basic front matter (`---`, `layout: null`, `sitemap: false`, `llm_exclude: true`, `---`) to prevent Jekyll from rendering them as standard HTML pages and including them in the sitemap.*

2.  **Ensure Low-Value/Duplicate Candidate Pages are NOT Excluded Yet:**
    *   As explicitly requested ("Do not change URLs or permalinks"), and considering these pages exist and may be receiving traffic, we will *not* add `sitemap: false` to the service pages listed in the `consolidation-plan.md` during this step. Consolidation requires proper redirects, which is outside the scope of a pure sitemap/indexing configuration task.

## Why

*   **Audit/Documentation Reports:** These files are meant for internal project tracking and LLM context during development. They provide zero commercial value to users and should not be crawled, indexed, or ranked by search engines. Including them dilutes crawl budget and presents irrelevant pages in search results.

## Expected SEO Benefit

*   **Improved Crawl Budget:** Search engines will focus their crawling resources on the actual commercial and informational pages that matter (Services, Guides, Locations).
*   **Prevent Indexing of Irrelevant Content:** Ensures that search results for the domain are strictly limited to customer-facing content, improving overall domain relevance and quality signals.
*   **Cleaner Sitemap:** A streamlined `sitemap.xml` that accurately reflects the intended site architecture.

## Risk Level

*   **Very Low:** Adding `sitemap: false` to development documentation carries zero risk to the live business. It actively fixes a technical SEO issue (index bloat).
*   No URLs, permalinks, canonicals, or redirects of any actual website content are being modified.

## Execution Steps (Pending Approval)

1.  Iterate through all `.md` files in the root directory (excluding `index.md`, `ablauf.md`, `angebot.md`, `bewertungen.md`, `bezirke.md`, `impressum.md`, `leistungen.md`, `preise.md`, `ratgeber.md`, `ueber-uns.md`, `README.md`, `AGENTS.md`).
2.  Add YAML front matter with `sitemap: false` and `llm_exclude: true` to these project management files.
3.  Run `bundle exec jekyll build`.
4.  Verify `_site/sitemap.xml` no longer contains URLs for `phase-*`, `consolidation-plan`, etc.
5.  Commit changes.