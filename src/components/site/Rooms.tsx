import { MessageCircle, Users } from "lucide-react";
import { rooms, whatsappLink, formatNaira, brand } from "@/lib/site-config";
import { AmenityIcon, amenityLabel } from "./amenity-icon";
import { SectionHeading } from "./SectionHeading";

export function Rooms() {
  return (
    <section id="rooms" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Our Apartments"
        title="Find your perfect stay"
        subtitle="From intimate one-bedroom suites to our flagship penthouse — every apartment is styled for comfort and designed to impress."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {rooms.map((room) => (
          <article
            key={room.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src={room.image}
                alt={`${room.type} luxury apartment in ${brand.city}`}
                width={1280}
                height={960}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
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

              <div className="mt-5 flex flex-wrap gap-3">
                {room.amenities.map((a) => (
                  <span key={a} className="text-muted-foreground" title={amenityLabel(a)}>
                    <AmenityIcon name={a} className="h-5 w-5" />
                  </span>
                ))}
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
                href={whatsappLink(`Hi ${brand.name}, I'd like to book the ${room.type} (${room.name}) at ${formatNaira(room.price)}/night.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <MessageCircle size={18} /> Book on WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}