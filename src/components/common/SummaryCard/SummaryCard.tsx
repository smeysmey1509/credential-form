import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const SummaryCard = () => {
  return (
    <div className="w-full h-fit flex items-center">
      <span className="w-[3rem] h-[3rem] leading-[3rem] bg-[#F9F9FA] dark:bg-[#1f2937] flex justify-center items-center rounded">
        <img
          src="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/9.png"
          alt=""
        />
      </span>
      <div className="flex-[1_1_auto] flex-col items-center justify-between ml-2">
        <p className="font-semibold text-[13px] font-sans text-[#212B37] dark:text-white">
          Versatile Hoodie
        </p>
        <p className="font-medium text-[0.75rem] font-sans text-[#6e829f] dark:text-[#cbd5f5]">
          Quantity : 2{" "}
          <span className="ml-3 bg-[rgba(33,206,158,0.1)] text-[rgba(33,206,158)] rounded text-[11px] py-[0.25rem] px-[0.45rem]">
            30% Off
          </span>{" "}
        </p>
      </div>
      <div className="w-fit h-full flex flex-col justify-between items-end">
        <p className="font-semibold font-sans text-[#6e829f] dark:text-[#cbd5f5] cursor-pointer">
          <IoCloseOutline />
        </p>
        <p className="font-semibold text-[14px] font-sans text-[#212B37] dark:text-white">
          $189
          <s className="font-medium ms-1 text-[11px] font-sans text-[#6e829f] dark:text-[#cbd5f5]">
            $329
          </s>{" "}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
