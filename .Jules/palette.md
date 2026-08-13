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

## 2026-08-03 - Live Character Counters and focus-visible Rings on High-Priority CTAs
**Learning:** Adding a live character counter utilizing `aria-live="polite"` on textareas helps prevent input limit errors for assistive technologies and keyboard users in a static form context. Moreover, implementing explicit `focus-visible` rings with brand-compliant color schemes across floating sticky CTA banners and submit buttons ensures a unified keyboard navigation journey.
**Action:** Always pair `maxlength` limits with a live aria-live character counter and visual threshold warnings (e.g. changing text color at 90% limit). Ensure all action elements (floating headers, sticky footers) utilize `focus-visible:ring-2` to support clear accessibility focus states.

## 2026-08-05 - Live Austrian Region Detection for Postcode Validation
**Learning:** Providing real-time local region confirmation when typing a postcode in a localized service area drastically increases user trust and confidence. Coupling this with the existing dynamic error system and updating `aria-describedby` dynamically ensures high screen-reader accessibility and zero cognitive friction.
**Action:** Always map national postcode prefixes to regional locations to provide immediate positive visual and auditory feedback on location coverage during typing.

## 2026-08-10 - Success Message Focus Redirects and Visible Scale Enhancements
**Learning:** When asynchronously submitting form contents on static single-page layouts, hiding the active interactive inputs using standard Tailwind CSS classes like `hidden` (rather than non-standard keywords) prevents visual layout jumps. Furthermore, programmatically shifting focus to the success message element using `tabindex="-1"` and `.focus()` immediately informs assistive screen readers of the terminal state. Centering and scaling visual feedback SVGs (like checkmarks) to robust sizes like `w-12 h-12` significantly boosts user delight and cognitive comprehension of completed states.
**Action:** Ensure success response containers have `tabindex="-1"`, call `.focus()` immediately upon generation, and scale checking assets dynamically to prominent grid/flex proportion dimensions.

## 2026-08-13 - Required Indicator Semantics and Input Transition Fidelity
**Learning:** Using a plain string asterisk (e.g. `Name*`) inside a `<label>` can lead screen readers to read the visual marker aloud awkwardly (e.g., "Name asterisk"). Separating required asterisks into a styled, screen-reader hidden container (`aria-hidden="true"`) coupled with an explicit programmatic `aria-required="true"` attribute on the associated input ensures correct, accessible behavior. Furthermore, using `transition-colors` instead of `transition-opacity` on form inputs provides high-fidelity, smooth border transitions when focused.
**Action:** Always structure required fields with `<span class="text-red-600" aria-hidden="true">*</span>` and matching `aria-required="true"` on inputs. Use specific CSS transition utilities (e.g., `transition-colors`) for keyboard focus visual ring styling.
