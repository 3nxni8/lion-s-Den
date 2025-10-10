// Hero component types and related shared interfaces
export type HeroCta = {
  href: string;
  label: string;
};

export enum HeroVariant {
  Solid = "solid", // solid background using CSS variables, e.g., white
  Gradient = "gradient", // decorative radial gradients
  Image = "image", // background image or video + overlay
  Plain = "plain", // no background visuals
}

export enum HeroAlignment {
  Left = "left",
  Center = "center",
}

export enum HeroSize {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

// Copy constants-friendly payload (strings only)
export type HeroCopy = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
};

// Visual configuration separate from copy
export type HeroConfig = {
  variant?: HeroVariant;
  alignment?: HeroAlignment;
  size?: HeroSize;
  backgroundImage?: string; // used when variant === Image
  backgroundVideoSrc?: string; // optional video background when variant === Image
  overlayClassName?: string; // additional overlay tint when image/gradient
  className?: string;
  containerClassName?: string;
  minHeightClassName?: string; // override size mapping if needed
  backgroundAttachmentFixed?: boolean; // when true, fix background within hero container (gradient/image only)
};

// Component props merges copy and config, but allows ReactNode overrides in the component implementation
export type HeroProps = HeroCopy & HeroConfig;

export type Product = {
  id: string;
  name: string;
  price: number; // in chosen currency, minor currency handling can be added later
  imageSrc?: string; // optional local public path (e.g., /images/.. or /icons/...)
  href?: string; // optional direct link override
};
