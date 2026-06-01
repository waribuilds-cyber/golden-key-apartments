import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function RoomGallery({ images, alt }: { images: string[]; alt: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length <= 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        width={1280}
        height={960}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="ml-0">
          {images.map((src, i) => (
            <CarouselItem key={i} className="pl-0">
              <img
                src={src}
                alt={`${alt} — photo ${i + 1}`}
                width={1280}
                height={960}
                loading={i === 0 ? "eager" : "lazy"}
                className="aspect-[4/3] w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 h-8 w-8 border-none bg-background/80 text-foreground hover:bg-background" />
        <CarouselNext className="right-3 h-8 w-8 border-none bg-background/80 text-foreground hover:bg-background" />
      </Carousel>

      <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "pointer-events-auto h-1.5 rounded-full transition-all",
              i === current ? "w-5 bg-primary-foreground" : "w-1.5 bg-primary-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
