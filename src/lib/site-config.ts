import room1br from "@/assets/room-1br.jpg";
import room2br from "@/assets/room-2br.jpg";
import room3br from "@/assets/room-3br.jpg";

// ── Contact details — replace the placeholders below with your real info ──
// WhatsApp number must be in international format with no "+", spaces or dashes,
// e.g. "2348012345678". Leave empty to keep the buttons inert for now.
export const contact = {
  whatsapp: "2347038298158",
  phoneDisplay: "+234 703 829 8158",
  phoneHref: "+2347038298158",
  email: "hello@yourshortlet.com",
  addressLine: "Victoria Island, Lagos, Nigeria",
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
};

export const brand = {
  name: "Lagos Luxe Stays",
  city: "Lagos",
  tagline: "Premium shortlet apartments for discerning guests",
};

/** Build a WhatsApp deep link. Returns "#" when no number is configured. */
export function whatsappLink(message: string) {
  if (!contact.whatsapp) return "#";
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Format a Naira amount with thousands separators. */
export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export type Room = {
  id: string;
  type: string;
  name: string;
  price: number;
  image: string;
  description: string;
  amenities: string[];
  sleeps: number;
};

export const rooms: Room[] = [
  {
    id: "1br",
    type: "1 Bedroom",
    name: "The Cozy Suite",
    price: 100000,
    image: room1br,
    description:
      "A warm, light-filled one-bedroom retreat with a plush king bed, elegant finishes and a fully-equipped kitchenette — perfect for solo travellers and couples.",
    amenities: ["247Power", "WiFi", "Kitchen", "AirConditioning", "WashingMachine"],
    sleeps: 2,
  },
  {
    id: "2br",
    type: "2 Bedroom",
    name: "The Family Lounge",
    price: 220000,
    image: room2br,
    description:
      "A spacious open-plan two-bedroom apartment with a generous lounge, refined décor and golden accents — ideal for families and small groups.",
    amenities: ["247Power", "WiFi", "Kitchen", "AirConditioning", "WashingMachine"],
    sleeps: 4,
  },
  {
    id: "3br",
    type: "3 Bedroom",
    name: "The Penthouse",
    price: 280000,
    image: room3br,
    description:
      "Our flagship three-bedroom penthouse with floor-to-ceiling views, designer furniture and an expansive living and dining area for the ultimate Lagos stay.",
    amenities: ["247Power", "WiFi", "Kitchen", "AirConditioning", "WashingMachine"],
    sleeps: 6,
  },
];

export const amenities = [
  {
    key: "247Power",
    title: "24/7 Power",
    description: "Uninterrupted electricity with backup generators — never worry about an outage.",
  },
  {
    key: "WiFi",
    title: "High-Speed WiFi",
    description: "Fast, reliable internet throughout the apartment for work and streaming.",
  },
  {
    key: "Kitchen",
    title: "Fully-Equipped Kitchen",
    description: "Modern appliances and everything you need to cook a meal from home.",
  },
  {
    key: "AirConditioning",
    title: "Air Conditioning",
    description: "Cool, climate-controlled comfort in every room, day and night.",
  },
  {
    key: "WashingMachine",
    title: "Washing Machine",
    description: "In-unit laundry so you can travel light and stay fresh.",
  },
];

export const reviews = [
  {
    name: "Adaeze O.",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "Absolutely stunning apartment. Spotless, beautifully furnished and the 24/7 power meant zero stress. Booking via WhatsApp was instant.",
  },
  {
    name: "Daniel K.",
    location: "London, UK",
    rating: 5,
    text: "Stayed in the penthouse for a week — the views and finishing were world-class. Felt safer and more comfortable than any hotel in Lagos.",
  },
  {
    name: "Funke A.",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "The team was responsive and welcoming. Fast WiFi, great kitchen, and the décor is gorgeous. I'll definitely be back.",
  },
  {
    name: "Chinedu E.",
    location: "Houston, USA",
    rating: 5,
    text: "Booked the 2-bedroom for a family trip. Clean, spacious and exactly as pictured. Check-in was seamless and frictionless.",
  },
];