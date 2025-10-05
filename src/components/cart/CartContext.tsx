"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// Uses global CartItem interface declared in src/types

type CartKey = string; // composite key: id|size|color

function makeKey(item: Partial<CartItem> & { id: string }): CartKey {
  const size = item.size ?? "";
  const color = item.color ?? "";
  return `${item.id}|${size}|${color}`;
}


const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "lion_den_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartStateItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartStateItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch {}
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    const key = makeKey(item);
    setItems(prev => {
      const map = new Map<CartKey, CartStateItem>();
      prev.forEach(p => map.set(makeKey(p), p));
      const existing = map.get(key);
      if (existing) {
        map.set(key, { ...existing, quantity: existing.quantity + quantity });
      } else {
        map.set(key, { ...item, quantity });
      }
      return Array.from(map.values());
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id, options) => {
    setItems(prev => prev.filter(p => makeKey(p) !== makeKey({ id, ...options })));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (id, quantity, options) => {
    if (quantity <= 0) {
      removeItem(id, options);
      return;
    }
    setItems(prev => prev.map(p => (makeKey(p) === makeKey({ id, ...options }) ? { ...p, quantity } : p)));
  };

  const clearCart = () => setItems([]);

  const { itemCount, subtotal, shipping, total } = useMemo(() => {
    const itemCount = items.reduce((acc, it) => acc + it.quantity, 0);
    const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const shipping = subtotal > 50 || itemCount === 0 ? 0 : 5.99;
    const total = subtotal + shipping;
    return { itemCount, subtotal, shipping, total };
  }, [items]);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

