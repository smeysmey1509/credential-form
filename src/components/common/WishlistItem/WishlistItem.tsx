import React, { useState } from "react";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaRegBookmark } from "react-icons/fa";
import Rate from "../Rate/Rate";
import { RiDeleteBin5Line } from "react-icons/ri";

const WishlistItem = () => {
  const [stock, setStock] = useState<boolean>(true);
  return (
    <div className="w-full h-fit flex gap-2 p-4 bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded-lg">
      <div className="w-fit h-fit">
        <div className="w-[110px] h-[100px] bg-[#EFF1FE] rounded">
          <a href="">
            <img
              src="https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/29.png"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="w-full h-fit ml-3">
        <div className="w-full h-fit flex justify-between">
          <div className="w-full h-fit flex flex-col">
            <h6 className="text-[0.875rem] font-medium text-[#0A0A0A] font-sans">
              <a href="">Ladies' Slim Bag</a>
            </h6>
            <span className="text-[#21CE9E] text-[13px] font-normal font-sans">
              {stock ? "In Stock" : "Out Of Stock"}
            </span>
            <div className="flex items-baseline gap-2">
              <h6 className="font-sans text-[22px] text-[#212B37] font-semibold">
                $251
              </h6>
              <p className="font-bold text-[#6e829f] text-[0.8125rem] font-sans line-through">
                $333
              </p>
              <span className="w-fit h-fit bg-[#ff8e6f] font-bold text-white text-[11px] px-2 py-[1px] rounded">
                30% Off
              </span>
            </div>
          </div>
          <div className="w-fit h-fit p-[6px] bg-[#FFF0F6] hover:bg-[#FF5D9F] text-[#FF5D9F] text-xl hover:text-[#fff] cursor-pointer rounded">
            <RiDeleteBin5Line />
          </div>
        </div>
        <div className="w-full h-fit flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <ButtonWithEmoji
              label="Add Cart"
              emoji={<HiOutlineShoppingCart />}
              onClick={() => alert("Save To Cart")}
            />
            <ButtonWithEmoji
              label="Save for Later"
              emoji={<FaRegBookmark />}
              btnClass="!bg-[#5C67F71A] hover:!bg-[#5C67F7] !text-[#5C67F7] hover:!text-[#fff]"
              onClick={() => alert("Save For Later")}
            />
          </div>
          <div className="flex items-center">
            <Rate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
