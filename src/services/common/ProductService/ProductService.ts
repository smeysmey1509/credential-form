import axiosClient from "../../api/axiosClient";
import {ProductVariant, Product, Inventory, Dimensions} from "../../../types/ProductType"

const ProductService = {
    getAllProducts: () => axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>("/product"),
    getProduct: (page = 1, limit = 10) => axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>(`/products?page=${page}&limit=${limit}`),
    getProductById: (id: string) => axiosClient.get<ProductVariant | Product | Inventory | Dimensions>(`/product/${id}`),
    createProduct: (productData: FormData) =>
        axiosClient.post<Product | ProductVariant | Inventory | Dimensions>("/product", productData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
    updateProduct: (id: string, updateData: Partial<Product | ProductVariant | Inventory | Dimensions>) => axiosClient.put<Product | ProductVariant | Inventory | Dimensions>(`/product/delete/${id}`, updateData),
    deleteProduct: (id: string) => axiosClient.delete(`/product/delete/${id}`),
    multiDeleteProduct: (ids: string[]) => axiosClient.post(`/product/delete`, {ids}),
    searchProduct: (query: string) => axiosClient.get("/products/search", {params: {query}}),
    //Sort price low to high
    priceLowToHigh: () => axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>("/products?sort=price_asc"),
    //Sort price high to low
    priceHighToLow: () => axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>("/products?sort=price_desc"),
    sortByCategory: (categoryId: string[]) => axiosClient.get<ProductVariant[] | Product[] | Inventory[] | Dimensions[]>(`/products?category=${categoryId}`),
}

export default ProductService;