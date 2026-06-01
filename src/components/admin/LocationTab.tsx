import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettingsForm } from "./use-settings-form";
import type { SiteSettings } from "@/lib/content.functions";

export function LocationTab({ settings }: { settings: SiteSettings | null }) {
  const { form, setField, submit, saving } = useSettingsForm(settings);

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label>Address line</Label>
        <Input value={form.address_line} onChange={(e) => setField("address_line", e.target.value)} />
      </div>

      <div className="space-y-1.5">
        <Label>Google Maps embed URL</Label>
        <Textarea
          rows={3}
          placeholder="https://www.google.com/maps/embed?pb=…"
          value={form.map_embed}
          onChange={(e) => setField("map_embed", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          In Google Maps: Share → Embed a map → copy the URL inside the iframe's <code>src</code>.
        </p>
      </div>

      {form.map_embed && (
        <div className="overflow-hidden rounded-xl border border-border">
          <iframe title="Map preview" src={form.map_embed} className="h-64 w-full" loading="lazy" />
        </div>
      )}

      <Button onClick={submit} disabled={saving}>
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Save changes
      </Button>
    </div>
  );
}
