---
layout: null
sitemap: false
llm_exclude: true
---
# Phase 3.7 - Final AI / LLM Optimization & Site-wide Semantic Review Audit

## 1. Introduction
This document outlines the findings from the comprehensive site-wide audit conducted for the **Sicher Team** website. The goal of this audit is to assess the website's readiness for AI extraction (Google, ChatGPT, Gemini, Claude) and identify semantic gaps, Schema inconsistencies, internal linking issues, and content weaknesses, without planning any destructive actions (like deleting pages, merging, or changing URLs).

## 2. Audit Findings: AI Extraction Readiness

AI extraction relies heavily on the clear presence and structured layout of five key identifiers: **Who, What, Where, Why Trust, and Next Action**.

*   **Who (Entity):** The entity is centrally defined as "Sicher Team" or "Sicher Team e.U." in `_data/company.yml` and is referenced properly in some layouts (like `home.html` and `seo.html` Schema). However, across Markdown content (Guides and Services), there's a lack of explicit, structured entity declaration. The name appears in text but isn't consistently marked up or formatted in a way that emphatically declares "We are Sicher Team".
*   **What (Services):** The separation between the primary business (Umzug / Übersiedlung) and secondary (Entrümpelung & Räumung) is clear in the service pages and navigation. However, some guide pages could better summarize the specific services discussed at the top of the article.
*   **Where (Locations):** The `_states` and `_districts` collections do a good job of covering regions (Wien, Niederösterreich, etc.). The Schema in `seo.html` includes `areaServed`. However, the local pages themselves could more strongly link the local intent to the "Who" and "What" in a concise summary.
*   **Why Trust (EEAT):** Trust signals (experience, fully insured up to €1M, fix price guarantee) exist in `_data/company.yml` and are sometimes mentioned in page texts (e.g., `highlights` front matter). However, these are not uniformly injected into the main body content of guides or some service pages in a natural, hardcoded way that AI can easily parse as EEAT signals.
*   **Next Action (CTA):** Sticky CTAs and quote forms exist (e.g., `quote-form.html`, `sticky-cta.html`), which is good for human users. AI systems need clear text directives (e.g., "Contact Sicher Team today for a free inspection").

## 3. Schema and Entity Consistency

*   **Current State:** Schema is primarily handled in `_includes/seo.html` and `_includes/service-schema.html`.
    *   `seo.html` outputs a `LocalBusiness` / `MovingCompany` schema based on `site.local_business` (from `_config.yml`) and `site.address`. It also dynamically generates `Service`, `FAQPage`, `Article`, and `BreadcrumbList` schemas.
    *   `_data/company.yml` contains authoritative entity data, but `seo.html` seems to rely more on `_config.yml` variables (`site.brand_name`, `site.local_business`, `site.phone`).
*   **Inconsistencies:** There is a slight disconnect between `_data/company.yml` (the intended central truth) and `_config.yml`. `seo.html` uses `site.brand_name` (from config) but `company.yml` has `name: "Sicher Team"`.
*   **Recommendation:** To avoid Liquid parser issues inside Markdown files (as historically encountered), we should **not** inject `{{ site.data.company.name }}` directly into Markdown body text. Instead, we should:
    1.  Ensure `_config.yml` and `_data/company.yml` are perfectly aligned.
    2.  Use hardcoded, natural language references to "Sicher Team", the 1M Euro insurance, and the 15+ years experience inside the Markdown content itself. This is safer and highly effective for AI.
    3.  Keep the JSON-LD in `seo.html` but ensure it uses the most accurate data (pulling from `site.data.company` where possible, or ensuring config is updated).

## 4. Heading Hierarchy and Semantic Structure

*   **Current State:** Pages generally use H1, H2, H3 tags. The `guide.html` and `service.html` layouts enforce a single H1.
*   **Opportunities:** Many H2s and H3s are standard statements. For AI optimization, changing some strategic headings into natural language questions (e.g., instead of "Unsere Leistungen", use "Welche Umzugsdienste bietet Sicher Team in Wien an?") greatly improves extraction for voice search and LLM prompts.
*   **HTML5 Landmarks:** Layouts like `service.html` and `guide.html` use `<section>` and `<article>`. We can ensure `<main>` is correctly wrapping the primary content in `default.html`.

## 5. Internal Linking

*   **Current State:** Breadcrumbs are implemented. Related guides are shown at the bottom of services.
*   **Weaknesses:** Contextual, in-text linking within Markdown bodies is sometimes sparse or relies on exact match anchors. We need to introduce natural, semantically varied anchor texts linking services to guides and vice versa.
*   **Orphan/Weak Pages:** No true orphans detected in the primary architecture, but older guides might lack links *to* the newer location pages.

## 6. Image SEO

*   **Current State:** WebP/AVIF formats are used in heroes (`home.html`, `service.html`), which is excellent.
*   **Weaknesses:** Inside markdown content, if images are used, they need to ensure robust `alt` text that includes the entity and location where relevant (e.g., `alt="Sicher Team Mitarbeiter beim Möbeltransport in Wien"`).

## 7. Actionable Gaps for AI (The "Why")

LLMs look for dense, factual nodes of information. Our current pages are well-designed for humans (Tailwind, highlights, sticky sidebars) but the raw text sometimes spreads the core facts too thin. We need to create concise, fact-dense "entity summary" paragraphs or natural Q&A sections in the content that explicitly tie the Entity + Service + Location + Trust together.
