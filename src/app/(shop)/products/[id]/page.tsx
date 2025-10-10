"use client"
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEMO_PRODUCTS } from "../../../../constants";
import { useCart } from "../../../../components/cart/cart-context";

function formatPrice(value: number) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

const SinglePageProduct = ({ params }: { params: { id: string } }) => {
  const { addItem } = useCart();
  const product = useMemo(() => DEMO_PRODUCTS.find(p => p.id === params.id), [params.id]);
  const [qty, setQty] = useState<number>(1);

  if (!product) {
    return (
      <section className="pt-24 md:pt-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <p className="text-sm text-foreground/70">Product not found.</p>
        <Link href="/products" className="mt-4 inline-block text-primary hover:underline">Back to products</Link>
      </section>
    );
  }

  const { name, price, imageSrc } = product;

  return (
    <section className="pt-24 md:pt-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative w-full overflow-hidden rounded-xl border border-border bg-background aspect-[4/5]">
            <Image
              src={imageSrc ?? "/icons/window.svg"}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">{name}</h1>
          <p className="mt-2 text-lg font-semibold">{formatPrice(price)}</p>

          <div className="mt-4 text-sm text-foreground/80 space-y-2">
            <p>
              Discover a refined blend crafted for modern tastes. Notes unfold with balance and depth, perfect for any occasion.
            </p>
            <p>
              Long-lasting, skin-friendly, and designed to make a statement.
            </p>
          </div>

          {/* Quantity selector */}
          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-border">
              <button
                type="button"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-sm hover:bg-muted/30"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-14 text-center text-sm bg-background py-2 border-l border-r border-border"
                aria-label="Quantity"
              />
              <button
                type="button"
                onClick={() => setQty(q => q + 1)}
                className="px-3 py-2 text-sm hover:bg-muted/30"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => addItem(product, qty)}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePageProduct;