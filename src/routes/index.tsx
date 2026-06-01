import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { siteContentQueryOptions } from "@/lib/site-content.query";
import { settingsDefaults } from "@/lib/site-config";
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
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQueryOptions),
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
        }),
      },
    ],
  }),
  component: Index,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <p className="text-sm text-muted-foreground">Couldn't load the page: {error.message}</p>
    </div>
  ),
});

function Index() {
  const { data } = useSuspenseQuery(siteContentQueryOptions);
  const settings = data.settings ?? settingsDefaults;

  return (
    <div className="min-h-screen bg-background">
      <Navbar settings={settings} />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Rooms settings={settings} rooms={data.rooms} amenities={data.amenities} />
        <Amenities amenities={data.amenities} />
        <Pricing settings={settings} rooms={data.rooms} amenities={data.amenities} />
        <Reviews reviews={data.reviews} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}
