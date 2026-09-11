---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 4.4: AI & Entity Leadership Optimization - Audit Report

## 1. Entity Clarity

**WHO**
- **Brand Entity:** "Sicher Team" (Legal: "Sicher Team e.U.") is established as the primary entity.
- **Contact Info:** Phone (+43 660 6060775), Email (office@sicher-umzug.at), Address (Wildgartenallee 1, 1120 Wien) are consistently defined in `_config.yml` and `_data/company.yml`.
- **Finding:** The foundational WHO is solid in data files, but brand mentions in body text sometimes rely too heavily on pronouns ("wir") rather than explicitly stating the brand name ("Sicher Team") for AI context.

**WHAT**
- **Primary Business:** Moving services (Privatumzug, Firmenumzug, Seniorenumzug, Auslandsumzug, Möbeltransport, Verpackungsservice, Montage services).
- **Secondary Business:** Entrümpelung, Räumung, Wohnungsauflösung.
- **Finding:** The business hierarchy is generally maintained, but we must ensure that the primary moving services are never overshadowed by the secondary clearing services in the internal linking structure or service definitions. Storage (Einlagerung) is correctly excluded.

**WHERE**
- **Core Areas:** Wien, Niederösterreich, Burgenland, and Österreichweit.
- **Finding:** Geographic targeting is well-defined in schema (`areaServed`) and district collections (`_districts/`).

---

## 2. Schema / Entity Relationships

- **Organization & LocalBusiness Schema:** Highly detailed and integrated via `_includes/seo.html`. Uses `@id` (`#localbusiness`, `#organization`) effectively to establish a central entity node. The `hasOfferCatalog` and `knowsAbout` properties accurately reflect the primary and secondary services.
- **Service Schema:** Correctly tied back to the central entity via the `provider` property linking to `#localbusiness`.
- **FAQ Schema:** The `acceptedAnswer.author` references `#organization`, tightly coupling expert answers to the Sicher Team entity.
- **Breadcrumb Relationships:** Breadcrumb lists (`BreadcrumbList` schema) are implemented, structurally linking child pages back to parent category pages and the Home entity.
- **SameAs Consistency:** Social links (Facebook, Instagram) are correctly populated in `_config.yml` and schema. Wikipedia or unverified links are absent, adhering to strict entity verification rules.
- **Entity Naming Consistency:** The schema consistently uses "Sicher Team".
- **Finding:** Schema architecture is robust. Future optimization should focus on ensuring no "hallucinated" AI tags are added and that `mainEntityOfPage` is always correctly aligned with the primary topic.

---

## 3. AI Extraction Readiness

Evaluating if pages clearly answer the WHO/WHAT/WHERE/WHY/NEXT framework for LLM crawlers:

- **Who provides the service?** Often implied by the header/logo, but AI models reading raw markdown (e.g., via `llms-all.txt`) need explicit declarative sentences at the start (e.g., "Sicher Team ist Ihr...").
- **What exactly is offered?** Clearly outlined in `highlights` and `checklist` front matter for service pages, though some body content could benefit from a clear "TL;DR" summary block.
- **Where is it available?** Accurately reflected in page titles, kickers, and localized district pages.
- **Why trust this company?** Trust signals (Fixpreis, All-Risk Versicherung, 100% Garantie, 15 years experience) exist in `_data/company.yml`, but these need to be hardcoded directly into the Markdown content to ensure AI extraction, as Liquid tags are not parsed within the Markdown body of the current Jekyll setup.
- **What is the next action?** CTAs are present, but could be explicitly formulated to answer the user decision stage (e.g., "Fordern Sie jetzt eine kostenlose Besichtigung an").
- **Finding:** While human-readable extraction is good, AI-readability can be improved by injecting explicit, factual summary statements (TL;DRs) and hardcoded trust signals at the top of content bodies.

---

## 4. Internal Entity Graph

- **Organization → Services:** Clear top-down relationship established via `_data/navigation.yml` and the main `/leistungen/` index.
- **Services → Locations:** `bezirke.md` acts as a hub, but contextual, semantic internal links from specific primary services directly to their localized counterparts need continuous monitoring to avoid keyword stuffing (e.g., repeatedly using "Umzugsfirma Wien").
- **Services → Guides:** The guide collection (`_guides/`) exists, but needs to ensure natural internal links point back to the parent service pages to strengthen topical authority.
- **Locations → Services:** District pages naturally branch off services, but must maintain unique, authentic local value (e.g., local parking/logistics info) to avoid being classified as thin doorway pages by search engines and AIs.
- **Finding:** The entity graph is structurally sound but requires careful semantic internal linking. We must use natural semantic variations rather than exact-match anchor text everywhere.

---

## 5. Content Clarity Issues

- **Ambiguous Wording:** Some pages blur the line between a "service page" and an "informational guide". Service pages must strictly satisfy commercial intent, while guides must satisfy informational intent.
- **Missing Factual Statements:** Lack of explicit TL;DR answers at the beginning of informational guides. AI models prioritize immediately available factual answers.
- **Inconsistent Brand Mentions:** Over-reliance on generic terms ("Wir", "Unser Team") instead of reinforcing the semantic entity ("Sicher Team", "Die Experten von Sicher Team").
- **Weak Service Definitions:** Minor service pages sometimes lack the complete WHO/WHAT/WHERE/WHY trust framework, relying on generic filler text.
- **Liquid Syntax in Markdown:** Relying on `{% raw %}{{ site.data.company... }}{% endraw %}` inside markdown files will fail if the layout does not support parsing it. Trust signals must be hardcoded in natural text within the markdown body.
- **Finding:** Content needs to be audited page-by-page during implementation to enforce the WHO/WHAT/WHERE/WHY framework, remove any Liquid tags from markdown bodies, and replace generic AI filler with concrete, Austrian-specific factual information.

---

## Recommendations for Implementation Phase

1. **Content Hardcoding:** Inject hardcoded EEAT signals and WHO/WHAT/WHERE/WHY/NEXT statements into the Markdown bodies of all top-tier service pages.
2. **TL;DR Injections:** Add explicit factual summaries at the top of informational guides to improve AI extraction.
3. **Brand Entity Reinforcement:** Replace ambiguous pronouns with exact brand mentions ("Sicher Team") in strategic first paragraphs.
4. **Semantic Linking Review:** Ensure internal links use contextual variations and avoid repetitive exact-match anchor texts.
5. **Strict Hierarchy Maintenance:** Ensure secondary services (Entrümpelung) do not cannibalize or overshadow primary services (Umzug).

*Note: No changes to content, schema, or URLs have been made in this step.*