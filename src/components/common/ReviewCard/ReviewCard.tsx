import React from "react";
import TagBage from "../TagBage/TagBage";
import Rate from "../Rate/Rate";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const ReviewCard = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <div className="flex justify-center items-center">
        <div className="flex flex-auto items-center gap-2">
          <span className="w-[30px] h-[30px]">
            <img
              src="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/faces/1.jpg"
              alt=""
              className="w-full h-full rounded-[50%]"
            />
          </span>
          <p className="flex flex-auto items-center gap-2 text-[#212B37] dark:text-white text-[14px] font-sans font-semibold">
            Phillip John <Rate rating={1} ratingCount={1.2} max={1} />
          </p>
        </div>
        <div className="flex items-center">
          <TagBage label="Verified Purchase" classname="!bg-[#21CE9E]" />
        </div>
      </div>
      <div className="flex-auto items-center">
        <p className="text-[#212B37] dark:text-white text-[13px] font-sans font-semibold">
          Powerful Performance, Stunning Display!
        </p>
        <p className="text-[#212B37] dark:text-[#cbd5f5] text-[11px] font-sans font-normal">
          The TechPro X15 Elite - 2024 Edition is a powerhouse! The 4K UHD
          touchscreen display is stunning.vgwrggerrb grgrgerg{" "}
        </p>
      </div>
      <div className="flex flex-auto justify-between items-center">
        <div className="w-full flex items-center gap-1">
          <a href="">
            <img
              src="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/34.png"
              alt=""
              className="w-[50px] h-[50px] bg-[rgba(92,103,247,0.1)] rounded"
            />
          </a>
          <a href="">
            <img
              src="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/33.png"
              alt=""
              className="w-[50px] h-[50px] bg-[rgba(92,103,247,0.1)] rounded"
            />
          </a>
        </div>
        <div className="w-full flex justify-end items-center gap-2">
          <ButtonWithEmoji
            label="Report abuse"
            btnClass="!min-w-fit !bg-[#F9F9FA] dark:!bg-[#1f2937] hover:!bg-[#F2F2F3] dark:hover:!bg-[#111827] !text-[#212b37] dark:!text-[#e5e7eb] !text-[12px] !font-sans !font-medium"
          />
          <ButtonWithEmoji
            emoji={<AiOutlineLike />}
            btnClass="!min-w-fit !bg-[#EFF1FE] !text-[12px] !text-[#5C67F7] hover:!bg-[#5C67F7] hover:!text-[#fff] !p-2"
          />
          <ButtonWithEmoji
            emoji={<AiOutlineDislike />}
            btnClass="!min-w-fit !bg-[#EFF1FE] !text-[12px] !text-[#5C67F7] hover:!bg-[#5C67F7] hover:!text-[#fff] !p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
