import room1br from "@/assets/room-1br.jpg";
import room2br from "@/assets/room-2br.jpg";
import room3br from "@/assets/room-3br.jpg";
import heroSuite from "@/assets/hero-suite.jpg";

/** Local fallback images used when no images have been uploaded yet. */
export const fallbackImages = {
  hero: heroSuite,
  rooms: [room1br, room2br, room3br],
};

/** Build a WhatsApp deep link. Returns "#" when no number is configured. */
export function whatsappLink(whatsapp: string | undefined | null, message: string) {
  if (!whatsapp) return "#";
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Format a Naira amount with thousands separators. */
export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/** Sensible defaults used when site settings haven't been saved yet. */
export const settingsDefaults = {
  brand_name: "Lagos Luxe Stays",
  city: "Lagos",
  tagline: "Premium shortlet apartments for discerning guests",
  hero_heading: "Luxury Apartments in Lagos",
  hero_subtitle:
    "Beautifully furnished shortlet apartments with 24/7 power, fast WiFi and warm, world-class hospitality. Book in seconds — straight from WhatsApp.",
  hero_image: null as string | null,
  about_title: "Luxury Lagos Living, Reimagined",
  about_body:
    "We believe luxury short-term living shouldn't mean compromising on quality.",
  whatsapp: "2347038298158",
  phone_display: "+234 703 829 8158",
  phone_href: "+2347038298158",
  email: "hello@yourshortlet.com",
  address_line: "Victoria Island, Lagos, Nigeria",
  map_embed: "",
  instagram: "#",
  facebook: "#",
  twitter: "#",
};
