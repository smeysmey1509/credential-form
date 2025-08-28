import axiosClient from "../../api/axiosClient";
import { PromoCodeType } from "../../../types/PromoCode";

const PromoCodeService = {
  // Get all promo codes
  getAll: () => axiosClient.get<PromoCodeType[]>("/promo"),

  // Create a new promo code
  create: (promo: Omit<PromoCodeType, "_id">) =>
    axiosClient.post<PromoCodeType>("/promo", promo),

  // Apply a promo code to the cart
  apply: (code: string) =>
    axiosClient.post<{
      message: string;
      usageCount: number;
      promo: {
        code: string;
        discountType: string;
        discountValue: number;
        discountAmount: number;
      };
      cart: {
        discount: number;
        subTotal: number;
        total: number;
        serviceTax?: number;
        deliveryFee?: number;
      };
    }>("/cart/apply-promo", { code }),

    removePromoCode: () => axiosClient.post("/cart/remove-promocode"),
};

export default PromoCodeService;
