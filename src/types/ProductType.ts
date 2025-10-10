import { CategoryType } from "./Category";
import { BrandStats, BrandType } from "./BrandType";

export type PublishStatus = "Published" | "Unpublished";

export interface Pagination {
  total?: number;
  page?: number;
  perPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

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

export interface Brand {
  _id?: string;
  name: string;
  slug?: string;
  isActive?: boolean;
}

export interface Product {
  _id?: string;
  productId?: string;
  name: string;
  slug?: string;
  description?: string;
  feature?: string;
  brand?: Brand;
  price?: number;
  compareAtPrice?: number;
  actualPrice?: number;
  dealerPrice?: number;
  currency?: string;
  stock?: number;
  category: CategoryType;
  seller: string;
  status: PublishStatus;
  tag: string[];
  productType?: string;
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
  createdDate?: string;
  createdTime?: string;
  updatedDate?: string;
  updatedTime?: string;
}

export type FormImage = File | string;

export interface ProductVariantForm extends Omit<ProductVariant, "images"> {
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
