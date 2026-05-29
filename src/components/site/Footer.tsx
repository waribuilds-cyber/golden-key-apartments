import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { brand, contact } from "@/lib/site-config";

const quickLinks = [
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Book Now" },
];

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <span className="font-display text-2xl font-bold">
            {brand.name.split(" ")[0]}
            <span className="text-primary"> {brand.name.split(" ").slice(1).join(" ")}</span>
          </span>
          <p className="mt-3 max-w-sm text-sm text-sidebar-foreground/70">
            {brand.tagline} in {brand.city}. Frictionless booking, warm hospitality and
            apartments you'll never want to leave.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={contact.socials.instagram} aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-foreground/10 transition-colors hover:bg-primary">
              <Instagram size={18} />
            </a>
            <a href={contact.socials.facebook} aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-foreground/10 transition-colors hover:bg-primary">
              <Facebook size={18} />
            </a>
            <a href={contact.socials.twitter} aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-foreground/10 transition-colors hover:bg-primary">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-sidebar-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" /> {contact.addressLine}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-primary" />
              <a href={`tel:${contact.phoneHref}`} className="hover:text-primary">{contact.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-primary" />
              <a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sidebar-border/40">
        <div className="mx-auto max-w-6xl px-5 py-6 text-center text-xs text-sidebar-foreground/60">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}