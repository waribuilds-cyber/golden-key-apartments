import { Zap, Wifi, ChefHat, Snowflake, WashingMachine, type LucideIcon } from "lucide-react";

const map: Record<string, { Icon: LucideIcon; label: string }> = {
  "247Power": { Icon: Zap, label: "24/7 Power" },
  WiFi: { Icon: Wifi, label: "WiFi" },
  Kitchen: { Icon: ChefHat, label: "Kitchen" },
  AirConditioning: { Icon: Snowflake, label: "Air Conditioning" },
  WashingMachine: { Icon: WashingMachine, label: "Washing Machine" },
};

export function AmenityIcon({ name, className }: { name: string; className?: string }) {
  const entry = map[name];
  if (!entry) return null;
  const { Icon } = entry;
  return <Icon className={className} aria-label={entry.label} />;
}

export function amenityLabel(name: string) {
  return map[name]?.label ?? name;
}