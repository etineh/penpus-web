# Penpus — marketing site

The Penpus landing site: home, privacy, terms, support, and programmatic
per-school SEO pages. Built with **Next.js (App Router) + static export** so it
deploys as a plain `out/` folder to any static host.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # emits ./out
```

## Deploy — Render Static Site

- **Build command:** `npm install && npm run build`
- **Publish directory:** `out`
- **Custom domain:** `penpus.com` (free auto-TLS)

Also deploys as-is to Cloudflare Pages / Vercel / any CDN.

## Structure

```
app/                 routes (home, privacy, terms, support, schools/[slug])
  layout.tsx         metadata, SEO, JSON-LD, theme init
  globals.css        design tokens (exercise-book theme) + shared styles
components/           Nav, Hero, Features, QuizDemo, Schools, CtaBand, Footer …
lib/site.ts          brand + store links (edit store URLs when live)
lib/schools.ts       school list → drives /schools/* pages + homepage chips
public/              favicon, og image, manifest, robots, .well-known/*
```

## Before launch — TODO

- [ ] Set real store URLs + web-app URL in `lib/site.ts`.
- [ ] Confirm the support email in `lib/site.ts` actually receives mail.
- [ ] Export a **1200×630 PNG** OG image (`public/og.png`) and repoint the
      `openGraph`/`twitter` images in `app/layout.tsx` — some scrapers
      (WhatsApp) prefer PNG over the current SVG.
- [ ] Fill the deep-link files once the apps ship:
      `public/.well-known/apple-app-site-association` (real Apple **TEAMID**) and
      `public/.well-known/assetlinks.json` (real Play **SHA-256** signing
      fingerprint). Ensure the host serves the AASA file as `application/json`
      with no redirect.
