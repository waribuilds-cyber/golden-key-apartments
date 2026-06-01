import { useState } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsertAmenity, deleteAmenity } from "@/lib/admin.functions";
import { AMENITY_ICONS, AmenityIcon } from "@/components/site/amenity-icon";
import type { Amenity } from "@/lib/content.functions";

type Draft = {
  id?: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

function toDraft(a: Amenity): Draft {
  return { id: a.id, key: a.key, title: a.title, description: a.description, icon: a.icon, sort_order: a.sort_order };
}

export function AmenitiesTab({ amenities }: { amenities: Amenity[] }) {
  const [rows, setRows] = useState<Draft[]>(amenities.map(toDraft));
  const [savingId, setSavingId] = useState<string | null>(null);
  const save = useServerFn(upsertAmenity);
  const remove = useServerFn(deleteAmenity);
  const queryClient = useQueryClient();

  function update(i: number, patch: Partial<Draft>) {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }

  function addRow() {
    setRows((r) => [
      ...r,
      { key: "", title: "", description: "", icon: "WiFi", sort_order: r.length },
    ]);
  }

  async function saveRow(i: number) {
    const row = rows[i];
    setSavingId(row.id ?? `new-${i}`);
    try {
      const res = await save({ data: row });
      if (!row.id) update(i, { id: res.id });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Amenity saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSavingId(null);
    }
  }

  async function removeRow(i: number) {
    const row = rows[i];
    if (row.id) {
      try {
        await remove({ data: { id: row.id } });
        await queryClient.invalidateQueries({ queryKey: ["site-content"] });
        toast.success("Amenity deleted.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not delete.");
        return;
      }
    }
    setRows((r) => r.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-5">
      {rows.map((row, i) => (
        <div key={row.id ?? `new-${i}`} className="rounded-xl border border-border p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Key (unique, letters/numbers)</Label>
              <Input value={row.key} onChange={(e) => update(i, { key: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={row.title} onChange={(e) => update(i, { title: e.target.value })} />
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Icon</Label>
              <Select value={row.icon} onValueChange={(v) => update(i, { icon: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AMENITY_ICONS.map(({ name }) => (
                    <SelectItem key={name} value={name}>
                      <span className="flex items-center gap-2">
                        <AmenityIcon name={name} className="h-4 w-4" />
                        {name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Sort order</Label>
              <Input
                type="number"
                value={row.sort_order}
                onChange={(e) => update(i, { sort_order: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={2} value={row.description} onChange={(e) => update(i, { description: e.target.value })} />
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={() => saveRow(i)} disabled={savingId !== null}>
              {savingId === (row.id ?? `new-${i}`) ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => removeRow(i)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addRow}>
        <Plus className="mr-2 h-4 w-4" /> Add amenity
      </Button>
    </div>
  );
}
