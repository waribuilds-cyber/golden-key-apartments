import { Check, MessageCircle } from "lucide-react";
import { whatsappLink, formatNaira } from "@/lib/site-config";
import { SectionHeading } from "./SectionHeading";
import type { SiteSettings, Room, Amenity } from "@/lib/content.functions";

export function Pricing({
  settings,
  rooms,
  amenities,
}: {
  settings: SiteSettings;
  rooms: Room[];
  amenities: Amenity[];
}) {
  const inclusions = amenities.map((a) => a.title);

  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Transparent Rates"
        title="Simple, all-inclusive pricing"
        subtitle="No hidden fees. Every nightly rate includes all amenities listed below."
      />

      <div className="mt-14 overflow-hidden rounded-2xl border border-border shadow-sm">
        {/* Desktop table */}
        <table className="hidden w-full border-collapse text-left md:table">
          <thead>
            <tr className="bg-foreground text-background">
              <th className="px-6 py-5 font-display text-lg font-semibold">Apartment</th>
              <th className="px-6 py-5 font-display text-lg font-semibold">Sleeps</th>
              <th className="px-6 py-5 font-display text-lg font-semibold">Included</th>
              <th className="px-6 py-5 text-right font-display text-lg font-semibold">Rate / night</th>
              <th className="px-6 py-5" />
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <tr key={room.id} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                <td className="px-6 py-5">
                  <div className="font-semibold text-foreground">{room.type}</div>
                  <div className="text-sm text-muted-foreground">{room.name}</div>
                </td>
                <td className="px-6 py-5 text-muted-foreground">{room.sleeps} guests</td>
                <td className="px-6 py-5 text-sm text-muted-foreground">All amenities</td>
                <td className="px-6 py-5 text-right">
                  <span className="font-display text-2xl font-bold text-primary">{formatNaira(room.price)}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <a
                    href={whatsappLink(settings.whatsapp, `Hi ${settings.brand_name}, I'd like to book the ${room.type} at ${formatNaira(room.price)}/night.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    Book
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="divide-y divide-border md:hidden">
          {rooms.map((room) => (
            <div key={room.id} className="bg-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-foreground">{room.type}</div>
                  <div className="text-sm text-muted-foreground">{room.name} · {room.sleeps} guests</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-bold text-primary">{formatNaira(room.price)}</div>
                  <div className="text-xs text-muted-foreground">per night</div>
                </div>
              </div>
              <a
                href={whatsappLink(settings.whatsapp, `Hi ${settings.brand_name}, I'd like to book the ${room.type} at ${formatNaira(room.price)}/night.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <MessageCircle size={16} /> Book on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>

      {inclusions.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {inclusions.map((item) => (
            <span key={item} className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <Check size={16} className="text-gold" /> {item}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
