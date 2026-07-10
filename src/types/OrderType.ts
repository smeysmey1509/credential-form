export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED"
  | "FAILED"
  | Lowercase<
      | "PENDING"
      | "PROCESSING"
      | "PAID"
      | "SHIPPED"
      | "DELIVERED"
      | "CANCELLED"
      | "REFUNDED"
      | "FAILED"
    >;

export type PaymentMethod =
  | "NORMAL_PAYMENT"
  | "VISA_MASTER"
  | "BANK_TRANSFER"
  | "CASH_ON_DELIVERY";

export interface CheckoutContact {
  fullName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress extends CheckoutContact {
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: string;
  type?: string;
  isDefault?: boolean;
}

export interface CheckoutPayload {
  deliveryMethod?: string;
  deliveryMethodId?: string;
  contact: CheckoutContact;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  currency?: string;
  notes?: string;
}

export interface OrderItem {
  product: string;
  productId?: string;
  name: string;
  slug?: string;
  image?: string;
  price: number;
  unitPrice?: number;
  totalPrice?: number;
  quantity: number;
}

export interface OrderSummary {
  subTotal: number;
  discount: number;
  deliveryFee: number;
  serviceTax: number;
  total: number;
  taxRate: number;
  promoCode?: string | null;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  status: OrderStatus;
  statusHistory?: Array<{
    status: OrderStatus;
    message?: string;
    updatedAt?: string | null;
  }>;
  payment: {
    method?: PaymentMethod;
    status: string;
    transactionId?: string;
    currency?: string;
    paidAt?: string | null;
  };
  shippingAddress?: ShippingAddress;
  delivery?: {
    method: string;
    baseFee?: number;
    estimatedDays?: number;
    code?: string;
    trackingNumber?: string;
    estimatedDeliveryDate?: string | null;
  };
  contact?: CheckoutContact;
  notes?: string;
  summary: OrderSummary;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  order: string;
  method: PaymentMethod;
  status: string;
  amount: number;
  currency: string;
  transactionId: string;
  checkoutData?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutResponse {
  order: Order;
  payment: Payment;
}
