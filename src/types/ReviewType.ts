export interface ProductReview {
  _id: string;
  product: string;
  user: string | { _id?: string; name?: string };
  rating: number;
  title?: string;
  body?: string;
  comment?: string;
  isVerifiedPurchase?: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
  updatedAt?: string;
}
