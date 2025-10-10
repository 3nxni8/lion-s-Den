import React from "react";
import Link from "next/link";
import { HeroProps, HeroVariant, HeroAlignment, HeroSize } from "../../types";
import { SIZE_MIN_HEIGHT, ALIGN_CLASSES } from "../../constants";

export default function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
  containerClassName,
  minHeightClassName,
  variant = HeroVariant.Plain,
  size = HeroSize.Lg,
  alignment = HeroAlignment.Left,
  backgroundImage,
  backgroundVideoSrc,
  overlayClassName,
  backgroundAttachmentFixed,
}: HeroProps) {
  const minH = minHeightClassName ?? SIZE_MIN_HEIGHT[size] ?? "min-h-[calc(100svh-80px)]";
  const align = ALIGN_CLASSES[alignment] ?? ALIGN_CLASSES.left;
  const fixedClass = backgroundAttachmentFixed ? "bg-fixed" : "";

  return (
    <section aria-label="Hero" className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Background visuals based on variant */}
      {variant !== HeroVariant.Plain && (
        <div className="absolute inset-0 -z-10">
          {variant === HeroVariant.Gradient && (
            <>
              <div
                className={`absolute inset-0 ${fixedClass}`}
                aria-hidden="true"
                style={{
                  background:
                    `radial-gradient(1200px 600px at 0% 0%, var(--color-primary) 0%, transparent 60%),` +
                    `radial-gradient(1200px 600px at 100% 100%, var(--color-accent) 0%, transparent 60%)`,
                  opacity: 0.25,
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/40 ${overlayClassName ?? ""}`} aria-hidden="true" />
            </>
          )}

          {variant === HeroVariant.Solid && (
            <div className={`absolute inset-0 bg-background ${overlayClassName ?? ""}`} aria-hidden="true" />
          )}

          {variant === HeroVariant.Image && (
            <>
              {backgroundVideoSrc ? (
                // Video cannot use background-attachment: fixed; we keep it as cover
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                >
                  <source src={backgroundVideoSrc} type="video/mp4" />
                </video>
              ) : null}

              {!backgroundVideoSrc && backgroundImage ? (
                <div
                  className={`absolute inset-0 bg-cover bg-center ${fixedClass}`}
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                  aria-hidden="true"
                />
              ) : null}

              <div className={`absolute inset-0 ${overlayClassName ?? "bg-background/40"}`} aria-hidden="true" />
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ${containerClassName ?? ""}`}>
        <div className={`${minH} grid items-center ${align}`}>
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
            ) : null}

            <h1 className="mt-2 font-display text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              {title}
            </h1>

            {description ? (
              <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-xl">{description}</p>
            ) : null}

            {(primaryCta || secondaryCta) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {primaryCta ? (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {primaryCta.label}
                  </Link>
                ) : null}

                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-md border border-border bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
