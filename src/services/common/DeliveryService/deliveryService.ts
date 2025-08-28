import axiosClient from "../../api/axiosClient";
import { DeliveryType } from "../../../types/DeliveryType";

const DeliveryService = {
  getDeliveryMethods: async (): Promise<DeliveryType[]> => {
    const response = await axiosClient.get("/delivery/methods");
    return response.data;
  },
};

export default DeliveryService;
