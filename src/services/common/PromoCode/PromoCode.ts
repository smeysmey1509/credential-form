import axiosClient from "../../api/axiosClient";
import { PromoCodeType } from "../../../types/PromoCode";

const PromoCodeService = {
  getAll: () => axiosClient.get<PromoCodeType[]>("/promocode"),

  create: (promo: Omit<PromoCodeType, "_id">) =>
    axiosClient.post<{ message: string; promo: PromoCodeType }>(
      "/promocode/create",
      promo
    ),

  apply: (code: string) =>
    axiosClient.post<{
      success: boolean;
      message: string;
      promo: {
        code: string;
        type: "percentage" | "fixed";
        value: number;
        amount: number;
        usageCount: number;
        maxUsesPerUser: number;
        expiresAt: string;
      };
    }>("/cart/apply-promo", { code }),

  removePromoCode: () => axiosClient.post("/cart/remove-promocode"),
};

export default PromoCodeService;
