import { axiosProductGatewayClient } from "../../api/axiosClient";
import type { CategoryStats, CategoryType } from "../../../types/Category";

const CategoryService = {
  getAllCategories: () =>
    axiosProductGatewayClient.get<CategoryStats>("/categories"),

  getCategoryById: (id: string) =>
    axiosProductGatewayClient.get<CategoryType>(`/categories/${id}`),

  createCategory: (data: Partial<CategoryType>) =>
    axiosProductGatewayClient.post<{ msg: string; category: CategoryType }>(
      "/categories",
      data
    ),

  updateCategory: (id: string, data: Partial<CategoryType>) =>
    axiosProductGatewayClient.patch<CategoryType>(`/categories/${id}`, data),

  deleteCategory: (id: string) =>
    axiosProductGatewayClient.delete<{ msg: string }>(`/categories/${id}`),
};

export default CategoryService;
