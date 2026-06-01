# Plan: Room galleries, amenity chips & editable /admin dashboard

## Goals
1. Swipeable image galleries on each room card (homepage).
2. Amenities on room cards shown as inline chips (icon + word).
3. A protected `/admin` dashboard with tabs to edit Hero, Rooms, Amenities, Reviews, Contact, Location, Prices, and upload images — saved live to the site.

## Backend (Lovable Cloud)
Enable Lovable Cloud to provide a database, image storage, and admin login.

**Database tables** (all content moves from the static `site-config.ts` into the DB so the admin can edit it):
- `site_settings` — single-row table: brand name, city, tagline, hero heading/subtitle/image, contact (whatsapp, phone, email, address), location (address line + map embed/lat-lng), socials.
- `rooms` — id, type, name, price, description, sleeps, amenity keys, sort order.
- `room_images` — room_id, image url, sort order (powers the gallery).
- `amenities` — key, title, description, icon name, sort order.
- `reviews` — name, location, rating, text, sort order.

**Storage**: a public `site-images` bucket for hero + room photos uploaded from the admin.

**Security**:
- A `user_roles` table + `app_role` enum + `has_role()` security-definer function (roles never stored on profiles).
- Public (anon) **read** access on all content tables so the homepage renders for visitors.
- **Write** access (insert/update/delete) restricted to admins via `has_role(auth.uid(),'admin')`.
- Storage: public read; admin-only write.

**Admin account**: Email/password auth. You'll create one admin account; I'll wire it so that account is granted the `admin` role. Login lives at `/login`; `/admin` is gated by an `_authenticated` + admin-role guard and redirects non-admins.

## Frontend

### Homepage data
- Replace the hardcoded imports in `site-config.ts` with data fetched from the DB (via server functions / TanStack Query) so edits in the admin appear on the live site. Keep the existing visual design and tokens unchanged.

### Room galleries (`Rooms.tsx`)
- Replace the single `<img>` with the existing shadcn `Carousel` (embla) showing each room's images, swipeable on mobile with arrows on desktop and dot indicators. Falls back to a single image when only one exists.

### Amenity chips (`Rooms.tsx` + `amenity-icon.tsx`)
- Render each amenity as an inline pill chip: icon + label text together, wrapping in a row (replacing the icon-only row). Uses existing semantic tokens.

### Admin dashboard (`/admin`)
- Tabbed interface (shadcn `Tabs`): **Hero, Rooms, Amenities, Reviews, Contact, Location, Prices, Images**.
- Each tab is a form to edit its records with save buttons; Rooms/Amenities/Reviews support add/edit/delete and reorder.
- Image upload control (hero + per-room galleries) uploading to the `site-images` bucket and saving the returned URL.
- Prices tab edits nightly rates per room.
- Location tab edits the address and map embed shown in the footer/contact.
- All inputs validated with zod; writes go through authenticated server functions (RLS enforced).

## Technical notes
- Content reads use public server functions (admin-elevated/anon-readable) called from route loaders/components so SSR and SEO keep working — no protected fn in a public loader.
- Admin writes use `createServerFn` with `requireSupabaseAuth` + admin-role check; the bearer attacher in `src/start.ts` will be verified/added.
- Existing design system, fonts, colors, and section layouts are preserved; this is additive (data source + new admin route).

## Out of scope
- No change to the WhatsApp booking flow or overall visual style.
- Public visitors cannot edit anything; only the single admin can.