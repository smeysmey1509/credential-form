export interface PromoCodeType {
    _id: string;
    code: string;
    discount: number;
    serviceTax?: number;
    deliveryFee?: number;
    expiryDate: Date;
}