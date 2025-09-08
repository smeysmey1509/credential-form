import axiosClient from "../../api/axiosClient";
import { CategoryStats, CategoryType } from "../../../types/Category";

const CategoryService = {
  getAllCategories: () => axiosClient.get<CategoryStats>("/categories"),

  getCategoryById: (id: string) =>
    axiosClient.get<CategoryStats>(`/category/${id}`),

  createCategory: (data: Partial<CategoryStats>) =>
    axiosClient.post<CategoryStats>("/category", data),

  updateCategory: (id: string, data: Partial<CategoryStats>) =>
    axiosClient.put<CategoryStats>(`/category/${id}`, data),

  deleteCategory: (id: string) =>
    axiosClient.delete<{ message: string }>(`/category/${id}`),
};

export default CategoryService;