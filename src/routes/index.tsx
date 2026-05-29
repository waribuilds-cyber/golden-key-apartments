import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Rooms } from "@/components/site/Rooms";
import { Amenities } from "@/components/site/Amenities";
import { Pricing } from "@/components/site/Pricing";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lagos Luxe Stays | Luxury Shortlet Apartments in Lagos" },
      {
        name: "description",
        content:
          "Book luxury shortlet apartments in Lagos with 24/7 power, fast WiFi & full kitchens. 1, 2 & 3-bedroom units from ₦100,000/night. Reserve via WhatsApp.",
      },
      { property: "og:title", content: "Lagos Luxe Stays | Luxury Shortlet Apartments in Lagos" },
      {
        property: "og:description",
        content:
          "Beautifully furnished 1, 2 & 3-bedroom shortlet apartments in Lagos. Frictionless WhatsApp booking, world-class hospitality.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Lagos Luxe Stays",
          description:
            "Luxury shortlet apartments in Lagos, Nigeria with 24/7 power, WiFi, kitchen, air conditioning and washing machine.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
          priceRange: "₦₦₦",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "4",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <Pricing />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
