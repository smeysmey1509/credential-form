export interface ProductType {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    stock?: number;
    status: string;
    images: File[];
    primaryImageIndex: number;
    tag: string[];
}
