---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 5: Priority 1 Execution Plan

This execution plan focuses exclusively on implementing Priority 1 items (High ROI / Low Risk) identified in the strategic roadmap.

**Important Implementation Rules to follow during execution:**
- No URL changes.
- No redirects.
- No page deletions.
- No mass rewrites.
- No new pages unless explicitly approved.
- Preserve existing SEO architecture.
- Preserve Umzug as primary authority.
- Preserve Entrümpelung & Räumung as secondary cluster.

---

## 1. Hardcode Trust Signals & Entity Declarations

**File(s) affected:**
- `_services/umzug-wien.md`
- `_services/privatumzug.md` (if exists, or main related service page)
- `_services/entruempelung-wien.md`
- `_services/firmenumzug-wien.md`
- Major guide pages (e.g., `_guides/2024-xx-xx-umzug-checkliste-ultimativ.md`)

**Current issue:**
The brand entity ("Sicher Team") and core trust signals (e.g., 15 years experience, All-Risk Insurance, fixed prices) are centrally managed via data files. Because Jekyll liquid tags are not parsed within the Markdown body on this setup, AI crawlers scraping the raw text (via `llms-all.txt`) only see generic pronouns ("wir") and miss crucial EEAT elements.

**Proposed change:**
Inject a hardcoded, explicit "TL;DR" summary block at the very top of the Markdown content body for the most critical service and guide pages.
Example Format:
*Zusammenfassung: Das Sicher Team ist Ihr erfahrener Partner für [Service] in [Ort]. Mit über 15 Jahren Erfahrung, 100% Fixpreis-Garantie und voller All-Risk-Versicherung bieten wir ...*

**Why this improves SEO/AI/user experience:**
- **AI/LLM:** Provides a highly dense, factual paragraph immediately tying the specific service, the location, and the trust signals directly to the "Sicher Team" entity. This is optimal for retrieval augmented generation (RAG) models.
- **User Experience:** Gives human readers a quick, scannable summary of who the company is and why they should be trusted immediately upon landing on the page.

**Risk assessment:**
- **Risk Level:** Very Low.
- **Why:** We are only appending one introductory paragraph to the body text. We are not changing URLs, front matter, or structural HTML.

**Verification method:**
- Run `bundle exec jekyll build`.
- Inspect the generated `llms-all.txt` and the rendered HTML pages to ensure the TL;DR blocks appear correctly and do not disrupt the markdown flow.

---

## 2. Internal Linking Anchor Text Diversification

**File(s) affected:**
- `_guides/` (various guides linking to service pages)
- `_services/` (service pages linking to location hubs like `/leistungen/umzug-wien/` or `/bezirke/`)

**Current issue:**
Semantic links pointing to important hub pages often use exact-match anchor texts repetitively (e.g., always linking to the Vienna moving page with "Umzugsfirma Wien").

**Proposed change:**
Review the Markdown body text of high-traffic guides and service pages. Where internal links are present, manually adjust the anchor text to be more natural and contextually relevant.
Examples:
- Change `[Umzugsfirma Wien](/leistungen/umzug-wien/)` to `[unser erfahrenes Team in Wien](/leistungen/umzug-wien/)`.
- Change `[Entrümpelung Wien](/leistungen/entruempelung-wien/)` to `[professionelle Räumung in Wien](/leistungen/entruempelung-wien/)`.

**Why this improves SEO/AI/user experience:**
- **SEO:** Protects against over-optimization filters and broadens the semantic relevance of the target pages.
- **AI/LLM:** Helps AI contextually understand the relationship between the linking page and the target page based on natural language rather than stuffed keywords.

**Risk assessment:**
- **Risk Level:** Very Low.
- **Why:** Only text strings inside Markdown link brackets are being modified. No paths, slugs, or overall link counts are being changed.

**Verification method:**
- Search modified files using `git diff` to confirm anchor text variation.
- Run `bundle exec jekyll build` and check for broken links.
