## 2026-02-12 - WAI-ARIA and Visual Cues on FAQ Accordions
**Learning:** Accordion components must be fully keyboard navigable and announce their state correctly to screen readers using standard WAI-ARIA roles and attributes like `aria-expanded` and `aria-controls` properties. Providing visual feedback (such as rotating chevrons with smooth CSS transitions) bridges accessibility and delightful interaction.
**Action:** Always ensure accordion headers are `<button>` elements with `aria-expanded` and `aria-controls` properties, and link them to the panel which has `role="region"`. Ensure chevrons have explicit CSS transitions (`transition-transform duration-200`) and toggle them with class names like `rotate-180`.

## 2026-07-17 - Tailwind Focus Rings & Interactive File Previews
**Learning:** In Tailwind CSS, simply adding color classes (like `focus:ring-primary-light`) has no visual effect on element borders unless an explicit ring-width class (like `focus:ring-2`) is provided. Furthermore, adding simple FileReader-based image thumbnail lists to static file inputs significantly increases user confidence and provides delightful interaction.
**Action:** Always pair focus color classes with `focus:ring-2` (or similar) to ensure WCAG 2.1 visible focus states, and enhance upload forms with instant image previews using pure JS FileReader logic.

## 2026-07-21 - CSS group-open for Native Accordions & Keyboard Dismiss
**Learning:** Combining native HTML `<details>`/`<summary>` elements with Tailwind CSS's `group` and `group-open:` modifiers lets us style fully keyboard-accessible accordions and rotate indicator chevrons with zero JavaScript. Furthermore, supporting global `Escape` key events to dismiss mobile menus and navigation drawers provides high-impact keyboard accessibility for power users.
**Action:** Style native `<details>` accordions using `group` and child indicators with `group-open:rotate-180 transition-transform`. Always bind a global Escape key event handler to dismiss open overlays and mobile navigation drawers.

## 2026-07-23 - Synchronous DOM Wrapper Creation for Image Previews
**Learning:** When asynchronously loading preview thumbnails using `FileReader`, creating and appending wrapper elements inside the `onload` callback introduces a race condition where smaller/faster files render before larger/slower ones, resulting in a scrambled display order that disagrees with the internal array.
**Action:** Always create and append the DOM wrapper elements synchronously within the file loop, and only set the `src` attribute of the image asynchronously inside the `onload` handler.

## 2026-07-26 - Dynamic Form Validation and Selected File Counters
**Learning:** Adding live accessible input validation (using `aria-invalid` and `aria-describedby` linked to dynamic warning message tags) alongside responsive file count indicators drastically reduces submit-time frustration and reinforces user confidence in static contact forms.
**Action:** Always implement client-side interactive error checking on critical required/formatted input fields (like postcodes and phone numbers) and pair multiple file selections with a clear, localized selection count summary.

## 2026-07-28 - Native Double-Submit Prevention and Visual Submit State
**Learning:** Preventing duplicate form submissions natively on static websites without AJAX requires intercepting the `submit` event, applying disabled CSS styling immediately, and using `setTimeout(..., 0)` to asynchronously disable the submit button. This ensures browsers successfully dispatch the form while visually feedbacking a CSS-animated loading spinner and 'Wird gesendet...' state.
**Action:** Intercept native form submissions, inject animated SVGs with loading text, and disable the trigger asynchronously within a macrotask callback.

## 2026-07-30 - Focus Redirects for Form Validation and Keyboard Dismiss for CSS Megamenus
**Learning:** While live input validation reduces errors, intercepting the form's `submit` event to block submissions on invalid state and programmatically focusing the first invalid field is essential for screen reader and keyboard accessibility. Additionally, CSS-only megamenus using `group-hover` and `group-focus-within` can be easily dismissed by keyboard users by listening for the `Escape` key globally and calling `.blur()` on the active element within the menu context.
**Action:** Always block submissions of forms with custom live validation errors and auto-focus the first invalid input. For CSS-only hover/focus menus, implement global `Escape` key handlers that blur active triggers to close them immediately.
