# Website quality tests

Install Ruby 3.3.2 and the Gemfile dependencies, plus Node 22. Then:

```sh
npm --prefix _tests ci
cd _tests && npx playwright install chromium && cd ..
npm run test:e2e
npm run test:a11y
npm run test:performance
```

The tests build a preview into `_tests/.site` and start a local HTTP server at 127.0.0.1:4179. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for an already installed Chrome. Set `BASE_URL` to test an existing preview instead of building locally. The SEO assertion expects the preview's intentional noindex.

Tool results run at 320, 390, 768, 1024 and 1440 pixels. Mobile cases also exercise PDF downloads, print, reset and quote transfer. Boundary cases cover validation, navigation and form failure/success. Form endpoint requests are mocked; tests never intentionally send a real enquiry. No form analytics or new measurement events are introduced or required by this suite.

Axe scans initial pages and tool results at 390 and 1440 pixels. The slow-network test applies 150 ms latency and 200 KiB/s download speed. Lighthouse uses its standard mobile simulation plus an explicit desktop profile; scores are diagnostics, not a field INP/Core Web Vitals guarantee or full WCAG conformance. Local gzip/static serving is not proof of production hosting headers or redirects. Browser plugin not available during setup; Playwright was used.

Reports, screenshots and failed-test traces go to ignored `_tests/artifacts` and `_tests/test-results`. CI runs the same suite and retains artifacts. Install dependencies before running; the tests do not install packages automatically.
