"use client"
import React from "react";
import ProductList from "../../../components/Products/Product-List";
import { DEMO_PRODUCTS } from "../../../constants";
import type { Product } from "../../../types";
import { useCart } from "../../../components/cart/cart-context";

const Products: React.FC = () => {
  const products: Product[] = DEMO_PRODUCTS;
  const { addItem } = useCart();

  const handleAddToCart = (p: Product) => addItem(p, 1);

  return (
    <section className="pt-24 md:pt-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">All Products</h1>
        <p className="mt-2 text-sm text-foreground/70">Browse our curated selection.</p>
      </header>

      <ProductList products={products} onAddToCart={handleAddToCart} />
    </section>
  );
};

export default Products;