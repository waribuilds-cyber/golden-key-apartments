import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/site-config";
import { SectionHeading } from "./SectionHeading";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Guest Reviews"
          title="Loved by guests worldwide"
          subtitle="Real words from travellers who made our apartments their Lagos home."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name} className="relative rounded-2xl border border-border bg-card p-7 shadow-sm">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-gold/30" />
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground/90">"{r.text}"</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <div className="font-semibold text-foreground">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}