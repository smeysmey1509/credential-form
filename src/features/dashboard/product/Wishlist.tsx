import React, { useEffect, useState } from "react";
import SearchBox from "../../../components/common/SearchBox/SearchBox";
import Filter from "../../../components/common/SelectionFilter/Filter";
import { IoArrowForward } from "react-icons/io5";
import WishlistItem from "../../../components/common/WishlistItem/WishlistItem";
import { Product } from "../../../types/ProductType";
import type { WishlistItem as WishlistItemType } from "../../../types/WishlistType";
import WishlistService from "../../../services/common/WishlistService/WishlistService";
import DetailPagination from "../../../components/common/Pagination/DetailPagination";
import { useToast } from "../../../context/ToasterContext";

const Wishlist = () => {
  const [product, setProduct] = useState<Product[]>([]);
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
      const responseWishlist = await WishlistService.getWishlist(page, limit);
      const wishlistProduct = responseWishlist?.data?.items?.map(
        (item: WishlistItemType) => item.product
      ) || [];
      setProduct(wishlistProduct);

      setPagination({
        totalItem: responseWishlist.data.totalItems ?? 0,
        totalPage: responseWishlist.data.totalPages ?? 0,
        currentPage: responseWishlist.data.currentPage ?? page ?? 1,
        hasNextPage: responseWishlist.data.hasNextPage ?? false,
        hasPrevPage: responseWishlist.data.hasPrevPage ?? false,
      });
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  };

  const handleAddToCart = async (id: string, name: string) => {
    try {
      await WishlistService.moveToCart(id);
      showToast({
        title: "Success",
        description: `${name} moved to cart successfully.`,
        type: "success",
      });
      handleFetchWishlist(pagination.currentPage);
    } catch {
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
    } catch {
      showToast({
        title: "Delete Failed",
        description: `${name} removed failed.`,
        type: "danger",
      });
    }
  }

  return (
    <div className="w-full h-fit flex flex-col gap-6">
      <div className="h-fit w-full rounded bg-white p-4 shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] dark:bg-[#19191C]">
        <div className="flex h-fit w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-fit h-fit">
            <h4 className="font-semibold text-[15.2px] font-sans text-[#212B37] dark:text-white">
              My Wishlists
            </h4>
          </div>
          <div className="flex h-fit w-full items-center justify-start gap-2 sm:w-fit sm:justify-center">
            <SearchBox />
            <Filter />
          </div>
        </div>
        <div className="w-full h-fit mt-4">
          <div className="flex h-fit w-full flex-col gap-3 rounded bg-[#F9F9FA] p-2 dark:bg-[#1f2937] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9375rem] text-[#212B37] dark:text-white font-sans ml-2">
              Adding{" "}
              <span className="text-[#E354D4] font-bold">
                {pagination?.totalItem} items
              </span>{" "}
              in your wishlist
            </p>
            <a
              href=""
              className="flex w-fit items-center justify-center gap-2 rounded bg-[rgba(158,92,247,0.1)] px-[12px] py-[6px] text-[13.6px] font-semibold text-[#9E5Cf7] dark:bg-[rgba(158,92,247,0.2)]"
            >
              Checkout All
              <IoArrowForward />
            </a>
          </div>
        </div>
      </div>
      <div className="grid h-fit w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {product.map((item) => (
          <WishlistItem
            key={item?._id}
            product={item}
            addToCart={() => item._id && handleAddToCart(item._id, item.name)}
            deleteWishlist={() =>
              item._id && handleRemoveWishlist(item._id, item.name)
            }
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
