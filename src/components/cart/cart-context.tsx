"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../../types";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageSrc?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart.items.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product: Product, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: Math.max(1, i.qty + qty) } : i));
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, imageSrc: product.imageSrc, qty: Math.max(1, qty) },
      ];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));

  const clearCart = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    const c = items.reduce((acc, i) => acc + i.qty, 0);
    const s = items.reduce((acc, i) => acc + i.qty * i.price, 0);
    return { count: c, subtotal: s };
  }, [items]);

  const value: CartContextValue = { items, addItem, removeItem, updateQuantity, clearCart, count, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}