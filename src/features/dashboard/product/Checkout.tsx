import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdOutlineCheckCircleOutline,
  MdOutlineLocalShipping,
  MdPayment,
} from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import FormInput from "../../../components/common/FormField/FormField";
import CartService, {
  CART_UPDATED_EVENT,
} from "../../../services/common/CartService/CartService";
import CheckoutService from "../../../services/common/CheckoutService/CheckoutService";
import DeliveryService from "../../../services/common/DeliveryService/deliveryService";
import { getApiErrorMessage } from "../../../services/api/errors";
import type { ICart } from "../../../types/CartType";
import type { DeliveryType } from "../../../types/DeliveryType";
import type {
  CheckoutResponse,
  PaymentMethod,
} from "../../../types/OrderType";
import { formatCurrency } from "../../../utils/currency";
import { getPrimaryUrl } from "../../../utils/image";
import { getCookie } from "../../../utils/cookie";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
};

const paymentOptions: Array<{
  value: PaymentMethod;
  label: string;
  description: string;
}> = [
  {
    value: "VISA_MASTER",
    label: "Credit / debit card",
    description: "Continue with the card checkout created by the payment gateway.",
  },
  {
    value: "CASH_ON_DELIVERY",
    label: "Cash on delivery",
    description: "Pay when your order is delivered.",
  },
  {
    value: "BANK_TRANSFER",
    label: "Bank transfer",
    description: "Receive transfer instructions with your payment.",
  },
  {
    value: "NORMAL_PAYMENT",
    label: "Normal payment",
    description: "Use the standard payment flow configured by the API.",
  },
];

const emptyForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  notes: "",
};

