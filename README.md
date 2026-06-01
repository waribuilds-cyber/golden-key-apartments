# Lagos Luxe Stays

Luxury shortlet apartment marketing website for Lagos, Nigeria. A fast,
conversion-focused single-page site (1, 2 & 3-bedroom units) with frictionless
WhatsApp booking CTAs.

## Tech stack

- **Framework:** TanStack Start (React 19, file-based routing)
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS v4 (semantic design tokens in `src/styles.css`)
- **UI:** shadcn/ui + lucide-react icons
- **Runtime:** Nitro (Cloudflare by default, Netlify for deployment)

## Local development

This project uses [Bun](https://bun.sh).

```bash
bun install      # install dependencies
bun run dev      # start the dev server (http://localhost:3000)
bun run build    # production build
bun run lint     # lint the codebase
```

## Editing site content

All contact details, room data and pricing live in a single config file:

```
src/lib/site-config.ts
```

Update the WhatsApp number, phone, email, address, social links and nightly
rates there — every section and CTA reads from this file.

## Deploying to Netlify

The site is configured to deploy to Netlify via `netlify.toml`. It builds with
the Nitro **netlify** preset, publishes the static client assets from
`dist/client`, and serves SSR through a single Netlify Function
(`netlify/functions/server.mjs`).

### Option A — Connect the repo to Netlify (recommended)

1. Push this repository to GitHub.
2. In Netlify, **Add new site → Import an existing project** and select the repo.
3. Netlify reads `netlify.toml` automatically — no extra settings needed.
4. Deploy.

### Option B — GitHub Actions CI/CD

A workflow at `.github/workflows/deploy.yml` builds and deploys to Netlify on
every push to `main` (and previews on pull requests).

Add these two **GitHub repository secrets** (Settings → Secrets and variables →
Actions):

| Secret | Where to find it |
| --- | --- |
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Applications → **New access token** |
| `NETLIFY_SITE_ID` | Netlify → Site → Site configuration → **Site ID** (API ID) |

Create the Netlify site once (Option A or via the Netlify CLI) to obtain the
Site ID, then let GitHub Actions handle subsequent deploys.

## Project structure

```
src/
  components/site/    # page sections (Hero, Rooms, Pricing, etc.)
  components/ui/      # shadcn/ui primitives
  lib/site-config.ts  # editable content & contact details
  routes/             # file-based routes (index.tsx is the homepage)
  styles.css          # Tailwind v4 theme tokens
netlify/functions/    # Netlify SSR function entry
netlify.toml          # Netlify build & routing config
```
