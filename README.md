# Fictional Lab

A research laboratory homepage template designed to be easily deployed with minimal knowledge of `git`, GitHub, and web technologies.

## Tech Stack

| Package | Role |
|---------|------|
| [React](https://reactjs.org/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Vike](https://vike.dev/) | SSG/SSR framework |
| [Linaria / wyw-in-js](https://github.com/callstack/linaria) | Zero-runtime CSS-in-JS |
| [Luxon](https://moment.github.io/luxon/) | Date/time handling |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Markdown rendering |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [Hono](https://hono.dev/) | SSR HTTP server |

> The example content (text and images) was generated with Claude 3.5 Sonnet, GPT-4o, and Flux 1.1 Pro.

---

## Customisation

### Site metadata

Edit `pages/+config.ts` to change the global `title` and `description`.

### Lab name, links, and navigation

Edit the files under `layout/` — `BannerContent.tsx`, `FooterContent.tsx`, and `NavBar.tsx` are the most relevant.

### Home page

Edit `pages/index/WelcomeContent.tsx` and the data file `pages/index/+data.ts`.

### Adding content

| Content type | Directory |
|---|---|
| News | `pages/news/_news/` |
| Articles | `pages/articles/_articles/` |
| People | `pages/people/` |
| Publications | `pages/publications/` |
| Research topics | `pages/research/` |

Each Markdown (`.md`) or HTML file can include a `metadata` code fence at the top:

````markdown
```metadata
title: My Post
author: Alice
date: 2024-06-01
tags: [research, update]
```

Content goes here.
```
````

Supported metadata fields (and their aliases) are defined in `lib/metadata/getFieldByAlias.ts`.

### Locales

Supported locales are configured in `lib/locale/index.ts` (`supportedLocales`). Locale-specific content files use the pattern `filename.LANG.md` (e.g. `post.zh.md`).

### Base path

The `VITE_BASE_PATH` environment variable controls the URL prefix. Set it in `.env` (development) or `.env.production` (production / GitHub Pages). The default for GitHub Pages is `/<repo-name>`.

---

## Development

```bash
pnpm install      # install dependencies (only needed once)
pnpm dev          # start dev server at http://localhost:3000
pnpm test         # run unit tests
```

---

## Building

```bash
pnpm build        # produces dist/client/ (static files) and dist/server/ (SSR entry)
```

---

## Deployment

### Static site (SSG) — GitHub Pages via workflow

The project ships with a workflow at `.github/workflows/deploy.yaml` that:

1. Checks out the repo and installs dependencies with pnpm.
2. Runs `pnpm build` (SSG mode — `prerender: true` is set in `pages/+config.ts`).
3. Uploads `dist/client/` as a Pages artifact and deploys it.

**Steps to enable:**

1. In your repository go to **Settings → Pages → Source** and select **GitHub Actions**.
2. Push to `main` — the workflow triggers automatically.

The base path for the site defaults to `/<repo-name>` (set in `.env.production`). Update `VITE_BASE_PATH` there if your repository name differs.

### Static site (SSG) — manual `gh-pages` publish

```bash
# build first
pnpm build

# publish dist/client/ to the gh-pages branch
pnpm publish
```

This uses the [`gh-pages`](https://github.com/tschaub/gh-pages) CLI. Make sure the repository has the `gh-pages` branch enabled as the Pages source.

### Preview a static build locally

```bash
pnpm build
pnpm preview            # Vike's built-in preview server
# or
pnpm preview:python     # Python HTTP server on port 4000
```

### Server-side rendering (SSR)

Run the Hono/Node.js server in production:

```bash
pnpm build
pnpm prod               # starts server on port 3000 (set PORT env var to change)
```

The server serves static assets from `dist/client/` and renders uncached pages on the fly via `dist/server/`.

To switch from SSG to SSR, set `prerender: false` (or remove it) in `pages/+config.ts`.

---

## Testing

Unit tests cover the metadata parser, file utility, and Markdown parser:

```bash
pnpm test
```

Tests are located in `lib/**/__tests__/` and use [Vitest](https://vitest.dev/). They are path-agnostic and run on Windows, macOS, and Linux.

---

## Project structure

```
pages/          — Vike pages (each sub-directory is a route)
layout/         — shared Layout, NavBar, Banner, Footer components
lib/
  file/         — file enumeration and language record utilities
  locale/       — locale extraction and supported locales
  markdown/     — Markdown parsing, title/description extraction
  metadata/     — YAML front-matter parsing and field alias resolution
vite-plugins/   — custom Vite plugins (metadata collection, asset transforms)
server/         — Hono SSR middleware
assets/         — static assets
patches/        — npm package patches (patch-package)
```

