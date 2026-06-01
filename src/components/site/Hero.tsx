import { MessageCircle, Star } from "lucide-react";
import { whatsappLink, fallbackImages } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content.functions";

export function Hero({ settings }: { settings: SiteSettings }) {
  const heroImage = settings.hero_image || fallbackImages.hero;

  return (
    <section id="top" className="relative isolate min-h-[88vh] w-full overflow-hidden">
      <img
        src={heroImage}
        alt={`Luxury master suite in ${settings.city}`}
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[oklch(0.22_0.01_60_/_0.88)] via-[oklch(0.22_0.01_60_/_0.45)] to-[oklch(0.22_0.01_60_/_0.35)]" />

      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:pb-24">
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-background/10 px-4 py-1.5 backdrop-blur-sm">
          <Star size={15} className="fill-gold text-gold" />
          <span className="text-sm font-medium text-background">Rated 5.0 by our guests</span>
        </div>

        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] text-background sm:text-6xl md:text-7xl">
          {settings.hero_heading}
        </h1>
        <p className="mt-5 max-w-xl text-base text-background/85 sm:text-lg">
          {settings.hero_subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(settings.whatsapp, `Hi ${settings.brand_name}, I'd like to book an apartment.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle size={20} /> BOOK NOW
          </a>
          <a
            href="#rooms"
            className="inline-flex items-center justify-center rounded-full border border-background/40 bg-background/10 px-7 py-3.5 text-base font-semibold text-background backdrop-blur-sm transition-colors hover:bg-background/20"
          >
            View Rooms
          </a>
        </div>
      </div>
    </section>
  );
}