const Checkout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState<ICart | null>(null);
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryType[]>([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>("VISA_MASTER");
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [result, setResult] = useState<CheckoutResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const tabs = [
    { label: "Shipping", icon: <MdOutlineLocalShipping /> },
    { label: "Personal Details", icon: <BsPerson /> },
    { label: "Payment", icon: <MdPayment /> },
    { label: "Complete Order", icon: <MdOutlineCheckCircleOutline /> },
  ];

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const refreshCart = async () => {
    const response = await CartService.getCart();
    setCart(response.data);
    return response.data;
  };

  useEffect(() => {
    const rawUser = getCookie("user");
    if (rawUser) {
      try {
        const user = JSON.parse(rawUser) as {
          name?: string;
          email?: string;
        };
        setForm((current) => ({
          ...current,
          fullName: user.name || current.fullName,
          email: user.email || current.email,
        }));
      } catch {
        // The form remains editable when the cached user value is invalid.
      }
    }

    Promise.all([refreshCart(), DeliveryService.getDeliveryMethods()])
      .then(([cartData, methods]) => {
        const activeMethods = methods.filter((method) => method.isActive);
        setDeliveryMethods(activeMethods);
        setSelectedMethod(
          cartData.delivery?.method || activeMethods[0]?.method || ""
        );
      })
      .catch((requestError) => setError(getApiErrorMessage(requestError)))
      .finally(() => setLoading(false));
  }, []);

  const selectedDelivery = useMemo(
    () =>
      deliveryMethods.find(
        (method) => method.method.toLowerCase() === selectedMethod.toLowerCase()
      ),
    [deliveryMethods, selectedMethod]
  );

  const selectDelivery = async (method: DeliveryType) => {
    setSelectedMethod(method.method);
    setError("");
    try {
      await CartService.selectDeliveryMethod(method.method);
      await refreshCart();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  };

  const continueFromShipping = () => {
    if (!selectedMethod || !form.line1.trim() || !form.country.trim()) {
      setError("Choose a delivery method and enter your address and country.");
      return;
    }
    setError("");
    setActiveTab(1);
  };

  const continueFromContact = () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Full name, email, and phone are required.");
      return;
    }
    setError("");
    setActiveTab(2);
  };

  const submitOrder = async () => {
    if (!cart?.items.length) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await CheckoutService.checkout({
        deliveryMethod: selectedMethod,
        contact: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
        shippingAddress: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          line1: form.line1.trim(),
          line2: form.line2.trim() || undefined,
          city: form.city.trim() || undefined,
          state: form.state.trim() || undefined,
          postalCode: form.postalCode.trim() || undefined,
          country: form.country.trim(),
        },
        paymentMethod: selectedPayment,
        currency: "USD",
        notes: form.notes.trim() || undefined,
      });
      setResult(response.data);
      setCart((current) =>
        current
          ? {
              ...current,
              items: [],
              summary: {
                subTotal: 0,
                discount: 0,
                deliveryFee: 0,
                serviceTax: 0,
                total: 0,
              },
            }
          : current
      );
      window.dispatchEvent(new Event(CART_UPDATED_EVENT));
      setActiveTab(3);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Checkout failed."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-sm text-slate-500 shadow dark:bg-[#19191C] dark:text-slate-300">
        Loading your checkout…
      </div>
    );
  }

  return (
    <div className="flex h-fit w-full flex-col justify-between gap-4 xl:flex-row">
      <div className="flex h-fit w-full flex-col rounded-lg bg-white p-4 shadow dark:bg-[#19191C] xl:basis-9/12">
        <ul className="flex w-full overflow-x-auto rounded-t border border-b-0 border-dashed border-[#ecf3fb] bg-[#F9F9FA] dark:border-[#2d3748] dark:bg-[#1f2937] sm:justify-around">
          {tabs.map((tab, index) => (
            <li key={tab.label}>
              <button
                type="button"
                onClick={() => index <= activeTab && setActiveTab(index)}
                disabled={index > activeTab}
                className={`flex min-w-max items-center gap-2 border-b-2 p-3 text-[13px] font-semibold transition ${
                  activeTab === index
                    ? "border-[#5C67F7] text-[#5C67F7]"
                    : "border-transparent text-[#212b37] dark:text-slate-300"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {tab.icon}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </div>
        )}

        {activeTab === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-dashed border-[#ecf3fb] p-4 dark:border-[#2d3748]"
          >
            <h2 className="font-semibold text-[#212b37] dark:text-white">
              Shipping method
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {deliveryMethods.map((method) => (
                <label
                  key={method._id || method.method}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                    selectedMethod.toLowerCase() === method.method.toLowerCase()
                      ? "border-[#5C67F7] bg-[#5C67F7]/5"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {method.method}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Estimated {method.estimatedDays} day(s)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(method.baseFee)}
                    </span>
                    <input
                      type="radio"
                      name="delivery-method"
                      checked={
                        selectedMethod.toLowerCase() === method.method.toLowerCase()
                      }
                      onChange={() => selectDelivery(method)}
                    />
                  </div>
                </label>
              ))}
            </div>
            {!deliveryMethods.length && (
              <p className="mt-4 text-sm text-amber-600">
                No active delivery methods are available.
              </p>
            )}

            <h2 className="mt-6 font-semibold text-[#212b37] dark:text-white">
              Shipping address
            </h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <FormInput
                  label="Address line 1"
                  value={form.line1}
                  onChange={(event) => updateField("line1", event.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FormInput
                  label="Address line 2"
                  value={form.line2}
                  onChange={(event) => updateField("line2", event.target.value)}
                />
              </div>
              <FormInput
                label="City"
                value={form.city}
                onChange={(event) => updateField("city", event.target.value)}
              />
              <FormInput
                label="State / Province"
                value={form.state}
                onChange={(event) => updateField("state", event.target.value)}
              />
              <FormInput
                label="Postal code"
                value={form.postalCode}
                onChange={(event) => updateField("postalCode", event.target.value)}
              />
              <FormInput
                label="Country"
                value={form.country}
                onChange={(event) => updateField("country", event.target.value)}
                required
              />
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={continueFromShipping}
                className="rounded-lg bg-[#5C67F7] px-4 py-2 text-sm font-semibold text-white"
              >
                Continue to personal details
              </button>
            </div>
          </motion.section>
        )}

        {activeTab === 1 && (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-dashed border-[#ecf3fb] p-4 dark:border-[#2d3748]"
          >
            <h2 className="font-semibold text-[#212b37] dark:text-white">
              Personal details
            </h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <FormInput
                label="Full name"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                required
              />
              <FormInput
                label="Phone"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
              />
              <div className="md:col-span-2">
                <FormInput
                  label="Email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FormInput
                  label="Order notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveTab(0)}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={continueFromContact}
                className="rounded-lg bg-[#5C67F7] px-4 py-2 text-sm font-semibold text-white"
              >
                Continue to payment
              </button>
            </div>
          </motion.section>
        )}

        {activeTab === 2 && (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-dashed border-[#ecf3fb] p-4 dark:border-[#2d3748]"
          >
            <h2 className="font-semibold text-[#212b37] dark:text-white">
              Payment method
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    selectedPayment === option.value
                      ? "border-[#5C67F7] bg-[#5C67F7]/5"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment-method"
                      checked={selectedPayment === option.value}
                      onChange={() => setSelectedPayment(option.value)}
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {option.label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Payment credentials are handled by the configured gateway and are
              not collected by this form.
            </p>
            <div className="mt-5 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveTab(1)}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={submitOrder}
                disabled={submitting || !cart?.items.length}
                className="rounded-lg bg-[#5C67F7] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating order…" : "Place order"}
              </button>
            </div>
          </motion.section>
        )}

        {activeTab === 3 && result && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center border border-dashed border-[#ecf3fb] p-8 text-center dark:border-[#2d3748]"
          >
            <MdOutlineCheckCircleOutline className="text-7xl text-emerald-500" />
            <h2 className="mt-4 text-xl font-semibold text-emerald-600">
              Order created successfully
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Order <strong>#{result.order._id}</strong> is awaiting payment.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Payment reference: {result.payment.transactionId}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  navigate(`/dashboard/product/orderdetails/${result.order._id}`)
                }
                className="rounded-lg bg-[#5C67F7] px-4 py-2 text-sm font-semibold text-white"
              >
                View order
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/product/products")}
                className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <IoCartOutline /> Continue shopping
              </button>
            </div>
          </motion.section>
        )}
      </div>

      <aside className="h-fit w-full rounded-lg bg-white shadow dark:bg-[#19191C] xl:basis-3/12">
        <div className="border-b border-slate-100 p-4 dark:border-slate-800">
          <h2 className="font-semibold text-[#212B37] dark:text-white">
            Order summary
          </h2>
          {selectedDelivery && (
            <p className="mt-1 text-xs text-slate-500">
              {selectedDelivery.method} · {selectedDelivery.estimatedDays} day(s)
            </p>
          )}
        </div>
        <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
          {cart?.items.map((item) => (
            <li key={item._id || item.product._id} className="flex gap-3 p-4">
              <img
                src={getPrimaryUrl(
                  item.product.images || [],
                  item.product.primaryImageIndex
                )}
                alt={item.product.name}
                className="h-12 w-12 rounded bg-slate-50 object-contain dark:bg-slate-800"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {item.product.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.quantity} × {formatCurrency(item.product.price || 0)}
                </p>
              </div>
            </li>
          ))}
          {!cart?.items.length && (
            <li className="p-4 text-sm text-slate-500">Your cart is empty.</li>
          )}
        </ul>
        <div className="space-y-3 border-t border-slate-100 p-4 text-sm dark:border-slate-800">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>{formatCurrency(cart?.summary.subTotal || 0)}</span>
          </div>
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span>-{formatCurrency(cart?.summary.discount || 0)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Delivery</span>
            <span>{formatCurrency(cart?.summary.deliveryFee || 0)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Service tax</span>
            <span>{formatCurrency(cart?.summary.serviceTax || 0)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900 dark:border-slate-800 dark:text-white">
            <span>Total</span>
            <span>{formatCurrency(cart?.summary.total || 0)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Checkout;
