import axiosClient from "../../api/axiosClient";
import {ProductType} from "../../../types/ProductType"

const ProductService = {
    getAllProducts: () => axiosClient.get<ProductType[]>("/product"),
    getProduct: (page = 1, limit = 10) => axiosClient.get<ProductType[]>(`/products?page=${page}&limit=${limit}`),
    getProductById: (id: string) => axiosClient.get<ProductType>(`/product/${id}`),
    createProduct: (productData: FormData) =>
        axiosClient.post<ProductType>("/product", productData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
    updateProduct: (id: string, updateData: Partial<ProductType>) => axiosClient.put<ProductType>(`/product/delete/${id}`, updateData),
    deleteProduct: (id: string) => axiosClient.delete(`/product/delete/${id}`),
    multiDeleteProduct: (ids: string[]) => axiosClient.post(`/product/delete`, {ids}),
    searchProduct: (query: string) => axiosClient.get("/products/search", {params: {query}})
}

export default ProductService;