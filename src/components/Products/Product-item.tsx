"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../../types";

export type ProductItemProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

function formatPrice(value: number) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const { id, name, price, imageSrc, href } = product;
  const linkHref = href ?? `/products/${id}`;
  const image = imageSrc ?? "/icons/window.svg";

  return (
    <div className="group relative rounded-xl border border-border p-3 shadow-sm transition-all hover:bg-muted/20 hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
      {/* Image */}
      <Link href={linkHref} className="block" aria-label={`${name} details`}>
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-background aspect-[4/5]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={linkHref} className="block">
              <h3 className="truncate text-sm font-semibold text-foreground group-hover:underline">
                {name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-foreground/80">{formatPrice(price)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={linkHref}
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            View Details
          </Link>
          {onAddToCart && (
            <button
              type="button"
              onClick={() => onAddToCart?.(product)}
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`Add ${name} to cart`}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
