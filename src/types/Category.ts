export interface CategoryType {
    _id?: string;
    categoryId?: string;
    categoryName?: string;
    productCount?: number;
    totalStock?: number;
    avgPrice?: number;
    totalSales?: number;
    description?: string;
}

export interface CategoryStats {
  categories: CategoryType[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}