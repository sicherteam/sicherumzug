---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 3: Geographic Authority Blueprint

## 1. Current Geographic Coverage

### Existing Architecture
*   **Bundesland Pages (`_states/`):** Wien, Niederösterreich, Oberösterreich, Steiermark, Salzburg, Tirol, Kärnten, Vorarlberg, Burgenland.
*   **City/District Pages (`_districts/`):** Covers all 23 districts of Vienna (1010-1230), plus key surrounding cities in Niederösterreich/Burgenland (Baden, Eisenstadt, Klosterneuburg, Korneuburg, Mattersburg, Mödling, Neusiedl am See, Oberpullendorf, Rust, Schwechat, St. Pölten, Tulln).
*   **Service Pages (`_services/`):** Core service pages often mapped to states or major cities (e.g., `umzug-wien.md`, `umzug-graz.md`, `umzug-niederoesterreich.md`).

### Strengths
*   Broad baseline coverage of the entire Austrian market.
*   Pages utilize structured YAML front matter (hero, highlights, FAQs, process) which supports consistent rendering and EEAT signals.
*   Vienna and its surrounding districts are highly granular.

### Weaknesses
*   **Doorway Page Risk:** Some district/city pages rely too heavily on template swapping without enough unique, localized substance.
*   **Structural Mixing:** `_districts` mixes Vienna's urban districts with distinct regional cities (e.g., Baden, St. Pölten), flattening the natural hierarchy.
*   **Cannibalization:** Overlap between state pages (e.g., `wien.md`), city services (`umzug-wien.md`), and general services (`umzug.md`) without clear canonical or hierarchical boundaries.

### Gaps
*   Lack of a strict, logical internal linking hierarchy that perfectly nests Cities inside States.
*   Many regional pages lack hyper-local, actionable facts (e.g., specific parking regulations, local recycling centers, distinct topographical challenges).

---

## 2. Future Geographic Hierarchy

### Recommended Structure
**Austria (Root/Home) → Bundesland (State Hub) → City (Local Hub) → Service (Specific Intent)**

### Why this hierarchy is best for this Jekyll project:
1.  **Topical Authority & Semantic Grouping:** Search engines (Google) and AI (ChatGPT/Gemini) understand geography hierarchically. By explicitly nesting cities within their respective states, we build an interconnected semantic web rather than a flat list of disconnected URLs.
2.  **Protection Against Doorway Algorithms:** A flat architecture of `[Service]-[Location]` pages often triggers spam filters. A directory-style hierarchy (or strong hierarchical linking via breadcrumbs and hub pages) proves the site is an authoritative directory of its own services, grounded in real geography.
3.  **Jekyll Native Compatibility:** Jekyll handles this beautifully via Collections (`_states`, `_cities`, `_services`) and relational front matter (e.g., `state: niederoesterreich` in a city file), allowing automated, dynamic hub generation without heavy plugins.
4.  **User Journey:** Users searching broadly (e.g., "Umzug Niederösterreich") land on a State Hub and can naturally drill down to their specific region (e.g., "Mödling"), while highly specific searches land directly on the City/Service page.

---

## 3. Priority Regions

Ranked by business value (core focus on moving/clearance, originating from Vienna) and search demand:

1.  **Wien:** Extreme Business Value. Home base, highest population density, highest search volume, continuous demand.
2.  **Niederösterreich:** Very High Value. The immediate commuter belt surrounding Vienna; high volume of house moves, suburban relocations, and estate clearances.
3.  **Burgenland:** High Value. Immediate expansion area from Vienna/NÖ; manageable logistics.
4.  **Steiermark:** High Value (Graz focus). Second largest city, strong demand for inter-city (Wien ↔ Graz) and student relocations.
5.  **Oberösterreich:** High Value (Linz focus). Major economic hub, corporate relocations, and private moves along the A1 corridor.
6.  **Salzburg:** Medium-High Value. High purchasing power, lucrative long-distance and premium moves.
7.  **Tirol:** Medium Value. Long-distance logistics, requires specialized winter/mountain capabilities.
8.  **Kärnten:** Medium Value. Moderate volume, long-distance moves.
9.  **Vorarlberg:** Niche/Premium Value. Lowest volume due to extreme distance, but highly lucrative per individual move.

---

## 4. Priority Cities

Before mass-generating locations, we focus on hubs with distinct value. For every recommended city:

### 1. Wien (and its 23 Districts)
*   **Search Intent:** Hyper-local, immediate need, logistical problem solving (parking, narrow stairs).
*   **Business Value:** Core market.
*   **Competition Level:** Very High.
*   **Recommended Services:** Umzug, Entrümpelung, Firmenumzug, Hausräumung, Seniorenumzug.
*   **Why it deserves to exist:** Every district has unique challenges (e.g., 1010 pedestrian zones vs. 1220 single-family homes).

