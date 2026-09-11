---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 3.5: Geographic Implementation Plan

Based on the approved Phase 3 Geographic Authority Blueprint, this document outlines the concrete implementation steps to establish a robust, AI-friendly, and SEO-optimized geographic architecture.

---

## 1. Existing Geographic Improvements

Before launching new locations, existing pages must be upgraded to support the new hierarchy and prevent cannibalization.

### Current State Analysis
*   **Structure:** Existing Bundesland (`_states/`) and District pages (`_districts/`) are somewhat flat and lack a strict hierarchical nesting (Austria → State → City → Service).
*   **Service Connections:** Currently, services are often duplicated per region (e.g., `umzug-wien.md`, `umzug-graz.md`) rather than acting as a matrix (City Hub linking to specific local services).
*   **Entity Signals:** Many pages lack hard local facts (e.g., local recycling centers like MA48, specific parking regulations) required to prove true local authority to AI (Google SGE/Gemini).

### Required Improvements
1.  **Refactor `_states/` Hubs:** Update existing state pages (e.g., `wien.md`, `niederoesterreich.md`) to explicitly act as directory hubs. They must logically group and link out to their respective cities/districts.
2.  **Enrich Entity Signals:** Inject localized facts (WHO, WHAT, WHERE, WHY TRUST) into existing top-tier pages (like `umzug-wien.md`).
3.  **Breadcrumb Enforcement:** Ensure all geographic pages implement strict breadcrumbs matching the approved architecture.

---

## 2. First Geographic Implementation Candidates

To establish the new City-level hierarchy without triggering doorway page algorithms, we will start with a highly focused rollout.

**Maximum 5 Initial Locations:**

### 1. Mödling (Niederösterreich)
*   **Search Intent:** High-end residential relocations, villa moves, senior downsizing.
*   **Business Value:** Very High (Commuter belt, high purchasing power).
*   **Required Unique Content:** Mentioning Biedermeier architecture, local parking permit realities in the historical center, and specific routes toward Vienna.
*   **Services to Connect:** Privatumzug, Seniorenumzug, Wertanrechnung.
*   **Why it deserves a page:** Distinct demographic from Vienna, requiring specific handling of high-value items and different municipal permit processes.

### 2. Baden (Niederösterreich)
*   **Search Intent:** Villa relocations, estate clearances, thermal region moves.
*   **Business Value:** Very High.
*   **Required Unique Content:** References to the Kurpark/Kurzone access restrictions, Gründerzeit housing challenges, and local disposal routes.
*   **Services to Connect:** Hausräumung, Privatumzug, Entrümpelung.
*   **Why it deserves a page:** Unique access logistics (Kurstadt rules) and high concentration of large estates requiring specialized clearance.

### 3. Graz (Steiermark)
*   **Search Intent:** Inter-city relocations (Wien ↔ Graz), university student moves.
*   **Business Value:** High (Second largest Austrian city).
*   **Required Unique Content:** Specific Graz topography, municipal rules for moving vans, and university district logistics.
*   **Services to Connect:** Umzug, Studentenumzug, Firmenumzug.
*   **Why it deserves a page:** Major hub independent of Vienna, requiring dedicated logistics and long-distance planning.

### 4. Linz (Oberösterreich)
*   **Search Intent:** Corporate relocations, industrial center moves, A1 corridor logistics.
*   **Business Value:** High.
*   **Required Unique Content:** Industrial zone logistics versus historic center access, regional recycling centers (ASZ).
*   **Services to Connect:** Firmenumzug, Privatumzug, Entrümpelung.
*   **Why it deserves a page:** Strong corporate demand, distinct from eastern Austria.

### 5. St. Pölten (Niederösterreich)
*   **Search Intent:** Suburban expansions, state capital administrative moves.
*   **Business Value:** Medium-High.
*   **Required Unique Content:** Central NÖ logistics, expanding suburban developments, local permit offices.
*   **Services to Connect:** Hausräumung, Privatumzug, Firmenumzug.
*   **Why it deserves a page:** Acts as the natural hub for central/western Niederösterreich moves.

---

## 3. URL Architecture Decision

**Decision: Option B (`/umzug/wien/`) is the recommended architecture.**

### Evaluation:
*   **Option A (`/umzug-wien/`, `/umzug-graz/`):**
    *   *Pros:* Flat, historically used, easy to create quickly.
    *   *Cons:* Does not communicate hierarchy to search engines. Risks looking like a doorway spam directory if scaled to 50+ cities. Harder to parse in Jekyll analytics.
*   **Option B (`/umzug/wien/`, `/umzug/graz/`):**
    *   *Pros:*
        *   **SEO:** Clearly establishes "Umzug" as the parent topical authority, with locations nested beneath it. Protects against doorway penalties.
        *   **Jekyll Maintainability:** Allows grouping files logically (e.g., using Jekyll Collections or permalink structures like `/:collection/:title/`).
        *   **User Clarity:** Logical drill-down path matching the breadcrumbs.
        *   **Future Scaling:** Easily supports further nesting (e.g., `/umzug/wien/1010-innere-stadt/`).

*Note: No URLs will be changed during this planning phase. This decision dictates future implementation.*

---

## 4. Location Page Quality Framework

To guarantee every new location page provides true value and satisfies AI/SEO requirements, the following framework must be strictly followed.

**Minimum Content Requirements per Page:**
1.  **Unique Local Value:** Must reference specific local architecture, geography, or building types (e.g., "Altbau in Neubau", "Villen in Baden").
2.  **Local Moving Challenges:** Specific logistical hurdles (e.g., narrow alleys, lack of elevators, pedestrian zones).
3.  **Relevant FAQs:** Questions addressing hyper-local concerns (e.g., "Wo beantrage ich in Graz ein Halteverbot?").
4.  **Service Connection:** Contextual links to the specific services relevant to that region's demographic.
5.  **Internal Links:** Must link up to the Bundesland Hub and laterally to relevant guides.
6.  **EEAT Signals:** Hard facts (Local addresses if applicable, specific business registration details, reviews, localized trust signals).

---

## 5. Implementation Order

To ensure a safe, stable rollout without SEO disruption, the implementation will proceed in the following phases:

1.  **Phase 1: Hub Restructuring (No new pages)**
    *   Upgrade existing `_states/` pages to act as true directories.
    *   Implement the strict breadcrumb hierarchy across existing geographic pages.
2.  **Phase 2: URL & Routing Preparation**
    *   Configure Jekyll `_config.yml` (if necessary) to support the new Option B URL architecture (e.g., `/:category/:location/`).
    *   Map out necessary 301 redirects for any future legacy URL migrations.
3.  **Phase 3: Pilot Launch**
    *   Create the first two high-value hubs: **Mödling** and **Baden**.
    *   Strictly apply the Quality Framework.
    *   Verify indexing and SERP performance.
4.  **Phase 4: Expansion**
    *   Roll out **Graz**, **Linz**, and **St. Pölten**.
    *   Connect them to their respective State Hubs.

*(End of Plan)*