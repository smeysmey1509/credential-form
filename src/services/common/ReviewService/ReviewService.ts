import axiosClient from "../../api/axiosClient";
import type { ProductReview } from "../../../types/ReviewType";

const ReviewService = {
  getProductReviews: (productId: string) =>
    axiosClient.get<{ reviews: ProductReview[] }>(
      `/products/${productId}/reviews`
    ),

  createReview: (payload: {
    productId: string;
    rating: number;
    title?: string;
    body?: string;
  }) =>
    axiosClient.post<{ msg: string; review: ProductReview }>(
      "/reviews",
      payload
    ),
};

export default ReviewService;
