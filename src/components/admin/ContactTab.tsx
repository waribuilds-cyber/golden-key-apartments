import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettingsForm } from "./use-settings-form";
import type { SiteSettings } from "@/lib/content.functions";

export function ContactTab({ settings }: { settings: SiteSettings | null }) {
  const { form, setField, submit, saving } = useSettingsForm(settings);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>WhatsApp number (no +, e.g. 2347…)</Label>
          <Input value={form.whatsapp} onChange={(e) => setField("whatsapp", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input value={form.email} onChange={(e) => setField("email", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Phone (display)</Label>
          <Input value={form.phone_display} onChange={(e) => setField("phone_display", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Phone (dial link, e.g. +234…)</Label>
          <Input value={form.phone_href} onChange={(e) => setField("phone_href", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Instagram URL</Label>
          <Input value={form.instagram} onChange={(e) => setField("instagram", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Facebook URL</Label>
          <Input value={form.facebook} onChange={(e) => setField("facebook", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Twitter / X URL</Label>
          <Input value={form.twitter} onChange={(e) => setField("twitter", e.target.value)} />
        </div>
      </div>

      <Button onClick={submit} disabled={saving}>
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Save changes
      </Button>
    </div>
  );
}
