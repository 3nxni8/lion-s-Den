declare interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
    color?: string;
}

// Product domain types
export interface ProductVariant {
  id: string;
  name: string; // e.g., "Medium", "Black"
  size?: string;
  color?: string;
  inStock: boolean;
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number; // if on sale
  rating?: number; // 0-5
  ratingCount?: number;
  images: ProductImage[];
  tags?: string[];
  variants?: ProductVariant[];
  inStock: boolean;
}
