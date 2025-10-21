import React from "react";
import Rate from "../Rate/Rate";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";

const FeatureItemCard = () => {
  return (
    <div className="w-full h-fit flex flex-auto items-center gap-2 py-2">
      <div className="w-[80px] h-[80px] rounded-sm bg-[#F7F7FE] leading-[5rem] p-2">
        <img
          src={
            "	https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/29.png"
          }
          alt={"No image available"}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <h4 className="text-[14px] text-[#0A0A0A] font-semibol font-bold">
          Ladies' Slim Bag
        </h4>
        <Rate rating={3.5} ratingCount={3} />
        <p className="font-semibold text-[18px] font-sans text-[#0A0A0A]">
          $1,099
          <s className="font-medium ms-2 text-[13px] font-sans text-[#6e829f]">
            $1,76
          </s>
        </p>
      </div>
      <div className="ms-auto">
        <ButtonWithEmoji label="Add to Cart" btnClass="!min-w-fit"/>
      </div>
    </div>
  );
};

export default FeatureItemCard;
