export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>}
      <div className={`mt-5 h-1 w-16 rounded-full bg-gold ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}