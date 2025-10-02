import React from "react";
import SearchBox from "../../../common/SearchBox/SearchBox";
import Filter from "../../../common/SelectionFilter/Filter";
import { IoArrowForward } from "react-icons/io5";
import WishlistItem from "../../../common/WishlistItem/WishlistItem";
import NumberPagination from "../../../common/Pagination/NumberPagination";

const Wishlist = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6">
      <div className="w-full h-fit bg-white p-4 shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded">
        <div className="w-full h-fit flex justify-between items-center">
          <div className="w-fit h-fit">
            <h4 className="font-semibold text-[15.2px] font-sans text-[#212B37]">
              My Wishlists
            </h4>
          </div>
          <div className="w-fit h-fit flex justify-center items-center gap-2">
            <SearchBox />
            <Filter />
          </div>
        </div>
        <div className="w-full h-fit mt-4">
          <div className="w-full h-fit flex justify-between items-center p-2 bg-[#F9F9FA] rounded">
            <p className="text-[0.9375rem] text-[#212B37] font-sans ml-2">
              Adding <span className="text-[#E354D4] font-bold">12 items</span>{" "}
              in your wishlist
            </p>
            <a
              href=""
              className="flex justify-center items-center gap-2 text-[#9E5Cf7] font-semibold text-[13.6px] bg-[rgba(158,92,247,0.1)] py-[6px] px-[12px] rounded"
            >
              Checkout All
              <IoArrowForward />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-fit grid grid-cols-2 gap-6">
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <NumberPagination />
      </div>
    </div>
  );
};

export default Wishlist;
