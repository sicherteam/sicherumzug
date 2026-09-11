---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 3.4 Commercial Intent Gap Analysis

## 1. Existing Commercial Pages Evaluation

### PRIMARY CLUSTER: Sicher Umzug (Moving Services)

*   **Umzug Wien**
    *   **Current URL:** `/leistungen/umzug-wien/`
    *   **Search Intent:** High commercial intent for general moving services in Vienna.
    *   **Current Quality:** Strong. Clearly defines the core service, includes a FAQ, process checklist, and trust signals.
    *   **Strengths:** Clear value propositions (15 years experience, 1.000.000 EUR insurance, Fixpreis).
    *   **Weaknesses:** Slightly generic; relies heavily on linking out for specific niches.
    *   **Conversion Potential:** High. Has clear CTAs (WhatsApp, Form).
    *   **Missing Sections:** Could emphasize specific niche use cases more directly within the content.

*   **Firmenumzug Wien**
    *   **Current URL:** `/leistungen/firmenumzug-wien/`
    *   **Search Intent:** B2B commercial intent for office/business relocation.
    *   **Current Quality:** Good. Addresses downtime, IT logistics, and offers clear business value.
    *   **Strengths:** Highly targeted to business pain points (downtime, data security).
    *   **Weaknesses:** Could feature more explicit B2B trust signals (e.g., "trusted by X companies").
    *   **Conversion Potential:** High for B2B.
    *   **Missing Sections:** Testimonials or case studies of past B2B moves.

*   **Seniorenumzug**
    *   **Current URL:** `/leistungen/seniorenumzug/`
    *   **Search Intent:** Specialized, empathetic moving service for elderly individuals.
    *   **Current Quality:** Good. Clear empathy, full-service approach.
    *   **Strengths:** Empathetic tone, addresses the emotional difficulty of the move.
    *   **Weaknesses:** Lacks concrete examples of coordination with care homes.
    *   **Conversion Potential:** High, particularly for relatives of seniors.
    *   **Missing Sections:** Explicit mention of partnerships with specific nursing homes or care facilities.

*   **Umzug Österreich (and State Pages: Graz, Salzburg, etc.)**
    *   **Current URL:** `/leistungen/umzug-oesterreich/` (and respective state slugs)
    *   **Search Intent:** Broad national or state-level moving services.
    *   **Current Quality:** Functioning as hubs, but state-level pages are currently thin.
    *   **Strengths:** Good foundational architecture for national reach.
    *   **Weaknesses:** State pages share a lot of boilerplate text and lack unique local flavor.
    *   **Conversion Potential:** Medium to High (depending on the location).
    *   **Missing Sections:** Need localized trust signals, specific regional logistics (e.g., alpine challenges for Tirol, parking rules for Graz).

### SECONDARY CLUSTER: Entrümpelung & Räumung (Clearance)

*   **Entrümpelung Wien**
    *   **Current URL:** `/leistungen/entruempelung-wien/`
    *   **Search Intent:** Commercial intent for clearing out properties with a focus on value offset and sorting.
    *   **Current Quality:** Very strong.
    *   **Strengths:** Clear emphasis on "Wertanrechnung" (value offset) and sustainability.
    *   **Weaknesses:** Could more explicitly detail the types of items accepted for offset.
    *   **Conversion Potential:** High.
    *   **Missing Sections:** A clear visual breakdown of how the offset calculation works in practice.

*   **Räumung Wien**
    *   **Current URL:** `/leistungen/raeumung/`
    *   **Search Intent:** Commercial intent for complete property handover (broom-clean).
    *   **Current Quality:** Very strong.
    *   **Strengths:** Clear distinction from general clearance; focuses on B2B/Landlord needs (handover protocols).
    *   **Weaknesses:** Might overlap slightly with residential clearance if not read carefully.
    *   **Conversion Potential:** High.
    *   **Missing Sections:** Explicit examples of handover protocols.

