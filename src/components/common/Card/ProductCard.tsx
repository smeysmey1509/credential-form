import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import { BiSolidCartAdd } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { ImContrast } from "react-icons/im";
import CardButton from "../Button/CardButton/CardButton";
import Rate from "../Rate/Rate";

const ProductCard = () => {
  return (
    <div className="group/card flex flex-col shadow rounded">
      <div className="w-full h-full p-2 border-b border-b-gray-200 border-dashed">
        <div
          className="
            relative w-full h-full rounded bg-[#E9EAF7]
            transition-colors duration-300 ease-out
            group-hover/card:bg-[#DBDCF7]
          "
        >
          <img
            src="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/28.png"
            alt=""
            className="w-full h-auto"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <div className="w-fit flex items-center gap-1 bg-[#0EA5E8] px-2 py-[1px] rounded">
              <BsLightningCharge className="text-white text-[11px]" />
              <p className="text-[11px] font-bold text-white">New Arrival</p>
            </div>
            <div className="w-fit bg-[#ff8e6f] font-bold text-white text-[11px] px-2 py-[1px] rounded">
              12% Off
            </div>
          </div>

          <div className="absolute bottom-2 right-2">
            <CardButton
              label={<BiSolidCartAdd className="text-[18px]" />}
              tooltip="Add to Cart"
              onClick={() => alert("Added to cart")}
            />
          </div>

          <div
            className="
              absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              flex items-center gap-2
            "
          >
            <div
              className="
                opacity-0 translate-y-3
                transition-all duration-300 ease-out
                group-hover/card:opacity-100 group-hover/card:translate-y-0
                delay-100
              "
            >
              <CardButton
                label={<LuSearch className="text-[14px]" />}
                tooltip="Quick View"
                classname="!bg-[#6D71EC]"
                onClick={() => alert("Quick View")}
              />
            </div>

            <div
              className="
                opacity-0 translate-y-3
                transition-all duration-300 ease-out
                group-hover/card:opacity-100 group-hover/card:translate-y-0
                delay-200
              "
            >
              <CardButton
                label={<FaRegHeart className="text-[14px]" />}
                tooltip="Add to Wishlist"
                classname="!bg-[#E056CD]"
                onClick={() => alert("Added to Wishlist")}
              />
            </div>

            <div
              className="
                opacity-0 translate-y-3
                transition-all duration-300 ease-out
                group-hover/card:opacity-100 group-hover/card:translate-y-0
                delay-300
              "
            >
              <CardButton
                label={<ImContrast className="text-[14px]" />}
                tooltip="Compare"
                classname="!bg-[#0D99DB]"
                onClick={() => alert("Compare")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded">
        <h6 className="font-bold text-[1.1rem] text-[#0A0A0A]">
          <a href="#" className="decoration-none">
            Lightweight Sneakers
          </a>
        </h6>
        <div className="flex justify-between items-center mt-1">
          <Rate rating={2.5} />
          <p className="font-bold text-[#5C67F7] text-[20px]">$99.99</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#E354D4] text-[0.8125rem] font-semibold">
            Stealth Series
          </p>
          <p className="font-bold text-[#6e829f] text-[0.8125rem] line-through">
            $800.99
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
