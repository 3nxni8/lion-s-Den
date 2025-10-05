import ProductCard from "./ProductCard";
import type { Product } from "../../types";

interface Props {
  products: Product[];
  title?: string;
  description?: string;
}

export default function ProductList({ products, title, description }: Props) {
  if (!products || products.length === 0) {
    return (
      <section className="py-8">
        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
        <div className="text-gray-500 text-sm">No products available.</div>
      </section>
    );
  }

  return (
    <section className="py-8">
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

