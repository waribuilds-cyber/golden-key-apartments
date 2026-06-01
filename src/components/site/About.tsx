import { MapPin, Users, MessageCircle } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { whatsappLink } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content.functions";

export function About({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="scroll-mt-20 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Us"
          title={settings.about_title}
          subtitle={settings.about_body}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-5 text-base leading-relaxed text-foreground/90">
            <p>
              Each apartment is thoughtfully designed and personally managed to deliver
              the comfort and elegance you deserve.
            </p>
            <p>
              Whether you're in {settings.city} for business or leisure, our properties
              offer the perfect blend of modern amenities and genuine hospitality.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-accent/50 px-4 py-2 text-sm font-medium text-foreground">
                <Users size={16} className="text-primary" />
                Trusted by 100+ satisfied guests
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-accent/50 px-4 py-2 text-sm font-medium text-foreground">
                <MapPin size={16} className="text-primary" />
                Prime {settings.city} locations
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gold/30">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
              alt={`Luxury apartment interior in ${settings.city}`}
              width={800}
              height={600}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.01_60_/_0.35)] to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <a
                href={whatsappLink(settings.whatsapp, `Hi ${settings.brand_name}, I'd like to book an apartment.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
