import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface RateProps {
  rating?: number;
  ratingCount?: number;
  max?: number;
}

const Rate: React.FC<RateProps> = ({ rating, max = 5, ratingCount }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (rating && rating >= i) {
      // full star
      stars.push(<BsStarFill key={i} className="text-yellow-400 text-[12px]" />);
    } else if (rating && rating >= i - 0.5) {
      // half star
      stars.push(<BsStarHalf key={i} className="text-yellow-400 text-[12px]" />);
    } else {
      // empty star
      stars.push(<BsStar key={i} className="text-gray-300 text-[12px]" />);
    }
  }

  return <div className="flex items-center gap-[2px]">{stars}{<p className="text-[12px] text-[#8D9DB3] ml-1">({ratingCount || 0}) Ratings</p>}</div>;
};

export default Rate;
