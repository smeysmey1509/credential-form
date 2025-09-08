import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import { BiSolidCartAdd } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { ImContrast } from "react-icons/im";
import CardButton from "../Button/CardButton/CardButton";
import Rate from "../Rate/Rate";
import { Product, ProductVariant } from "../../../types/ProductType";

interface ProductCardProps {
  product: Product;
  productVariant?: ProductVariant;
  userClick?: {
    addToCart: () => void;
    quickView: () => void;
    addToWishlist: () => void;
    compare: () => void;
  };
}

const fmt = (n?: number) =>
  typeof n === "number" ? `$${n}` : "";

function getPrimaryImageURL(p: Product, v?: ProductVariant): string {
  // 1) backend virtual (if present)
  if (p.primaryImage) return p.primaryImage;

  // 2) product.images[primaryImageIndex] -> images[0]
  const idx =
    typeof p.primaryImageIndex === "number" && p.primaryImageIndex >= 0
      ? p.primaryImageIndex
      : 0;
  const prodImg = p.images?.[idx] ?? p.images?.[0];

  // 3) fallback to variant first image (if provided)
  const varImg = v?.images?.[0];

  // final fallback: empty string (no image)
  return prodImg || varImg || "";
}

export default function ProductCard({ product, productVariant, userClick }: ProductCardProps) {
  const imgSrc = getPrimaryImageURL(product, productVariant);

  return (
    <div className="group/card flex flex-col shadow rounded">
      <div className="w-full h-full p-2 border-b border-b-gray-200 border-dashed">
        <div className="relative w-full h-full rounded bg-[#E9EAF7] transition-colors duration-300 ease-out group-hover/card:bg-[#DBDCF7]">
          {imgSrc ? (
            <img src={`http://localhost:5002${imgSrc}`} alt={product.name} className="w-full h-[250px] object-contain" />
          ) : (
            <div className="w-full h-[250px] flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <div className="w-fit flex items-center gap-1 bg-[#0EA5E8] px-2 py-[1px] rounded">
              <BsLightningCharge className="text-white text-[11px]" />
              <p className="text-[11px] font-bold text-white">New Arrival</p>
            </div>
            {product.discountPercent && product.discountPercent > 0 ? (
              <div className="w-fit bg-[#ff8e6f] font-bold text-white text-[11px] px-2 py-[1px] rounded">
                {product.discountPercent}% Off
              </div>
            ) : null}
          </div>

          <div className="absolute bottom-2 right-2">
            <CardButton
              label={<BiSolidCartAdd className="text-[18px]" />}
              tooltip="Add to Cart"
              onClick={userClick?.addToCart}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0 delay-100">
              <CardButton
                label={<LuSearch className="text-[14px]" />}
                tooltip="Quick View"
                classname="!bg-[#6D71EC]"
                onClick={userClick?.quickView}
              />
            </div>
            <div className="opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0 delay-200">
              <CardButton
                label={<FaRegHeart className="text-[14px]" />}
                tooltip="Add to Wishlist"
                classname="!bg-[#E056CD]"
                onClick={userClick?.addToWishlist}
              />
            </div>
            <div className="opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0 delay-300">
              <CardButton
                label={<ImContrast className="text-[14px]" />}
                tooltip="Compare"
                classname="!bg-[#0D99DB]"
                onClick={userClick?.compare}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded">
        <h6 className="font-bold text-[1.1rem] text-[#0A0A0A]">
          <a href="#" className="decoration-none">
            {product.name || "Product Name"}
          </a>
        </h6>

        <div className="flex justify-between items-center mt-1">
          <Rate rating={product?.ratingAvg} ratingCount={product?.ratingCount} />
          <p className="font-bold text-[#5C67F7] text-[20px]">
            {fmt(product?.defaultPrice) || "$0.00"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#E354D4] text-[0.8125rem] font-semibold">
            {product.brand ?? ""}
          </p>
          <p className="font-bold text-[#6e829f] text-[0.8125rem] line-through">
            {fmt(product?.compareAtPrice)}
          </p>
        </div>
      </div>
    </div>
  );
}