*   **Wohnungsauflösung & Haushaltsauflösung**
    *   **Current URL:** `/leistungen/wohnungsaufloesung/` & `/leistungen/haushaltsaufloesung/`
    *   **Search Intent:** Complete apartment/house clearance, often related to moving out or bereavement.
    *   **Current Quality:** Good.
    *   **Strengths:** Addresses emotional situations (Verlassenschaft) well.
    *   **Weaknesses:** Slight overlap/cannibalization risk between the two terms.
    *   **Conversion Potential:** High.
    *   **Missing Sections:** A clear, tabular comparison between the two services to guide users instantly.

---

## 2. Missing Commercial Opportunities

Based on the primary "Umzug" focus and the secondary "Räumung" focus, here are identified gaps that possess real search intent and business value without duplicating existing content:

1.  **Auslandsumzug / Internationaler Umzug (International Moves)**
    *   *Why:* There is a guide (`2026-06-08-auslandsumzug-planen-tipps.md`) but no dedicated *transactional service page* offering this. Users moving from Austria to Germany/Switzerland (or vice-versa) need a specific commercial landing page detailing customs, cross-border insurance, and long-haul logistics.
2.  **Möbeltransport & Kleintransport (Furniture / Small Transport)**
    *   *Why:* High search volume for "Möbeltaxi Wien" or "Kleintransport Wien". Currently, this is buried inside the main `umzug-wien.md` or `studentenumzug.md`. A dedicated page captures the intent of users who only need to move a couch or a few items, not a whole apartment.
3.  **Verpackungsservice (Packing Service)**
    *   *Why:* While mentioned as a feature on the main Umzug page, a standalone page targeting "Einpackservice Wien" or "Umzugskartons packen lassen" captures high-intent users looking for premium, hands-off moving experiences.
4.  **Montage / Demontage (Furniture Assembly)**
    *   *Why:* Search intent exists for "Möbelmontage Wien" (e.g., Ikea furniture assembly, kitchen dismantling during a move). It's a core service listed in the `company.yml` but lacks a dedicated landing page.

---

## 3. Proposed Pages Definition

### Opportunity 1: Auslandsumzug / Internationaler Umzug
*   **Recommended URL:** `/leistungen/auslandsumzug/` (or `internationaler-umzug`)
*   **Search Intent:** Transactional/Investigational. Users moving across borders needing a reliable, insured partner for complex logistics.
*   **Primary Keyword:** Auslandsumzug Österreich, Internationaler Umzug Wien
*   **Related Entities:** Zoll (Customs), Grenzüberschreitend, Transportversicherung, DACH-Region.
*   **User Questions:** How does customs work? Is my stuff insured across borders? How long does it take?
*   **Required Sections:** DACH-Region focus, Customs clearance help, Long-haul insurance details, Process timeline.
*   **Internal Linking:** Link from `umzug-wien.md`, link to `_guides/2026-06-08-auslandsumzug-planen-tipps.md`.
*   **Priority Level:** High. High ticket value.

### Opportunity 2: Möbeltransport & Kleintransport
*   **Recommended URL:** `/leistungen/moebeltransport/` (or `kleintransport-wien`)
*   **Search Intent:** Transactional. Users needing a van and 1-2 helpers for a few hours to move specific items.
*   **Primary Keyword:** Möbeltransport Wien, Kleintransport, Möbeltaxi.
*   **Related Entities:** Beiladung, Sofa transportieren, Willhaben Abholung.
*   **User Questions:** Do you move single items? Can you pick up a couch I bought online? What is the hourly rate?
*   **Required Sections:** Hourly rates vs. Fixpreis, "Willhaben" pickup service, spontaneous availability (Express).
*   **Internal Linking:** Link to `express-notdienst.md`, link from `studentenumzug.md`.
*   **Priority Level:** Medium. Lower ticket value, but high volume and good entry point for customer acquisition.

