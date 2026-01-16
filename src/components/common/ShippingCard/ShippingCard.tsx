import React from "react";
import CheckBoxRedius from "../CheckBoxRedius/CheckBoxRedius";

interface ShippingCardProp {
  shipImg?: string;
  shipMethod?: string;
  shipDate?: string;
  shipPrice?: number;
  name?: string;
  checked?: boolean;
  onChange?: () => void;
}

const ShippingCard: React.FC<ShippingCardProp> = ({
  shipImg,
  shipMethod,
  shipDate,
  shipPrice,
  name,
  checked,
  onChange
}) => {
  return (
    <div className="w-full flex items-center border border-[#dee7f1] dark:border-[#374151] p-[10px] rounded">
      <div className="w-[40px] h-[40px] mr-2">
        <img src={shipImg} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="w-full">
        <p className="font-semibold text-[13px] font-sans text-[#212B37] dark:text-white">
          {shipMethod}
        </p>
        <p className="font-semibold text-[11px] font-sans text-[#6e829f] dark:text-[#cbd5f5]">
          {shipDate}
        </p>
      </div>
      <p className="text-[#212B37] dark:text-white font-sans text-[13px] font-bold mr-4">
        ${shipPrice}
      </p>
      <CheckBoxRedius name={name} checked={checked} onChange={onChange}/>
    </div>
  );
};

export default ShippingCard;
