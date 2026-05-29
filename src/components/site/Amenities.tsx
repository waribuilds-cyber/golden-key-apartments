import { amenities } from "@/lib/site-config";
import { AmenityIcon } from "./amenity-icon";
import { SectionHeading } from "./SectionHeading";

export function Amenities() {
  return (
    <section id="amenities" className="scroll-mt-20 bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Everything Included"
          title="Comfort in every detail"
          subtitle="Each apartment comes fully equipped so you can settle in and feel right at home."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <div
              key={a.key}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <AmenityIcon name={a.key} className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}