import axiosClient from "../../api/axiosClient";


const WishlistService = {
    getWishlist: (page = 1, limit = 6) => axiosClient?.get(`/wishlist?page=${page}&limit=${limit}`),
    addWishlist: (id?: string) => axiosClient?.post(`/wishlist/${id}`),
    removeWishlist: (id?: string) => axiosClient?.delete(`/wishlist/${id}`)
}

export default WishlistService