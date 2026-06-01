import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSiteSettings } from "@/lib/admin.functions";
import { settingsDefaults } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content.functions";

export function useSettingsForm(initial: SiteSettings | null) {
  const [form, setForm] = useState<SiteSettings>(initial ?? settingsDefaults);
  const [saving, setSaving] = useState(false);
  const save = useServerFn(updateSiteSettings);
  const queryClient = useQueryClient();

  function setField<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setSaving(true);
    try {
      await save({ data: form });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return { form, setField, submit, saving };
}
