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
import { upsertReview, deleteReview } from "@/lib/admin.functions";
import type { Review } from "@/lib/content.functions";

type Draft = {
  id?: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  sort_order: number;
};

export function ReviewsTab({ reviews }: { reviews: Review[] }) {
  const [rows, setRows] = useState<Draft[]>(
    reviews.map((r) => ({ id: r.id, name: r.name, location: r.location, rating: r.rating, text: r.text, sort_order: r.sort_order })),
  );
  const [savingId, setSavingId] = useState<string | null>(null);
  const save = useServerFn(upsertReview);
  const remove = useServerFn(deleteReview);
  const queryClient = useQueryClient();

  function update(i: number, patch: Partial<Draft>) {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }

  function addRow() {
    setRows((r) => [...r, { name: "", location: "", rating: 5, text: "", sort_order: r.length }]);
  }

  async function saveRow(i: number) {
    const row = rows[i];
    setSavingId(row.id ?? `new-${i}`);
    try {
      const res = await save({ data: row });
      if (!row.id) update(i, { id: res.id });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Review saved.");
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
        toast.success("Review deleted.");
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={row.name} onChange={(e) => update(i, { name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input value={row.location} onChange={(e) => update(i, { location: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <Select value={String(row.rating)} onValueChange={(v) => update(i, { rating: Number(v) })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} star{n > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <Label>Review text</Label>
            <Textarea rows={3} value={row.text} onChange={(e) => update(i, { text: e.target.value })} />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="w-28 space-y-1.5">
              <Label>Sort order</Label>
              <Input
                type="number"
                value={row.sort_order}
                onChange={(e) => update(i, { sort_order: Number(e.target.value) })}
              />
            </div>
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
        <Plus className="mr-2 h-4 w-4" /> Add review
      </Button>
    </div>
  );
}