### Opportunity 3: Verpackungsservice
*   **Recommended URL:** `/leistungen/verpackungsservice/`
*   **Search Intent:** Transactional. Users wanting to hire out the packing process.
*   **Primary Keyword:** Einpackservice Umzug, Verpackungsservice Wien.
*   **Related Entities:** Umzugskartons, Seidenpapier, zerbrechliche Gegenstände, Full-Service Umzug.
*   **User Questions:** Do you bring the boxes? Do you pack fragile items (glasses, art)?
*   **Required Sections:** Materials provided, Liability/Insurance for packed items, Time saved.
*   **Internal Linking:** Link heavily to/from `wohlfuehl-umzug.md` and `umzug-wien.md`.
*   **Priority Level:** Medium. Great upsell page.

### Opportunity 4: Möbelmontage & Demontage
*   **Recommended URL:** `/leistungen/moebelmontage/`
*   **Search Intent:** Transactional. Users needing help taking apart or putting together furniture during a move.
*   **Primary Keyword:** Möbelmontage Umzug, Küchenabbau Wien, Möbel aufbauen lassen.
*   **Related Entities:** Ikea Pax, Küchenmontage, Tischler, Handwerkerservice.
*   **User Questions:** Can you dismantle my kitchen? Do you assemble new furniture?
*   **Required Sections:** Kitchen dismantling, Wardrobe assembly, Wall mounting (lamps, pictures).
*   **Internal Linking:** Link from `umzug-wien.md` and `firmenumzug-wien.md`.
*   **Priority Level:** High. Extremely common pain point during moves.

---

## 4. Cannibalization Check

*   **Does a similar page already exist?**
    *   *Auslandsumzug:* No service page exists. Only a guide.
    *   *Möbeltransport:* Mentioned in `studentenumzug`, but no dedicated page. `premium-logistik.md` exists but targets high-end art/servers, not standard small transports.
    *   *Verpackungsservice:* Mentioned as a feature in `wohlfuehl-umzug.md`, but warrants its own page for direct search intent.
    *   *Montage:* Mentioned as a feature on the main Umzug page, but "Möbelmontage" has distinct search volume.
*   **Can an existing page be improved instead?** We could stuff these into `umzug-wien.md`, but that page is already comprehensive. Creating dedicated pages allows for targeted SEO and specific FAQs without diluting the main Umzug page.
*   **Would a new page create overlap?** Minimal overlap, provided the scope of each new page is tightly defined (e.g., Möbeltransport is strictly for a few items, not a whole apartment).

---

## 5. Conversion Strategy

*   **Strong CTAs (High Buying Intent):**
    *   *Möbeltransport* & *Montage*: These are often urgent, immediate needs. Strong "Call now" or "WhatsApp for immediate quote" CTAs are crucial.
*   **Educate First (Research Intent):**
    *   *Auslandsumzug*: Users plan this months in advance. The page must educate on customs, insurance, and process before pushing hard for a sale. Lead capture via a detailed inquiry form is best.
*   **Upsell (Medium Intent):**
    *   *Verpackungsservice*: This is a comfort feature. The page should focus on "stress reduction" and "saving time" to convince users it's worth the extra investment.

---

## 6. AI Search Perspective

The recommended architecture reinforces the entity graph for AI (ChatGPT, Perplexity, Google SGE):
*   **WHO:** Sicher Team is established not just as "guys with a truck", but a full-service logistics company with specialized teams (packers, assemblers, international logistics).
*   **WHAT:** Clearly defines the modular nature of the services. You can buy the whole package (`wohlfuehl-umzug`), just the transport (`moebeltransport`), or just the labor (`moebelmontage`, `verpackungsservice`).
*   **WHERE:** Austria/Vienna remains the hub, with `auslandsumzug` establishing them as a gateway to/from Europe.
*   **WHY TRUST:** Dedicated pages allow for specific trust signals (e.g., specialized insurance for international moves, trained carpenters for montage, damage-free guarantees for packing).
