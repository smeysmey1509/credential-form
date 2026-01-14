import React from "react";
import Rate from "../Rate/Rate";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { DEFAULT_IMG, toAbs } from "../../../utils/image";

interface FeatureItemCardProp {
  productImg?: string;
  productName?: string;
  ratingProduct?: number;
  ratingCountProduct?: number;
  productCost?: number;
  compareAtPrice?: number;
  addToCart?: () => void;
}

const FeatureItemCard: React.FC<FeatureItemCardProp> = ({
  productImg,
  productName,
  ratingProduct,
  ratingCountProduct,
  productCost,
  compareAtPrice,
  addToCart,
}) => {
  return (
    <div className="w-full h-fit flex flex-auto items-center gap-2 py-2">
      <div className="w-[80px] h-[80px] rounded-sm bg-[#F7F7FE] leading-[5rem] p-2">
        <img
          src={
            productImg ? toAbs(productImg) : DEFAULT_IMG
          }
          alt={"No image available"}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <h4 className="text-[14px] text-[#0A0A0A] font-semibol font-bold">
          {productName}
        </h4>
        <Rate rating={ratingProduct} ratingCount={ratingCountProduct} />
        <p className="font-semibold text-[18px] font-sans text-[#0A0A0A]">
          ${productCost}
          <s className="font-medium ms-2 text-[13px] font-sans text-[#6e829f]">
            ${compareAtPrice}
          </s>
        </p>
      </div>
      <div className="ms-auto">
        <ButtonWithEmoji
          label="Add to Cart"
          btnClass="!min-w-fit"
          onClick={addToCart}
        />
      </div>
    </div>
  );
};

export default FeatureItemCard;
