import React, { useState } from "react";
import Rate from "../Rate/Rate";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { RiCoupon2Line } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { TbBrightnessFilled } from "react-icons/tb";
import QuantityInput from "../QuantityInput/QuantityInput";
import { FaRegCreditCard } from "react-icons/fa";

interface ColorItem {
  name: string;
  hex?: string;
  bgClass?: string;
  ringClass?: string;
}

interface DetailCardInformationProp {
  productName?: string;
  ratingAvg?: number;
  ratingCount?: number;
  cost?: string;
  compareAtPrice?: number;
  discountPercent?: number;
  description?: string;
  storageList?: string[];
  colorList?: ColorItem[];
  onCompare?: () => void;
  onAddToCart?: () => void;
}

const DetailCardInformation: React.FC<DetailCardInformationProp> = ({
  productName,
  ratingAvg,
  ratingCount,
  cost,
  compareAtPrice,
  discountPercent,
  description,
  storageList = [],
  colorList = [],
  onCompare,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("Blue");

  return (
    <div className="w-full h-fit flex flex-col gap-4 p-4">
      <p className="text-[#212B37] dark:text-white text-[20px] font-sans font-semibold ">
        {productName}
      </p>
      <Rate rating={ratingAvg} ratingCount={ratingCount} />
      <div className="flex items-center gap-3">
        <p className="text-[#212B37] dark:text-white text-[32px] font-sans font-bold">
          ${cost}
        </p>
        <div className="flex flex-col justify-center">
          <p className="text-[#6e829f] dark:text-[#cbd5f5] text-[12px] font-sans font-semibold line-through">
            ${compareAtPrice}
          </p>
          <p className="text-[rgba(14,165,232)] text-[15px] font-san font-semibold">
            Don't Miss Out! Save Up to {discountPercent} OFF!
          </p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-[15px] font-semibold font-sans mb-1 text-[#212b37] dark:text-white">
          Description :
        </p>
        <p className="text-[#6e829f] dark:text-[#cbd5f5] text-[13px] mb-0">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3 items-center">
          <p className="text-[15px] font-semibold font-sans text-[#212b37] dark:text-white">
            Colors :
          </p>
          <p className="mb-0 flex items-center gap-2">
            {colorList?.map((color) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-4 h-4 rounded-full border-2 border-white cursor-pointer transition-all duration-200
        ${isSelected ? "ring-2" : "hover:ring-2"}
      `}
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: isSelected
                      ? `0 0 0 2px ${color.hex}80`
                      : undefined,
                  }}
                ></button>
              );
            })}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <p className="text-[15px] font-semibold font-sans text-[#212b37] dark:text-white">
              Storage :
            </p>
            {storageList?.map((item, index) => (
              <div
                key={index}
                className="text-[13.6px] rounded px-[0.75rem] py-[0.375rem] shadow-none font-medium bg-[rgba(249,249,250)] dark:bg-[#1f2937] hover:bg-[#F2F2F3] dark:hover:bg-[#111827] border border-[rgba(249,249,250)] dark:border-[#2d3748] text-[#212b37] dark:text-white font-sans transition cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <ButtonWithEmoji
            label="Get a Coupon"
            emoji={<RiCoupon2Line />}
            btnClass="!min-w-fit !bg-transparent !text-[#FF8F6F] underline"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <p className="flex justify-center items-center text-center gap-2 mb-1 text-[#21CE9E] py-1 px-2 bg-[#21CE9E1A] font-semibold rounded-full text-[12px] cursor-default">
          <FaCircleCheck />
          Instock
        </p>
        <p className="flex justify-center items-center text-center gap-2 mb-1 text-[#21CE9E] py-1 px-2 bg-[#21CE9E1A] font-semibold rounded-full text-[12px] cursor-default">
          <FaCircleCheck />
          Free Shipping
        </p>
        <p className="flex justify-center items-center text-center gap-2 mb-1 text-[#21CE9E] py-1 px-2 bg-[#21CE9E1A] font-semibold rounded-full text-[12px] cursor-default">
          <FaCircleCheck />
          Easy Return
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-[15px] font-semibold font-sans mb-1 text-[#212b37] dark:text-white">
          Quantity :
        </p>
        <QuantityInput
          value={1}
          min={1}
          max={9999}
          classname="!w-[180px] !rounded-lg"
        />
      </div>
      <div className="flex justify-end items-center gap-2 flex-wrap">
        {/* <div className="flex items-center gap-3 flex-shrink-0">
          <p className="text-[15px] font-semibold font-sans mb-1">Colors :</p>
          <p className="mb-0 flex items-center gap-2">
            {colors.map((color) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-5 h-5 rounded-full border-2 border-white cursor-pointer transition-all duration-200 
              bg-${color.base}-500 
              ${
                isSelected
                  ? `ring-2 ring-${color.base}-400`
                  : `hover:ring-2 hover:ring-${color.base}-400`
              }
            `}
                ></button>
              );
            })}
          </p>
        </div> */}
        <div className="flex items-center gap-2">
          <ButtonWithEmoji
            label="Compare"
            emoji={<TbBrightnessFilled />}
            btnClass="!min-w-fit  !text-[#5C67F7] border border-transparent hover:border hover:border-[#5C67F7] hover:!text-white !bg-[#5C67F71A] hover:!bg-[#5C67F7]"
            onClick={onCompare}
          />
          <ButtonWithEmoji
            label="Add to Wishlist"
            emoji={<FaRegCreditCard />}
            btnClass="border border-transparent"
            onClick={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCardInformation;
