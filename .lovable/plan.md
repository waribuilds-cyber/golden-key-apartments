## Luxury Lagos Shortlet Apartment Website

A polished, conversion-focused single-page marketing site for luxury shortlet apartments in Lagos, built to turn browsers into bookings with frictionless WhatsApp/contact CTAs.

### Design language
- **Palette**: cream background (`#FBF7F0`-ish), burnt orange primary (`#C8551B`-ish), gold accent (`#C9A24B`-ish), dark charcoal text (`#2B2724`). Footer = dark charcoal with cream text.
- **Typography**: an elegant display serif for headers (e.g. Playfair Display / Cormorant) paired with a clean sans for body (e.g. Inter/Work Sans) loaded via Google Fonts.
- **Style**: warm, premium, generous spacing, soft shadows, gold hairline details, rounded cards. Mobile-first responsive (the preview is mobile), fast-loading optimized images.
- All colors as semantic oklch tokens in `src/styles.css` — no hardcoded colors in components.

### Sections (all on the home route, anchor-scrolled from a sticky nav)
1. **Sticky header/nav** — logo wordmark, anchor links (Rooms, Amenities, Pricing, Reviews, Contact), and a burnt-orange "BOOK NOW" button.
2. **Hero** — full-bleed luxury room image, headline "Luxury Apartments in Lagos", short subheadline, primary "BOOK NOW" CTA + secondary "View Rooms".
3. **Room Gallery** — three room types (1BR, 2BR, 3BR), each as a card with a hero photo + a small thumbnail strip/gallery, description, nightly price (gold/orange emphasis), amenity icons, and a per-room "Book on WhatsApp" CTA.
   - 1BR ₦100,000 / night · 2BR ₦220,000 / night · 3BR ₦280,000 / night
4. **Amenities** — icon + label + short description grid for: 24/7 Power, WiFi, Fully-Equipped Kitchen, Air Conditioning, Washing Machine (Lucide icons).
5. **Pricing table** — clean comparison of all three room types with nightly rates and key inclusions, gold/orange highlighted rates.
6. **Reviews** — testimonial cards with star ratings (a handful of realistic sample reviews).
7. **Booking / Contact** — prominent "Book Now" via WhatsApp, plus WhatsApp link, email, and phone. All contact values left as clearly-marked placeholders the user can fill in later, wired through a single config so they're easy to update.
8. **Footer** — dark charcoal, cream text: brand blurb, quick links, address (placeholder), and social media links (Instagram, Facebook, X/Twitter).

### Images (AI-generated, saved to `src/assets/`)
Generate warm, well-lit, professional photos:
- 1 hero (best suite, golden-hour warmth)
- Per room type: 1 main + 1–2 gallery shots (1BR, 2BR, 3BR interiors)
Images imported as ES6 assets and rendered with `loading="lazy"`, alt text, and responsive sizing for fast loading.

### Technical notes
- Single home route `src/routes/index.tsx` replacing the placeholder, composed from small section components in `src/components/`.
- A `src/lib/site-config.ts` holding contact placeholders (WhatsApp number, email, phone, socials, address) and room/pricing data so content is centralized and editable.
- WhatsApp CTAs use `https://wa.me/<number>?text=...` deep links (number left blank/placeholder for now, so buttons are wired but inert until filled).
- Per-section SEO via the route `head()` (title <60 chars, meta description <160 chars, single H1 in hero, semantic HTML, alt text, JSON-LD `LodgingBusiness`).
- No backend required — fully static marketing site. (Lovable Cloud not needed unless you later want a booking form that stores leads.)

### Out of scope (for now)
- Actual booking engine / payments and real contact details (placeholders only, as requested).

Once approved I'll generate the images, build the sections, and verify the layout renders cleanly on mobile and desktop.