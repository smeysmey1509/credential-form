import type { AxiosResponse } from "axios";
import { axiosProductGatewayClient } from "../../api/axiosClient";
import type {
  Dimensions,
  Inventory,
  Pagination,
  Product,
  ProductListResponse,
  ProductVariant,
} from "../../../types/ProductType";

type ProductCollection =
  | ProductVariant[]
  | Product[]
  | Inventory[]
  | Dimensions[];

type RequestParams = Record<string, string | number | boolean>;

type ProductListFields = {
  products?: Product[];
  pagination?: Pagination;
  total?: number;
  totalPages?: number;
  page?: number;
  perPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

type RawProductListPayload = ProductListFields & {
  data?: ProductListFields;
  meta?: ProductListFields;
};

export type ProductListPayload = ProductListResponse & {
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ProductFilterParams = {
  search?: string;
  priceMin?: number;
  priceMax?: number;
  categories?: string[];
  brands?: string[];
  sort?: string;
  page?: number;
  limit?: number;
};

export type ProductRecommendations = {
  products?: Product[];
  featuredProducts?: Product[];
  relatedProducts?: Product[];
};

const multipartConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const toPositiveNumber = (value: unknown, fallback: number): number => {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback;
};

const toNonNegativeNumber = (value: unknown, fallback: number): number => {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : fallback;
};

const toBoolean = (value: unknown, fallback: boolean): boolean => {
  return typeof value === "boolean" ? value : fallback;
};

const normalizeProductListPayload = (
  payload: RawProductListPayload,
  fallbackPage: number,
  fallbackLimit: number
): ProductListPayload => {
  const products = Array.isArray(payload.products)
    ? payload.products
    : Array.isArray(payload.data?.products)
      ? payload.data.products
      : [];

  const paginationSource =
    payload.pagination ?? payload.data?.pagination ?? payload.meta ?? {};

  const total = toNonNegativeNumber(
    paginationSource.total ?? payload.total ?? payload.data?.total,
    products.length
  );
  const page = toPositiveNumber(
    paginationSource.page ?? payload.page ?? payload.data?.page,
    fallbackPage
  );
  const perPage = toPositiveNumber(
    paginationSource.perPage ?? payload.perPage ?? payload.data?.perPage,
    fallbackLimit
  );
  const totalPages = toPositiveNumber(
    paginationSource.totalPages ?? payload.totalPages ?? payload.data?.totalPages,
    Math.max(1, Math.ceil(total / perPage))
  );
  const hasNextPage = toBoolean(
    paginationSource.hasNextPage ??
    payload.hasNextPage ??
    payload.data?.hasNextPage,
    page < totalPages
  );
  const hasPrevPage = toBoolean(
    paginationSource.hasPrevPage ??
    payload.hasPrevPage ??
    payload.data?.hasPrevPage,
    page > 1
  );

  return {
    ...payload,
    products,
    pagination: {
      ...paginationSource,
      total,
      page,
      perPage,
      totalPages,
      hasNextPage,
      hasPrevPage,
    },
    total,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

const withNormalizedProductList = (
  response: AxiosResponse<RawProductListPayload>,
  fallbackPage: number,
  fallbackLimit: number
): AxiosResponse<ProductListPayload> => ({
  ...response,
  data: normalizeProductListPayload(response.data, fallbackPage, fallbackLimit),
});

const buildProductListParams = ({
  search,
  priceMin,
  priceMax,
  categories,
  brands,
  sort,
  page = 1,
  limit = 10,
}: ProductFilterParams): RequestParams => {
  const params: RequestParams = { page, limit };
  const normalizedSearch = search?.trim();

  if (normalizedSearch) params.search = normalizedSearch;
  if (priceMin !== undefined) params.priceMin = priceMin;
  if (priceMax !== undefined) params.priceMax = priceMax;
  // The current API accepts a single ObjectId for each relation filter.
  if (categories?.length) params.category = categories[0];
  if (brands?.length) params.brand = brands[0];
  if (sort) params.sort = sort;

  return params;
};

const ProductGatewayService = {
  getAllProducts: () => axiosProductGatewayClient.get<Product[]>("/product"),

  getProduct: async (page = 1, limit = 10) => {
    const response =
      await axiosProductGatewayClient.get<RawProductListPayload>("/products", {
        params: { page, limit },
      });

    return withNormalizedProductList(response, page, limit);
  },

  getProductById: (id: string): Promise<AxiosResponse<Product>> =>
    axiosProductGatewayClient.get<Product>(`/products/${id}`),

  recommendationsProduct: (
    id: string
  ): Promise<AxiosResponse<ProductRecommendations>> =>
    axiosProductGatewayClient.get<ProductRecommendations>(
      `/product/${id}/recommendations`
    ),

  createProduct: (productData: FormData) =>
    axiosProductGatewayClient.post<Product>(
      "/products",
      productData,
      multipartConfig
    ),

  updateProduct: (id?: string, updateData?: FormData) =>
    axiosProductGatewayClient.patch<
      Product | ProductVariant | Inventory | Dimensions
    >(
      `/products/${id}`,
      updateData,
      multipartConfig
    ),

  deleteProduct: (id: string) =>
    axiosProductGatewayClient.delete(`/products/${id}`),

  multiDeleteProduct: (ids: string[]) =>
    axiosProductGatewayClient.post(`/product/delete`, { ids }),

  searchProduct: async (query: string, page = 1, limit = 10) => {
    const response = await axiosProductGatewayClient.get<RawProductListPayload>(
      "/products/search",
      {
        params: { query, page, limit },
      }
    );

    return withNormalizedProductList(response, page, limit);
  },

  priceLowToHigh: (sort?: string, page?: number, limit?: number) =>
    axiosProductGatewayClient.get<ProductCollection>("/products", {
      params: buildProductListParams({ sort, page, limit }),
    }),

  priceHighToLow: (sort?: string, page?: number, limit?: number) =>
    axiosProductGatewayClient.get<ProductCollection>("/products", {
      params: buildProductListParams({ sort, page, limit }),
    }),

  sortByCategory: (categoryId: string[]) =>
    axiosProductGatewayClient.get<ProductCollection>("/products", {
      params: { category: categoryId[0] },
    }),

  filterProducts: async (params: ProductFilterParams) => {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const response =
      await axiosProductGatewayClient.get<RawProductListPayload>("/products", {
        params: buildProductListParams(params),
      });

    return withNormalizedProductList(response, page, limit);
  },
};

export default ProductGatewayService;
