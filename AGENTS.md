# AGENTS.md

This file provides instructions for AI coding agents to work on this project.

## Project Overview
This is a static website built with Jekyll, a popular static site generator. The project uses the `github-pages` gem, which simplifies deployment to GitHub Pages.

## Dev Environment Setup

This project uses Ruby and Bundler to manage dependencies.

- **Ruby Version:** This project is configured to use Ruby `3.3.2`. It's recommended to use a version manager like `rbenv` or `rvm` to ensure compatibility.
- **Install Dependencies:** Run the following command to install the required gems:
  ```bash
  bundle install
  ```

## Development Server

To start the local development server, run the following command. This will build the site and make it available at `http://localhost:4000`. The server will automatically regenerate the site when you make changes to the source files.

```bash
bundle exec jekyll serve
```

## Build Process

To build the static site for production, use the following command. The generated files will be placed in the `_site` directory.

```bash
bundle exec jekyll build
```

## Publishing Safety (Critical)

This repo uses `github-pages`, which includes plugins that may publish Markdown files even without explicit YAML front matter. Assume that any top-level `.md` file can become a public page unless it is explicitly excluded.

- Internal-only docs (plans, SOPs, notes, checklists, working drafts) must never be stored in a publishable location unless they are intentionally public.
- Keep internal docs in non-published locations (prefer underscore-prefixed folders like `_internal`) or ensure those paths are listed in `_config.yml -> exclude`.
- The `plans` folder is internal-only and must remain excluded in `_config.yml`.
- Do not add internal docs to navigation, sitemap-facing templates, `llms.txt`, or `llms-all.txt`.
- If a new internal folder is introduced, add it to `_config.yml -> exclude` in the same change.

### Mandatory verification after structural/content changes

After adding/moving Markdown files or changing Jekyll config/layout behavior:

1. Run a clean build:
   ```bash
   bundle exec jekyll build --destination /tmp/rr-site-build-check
   ```
2. Verify internal paths are not published:
   ```bash
   ls -la /tmp/rr-site-build-check/plans
   rg -n "/plans/" /tmp/rr-site-build-check/sitemap.xml /tmp/rr-site-build-check/llms.txt /tmp/rr-site-build-check/llms-all.txt
   ```
3. If any command shows internal content, fix `_config.yml` `exclude` rules before finishing the task.

## Code Style and Conventions

- The project follows standard Jekyll conventions for file structure and organization.
- Content is written in Markdown.
- Layouts and includes are located in the `_layouts` and `_includes` directories, respectively.
- There is no automated linter or code style enforcement configured for this project.

### YAML Front Matter
- Content files processed by Jekyll (like pages and collection items with a `.md` extension) use a YAML front matter block at the top for configuration. This block is enclosed by triple-dashed lines (`---`).
- When editing these files, check for a YAML front matter block at the beginning.
- If a YAML block is present, ensure any changes within it are valid YAML and do not contain Markdown syntax (like links or emphasis).
- Guides and other dated collections must include a `date: YYYY-MM-DD` entry in the front matter so Jekyll can order and publish them correctly.
- Copy should always read naturally for site visitors. Do not mention internal data sources (e.g., Search Console, analytics) or tooling in the published content, and keep the focus on customer benefits.
- Avoid referencing search engines (words such as “Google”, “googeln”, “Search Console”, etc.) in new copy unless an existing component absolutely depends on it (for example, the Google Maps embed on the contact page). Use neutral phrasing instead (e.g., “when you look for …”).
- Favor conversational, human wording and avoid typographic em dashes; stick to simple sentences that match the existing tone.
- When using placeholders such as `{{ site.whatsapp }}` or `{{ site.phone }}`, either wrap them in a real link (e.g., `[WhatsApp]({{ site.whatsapp }})`) or point readers to an explicit CTA/button so visitors know exactly how to contact us.

## Testing

There is no automated testing suite set up for this project. Any changes should be manually tested by running the development server and verifying that the site builds and displays correctly.
