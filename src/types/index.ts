export type CategorySlug = "sarees" | "shoes" | "accessories" | "beauty";

export type ProductTag = "new" | "bestseller" | "flash" | "edit";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Sub-category shown in filters and breadcrumbs, e.g. "Jamdani", "Heels". */
  type: string;
  /** Short line under the name on cards, e.g. "Pure silk · Saffron". */
  subtitle: string;
  price: number;
  compareAt?: number;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  rating: number;
  reviews: number;
  badge?: string;
  tags: ProductTag[];
  description: string;
  details: string[];
  care: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  banner: string;
  types: string[];
}

export interface CartItem {
  key: string;
  productId: string;
  color: string;
  size?: string;
  qty: number;
}

export interface NavLink {
  label: string;
  href: string;
}
