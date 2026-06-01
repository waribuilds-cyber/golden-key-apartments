import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { useSettingsForm } from "./use-settings-form";
import { fallbackImages } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content.functions";

export function HeroTab({ settings }: { settings: SiteSettings | null }) {
  const { form, setField, submit, saving } = useSettingsForm(settings);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Brand name</Label>
          <Input value={form.brand_name} onChange={(e) => setField("brand_name", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>City</Label>
          <Input value={form.city} onChange={(e) => setField("city", e.target.value)} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Tagline</Label>
        <Input value={form.tagline} onChange={(e) => setField("tagline", e.target.value)} />
      </div>

      <div className="space-y-1.5">
        <Label>Hero heading</Label>
        <Input value={form.hero_heading} onChange={(e) => setField("hero_heading", e.target.value)} />
      </div>

      <div className="space-y-1.5">
        <Label>Hero subtitle</Label>
        <Textarea
          rows={3}
          value={form.hero_subtitle}
          onChange={(e) => setField("hero_subtitle", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Hero image</Label>
        <div className="flex items-center gap-4">
          <img
            src={form.hero_image || fallbackImages.hero}
            alt="Hero preview"
            className="h-20 w-32 rounded-lg border border-border object-cover"
          />
          <ImageUpload folder="hero" label="Upload hero image" onUploaded={(url) => setField("hero_image", url)} />
        </div>
      </div>

      <Button onClick={submit} disabled={saving}>
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Save changes
      </Button>
    </div>
  );
}
