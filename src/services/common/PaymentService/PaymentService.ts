import axiosClient from "../../api/axiosClient";
import type { Payment } from "../../../types/OrderType";

const PaymentService = {
  getPayment: (id: string) => axiosClient.get<Payment>(`/payments/${id}`),
  verifyPayment: (id: string) =>
    axiosClient.post<Payment>(`/payments/${id}/verify`),
  confirmManualPayment: (id: string) =>
    axiosClient.post<Payment>(`/payments/${id}/confirm-manual`),
};

export default PaymentService;
