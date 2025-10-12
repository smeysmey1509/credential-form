import axiosClient from "../../api/axiosClient";
import {
  ProductVariant,
  Product,
  Inventory,
  Dimensions,
} from "../../../types/ProductType";
import { AxiosResponse } from "axios";

const ProductService = {
  getAllProducts: () =>
    axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>(
      "/product"
    ),
  getProduct: (page = 1, limit = 10) =>
    axiosClient.get<Product[]>(`/products?page=${page}&limit=${limit}`),
  getProductById: (id: string): Promise<AxiosResponse<Product>> =>
    axiosClient.get<Product>(`/product/${id}`),
  createProduct: (productData: FormData) =>
    axiosClient.post<Product | ProductVariant | Inventory | Dimensions>(
      "/product",
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  updateProduct: (id?: string, updateData?: FormData) =>
    axiosClient.patch<Product | ProductVariant | Inventory | Dimensions>(
      `/product/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  deleteProduct: (id: string) => axiosClient.delete(`/product/delete/${id}`),
  multiDeleteProduct: (ids: string[]) =>
    axiosClient.post(`/product/delete`, { ids }),
  searchProduct: (query: string) =>
    axiosClient.get("/products/search", { params: { query } }),
  //Sort price low to high
  priceLowToHigh: (sort?: string, page?: number, limit?: number) =>
    axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>(
      "/products",
      { params: { sort, page, limit } }
    ),
  //Sort price high to low
  priceHighToLow: (sort?: string, page?: number, limit?: number) =>
    axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>(
      "/products",
      {
        params: {
          sort,
          page,
          limit,
        },
      }
    ),
  sortByCategory: (categoryId: string[]) =>
    axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>(
      `/products?category=${categoryId}`
    ),
};

export default ProductService;
