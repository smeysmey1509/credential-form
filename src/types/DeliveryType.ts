export interface DeliveryType {
    _id?: string;
    method: string;
    baseFee: number;
    freeThreshold?: number;
    estimatedDays: number;
    isActive: boolean;
    code?: string | null;
}