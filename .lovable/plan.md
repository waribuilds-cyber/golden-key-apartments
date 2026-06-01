## Goal

Organize the project so it's clean and ready to push to GitHub, and add a Netlify static deployment setup with GitHub Actions for CI/CD. This is a marketing-only site with no backend, so a static export is ideal for Netlify.

## What I'll add

### 1. README.md (project root)
A professional README with:
- Project name (Lagos Luxe Stays) and short description
- Tech stack (TanStack Start, React 19, Tailwind v4, Vite 7)
- Local setup instructions (`bun install`, `bun run dev`)
- Build/deploy notes
- Note on editing `src/lib/site-config.ts` for contact details

### 2. Static build output for Netlify
The site is a static marketing page (no server functions in use). I'll configure a static prerender/SPA output so Netlify can host it as files.

- `netlify.toml` at the root with:
  - `build.command` = the static build command
  - `build.publish` = the output folder
  - SPA redirect rule (`/* -> /index.html 200`) so client routing works
  - Node version pinned

### 3. GitHub Actions CI/CD (`.github/workflows/deploy.yml`)
A workflow that on push to `main`:
- Checks out the repo
- Sets up Bun
- Installs dependencies
- Runs lint + build
- Deploys to Netlify using the official Netlify deploy action

This requires two GitHub repository secrets (you add these in GitHub settings — I'll document them in the README):
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

### 4. Repo hygiene
- Verify `.gitignore` already covers `node_modules`, build output, env files (it does — minor additions if needed).
- Add a `.nvmrc` / Node version pin for consistent builds.
- Optionally add a `LICENSE` placeholder note in the README.

## Technical notes

- Current `vite.config.ts` uses `@lovable.dev/vite-tanstack-config` which defaults Nitro to a Cloudflare target. For a no-backend marketing site, the cleanest Netlify path is a static build. I'll set the build to produce static assets and point `netlify.toml` to that output, keeping the existing Cloudflare-oriented config untouched for the Lovable preview.
- If the static prerender output path differs from expectations, I'll verify by running the build once and confirming the publish directory before finalizing `netlify.toml`.
- No code/logic changes to the site components — this is purely build/deploy/repo configuration.

## Out of scope
- No changes to the website's UI, content, or business logic.
- No switching the Lovable preview away from its current setup.
