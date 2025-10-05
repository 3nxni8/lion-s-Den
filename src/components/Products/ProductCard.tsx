"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import type { Product } from "../../types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]?.url ?? "/images/dolceG.jpg",
    });
  };

  const href = `/products/${product.id}`;
  const img = product.images?.[0];
  const isOnSale = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="group relative rounded-lg border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={href} className="block aspect-square bg-gray-50 relative overflow-hidden">
        {img ? (
          <Image
            src={img.url}
            alt={img.alt || product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">No image</div>
        )}
        {!product.inStock && (
          <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">Sold out</span>
        )}
        {isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</span>
        )}
      </Link>

      <div className="p-3">
        <Link href={href} className="block">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h3>
        </Link>
        {product.description && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            {isOnSale && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice!.toFixed(2)}</span>
            )}
          </div>
          {typeof product.rating === "number" && (
            <div className="flex items-center gap-1 text-xs text-yellow-500" aria-label={`Rated ${product.rating} out of 5`}>
              <span>★</span>
              <span className="text-gray-600">{product.rating.toFixed(1)}</span>
              {product.ratingCount ? <span className="text-gray-400">({product.ratingCount})</span> : null}
            </div>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="mt-3 w-full rounded-md bg-black text-white text-sm font-medium py-2 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label={`Add ${product.title} to cart`}
        >
          {product.inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </div>
  );
}

