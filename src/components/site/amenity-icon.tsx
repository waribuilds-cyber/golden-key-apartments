import {
  Zap,
  Wifi,
  ChefHat,
  Snowflake,
  WashingMachine,
  Tv,
  Car,
  Dumbbell,
  Waves,
  ShieldCheck,
  Coffee,
  Bath,
  BedDouble,
  Wind,
  Refrigerator,
  Dog,
  Sparkles,
  Sofa,
  Trees,
  Sun,
  Lock,
  UtensilsCrossed,
  CircleDot,
  type LucideIcon,
} from "lucide-react";

/**
 * Curated set of icons admins can pick from in the dashboard.
 * The key is stored in the `icon` column of an amenity.
 */
export const AMENITY_ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Power", Icon: Zap },
  { name: "WiFi", Icon: Wifi },
  { name: "Kitchen", Icon: ChefHat },
  { name: "AirConditioning", Icon: Snowflake },
  { name: "WashingMachine", Icon: WashingMachine },
  { name: "TV", Icon: Tv },
  { name: "Parking", Icon: Car },
  { name: "Gym", Icon: Dumbbell },
  { name: "Pool", Icon: Waves },
  { name: "Security", Icon: ShieldCheck },
  { name: "Coffee", Icon: Coffee },
  { name: "Bath", Icon: Bath },
  { name: "Bed", Icon: BedDouble },
  { name: "Fan", Icon: Wind },
  { name: "Fridge", Icon: Refrigerator },
  { name: "PetFriendly", Icon: Dog },
  { name: "Cleaning", Icon: Sparkles },
  { name: "Lounge", Icon: Sofa },
  { name: "Garden", Icon: Trees },
  { name: "Balcony", Icon: Sun },
  { name: "Safe", Icon: Lock },
  { name: "Dining", Icon: UtensilsCrossed },
];

// Legacy keys used by the original seed data → curated icon names.
const ALIASES: Record<string, string> = {
  "247Power": "Power",
};

const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  AMENITY_ICONS.map((e) => [e.name, e.Icon]),
);

function resolveIcon(name: string): LucideIcon {
  const key = ALIASES[name] ?? name;
  return ICON_MAP[key] ?? CircleDot;
}

export function AmenityIcon({ name, className }: { name: string; className?: string }) {
  const Icon = resolveIcon(name);
  return <Icon className={className} aria-hidden="true" />;
}