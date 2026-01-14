import React, { useEffect, useState } from "react";
import SearchBox from "../../../components/common/SearchBox/SearchBox";
import Filter from "../../../components/common/SelectionFilter/Filter";
import { IoArrowForward } from "react-icons/io5";
import WishlistItem from "../../../components/common/WishlistItem/WishlistItem";
import NumberPagination from "../../../components/common/Pagination/NumberPagination";
import { Product } from "../../../types/ProductType";
import type { Wishlist } from "../../../types/WishlistType";
import WishlistService from "../../../services/common/WishlistService/WishlistService";
import DetailPagination from "../../../components/common/Pagination/DetailPagination";
import CartService from "../../../services/common/CartService/CartService";
import { useToast } from "../../../context/ToasterContext";
import { title } from "process";

const Wishlist = () => {
  const [product, setProduct] = useState<Partial<Product>[]>([]);
  const [pagination, setPagination] = useState({
    totalItem: 0,
    totalPage: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const limit = 6;

  const { showToast } = useToast();

  useEffect(() => {
    handleFetchWishlist(pagination.currentPage);
  }, [pagination.currentPage]);

  const handleFetchWishlist = async (page?: number) => {
    try {
      const responseWishlist = await WishlistService?.getWishlist(page, limit);
      const wishlistProduct = responseWishlist?.data?.items?.map(
        (item: any) => item?.product
      );
      setProduct(wishlistProduct);

      setPagination({
        totalItem: responseWishlist?.data?.totalItems,
        totalPage: responseWishlist?.data?.totalPages,
        currentPage: responseWishlist?.data?.currentPage,
        hasNextPage: responseWishlist?.data?.hasNextPage,
        hasPrevPage: responseWishlist?.data?.hasPrevPage,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (id: string, name: string) => {
    try {
      await CartService?.addToCart(id);
      showToast({
        title: "Success",
        description: `${name} add to cart successfully.`,
        type: "success",
      });
    } catch (err) {
      showToast({
        title: "Failed",
        description: `${name} add to cart failed.`,
        type: "danger",
      });
    }
  };

  const handleRemoveWishlist = async (id: string, name: string) => {
    try{
      await WishlistService?.removeWishlist(id);
      showToast({
        title: "Delete Success",
        description: `${name} removed from wishlist.`,
        type: "warning",
      });
      handleFetchWishlist(pagination?.currentPage);
    }catch(err) {
      showToast({
        title: "Delete Failed",
        description: `${name} removed failed.`,
        type: "danger",
      });
    }
  }

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
              Adding{" "}
              <span className="text-[#E354D4] font-bold">
                {pagination?.totalItem} items
              </span>{" "}
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
        {product?.map((item: any) => (
          <WishlistItem
            product={item}
            addToCart={() => handleAddToCart(item?._id, item?.name)}
            deleteWishlist={() => handleRemoveWishlist(item?._id, item?.name)}
          />
        ))}
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <DetailPagination
          totalItems={pagination?.totalItem}
          totalPages={pagination?.totalPage}
          currentPage={pagination?.currentPage}
          hasNextPage={pagination?.hasNextPage}
          hasPrevPage={pagination?.hasPrevPage}
          limitPerPage={limit}
          onPageChange={(page) =>
            setPagination({ ...pagination, currentPage: page })
          }
        />
      </div>
    </div>
  );
};

export default Wishlist;
