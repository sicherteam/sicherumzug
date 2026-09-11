---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 4.3: Information Authority Audit Report

## 1. Existing Informational Guides Analysis

Based on an audit of the `_guides/` directory (which contains over 120 markdown files), we have identified the current state of our informational content.

### Strongest Guides (Good starting points):
- `umzug-checkliste-ultimativ.md` (and variants like `2026-08-15-ultimative-umzugs-checkliste.md`): Good coverage of the general moving process.
- `umzugskosten-oesterreich-sparen.md` and `2026-07-20-umzugskosten-steuer-absetzen.md`: Address cost factors and tax implications.
- Various clearance (Räumung) checklists (`dachboden-raeumung-wien-checkliste.md`, `hausraeumung-wien-checkliste.md`, etc.).

### Weak/Thin Guides & Overlapping Topics:
- We have multiple checklist files (e.g., `2026-01-10-die-ultimative-umzugs-checkliste.md`, `2026-08-15-ultimative-umzugs-checkliste.md`, `umzug-checkliste-ultimativ.md`) which causes keyword cannibalization.
- Multiple files addressing Delogierung and Zwangsräumung (`2025-11-20-delogierung-oesterreich-ablauf.md`, `2026-08-19-delogierung-zwangsraeumung-oesterreich.md`, `delogierung-zwangsraeumung-wien-vermieter.md`).

### Missing User Questions & Decision-Stage Content:
- While we cover "what to do" (checklists), we lack deep authoritative content on "how to choose" (e.g., how to recognize a reputable moving company, comparing offers, private vs. professional moves).
- Lack of detailed, structured answers to "Was kostet ein Umzug in Österreich?" as a definitive pillar page.

### Missing AI Extraction Opportunities:
- Existing guides often lack a strict, AI-friendly Q&A format (WHO/WHAT/WHERE/WHY) at the top of the page.
- Bulleted summaries and structured data opportunities for costs and timelines are missing in many legacy posts.

---

## 2. Content Gap Analysis & Recommendations

### Cost Cluster (Umzugskosten)
**Opportunities:**
- Was kostet ein Umzug? / Umzugskosten Österreich / Kosten einer Umzugsfirma / Umzug Wien Kosten / Kostenfaktoren beim Umzug

**Evaluation:**
- **Search Intent:** Users want concrete numbers, ranges, and factors that influence the price before they request a quote.
- **Existing Coverage:** We have `umzugskosten-oesterreich-sparen.md`, `2026-07-20-umzugskosten-steuer-absetzen.md`, and `2026-08-14-umzugskosten-steuer-absetzen-oesterreich.md`.
- **Recommended Action:** **Improve existing page**. Consolidate and expand `umzugskosten-oesterreich-sparen.md` into a definitive "Umzugskosten Österreich" pillar page. (Do not merge URLs, but focus all new content depth on this primary file).
- **Business Value:** High. Educates users, filters out low-budget leads, builds trust.
- **Internal Linking:** Link to `angebot.md`, `preise.md`, `_services/umzug-wien.md`.
- **AI Retrieval Benefit:** AI engines look for concrete pricing tables and cost breakdowns.
- **Priority:** High

### Planning Cluster (Umzug Planung & Ablauf)
**Opportunities:**
- Umzug Checkliste / Umzug vorbereiten / Was muss vor dem Umzug erledigt werden? / Umzug Ablauf

**Evaluation:**
- **Search Intent:** Users are in the early stages of moving and need a structured timeline.
- **Existing Coverage:** Over-represented with multiple checklist files (`umzug-checkliste-ultimativ.md`, etc.).
- **Recommended Action:** **Improve existing page**. Select the main URL (e.g., `umzug-checkliste-ultimativ.md`) and upgrade it with AI-friendly summaries, a timeline structure (3 months before, 1 week before), and downloadable PDF mentions (if applicable).
- **Business Value:** High lead generation potential. Captures users early in the funnel.
- **Internal Linking:** Link to specialized services (Halteverbotszone, Verpackungsservice).
- **AI Retrieval Benefit:** Step-by-step lists are highly featured in AI overviews.
- **Priority:** Medium

### Decision Cluster (Umzugsfirma finden)
**Opportunities:**
- Wie finde ich eine seriöse Umzugsfirma? / Umzugsfirma vergleichen / Privat umziehen oder professionelle Hilfe?

**Evaluation:**
- **Search Intent:** Users are weighing the pros and cons of hiring a professional vs. DIY, and need criteria to avoid scams.
- **Existing Coverage:** We have `2026-04-12-moebelpacker-vs-diy-umzug.md` and `2026-08-13-moebelpacker-vs-diy-umzug.md` (duplicate topics).
- **Recommended Action:** **Improve existing page**. Expand the existing `moebelpacker-vs-diy-umzug.md` (choose the one with the better URL history) into a comprehensive guide on choosing a reputable company, including the "Sicher Umzug" trust signals (fixed prices, insurance, local presence).
- **Business Value:** Extremely high. Directly addresses objections and positions Sicher Umzug as the safe choice.
- **Internal Linking:** Link to `bewertungen.md`, `ueber-uns.md`, and `impressum.md` (trust signals).
- **AI Retrieval Benefit:** "How to avoid moving scams" or "what to look for in a moving company" are common AI queries.
- **Priority:** High

### Specialized Clusters
**Opportunities:**
- Firmenumzug Planung / Seniorenumzug Vorbereitung / Auslandsumzug Vorbereitung / Verpacken beim Umzug / Möbel abbauen vor Umzug

**Evaluation:**
- **Search Intent:** Niche specific advice for complex moves.
- **Existing Coverage:** We have specific guides for these (`firmenumzug-oesterreich-profi-planung.md`, `seniorenumzug-oesterreich-profi-hilfe.md`, `2026-06-08-auslandsumzug-planen-tipps.md`, `verpackungstipps-umzug-anleitung.md`, `2026-08-23-moebelmontage-abbau-tipps.md`).
- **Recommended Action:** **Improve existing pages**. Systematically update these key niche guides to enforce the WHO/WHAT/WHERE/WHY format and add clear CTAs to the respective service pages.
- **Business Value:** Medium to High (Corporate moves are high value).
- **Internal Linking:** Deep link to `_services/firmenumzug-wien.md`, `_services/seniorenumzug.md`, etc.
- **AI Retrieval Benefit:** Highly specific semantic matching for long-tail queries.
- **Priority:** Low to Medium

---
## Summary of Actionable Next Steps (Pending Approval)

1. **Do not create new pages** (as most topics already exist but are thin or duplicated).
2. **Select the primary URLs** for Costs, Planning, and Decision clusters and dramatically improve their content depth, EEAT signals, and AI formatting.
3. Keep existing URLs intact to avoid redirects (No URL changes, no merges).
