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
}

export interface ICart {
  _id?: string;
  user?: string;
  items: CartItem[];
  summary: CartSummary;
  delivery?: DeliveryType;
  promoCode?: PromoCodeType;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
