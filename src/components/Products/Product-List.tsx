"use client"
import React from "react";
import ProductItem from "./Product-item";
import { Product } from "../../types";

export type ProductListProps = {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  className?: string;
};

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, className }) => {
  if (!products || products.length === 0) {
    return (
      <div className={`border border-dashed border-border rounded-lg  text-center ${className ?? ""}`}>
        <p className="text-sm text-foreground/70">No products found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <ProductItem key={p.id} product={p} onAddToCart={onAddToCart} />)
        )}
      </div>
    </div>
  );
};

export default ProductList;

