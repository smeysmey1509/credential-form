// src/types/ProductType.ts
export interface ProductType {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    stock?: number;
    status: string;
    image: File[];
    tag: string[];
}
