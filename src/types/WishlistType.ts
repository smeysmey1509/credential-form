import { Product } from "./ProductType";

export interface WishlistItem {
  product: Product[];
  _id?: string;
  addedAt?: string;
}

export interface Wishlist {
  items?: WishlistItem[];
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}
