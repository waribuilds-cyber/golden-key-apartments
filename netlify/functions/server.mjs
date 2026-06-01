// Netlify serverless function entry for the TanStack Start SSR app.
// `bun run build` with NITRO_PRESET=netlify produces dist/server/main.mjs,
// a Web-standard (Request -> Response) handler. We re-export it here so
// Netlify bundles it as a single function and routes all non-static
// requests to it (see netlify.toml).
export { default } from "../../dist/server/main.mjs";