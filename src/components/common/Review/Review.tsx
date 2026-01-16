import React from "react";
import TagBage from "../TagBage/TagBage";
import Rate from "../Rate/Rate";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import ReviewCard from "../ReviewCard/ReviewCard";

const Review = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6 p-4">
      <div className="w-full h-fit flex justify-between items-center">
        <div className="text-[#212B37] dark:text-white text-[15.2px] font-sans font-medium">
          {" "}
          Reviews & Ratings{" "}
        </div>
        <a
          href=""
          className="underline font-medium font-sans text-[14px] text-[#5C67F7]"
        >
          View More Reviews
        </a>
      </div>
      <div className="flex items-start gap-6 w-full">
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center gap-2 p-3 bg-[#F9F9FA] dark:bg-[#1f2937] rounded-md">
          <div className="text-[#212B37] dark:text-white text-[32px] font-sans font-medium ">4.2</div>
          <TagBage label="Very Good" classname="!w-fit"/>
          <Rate />
          <ButtonWithEmoji label="Leave Us a Review" btnClass="!w-full"/>
        </div>
        <div className="w-full md:w-2/3">
            <ReviewCard />
        </div>
      </div>
    </div>
  );
};

export default Review;
