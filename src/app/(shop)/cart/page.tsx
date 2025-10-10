"use client"
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "../../../components/ui/Modal";
import { useCart } from "../../../components/cart/cart-context";

function formatPrice(value: number) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const shipping = items.length > 0 ? 5 : 0;
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  return (
    <section className="pt-24 md:pt-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <header className="mb-6 md:mb-8 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">Your Cart</h1>
          <p className="mt-2 text-sm text-foreground/70">Review your items and adjust quantities before checkout.</p>
        </div>
        <Link href="/products" className="text-sm text-primary hover:underline">Continue shopping</Link>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-sm text-foreground/70">Your cart is empty.</p>
              <Link href="/products" className="mt-3 inline-block text-primary hover:underline">Browse products</Link>
            </div>
          ) : (
            items.map((i) => (
              <div key={i.id} className="grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-lg border border-border p-3">
                <div className="relative h-24 w-24 overflow-hidden rounded-md border border-border bg-background">
                  <Image
                      src={i.imageSrc ?? "/icons/window.svg"}
                      alt={i.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold truncate">{i.name}</h3>
                  <p className="mt-1 text-sm text-foreground/80">Unit: {formatPrice(i.price)}</p>

                  <div className="mt-2 inline-flex items-center rounded-md border border-border">
                    <button
                      type="button"
                      onClick={() => updateQuantity(i.id, Math.max(1, i.qty - 1))}
                      className="px-3 py-2 text-sm hover:bg-muted/30"
                      aria-label={`Decrease ${i.name} quantity`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      value={i.qty}
                      onChange={(e) => updateQuantity(i.id, Math.max(1, Number(e.target.value) || 1))}
                      className="w-14 text-center text-sm bg-background py-2 border-l border-r border-border"
                      aria-label={`${i.name} quantity`}
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(i.id, i.qty + 1)}
                      className="px-3 py-2 text-sm hover:bg-muted/30"
                      aria-label={`Increase ${i.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-semibold">{formatPrice(i.price * i.qty)}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(i.id)}
                    className="text-xs text-foreground/70 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <aside className="rounded-lg border border-border p-4 h-fit">
          <h2 className="text-base font-semibold">Summary</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-foreground/70">Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-foreground/70">Shipping</dt>
              <dd className="font-medium">{formatPrice(shipping)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 mt-2">
              <dt className="text-foreground">Total</dt>
              <dd className="font-semibold">{formatPrice(total)}</dd>
            </div>
          </dl>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => setOpen(true)}
            className="mt-4 w-full rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Proceed to Checkout
          </button>

          <Modal open={open} onCloseAction={() => setOpen(false)} title="Order placed">
            <p>Your order was placed successfully. This is a demo checkout.</p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-md border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-muted/20"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold hover:brightness-110"
                onClick={() => {
                  setOpen(false);
                  clearCart();
                }}
              >
                Done
              </button>
            </div>
          </Modal>
        </aside>
      </div>
    </section>
  );
}
