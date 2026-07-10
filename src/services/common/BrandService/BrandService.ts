import { axiosProductGatewayClient } from "../../api/axiosClient";
import type { BrandStats, BrandType } from "../../../types/BrandType";

const BrandService = {
  getAllBrands: () => axiosProductGatewayClient.get<BrandStats>("/brands"),
  createBrand: (data: Pick<BrandType, "name"> & Partial<BrandType>) =>
    axiosProductGatewayClient.post<BrandType>("/brands", data),
  updateBrand: (id: string, data: Partial<BrandType>) =>
    axiosProductGatewayClient.patch<BrandType>(`/brands/${id}`, data),
  deleteBrand: (id: string) =>
    axiosProductGatewayClient.delete<{ msg: string }>(`/brands/${id}`),
};

export default BrandService;
