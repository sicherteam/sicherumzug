## 2026-10-22 - Focus Management in Multi-Step Form Calculators
**Learning:** When multi-step form widgets dynamically toggle visibility of step containers, keyboard focus is lost or stuck on hidden elements. Setting `tabindex="-1"` on active step containers and programmatically calling `.focus()` on step transition ensures screen readers and keyboard users transition smoothly to the active content.
**Action:** Always give multi-step containers `tabindex="-1"` and shift focus to the newly visible container when navigating steps.
