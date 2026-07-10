// ProductType already defined separately
import { DeliveryType } from "./DeliveryType";
import { Product } from "./ProductType";
import { PromoCodeType } from "./PromoCode";

export interface CartItem {
  _id?: string;
  product: Product;
  quantity: number;
}

export interface CartSummary {
  subTotal: number;
  discount: number;
  deliveryFee: number;
  serviceTax: number;
  total: number;
  taxRate?: number;
  promoCode?: string | null;
  promo?: {
    code: string;
    type?: "percentage" | "fixed";
    value?: number;
    amount?: number;
  } | null;
}

export interface ICart {
  _id?: string;
  user?: string;
  items: CartItem[];
  summary: CartSummary;
  delivery?: DeliveryType | null;
  promoCode?: PromoCodeType | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
