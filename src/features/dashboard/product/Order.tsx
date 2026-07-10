import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiXCircle } from "react-icons/fi";
import OrderService from "../../../services/common/OrderService/OrderService";
import { getApiErrorMessage } from "../../../services/api/errors";
import type { Order } from "../../../types/OrderType";
import { formatCurrency } from "../../../utils/currency";
import { getUserRole } from "../../../hooks/useAuth";

const PAGE_SIZE = 8;

const statusClass = (status: string) => {
  const normalized = status.toUpperCase();
  if (["PAID", "DELIVERED"].includes(normalized)) {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300";
  }
  if (["CANCELLED", "FAILED", "REFUNDED"].includes(normalized)) {
    return "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300";
  }
  if (["SHIPPED", "PROCESSING"].includes(normalized)) {
    return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300";
  }
  return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300";
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAdmin = getUserRole() === "admin";

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const response = isAdmin
          ? await OrderService.getAllOrders()
          : await OrderService.getOrders();
        setOrders(response.data.orders);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Could not load orders."));
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [isAdmin]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter((order) =>
      [
        order._id,
        order.status,
        order.payment?.status,
        order.contact?.fullName,
        ...order.items.map((item) => item.name),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [orders, search]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const visibleOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const cancelOrder = async (order: Order) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      const response = await OrderService.cancelOrder(order._id);
      setOrders((current) =>
        current.map((item) =>
          item._id === response.data._id ? response.data : item
        )
      );
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not cancel this order."));
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-[#19191C]">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#212b37] dark:text-white">
            {isAdmin ? "All orders" : "My orders"}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {filteredOrders.length} order{filteredOrders.length === 1 ? "" : "s"}
          </p>
        </div>
        <input
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search orders…"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#5C67F7] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {error && (
        <div className="m-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {visibleOrders.map((order) => (
              <tr key={order._id} className="text-slate-700 dark:text-slate-200">
                <td className="px-4 py-4 font-semibold text-[#5C67F7]">
                  #{order._id.slice(-8).toUpperCase()}
                </td>
                <td className="max-w-xs px-4 py-4">
                  <p className="truncate font-medium">
                    {order.items.map((item) => item.name).join(", ")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {order.items.reduce((total, item) => total + item.quantity, 0)} item(s)
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(order.status)}`}>
                    {order.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs font-semibold">
                  {order.payment?.status || "PENDING"}
                </td>
                <td className="px-4 py-4 font-bold">
                  {formatCurrency(order.summary?.total ?? 0)}
                </td>
                <td className="px-4 py-4 text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      title="View order"
                      onClick={() => navigate(`/dashboard/product/orderdetails/${order._id}`)}
                      className="rounded-lg bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300"
                    >
                      <FiEye />
                    </button>
                    {!isAdmin && ["PENDING_PAYMENT", "pending"].includes(order.status) && (
                      <button
                        type="button"
                        title="Cancel order"
                        onClick={() => cancelOrder(order)}
                        className="rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300"
                      >
                        <FiXCircle />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!loading && !visibleOrders.length && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  No orders found.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  Loading orders…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 p-4 text-sm dark:border-slate-800">
          <span className="text-slate-500">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded border border-slate-200 px-3 py-1.5 disabled:opacity-40 dark:border-slate-700"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded border border-slate-200 px-3 py-1.5 disabled:opacity-40 dark:border-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
