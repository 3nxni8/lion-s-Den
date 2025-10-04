export default function HomePage() {
  return (
    <section aria-label="Hero" className="relative pt-20">
      {/* Background visuals */}
      <div className="relative isolate">
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background:
              `radial-gradient(1200px 600px at 0% 0%, var(--color-primary) 0%, transparent 60%),
               radial-gradient(1200px 600px at 100% 100%, var(--color-accent) 0%, transparent 60%)`,
            opacity: 0.25,
          }}
        />
        {/* Top-to-bottom subtle overlay to ensure text contrast across themes */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background/10 to-background/40" aria-hidden="true" />

        {/* Content */}
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <div className="min-h-[calc(100svh-80px)] flex items-center">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                Curated fragrances for every mood
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}