import React from "react";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import DynamicTable from "../DynamicTable/DynamicTable";
import FeatureItemCard from "../FeatureItemCard/FeatureItemCard";

const FeatureCard = () => {
  return (
    <div className="w-full max-h-fit flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <div className="text-[#212B37] text-[15.2px] font-sans font-medium">
          Featured Products
        </div>
        <ButtonWithEmoji
          label="View All"
          btnClass="!min-w-fit hover:border hover:border-[#5C67F7] !bg-[#EFF1FE] !text-[12px] !text-[#5C67F7] hover:!bg-[#5C67F7] hover:!text-[#fff]"
        />
      </div>
      <div className="w-full h-fit">
        <FeatureItemCard />
        <FeatureItemCard />
        <FeatureItemCard />
        <FeatureItemCard />
        <FeatureItemCard />
      </div>
    </div>
  );
};

export default FeatureCard;
