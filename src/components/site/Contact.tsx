import { MessageCircle, Mail, Phone } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content.functions";

export function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="scroll-mt-20 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-card to-accent/40 p-8 text-center shadow-lg sm:p-14">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Ready to stay?
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-5xl">
          Book your apartment today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Chat with us directly on WhatsApp for instant availability and a frictionless
          booking — or reach out by phone or email. We respond fast.
        </p>

        <a
          href={whatsappLink(settings.whatsapp, `Hi ${settings.brand_name}, I'd like to book an apartment.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle size={20} /> BOOK NOW ON WHATSAPP
        </a>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <a
            href={whatsappLink(settings.whatsapp, `Hi ${settings.brand_name}!`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 p-5 transition-colors hover:border-primary"
          >
            <MessageCircle className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">WhatsApp</span>
            <span className="text-xs text-muted-foreground">Chat with us</span>
          </a>
          <a
            href={`tel:${settings.phone_href}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 p-5 transition-colors hover:border-primary"
          >
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">Call</span>
            <span className="text-xs text-muted-foreground">{settings.phone_display}</span>
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 p-5 transition-colors hover:border-primary"
          >
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">Email</span>
            <span className="text-xs text-muted-foreground">{settings.email}</span>
          </a>
        </div>

        {settings.map_embed && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Location map"
              src={settings.map_embed}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  );
}
