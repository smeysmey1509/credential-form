import axiosClient from "../../api/axiosClient";
import type { Order, OrderStatus } from "../../../types/OrderType";

const OrderService = {
  getOrders: () => axiosClient.get<{ orders: Order[] }>("/orders"),

  getOrder: async (id: string, admin = false) => {
    const response = await axiosClient.get<{ orders: Order[] }>(
      admin ? "/admin/orders" : "/orders"
    );
    return response.data.orders.find((order) => order._id === id) ?? null;
  },

  getAllOrders: () =>
    axiosClient.get<{ orders: Order[] }>("/admin/orders"),

  cancelOrder: (id: string) =>
    axiosClient.patch<Order>(`/orders/${id}/cancel`),

  updateStatus: (id: string, status: OrderStatus) =>
    axiosClient.patch<Order>(`/admin/orders/${id}/status`, { status }),
};

export default OrderService;
