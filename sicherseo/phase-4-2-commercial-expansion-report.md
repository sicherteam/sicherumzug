---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 4.2: Commercial Authority Expansion Report

## Overview
During Phase 4.2, we focused on expanding the commercial authority of Sicher Team by creating high-value service pages that address distinct, transactional search intents. The objective was to strengthen the primary topical authority (Umzug/Logistics) without causing keyword cannibalization or generating thin "doorway" pages.

## Pages Created

### 1. `_services/klaviertransport.md`
*   **Why Created:** Moving a piano is a highly specialized task requiring distinct equipment, insurance, and expertise. Users searching for this service use highly specific queries (e.g., "Klaviertransport Wien").
*   **Why Existing Pages Weren't Sufficient:** General moving pages mention it, but do not provide enough depth (process, pricing, insurance details for 1M Euro, specific equipment like "Flügelschlitten") to rank competitively for the specific long-tail intent.
*   **Search Intent:** Transactional (Users need a piano moved safely).
*   **Expected Business Value:** High. Specialty moves often command premium pricing and require high trust, fitting perfectly with the company's established EEAT.
*   **Internal Links Added:** Links to standard removals (`umzug-wien.md`) and packing services (`verpackungsservice.md`).

### 2. `_services/moebeltransport.md`
*   **Why Created:** A distinct service from a full household relocation. It targets "Kleintransporte" (single heavy items, store pickups).
*   **Why Existing Pages Weren't Sufficient:** A user wanting to move one couch will bounce from a page offering full-house removals because it feels oversized. This page bridges the gap for smaller, yet commercially viable, transport jobs.
*   **Search Intent:** Transactional / Local (Users looking for quick, insured transport of a few items).
*   **Expected Business Value:** Medium to High (Good entry-level service to acquire new customers; high volume of searches).
*   **Internal Links Added:** Links to piano transport, furniture assembly (`moebelmontage.md`), and general removals.

### 3. `_services/verpackungsservice.md`
*   **Why Created:** An essential upsell/add-on service that significantly increases the average order value of a move.
*   **Why Existing Pages Weren't Sufficient:** While mentioned in checklists on regional pages, the *benefits* (insurance coverage when packed by pros, time savings, specialized materials) required a dedicated page to convince users to book it.
*   **Search Intent:** Transactional / Informational (Users looking for packing help, or wondering if it's worth the cost).
*   **Expected Business Value:** High (Increases margin on existing moves; strong B2B and Senior appeal).
*   **Internal Links Added:** Links to Senior moving, Corporate moving, and material calculation guides.

### 4. `_services/archivumzug.md`
*   **Why Created:** A highly specific B2B service. Moving an archive requires chronological order preservation and strict adherence to DSGVO/Data Privacy, which is different from moving desks and monitors.
*   **Why Existing Pages Weren't Sufficient:** `firmenumzug-wien.md` covers general office moves. Diluting it with too much archive-specific detail would hurt its focus on IT/Office logistics. An archive move is often a standalone project (e.g., moving just the files offsite).
*   **Search Intent:** Transactional B2B (Law firms, medical offices needing secure transport).
*   **Expected Business Value:** Very High (Premium B2B service requiring high trust).
*   **Internal Links Added:** Links to corporate moves (`firmenumzug-wien.md`) and corporate clearing (`firmenaufloesung.md`).

## Candidates Rejected (To Prevent Cannibalization)
*   **Büroumzug:** Intent is 100% identical to the existing `firmenumzug-wien.md`. Created an internal risk of cannibalization. (Instead, ensured "Büroumzug" is present in the text of `firmenumzug-wien.md`).
*   **Seniorenumzug mit Komplettservice:** The page `seniorenumzug.md` already exists and satisfies this exact intent.
*   **Halteverbotszone Service:** This is a logistical add-on feature, not a standalone commercial service worth a dedicated landing page.
*   **Umzugshelfer:** Intent mismatch. Users searching this want cheap hourly labor, not a full-service, fixed-price professional moving company.

## AI Retrieval Benefits
By structuring these new services with clear JSON-LD schema compatibility, dedicated FAQs answering real customer questions (e.g., "Was kostet ein Klaviertransport?"), and explicit trust signals (e.g., 1 Mio. Euro insurance), AI-driven search engines (like Google SGE or ChatGPT) can easily extract factual snippets, pricing ranges, and service guarantees, increasing the likelihood of Sicher Team being recommended as a verified entity for these specialized queries.

## Remaining Commercial Gaps
*   Expansion of the secondary authority (Entrümpelung/Räumung) into specific high-value niches (e.g., "Verlassenschaftsankauf" vs just "Verlassenschaft") if business model supports direct buying.
*   Further strengthening of localized topical authority (City-level pages) *only if* unique, non-doorway content can be provided for those specific regions.