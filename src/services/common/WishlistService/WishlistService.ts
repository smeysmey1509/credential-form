import axiosClient from "../../api/axiosClient";
import type { Wishlist } from "../../../types/WishlistType";

const WishlistService = {
    getWishlist: (page = 1, limit = 6) =>
      axiosClient.get<Wishlist>("/wishlist", { params: { page, limit } }),
    addWishlist: (id: string) =>
      axiosClient.post<{ message: string }>(`/wishlist/${id}`),
    removeWishlist: (id: string) =>
      axiosClient.delete<{ message: string }>(`/wishlist/${id}`),
    moveToCart: (productId: string, quantity = 1) =>
      axiosClient.post("/wishlist/move-to-cart", { productId, quantity }),
}

export default WishlistService
