import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type SiteSettings = {
  brand_name: string;
  city: string;
  tagline: string;
  hero_heading: string;
  hero_subtitle: string;
  hero_image: string | null;
  about_title: string;
  about_body: string;
  whatsapp: string;
  phone_display: string;
  phone_href: string;
  email: string;
  address_line: string;
  map_embed: string;
  instagram: string;
  facebook: string;
  twitter: string;
};

export type RoomImage = { id: string; image: string; sort_order: number };

export type Room = {
  id: string;
  type: string;
  name: string;
  price: number;
  description: string;
  sleeps: number;
  amenities: string[];
  sort_order: number;
  images: RoomImage[];
};

export type Amenity = {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  sort_order: number;
};

export type SiteContent = {
  settings: SiteSettings | null;
  rooms: Room[];
  amenities: Amenity[];
  reviews: Review[];
};

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const [settingsRes, roomsRes, imagesRes, amenitiesRes, reviewsRes] = await Promise.all([
      supabaseAdmin.from("site_settings").select("*").limit(1).maybeSingle(),
      supabaseAdmin.from("rooms").select("*").order("sort_order", { ascending: true }),
      supabaseAdmin.from("room_images").select("*").order("sort_order", { ascending: true }),
      supabaseAdmin.from("amenities").select("*").order("sort_order", { ascending: true }),
      supabaseAdmin.from("reviews").select("*").order("sort_order", { ascending: true }),
    ]);

    const images = imagesRes.data ?? [];
    const rooms: Room[] = (roomsRes.data ?? []).map((r) => ({
      id: r.id,
      type: r.type,
      name: r.name,
      price: r.price,
      description: r.description,
      sleeps: r.sleeps,
      amenities: r.amenities ?? [],
      sort_order: r.sort_order,
      images: images
        .filter((img) => img.room_id === r.id)
        .map((img) => ({ id: img.id, image: img.image, sort_order: img.sort_order })),
    }));

    return {
      settings: (settingsRes.data as SiteSettings | null) ?? null,
      rooms,
      amenities: (amenitiesRes.data ?? []) as Amenity[],
      reviews: (reviewsRes.data ?? []) as Review[],
    };
  },
);