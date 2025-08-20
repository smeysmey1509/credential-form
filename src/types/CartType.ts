import { ProductType } from "./ProductType";

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface ICart {
  _id?: string;
  user?: string;
  items?: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  subTotal?: number;
}