### 2. Graz (Steiermark)
*   **Search Intent:** Inter-city relocations, university student moves, corporate branch setups.
*   **Business Value:** High.
*   **Competition Level:** High.
*   **Recommended Services:** Umzug, Studentenumzug, Firmenumzug.
*   **Why it deserves to exist:** 2nd largest city, unique topology, specific municipal regulations for moving vans.

### 3. Linz (Oberösterreich)
*   **Search Intent:** Industrial/corporate moves, private relocations along the Westbahn/A1.
*   **Business Value:** High.
*   **Competition Level:** Medium-High.
*   **Recommended Services:** Firmenumzug, Privatumzug, Entrümpelung.
*   **Why it deserves to exist:** Economic powerhouse; specific logistics required for industrial zones and urban center.

### 4. Mödling & Baden (Niederösterreich Süd)
*   **Search Intent:** High-end residential, villa relocations, senior downsizing.
*   **Business Value:** Very High (High purchasing power).
*   **Competition Level:** Medium.
*   **Recommended Services:** Privatumzug, Seniorenumzug, Hausräumung, Wertanrechnung.
*   **Why it deserves to exist:** Distinct architectural profile (Gründerzeit/Biedermeier villas) requiring careful handling, discrete logistics, and localized parking permits.

### 5. St. Pölten (Niederösterreich)
*   **Search Intent:** Suburban expansions, state capital administrative relocations.
*   **Business Value:** Medium-High.
*   **Competition Level:** Medium.
*   **Recommended Services:** Hausräumung, Privatumzug, Firmenumzug.
*   **Why it deserves to exist:** Central hub for NÖ, distinct from the immediate Vienna commuter belt.

---

## 5. Local Content Requirements

To absolutely prevent doorway pages, **no city or district page may be created** unless it meets the following minimum requirements:

1.  **Unique Local Information:** Must reference specific local architecture, topography, or building types (e.g., "Altbau in Neubau", "Villen in Baden").
2.  **Local Moving Challenges:** Specific logistical hurdles (e.g., narrow alleys, lack of elevators, pedestrian zones, mountain access).
3.  **Local Regulations:** Accurate information on municipal permit rules for Halteverbotszonen (No-Parking Zones) or specific local administrative paths.
4.  **Recycling/Disposal Facts:** For clearance services, mention specific local disposal centers (e.g., MA48 in Vienna vs. regional ASZ in NÖ).
5.  **District/Neighborhood References:** Genuine mention of real neighborhoods, streets, or local landmarks to prove localized operational knowledge.
6.  **Real FAQs:** Questions that address hyper-local concerns, not just generic questions with the city name find-and-replaced.
7.  **Local Service Relevance:** Clear justification for why a specific service is relevant to this demographic (e.g., Student moves in university cities).

---

## 6. Internal Linking Strategy

Nodes must connect systematically to distribute PageRank and establish clear semantic context:

*   **Bundesland ↔ City:**
    *   The **Bundesland Hub** must list and link downward to all active, priority **City Pages** within its borders.
    *   Every **City Page** must have a contextual link back up to its **Bundesland Hub** (e.g., "Als Teil unseres Netzwerks in [Niederösterreich]...").
*   **City ↔ Service:**
    *   The **City Page** acts as the local nexus. It should link directly to specific **Service Pages** relevant to that region.
    *   General **Service Pages** (e.g., "Umzug") should feature a section linking to priority **City/State Hubs** to demonstrate geographic reach.
*   **Guides ↔ Geography:**
    *   Informational **Guide Pages** (e.g., "Halteverbot beantragen") must utilize contextual in-text links to relevant **Cities** (e.g., "In [Wien] gelten andere Regeln als in [Graz]").
*   **Breadcrumbs:** Strict implementation of hierarchical breadcrumbs (Home > Bundesland > City > Service) across all relevant layouts.

---

## 7. AI Search Optimization

To excel in Google's SGE (Search Generative Experience), ChatGPT, and Gemini, the geographic structure must clearly and factually output:

*   **WHO:** "Sicher Team" - explicitly defined as a professional, registered Austrian moving company with fest-angestelltem (fixed-employed) local staff.
*   **WHAT:** Explicit, factual bullet points of services offered (e.g., "Privatumzug mit Fixpreisgarantie", "Entrümpelung mit Wertanrechnung"). No fluff.
*   **WHERE:** Exact, unambiguous geographic coverage. Contextualized with real local knowledge that AI can verify against maps/local data.
*   **WHY TRUST:** Hard data required. Mention specific trust signals: "Transportversicherung bis € 1.000.000", "Gratis Erstbesichtigung", "Über 15 Jahre Erfahrung", "Fixpreisgarantie".

*This structure ensures that when an AI summarizes our capabilities for a user, it has direct access to factual, structured, and highly relevant local data.*
