import axiosClient from "../../api/axiosClient";
import { BrandType } from "../../../types/BrandType";

const BrandService = {
    getAllBrands: () => axiosClient.get<BrandType>("/brands"),
}

export default BrandService;