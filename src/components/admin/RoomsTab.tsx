import { useState } from "react";
import { Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import {
  upsertRoom,
  deleteRoom,
  addRoomImage,
  deleteRoomImage,
} from "@/lib/admin.functions";
import type { Room, Amenity, RoomImage } from "@/lib/content.functions";

type Draft = {
  id?: string;
  type: string;
  name: string;
  price: number;
  description: string;
  sleeps: number;
  amenities: string[];
  sort_order: number;
  images: RoomImage[];
};

function toDraft(r: Room): Draft {
  return {
    id: r.id,
    type: r.type,
    name: r.name,
    price: r.price,
    description: r.description,
    sleeps: r.sleeps,
    amenities: r.amenities,
    sort_order: r.sort_order,
    images: r.images,
  };
}

export function RoomsTab({ rooms, amenities }: { rooms: Room[]; amenities: Amenity[] }) {
  const [list, setList] = useState<Draft[]>(rooms.map(toDraft));
  const [savingId, setSavingId] = useState<string | null>(null);
  const save = useServerFn(upsertRoom);
  const remove = useServerFn(deleteRoom);
  const addImg = useServerFn(addRoomImage);
  const delImg = useServerFn(deleteRoomImage);
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["site-content"] });

  function update(i: number, patch: Partial<Draft>) {
    setList((l) => l.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }

  function toggleAmenity(i: number, key: string) {
    const row = list[i];
    const has = row.amenities.includes(key);
    update(i, { amenities: has ? row.amenities.filter((k) => k !== key) : [...row.amenities, key] });
  }

  function addRoom() {
    setList((l) => [
      ...l,
      { type: "", name: "", price: 0, description: "", sleeps: 1, amenities: [], sort_order: l.length, images: [] },
    ]);
  }

  async function saveRoom(i: number) {
    const row = list[i];
    setSavingId(row.id ?? `new-${i}`);
    try {
      const { images, ...payload } = row;
      void images;
      const res = await save({ data: payload });
      if (!row.id) update(i, { id: res.id });
      await invalidate();
      toast.success("Room saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSavingId(null);
    }
  }

  async function removeRoom(i: number) {
    const row = list[i];
    if (row.id) {
      try {
        await remove({ data: { id: row.id } });
        await invalidate();
        toast.success("Room deleted.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not delete.");
        return;
      }
    }
    setList((l) => l.filter((_, idx) => idx !== i));
  }

  async function uploadImage(i: number, url: string) {
    const row = list[i];
    if (!row.id) {
      toast.error("Save the room first, then add images.");
      return;
    }
    try {
      const res = await addImg({ data: { room_id: row.id, image: url, sort_order: row.images.length } });
      update(i, { images: [...row.images, { id: res.id, image: url, sort_order: row.images.length }] });
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add image.");
    }
  }

  async function removeImage(i: number, imageId: string) {
    try {
      await delImg({ data: { id: imageId } });
      update(i, { images: list[i].images.filter((img) => img.id !== imageId) });
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete image.");
    }
  }

  return (
    <div className="space-y-6">
      {list.map((row, i) => (
        <div key={row.id ?? `new-${i}`} className="rounded-xl border border-border p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Type (e.g. 1 Bedroom)</Label>
              <Input value={row.type} onChange={(e) => update(i, { type: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={row.name} onChange={(e) => update(i, { name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Price (₦ / night)</Label>
              <Input
                type="number"
                value={row.price}
                onChange={(e) => update(i, { price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Sleeps</Label>
              <Input
                type="number"
                value={row.sleeps}
                onChange={(e) => update(i, { sleeps: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={3} value={row.description} onChange={(e) => update(i, { description: e.target.value })} />
          </div>

          <div className="mt-4 space-y-2">
            <Label>Amenities</Label>
            <div className="flex flex-wrap gap-2">
              {amenities.map((a) => {
                const active = row.amenities.includes(a.key);
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => toggleAmenity(i, a.key)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary"
                    }`}
                  >
                    {a.title}
                  </button>
                );
              })}
              {amenities.length === 0 && (
                <p className="text-xs text-muted-foreground">Add amenities first in the Amenities tab.</p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label>Gallery images</Label>
            <div className="flex flex-wrap gap-3">
              {row.images.map((img) => (
                <div key={img.id} className="group relative">
                  <img src={img.image} alt="" className="h-20 w-28 rounded-lg border border-border object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i, img.id)}
                    aria-label="Remove image"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <ImageUpload folder={`rooms/${row.id ?? "new"}`} label="Add gallery image" onUploaded={(url) => uploadImage(i, url)} />
          </div>

          <div className="mt-4 flex items-end gap-3">
            <div className="w-28 space-y-1.5">
              <Label>Sort order</Label>
              <Input
                type="number"
                value={row.sort_order}
                onChange={(e) => update(i, { sort_order: Number(e.target.value) })}
              />
            </div>
            <Button size="sm" onClick={() => saveRoom(i)} disabled={savingId !== null}>
              {savingId === (row.id ?? `new-${i}`) ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => removeRoom(i)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addRoom}>
        <Plus className="mr-2 h-4 w-4" /> Add room
      </Button>
    </div>
  );
}
