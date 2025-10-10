"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export type BannerProps = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description?: string;
  cta?: { href: string; label: string };
  reverse?: boolean; // image on right when true
  className?: string;
};

export default function Banner({ imageSrc, imageAlt, title, description, cta, reverse = false, className }: BannerProps) {
  return (
    <section aria-label="Promotional banner" className={`px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ${className ?? ""}`}>
      <div className="relative isolate overflow-hidden rounded-3xl border border-border p-6 md:p-10">
        {/* Bright soft background using theme colors */}
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{
            background:
              `radial-gradient(600px 360px at 0% 0%, var(--color-primary) 0%, transparent 60%),` +
              `radial-gradient(600px 360px at 100% 100%, var(--color-accent) 0%, transparent 60%),` +
              `linear-gradient(0deg, rgba(255,255,255,0.96), rgba(255,255,255,0.96))`,
          }}
          aria-hidden="true"
        />

        <div className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-10 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Image column */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background aspect-[4/3]">
              <Image
                src={imageSrc}
                alt={imageAlt ?? title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Copy column */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{title}</h2>
            {description ? (
              <p className="mt-3 text-base md:text-lg text-foreground/80 max-w-xl">{description}</p>
            ) : null}
            {cta ? (
              <div className="mt-6">
                <Link
                  href={cta.href}
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

