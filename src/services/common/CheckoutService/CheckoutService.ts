import axiosClient from "../../api/axiosClient";
import type {
  CheckoutPayload,
  CheckoutResponse,
} from "../../../types/OrderType";

const CheckoutService = {
  checkout: (payload: CheckoutPayload) =>
    axiosClient.post<CheckoutResponse>("/checkout", payload),
};

export default CheckoutService;
