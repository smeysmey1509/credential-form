export interface BrandType {
    _id?: string;
    name?: string;
    slug?: string;
    productCount?: number;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    brands?: string[];
}

export interface BrandStats {
    brands?: BrandType[];
    total?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
}