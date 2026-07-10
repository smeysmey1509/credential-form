export interface PromoCodeType {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiresAt: string;
  maxUsesPerUser?: number;
  isActive?: boolean;
}
