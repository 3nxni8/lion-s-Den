import { HeroCopy, HeroConfig, HeroSize, HeroAlignment, HeroVariant } from "../types";

export const SIZE_MIN_HEIGHT: Record<HeroSize, string> = {
  [HeroSize.Sm]: "min-h-[48svh]",
  [HeroSize.Md]: "min-h-[70svh]",
  [HeroSize.Lg]: "min-h-[calc(100svh-80px)]",
};

export const ALIGN_CLASSES: Record<HeroAlignment, string> = {
  [HeroAlignment.Left]: "justify-items-start text-left",
  [HeroAlignment.Center]: "justify-items-center text-center",
};

export const HOME_HERO: HeroCopy = {
  eyebrow: "Elevate your everyday",
  title: "Curated fragrances for every mood",
  description:
    "Premium scents crafted to stand out. Discover fresh arrivals, timeless classics, and exclusive blends.",
  primaryCta: { href: "/products", label: "Shop now" },
  secondaryCta: { href: "/category", label: "Browse categories" },
};

// Use a fixed gradient background for the hero section
export const HOME_HERO_CONFIG: HeroConfig = {
  variant: HeroVariant.Gradient,
  alignment: HeroAlignment.Left,
  size: HeroSize.Lg,
  overlayClassName: "bg-background/40",
  backgroundAttachmentFixed: false,
};
