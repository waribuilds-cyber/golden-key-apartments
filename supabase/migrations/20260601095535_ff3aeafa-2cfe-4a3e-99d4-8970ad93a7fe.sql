-- Roles enum & table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ── site_settings (single row) ──
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name text NOT NULL DEFAULT 'Lagos Luxe Stays',
  city text NOT NULL DEFAULT 'Lagos',
  tagline text NOT NULL DEFAULT 'Premium shortlet apartments for discerning guests',
  hero_heading text NOT NULL DEFAULT 'Luxury Apartments in Lagos',
  hero_subtitle text NOT NULL DEFAULT 'Beautifully furnished shortlet apartments with 24/7 power, fast WiFi and warm, world-class hospitality. Book in seconds — straight from WhatsApp.',
  hero_image text,
  about_title text NOT NULL DEFAULT 'Luxury Lagos Living, Reimagined',
  about_body text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '2347038298158',
  phone_display text NOT NULL DEFAULT '+234 703 829 8158',
  phone_href text NOT NULL DEFAULT '+2347038298158',
  email text NOT NULL DEFAULT 'hello@yourshortlet.com',
  address_line text NOT NULL DEFAULT 'Victoria Island, Lagos, Nigeria',
  map_embed text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '#',
  facebook text NOT NULL DEFAULT '#',
  twitter text NOT NULL DEFAULT '#',
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO authenticated, service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert site settings"
ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings"
ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site settings"
ON public.site_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── rooms ──
CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  price integer NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  sleeps integer NOT NULL DEFAULT 1,
  amenities text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.rooms TO anon, authenticated;
GRANT ALL ON public.rooms TO authenticated, service_role;

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rooms"
ON public.rooms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert rooms"
ON public.rooms FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update rooms"
ON public.rooms FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete rooms"
ON public.rooms FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER rooms_updated_at BEFORE UPDATE ON public.rooms
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── room_images ──
CREATE TABLE public.room_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  image text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.room_images TO anon, authenticated;
GRANT ALL ON public.room_images TO authenticated, service_role;

ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view room images"
ON public.room_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert room images"
ON public.room_images FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update room images"
ON public.room_images FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete room images"
ON public.room_images FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ── amenities ──
CREATE TABLE public.amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'WiFi',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.amenities TO anon, authenticated;
GRANT ALL ON public.amenities TO authenticated, service_role;

ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view amenities"
ON public.amenities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert amenities"
ON public.amenities FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update amenities"
ON public.amenities FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete amenities"
ON public.amenities FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER amenities_updated_at BEFORE UPDATE ON public.amenities
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── reviews ──
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  text text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO authenticated, service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
ON public.reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert reviews"
ON public.reviews FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update reviews"
ON public.reviews FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete reviews"
ON public.reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── Storage bucket ──
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

CREATE POLICY "Anyone can view site images"
ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admins can upload site images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));