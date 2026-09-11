---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 3 Commercial Implementation Report

## Overview
Based on the Phase 3.4 Commercial Intent Audit, the existing commercial service pages have been optimized for better search intent, and new high-priority service pages were created to capture missing transactional search volumes.

## Existing Pages Improved

### `_services/firmenumzug-wien.md`
- **Improvements:** Added a new section "Transparente Übergabe & B2B-Protokolle" right before the general services list.
- **Value Added:** Introduces explicit B2B trust signals, mentioning case studies of 5,000+ projects and detailed handover protocols to secure B2B commercial intent.

### `_services/seniorenumzug.md`
- **Improvements:** Added a new section "Enge Koordination mit Pflegeheimen und Seniorenresidenzen".
- **Value Added:** Enhances EEAT and empathetic search intent by directly addressing coordination and communication with nursing homes, a key pain point for relatives organizing the move.

### `_services/entruempelung-wien.md`
- **Improvements:** Added a markdown table showing a concrete example of how the "Wertanrechnung" (value offset) calculation works.
- **Value Added:** Visualizes the cost-saving benefit clearly for users, making the pricing model highly transparent and increasing conversion potential.

### `_services/wohnungsaufloesung.md`
- **Improvements:** Added a comparison table outlining the differences between "Wohnungsauflösung" (focus on empty handover) and "Haushaltsauflösung" (focus on complete household clearing).
- **Value Added:** Prevents cannibalization, guides users instantly to the right service, and provides clear answers to common user intent confusion.

## New Pages Created

### `_services/auslandsumzug.md` (Auslandsumzug / Internationaler Umzug)
- **URL:** `/leistungen/auslandsumzug/`
- **Intent:** Transactional / Investigational.
- **Details:** Targets users moving from/to Austria across the DACH-Region. Provides detailed information on customs clearance, transport insurance, and logistics planning. Fully structured with FAQs, process explanation, and schema data. Includes links to the related planning guide.

### `_services/moebelmontage.md` (Möbelmontage Wien)
- **URL:** `/leistungen/moebelmontage/`
- **Intent:** Transactional.
- **Details:** Captures high-intent searches for furniture assembly, kitchen dismantling, and wall mounting. Highlights the expertise of carpenters/handymen to establish strong EEAT. Fully structured with FAQs, process explanation, and schema data.

## Internal Links Added
- Updated `_services/umzug-wien.md` to include explicit links to the new `auslandsumzug` and `moebelmontage` pages within its core services list, enhancing semantic structure and flow.

## Remaining Commercial Opportunities (Lower Priority)
As per the audit, the following opportunities were identified but deferred due to the maximum 3-page constraint and their medium-priority status:
1. **Möbeltransport & Kleintransport:** Dedicated page for small/single-item transports (e.g., Möbeltaxi).
2. **Verpackungsservice:** Dedicated page for professional packing services (currently only an upsell feature on existing pages).

## Recommendations for the Next Phase
- **Phase 4 Preparation:** Proceed with the full Jekyll site build testing and verification across the new architecture.
- **Analytics & Tracking:** Monitor the performance and user flow of the newly separated `auslandsumzug` and `moebelmontage` pages to see if they capture the expected niche search traffic.
- **Future Expansion:** Consider building out the medium-priority commercial pages (Kleintransport & Verpackungsservice) if resources permit and there is confirmed demand.
