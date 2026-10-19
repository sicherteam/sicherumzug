# Sicher Team website

Jekyll source for https://sicher-umzug.at/.

## Cloudflare Pages

- Production branch: `main`
- Build command: `bundle exec jekyll build`
- Output directory: `_site`
- Build with `_config.yml` only. `_config.preview.yml` is reserved for the separate preview.
- `_redirects` and `_headers` are included in Jekyll output for Cloudflare Pages.

## Local checks

Use Ruby 3.3.2, run `bundle install`, then `bundle exec jekyll build`.
Browser tests: `npm --prefix _tests ci`, `cd _tests && npx playwright install chromium`, then run `npm run test:e2e` from the repository root.
