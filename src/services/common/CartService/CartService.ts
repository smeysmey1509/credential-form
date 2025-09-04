import axiosClient from "../../api/axiosClient";
import { ICart } from "../../../types/CartType";
const CartService = {
  getCart: () => axiosClient.get<ICart>("/cart"),

  addToCart: (productId: string, quantity: number = 1) =>
    axiosClient.post<ICart>("/cart/add", { productId, quantity }),

  updateQuantity: (productId: string, quantity: number) =>
    axiosClient.put<ICart>(`/cart/update/${productId}`, { quantity }),

  updateCartItem: (productId: string, quantity: number) =>
    axiosClient.put<ICart>(`/cart/${productId}`, { quantity }),

  removeCartItem: (productId: string) =>
    axiosClient.post<ICart>(`/cart/remove`, { productId }),

  selectDeliveryMethod: (method: string) =>
    axiosClient.post(`/cart/select-delivery`, { method }),

  clearCart: () => axiosClient.delete("/cart"),
};

export default CartService;
