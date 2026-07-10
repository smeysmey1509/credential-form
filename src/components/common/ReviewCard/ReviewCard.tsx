import Rate from "../Rate/Rate";
import type { ProductReview } from "../../../types/ReviewType";

const ReviewCard = ({ review }: { review: ProductReview }) => {
  const userName =
    typeof review.user === "object" ? review.user.name || "Customer" : "Customer";

  return (
    <article className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {userName}
          </p>
          <Rate rating={review.rating} />
        </div>
        {review.isVerifiedPurchase && (
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
            Verified purchase
          </span>
        )}
      </div>
      {review.title && (
        <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
          {review.title}
        </h3>
      )}
      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {review.body || review.comment || "No written review."}
      </p>
      {review.createdAt && (
        <p className="mt-3 text-xs text-slate-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      )}
    </article>
  );
};

export default ReviewCard;
