export type PublishStatus = "Published" | "Unpublished";

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Inventory {
  onHand: number;
  reserved: number;
  safetyStock: number;
}

export interface ProductVariant {
  _id?: string;
  sku: string;
  price: number;
  stock?: number;
  inventory?: Inventory;
  attributes: Record<string, string>;
  images: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Product {
  _id?: string;
  productId?: string;
  name: string;
  slug?: string;
  description?: string;
  brand?: string;
  price?: number;
  compareAtPrice?: number;
  currency?: string;
  stock?: number;
  category: string;
  seller: string;
  status: PublishStatus;
  tag: string[];
  images: string[];
  primaryImageIndex: number;
  ratingAvg?: number;
  ratingCount?: number;
  salesCount?: number;
  isTrending?: boolean;
  dimensions?: Dimensions;
  weight?: number;
  variants?: ProductVariant[];
  attributes?: Record<string, string>;
  seo?: SEO;
  isAdult?: boolean;
  isHazardous?: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  dedupeKey?: string;
  createdAt?: string;
  updatedAt?: string;
  primaryImage?: string | null;
  discountPercent?: number;
  availableTotal?: number;
  priceMin?: number;
  priceMax?: number;
  defaultPrice?: number;
}

export type FormImage = File | string;

export interface ProductVariantForm
  extends Omit<ProductVariant, "images"> {
  images: FormImage[];
}

export interface ProductFormValues
  extends Omit<
    Product,
    | "images"
    | "variants"
    | "category"
    | "seller"
    | "createdAt"
    | "updatedAt"
    | "primaryImage"
    | "discountPercent"
    | "availableTotal"
  > {
  category: string;
  seller: string;
  images: FormImage[];
  variants?: ProductVariantForm[];
}
