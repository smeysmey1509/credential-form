import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiPrinterLine } from "react-icons/ri";
import { FiArrowLeft, FiMapPin, FiPackage } from "react-icons/fi";
import OrderService from "../../../services/common/OrderService/OrderService";
import { getApiErrorMessage } from "../../../services/api/errors";
import type { Order } from "../../../types/OrderType";
import { formatCurrency } from "../../../utils/currency";
import { DEFAULT_IMG, toAbs } from "../../../utils/image";
import { getUserRole } from "../../../hooks/useAuth";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    OrderService.getOrder(id, getUserRole() === "admin")
      .then((result) => {
        if (!result) {
          setError("Order not found.");
          return;
        }
        setOrder(result);
      })
      .catch((requestError) =>
        setError(getApiErrorMessage(requestError, "Could not load this order."))
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-[#19191C]">
        <FiPackage className="mx-auto text-5xl text-slate-300" />
        <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
          Select an order
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Open an order from the order list to view its details.
        </p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/product/orders")}
          className="mt-5 rounded-lg bg-[#5C67F7] px-4 py-2 text-sm font-semibold text-white"
        >
          View orders
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-sm text-slate-500 shadow dark:bg-[#19191C]">
        Loading order details…
      </div>
    );
  }

  if (!order || error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
        {error || "Order not found."}
      </div>
    );
  }

  const address = order.shippingAddress;
  const canCancel =
    getUserRole() !== "admin" &&
    ["PENDING_PAYMENT", "pending"].includes(order.status);

  const cancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      const response = await OrderService.cancelOrder(order._id);
      setOrder(response.data);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not cancel this order."));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow dark:bg-[#19191C] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/product/orders")}
            className="rounded-lg bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <FiArrowLeft />
          </button>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Order</p>
            <h1 className="font-semibold text-[#5C67F7]">
              #{order._id.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"
          >
            <RiPrinterLine /> Print
          </button>
          {canCancel && (
            <button
              type="button"
              onClick={cancelOrder}
              className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
            >
              Cancel order
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <section className="overflow-hidden rounded-lg bg-white shadow dark:bg-[#19191C]">
          <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Items</h2>
              <p className="mt-1 text-xs text-slate-500">
                Placed {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              {order.status.replaceAll("_", " ")}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900/60">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Unit price</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {order.items.map((item, index) => (
                  <tr key={`${item.product}-${index}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={toAbs(item.image) || DEFAULT_IMG}
                          alt={item.name}
                          className="h-14 w-14 rounded-lg bg-slate-50 object-contain dark:bg-slate-800"
                        />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                      {formatCurrency(item.unitPrice ?? item.price)}
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-slate-900 dark:text-white">
                      {formatCurrency(
                        item.totalPrice ?? item.price * item.quantity
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-lg bg-white p-4 shadow dark:bg-[#19191C]">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Order summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatCurrency(order.summary.subTotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-{formatCurrency(order.summary.discount)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery</span>
                <span>{formatCurrency(order.summary.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Service tax</span>
                <span>{formatCurrency(order.summary.serviceTax)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900 dark:border-slate-800 dark:text-white">
                <span>Total</span>
                <span>{formatCurrency(order.summary.total)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-lg bg-white p-4 shadow dark:bg-[#19191C]">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-[#5C67F7]" />
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Shipping
              </h2>
            </div>
            <div className="mt-3 space-y-1 text-sm text-slate-500 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">
                {address?.fullName || order.contact?.fullName || "Customer"}
              </p>
              {address && (
                <>
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {[address.city, address.state, address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p>{address.country}</p>
                </>
              )}
              <p className="pt-2">Method: {order.delivery?.method || "—"}</p>
              {order.delivery?.trackingNumber && (
                <p>Tracking: {order.delivery.trackingNumber}</p>
              )}
            </div>
          </section>

          <section className="rounded-lg bg-white p-4 shadow dark:bg-[#19191C]">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Payment
            </h2>
            <div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Method</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {order.payment?.method?.replaceAll("_", " ") || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {order.payment?.status || "PENDING"}
                </span>
              </div>
              {order.payment?.transactionId && (
                <div className="flex justify-between gap-4">
                  <span>Reference</span>
                  <span className="break-all text-right font-mono text-xs">
                    {order.payment.transactionId}
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
