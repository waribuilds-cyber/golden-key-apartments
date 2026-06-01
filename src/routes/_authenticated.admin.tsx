import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { siteContentQueryOptions } from "@/lib/site-content.query";
import { HeroTab } from "@/components/admin/HeroTab";
import { RoomsTab } from "@/components/admin/RoomsTab";
import { AmenitiesTab } from "@/components/admin/AmenitiesTab";
import { ReviewsTab } from "@/components/admin/ReviewsTab";
import { ContactTab } from "@/components/admin/ContactTab";
import { LocationTab } from "@/components/admin/LocationTab";

export const Route = createFileRoute("/_authenticated/admin")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQueryOptions),
  head: () => ({ meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

const TABS = [
  { value: "hero", label: "Hero & Brand" },
  { value: "rooms", label: "Rooms" },
  { value: "amenities", label: "Amenities" },
  { value: "reviews", label: "Reviews" },
  { value: "contact", label: "Contact" },
  { value: "location", label: "Location" },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(siteContentQueryOptions);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Toaster richColors position="top-center" />
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <h1 className="font-display text-xl font-bold text-foreground">Site Admin</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/" })}>
              View site
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <Tabs defaultValue="hero">
          <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1">
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="hero">
            <HeroTab settings={data.settings} />
          </TabsContent>
          <TabsContent value="rooms">
            <RoomsTab rooms={data.rooms} amenities={data.amenities} />
          </TabsContent>
          <TabsContent value="amenities">
            <AmenitiesTab amenities={data.amenities} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTab reviews={data.reviews} />
          </TabsContent>
          <TabsContent value="contact">
            <ContactTab settings={data.settings} />
          </TabsContent>
          <TabsContent value="location">
            <LocationTab settings={data.settings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
