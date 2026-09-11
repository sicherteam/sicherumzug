# Master UI/UX & Audit Implementation Plan

This document outlines the confirmed issues, WCAG failures, and design improvements identified during the audit of the Jekyll + Tailwind project.

## UI FIX — Current Implementation

### UI-001 — Mobile Navigation / Dropdown JavaScript Failure
**Priority:** P0
**Category:** CONFIRMED BUG
**Affected files:**
- `assets/js/site.js`
- `browserconfig.xml`
**Observed problem:** Interactive JS-driven elements like the mobile dropdown and FAQ accordion do not work. The browser console throws `TypeError: window.mobileMenuToggle is not a function`.
**Root cause:** Jekyll wraps `assets/js/site.js` inside the default HTML page layout because it has empty frontmatter and a global default layout applies.
**Recommended solution:** Add `layout: null` to the frontmatter of `assets/js/site.js` and `browserconfig.xml`.

### UI-002 — WhatsApp CTA Contrast
**Priority:** P1
**Category:** ACCESSIBILITY ISSUE
**Affected files:**
- `_includes/hero-content.html`
**Observed problem:** The contrast ratio between `text-white` and `bg-emerald-600` fails WCAG 2.2 AA (3.77:1).
**Root cause:** `emerald-600` is too light for white text.
**Recommended solution:** Change background to `bg-emerald-700` while keeping `text-white`.

### UI-003 — Hero CTA Hierarchy
**Priority:** P1
**Category:** UX / CRO
**Affected files:**
- `_includes/hero-content.html`
**Observed problem:** Three visually strong CTA buttons (Besichtigung, WhatsApp, Anrufen) compete for primary attention.
**Root cause:** Equal or highly competing visual weight and layout distribution for multiple actions.
**Recommended solution:** Keep "Gratis Besichtigung sichern" as the single visually dominant action. Reduce WhatsApp and phone options to secondary textual/icon links placed subtly near the primary CTA.

### UI-004 — Hero Information Density / Visual Hierarchy
**Priority:** P1
**Category:** UX / DESIGN
**Affected files:**
- `_includes/hero-content.html`
**Observed problem:** Hero feels like a dashboard, overwhelmed with trust pills, gradients, subheadlines, multiple CTAs, and four thick trust indicator cards.
**Root cause:** Too many elements competing in the initial viewport.
**Recommended solution:** Create a clearer hierarchy (Trust signal -> Main headline -> Supporting text -> Primary CTA -> Secondary actions). Simplify or relocate the 4 trust indicator cards to reduce density and restore a premium, calm SaaS-like feel.

---

## NEXT UI FIX — Sequential Implementation Queue

### UI-005 — Header CTA Visual Treatment
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P1
**Problem:** The Header CTA is overly styled with text gradients, colored drop shadows, and scale-on-hover effects.
**Evidence:** `.bg-gradient-to-r.from-amber-500.to-orange-500.hover:scale-105.shadow-orange-500/20` in `_includes/header.html`.
**Why it matters:** Looks like a generic template/gaming site, breaking the premium perception.
**Proposed solution:** Flatten to a solid, restrained CTA (`bg-orange-500`) with subtle hover state (`bg-orange-600`).
**Risks:** Could blend in if background color context changes.
**Verification:** Inspect desktop header visually; ensure no scale animation or heavy colored shadow exists.

### UI-006 — Card Hover / Shadow System
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P2
**Problem:** Cards use heavy shadows and aggressive hover movements.
**Evidence:** `.shadow-xl .hover:-translate-y-1.5` widely used in `_layouts/home.html`.
**Why it matters:** Excessive movement and deep shadows degrade the modern, minimal design goal.
**Proposed solution:** Replace with subtle shadow transitions (`shadow-sm` to `shadow-md`) and eliminate aggressive vertical translations.
**Risks:** Might make some interactive cards feel less "clickable" if not styled carefully.
**Verification:** Hover over service cards; they should not jump up 1.5 rems.

### UI-007 — Card Radius System
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P2
**Problem:** Widespread use of extremely large border radiuses on cards and containers.
**Evidence:** `.rounded-3xl` in major layout files.
**Why it matters:** Contributes to a bubbly, UI-kit appearance rather than a serious logistics company.
**Proposed solution:** Standardize major cards to `rounded-2xl`, inner controls to `rounded-xl`.
**Risks:** If mixed with sharp corners on nested elements, UI will look broken.
**Verification:** Check border radiuses match a tighter, cohesive scale.

### UI-008 — Gradient Typography
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P2
**Problem:** Gradients applied directly to text.
**Evidence:** `bg-gradient-to-r bg-clip-text text-transparent` used on "TEAM" logo text and hero subheadline.
**Why it matters:** Harder to read and feels less premium.
**Proposed solution:** Revert text to solid brand colors (`orange-500` or `white`).
**Risks:** Loss of brand "flair" if strictly relied upon by stakeholders.
**Verification:** Inspect text color rules; ensure no clipping gradients exist on typography.

### UI-009 — Card Border / Surface Hierarchy
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P3
**Problem:** Hard borders on white cards.
**Evidence:** `.border-gray-200` on `.bg-white` cards over `.bg-background-light`.
**Why it matters:** Creates rigid, cheap-looking boxes.
**Proposed solution:** Soften to `border-slate-200/60` or rely solely on surface contrast/soft shadows.
**Risks:** Loss of contrast if background colors are too similar.
**Verification:** Visual inspection of card edges.

### UI-010 — Typography / Tracking System
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P3
**Problem:** Small text has excessive letter spacing.
**Evidence:** `.tracking-widest` on badges and kickers.
**Why it matters:** Affects readability and looks outdated.
**Proposed solution:** Reduce tracking to `tracking-wide` or standard tracking.
**Risks:** None.
**Verification:** Check kickers and badges for tighter kerning.

### UI-011 — Header / Announcement Bar Density
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P3
**Problem:** The header has too much going on (announcement bar with emojis, mega menus, sticky behavior, gradients).
**Evidence:** Visual evaluation of `_includes/header.html`.
**Why it matters:** High cognitive load before scrolling.
**Proposed solution:** Simplify announcement bar content, perhaps consolidate trust indicators.
**Risks:** Removing conversion-focused emojis might reduce initial trust perception slightly.
**Verification:** Visual assessment of top-of-page density.

### UI-012 — Responsive Visual Hierarchy
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P2
**Problem:** Information hierarchy on mobile viewports can become cramped.
**Evidence:** Playwright tests at 320px/375px.
**Why it matters:** Affects mobile conversion rates.
**Proposed solution:** Increase vertical rhythm (spacing) between sections on mobile specifically.
**Risks:** Could make the page feel too long.
**Verification:** Verify at 375px.

### UI-013 — Reduced Motion / Interaction Polish
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P3
**Problem:** Inconsistent or missing `prefers-reduced-motion` handling for custom animations.
**Evidence:** Marquee animation on mobile announcement bar.
**Why it matters:** Accessibility requirement.
**Proposed solution:** Ensure CSS animations respect reduced motion media queries properly.
**Risks:** None.
**Verification:** Test with OS reduced motion settings enabled.

### UI-014 — Focus Outline Legacy Colors
**Status:** QUEUED — NOT IMPLEMENTED
**Priority:** P3
**Problem:** Some focus outlines use legacy `crimson` classes.
**Evidence:** `.focus-visible:ring-crimson` in `quote-form.html`.
**Why it matters:** Design inconsistency.
**Proposed solution:** Update to `ring-orange-500` or `ring-amber-400`.
**Risks:** None.
**Verification:** Tab through form elements to verify focus ring colors.
