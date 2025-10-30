import axiosClient from "../../api/axiosClient";
import {
  ProductVariant,
  Product,
  Inventory,
  Dimensions,
  ProductListResponse,
} from "../../../types/ProductType";
import { AxiosResponse } from "axios";

const ProductService = {
  getAllProducts: () => axiosClient.get<Product[]>("/product"),
  getProduct: (page = 1, limit = 10) =>
    axiosClient.get<ProductListResponse>(
      `/products?page=${page}&limit=${limit}`
    ),
  getProductById: (id: string): Promise<AxiosResponse<Product>> =>
    axiosClient.get<Product>(`/product/${id}`),
  recommendationsProduct: (id: string): Promise<AxiosResponse<Product>> =>
    axiosClient.get(`/product/${id}/recommendations`),
  createProduct: (productData: FormData) =>
    axiosClient.post<Product>(
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
  searchProduct: (query: string, page = 1, limit = 10) =>
    axiosClient.get("/products/search", { params: { query, page, limit } }),
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
  filterProducts: (params: {
    search?: string;
    priceMin?: number;
    priceMax?: number;
    categories?: string[];
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const {
      search,
      priceMin,
      priceMax,
      categories,
      sort,
      page = 1,
      limit = 10,
    } = params;

    const queryParams: any = {
      page,
      limit,
    };

    if (search) queryParams.search = search;
    if (priceMin !== undefined) queryParams["price[min]"] = priceMin;
    if (priceMax !== undefined) queryParams["price[max]"] = priceMax;
    if (categories && categories.length > 0)
      queryParams.categories = categories.join(",");
    if (sort) queryParams.sort = sort;

    return axiosClient.get<ProductListResponse>("/products", {
      params: queryParams,
    });
  },
};

export default ProductService;
