import { useEffect, useState } from "react";
import Rate from "../Rate/Rate";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewService from "../../../services/common/ReviewService/ReviewService";
import { getApiErrorMessage } from "../../../services/api/errors";
import type { ProductReview } from "../../../types/ReviewType";

type ReviewProps = {
  productId: string;
  ratingAvg?: number;
  ratingCount?: number;
};

const Review = ({ productId, ratingAvg = 0, ratingCount = 0 }: ReviewProps) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    ReviewService.getProductReviews(productId)
      .then((response) => setReviews(response.data.reviews))
      .catch((error) => setMessage(getApiErrorMessage(error, "Could not load reviews.")))
      .finally(() => setLoading(false));
  }, [productId]);

  const submitReview = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      await ReviewService.createReview({ productId, rating, title, body });
      setTitle("");
      setBody("");
      setShowForm(false);
      setMessage("Your review was submitted and is waiting for approval.");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Could not submit your review."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-5 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold text-[#212B37] dark:text-white">
            Reviews & ratings
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {ratingAvg.toFixed(1)}
            </span>
            <Rate rating={ratingAvg} ratingCount={ratingCount} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((current) => !current)}
          className="rounded-lg bg-[#5C67F7] px-3 py-2 text-sm font-semibold text-white"
        >
          Leave a review
        </button>
      </div>

      {message && (
        <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={submitReview} className="space-y-3 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Rating
            <select
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>{value} star{value === 1 ? "" : "s"}</option>
              ))}
            </select>
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Review title"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Share your experience"
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#5C67F7] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit review"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
        {!loading && !reviews.length && (
          <p className="py-4 text-center text-sm text-slate-500">
            No approved reviews yet.
          </p>
        )}
        {loading && <p className="text-sm text-slate-500">Loading reviews…</p>}
      </div>
    </div>
  );
};

export default Review;
