## 2026-02-12 - WAI-ARIA and Visual Cues on FAQ Accordions
**Learning:** Accordion components must be fully keyboard navigable and announce their state correctly to screen readers using standard WAI-ARIA roles and attributes like `aria-expanded` and `aria-controls` properties. Providing visual feedback (such as rotating chevrons with smooth CSS transitions) bridges accessibility and delightful interaction.
**Action:** Always ensure accordion headers are `<button>` elements with `aria-expanded` and `aria-controls` properties, and link them to the panel which has `role="region"`. Ensure chevrons have explicit CSS transitions (`transition-transform duration-200`) and toggle them with class names like `rotate-180`.

## 2026-07-17 - Tailwind Focus Rings & Interactive File Previews
**Learning:** In Tailwind CSS, simply adding color classes (like `focus:ring-primary-light`) has no visual effect on element borders unless an explicit ring-width class (like `focus:ring-2`) is provided. Furthermore, adding simple FileReader-based image thumbnail lists to static file inputs significantly increases user confidence and provides delightful interaction.
**Action:** Always pair focus color classes with `focus:ring-2` (or similar) to ensure WCAG 2.1 visible focus states, and enhance upload forms with instant image previews using pure JS FileReader logic.
