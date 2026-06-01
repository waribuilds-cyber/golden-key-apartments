import { MessageCircle, Users } from "lucide-react";
import { whatsappLink, formatNaira, fallbackImages } from "@/lib/site-config";
import { AmenityIcon } from "./amenity-icon";
import { SectionHeading } from "./SectionHeading";
import { RoomGallery } from "./RoomGallery";
import type { SiteSettings, Room, Amenity } from "@/lib/content.functions";

export function Rooms({
  settings,
  rooms,
  amenities,
}: {
  settings: SiteSettings;
  rooms: Room[];
  amenities: Amenity[];
}) {
  const amenityByKey = new Map(amenities.map((a) => [a.key, a]));

  return (
    <section id="rooms" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Our Apartments"
        title="Find your perfect stay"
        subtitle="From intimate one-bedroom suites to our flagship penthouse — every apartment is styled for comfort and designed to impress."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {rooms.map((room, index) => {
          const galleryImages =
            room.images.length > 0
              ? room.images.map((img) => img.image)
              : [fallbackImages.rooms[index % fallbackImages.rooms.length]];

          return (
            <article
              key={room.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <RoomGallery images={galleryImages} alt={`${room.type} luxury apartment in ${settings.city}`} />
                <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  {room.type}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold text-foreground">{room.name}</h3>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm text-muted-foreground">
                    <Users size={15} /> {room.sleeps}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {room.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {room.amenities.map((key) => {
                    const amenity = amenityByKey.get(key);
                    const label = amenity?.title ?? key;
                    const icon = amenity?.icon ?? key;
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground"
                      >
                        <AmenityIcon name={icon} className="h-3.5 w-3.5 text-primary" />
                        {label}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                  <div>
                    <span className="font-display text-2xl font-bold text-primary">
                      {formatNaira(room.price)}
                    </span>
                    <span className="text-sm text-muted-foreground"> / night</span>
                  </div>
                </div>

                <a
                  href={whatsappLink(
                    settings.whatsapp,
                    `Hi ${settings.brand_name}, I'd like to book the ${room.type} (${room.name}) at ${formatNaira(room.price)}/night.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle size={18} /> Book on WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
