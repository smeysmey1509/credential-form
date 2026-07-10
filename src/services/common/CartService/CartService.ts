import axiosClient from "../../api/axiosClient";
import { ICart } from "../../../types/CartType";

export const CART_UPDATED_EVENT = "cart:updated";

const notifyCartUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }
};

const CartService = {
  getCart: () => axiosClient.get<ICart>("/cart"),

  addToCart: async (productId: string, quantity: number = 1) => {
    const response = await axiosClient.post<ICart>("/cart/add", {
      productId,
      quantity,
    });
    notifyCartUpdated();
    return response;
  },

  updateQuantity: async (productId: string, quantity: number) => {
    const response = await axiosClient.put<ICart>(
      `/cart/update/${productId}`,
      { quantity }
    );
    notifyCartUpdated();
    return response;
  },

  updateCartItem: (productId: string, quantity: number) =>
    CartService.updateQuantity(productId, quantity),

  removeCartItem: async (productId: string) => {
    const response = await axiosClient.post<ICart>(`/cart/remove`, {
      productId,
    });
    notifyCartUpdated();
    return response;
  },

  selectDeliveryMethod: (method: string) =>
    axiosClient.post(`/cart/select-delivery`, { method }),

  clearCart: async () => {
    const response = await axiosClient.delete("/cart");
    notifyCartUpdated();
    return response;
  },
};

export default CartService;
