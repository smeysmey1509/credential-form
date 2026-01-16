import React from "react";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import FeatureItemCard from "../FeatureItemCard/FeatureItemCard";

interface FeatureItem {
  productImg?: string;
  productName?: string;
  ratingProduct?: number;
  ratingCountProduct?: number;
  productCost?: number;
  compareAtPrice?: number;
  addToCart?: () => void;
}

interface FeatureCardProp {
  featureItems?: FeatureItem[];
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProp> = ({ featureItems = [], onClick }) => {
  return (
    <div className="w-full max-h-fit flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-[#212B37] dark:text-white text-[15.2px] font-sans font-medium">
          Featured Products
        </div>
        <ButtonWithEmoji
          label="View All"
          btnClass="!min-w-fit hover:border hover:border-[#5C67F7] !bg-[#EFF1FE] dark:!bg-[#1f2937] !text-[12px] !text-[#5C67F7] hover:!bg-[#5C67F7] hover:!text-[#fff]"
          onClick={onClick}
        />
      </div>

      {/* Product list */}
      <div className="w-full h-fit flex flex-col gap-2">
        {featureItems.length > 0 ? (
          featureItems.slice(0, 5).map((product, index) => (
            <FeatureItemCard
              key={index}
              productImg={product.productImg}
              productName={product.productName}
              ratingProduct={product.ratingProduct}
              ratingCountProduct={product.ratingCountProduct}
              productCost={product.productCost}
              compareAtPrice={product.compareAtPrice}
              addToCart={product.addToCart}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 text-sm py-4">
            No featured products available
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
