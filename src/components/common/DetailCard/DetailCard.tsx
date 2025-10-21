import React from "react";
import TagBage from "../TagBage/TagBage";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { FaCartPlus, FaRegCreditCard } from "react-icons/fa";
import { usePopup } from "../../../context/PopupContext";
import DetailSlideImage from "../DetailSlideImage/DetailSlideImage";

interface DetailCardProp {
  productName?: string;
  images?: string[];
  primaryImage?: string;
}

const DetailCard: React.FC<DetailCardProp> = ({ productName, images, primaryImage }) => {
  const { showPopup, hidePopup } = usePopup();
  return (
    <div className="w-full h-fit flex flex-col justify-between items-center">
      <div className="w-full h-fit p-4">
        <div
          className="relative group w-full h-[374px] flex flex-col justify-center items-center bg-[#EFF1FE] rounded-lg overflow-hidden cursor-pointer transition-colors duration-300 hover:bg-[#B1B3C1]"
          onClick={() =>
            showPopup(<DetailSlideImage onClose={hidePopup} images={images} productName={productName}/>)
          }
        >
          <TagBage label="Featured" classname="absolute top-3 left-3" />

          <img
            src={
              primaryImage
                ? `http://localhost:5002${primaryImage}`
                : "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
            }
            alt={
              primaryImage ||
              "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
            }
            className="w-fit h-fit transition-transform duration-500 group-hover:scale-100"
          />

          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               text-white font-semibold bg-[rgba(0,0,0,0.75)] text-[13px] font-sans 
               px-[1.25rem] py-[0.55rem] rounded opacity-0 scale-90 cursor-pointer 
               group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
          >
            View More Images
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex gap-2 flex-wrap justify-center border-t border-t-[#ecf3fb] p-[1rem]">
        <ButtonWithEmoji
          label="Buy Now"
          emoji={<FaRegCreditCard />}
          btnClass="px-[12px] py-[6px] text-[13.6px] text-center"
          onClick={() => alert("Buy Now")}
        />
        <ButtonWithEmoji
          label="Add to Cart"
          emoji={<FaCartPlus />}
          btnClass="px-[12px] py-[6px] !bg-[#E354D4] hover:!bg-[#E667D8] text-[13.6px] text-center"
          onClick={() => alert("Add to Cart")}
        />
      </div>
    </div>
  );
};

export default DetailCard;
