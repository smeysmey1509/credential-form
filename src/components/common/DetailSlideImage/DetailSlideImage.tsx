import React, { useState, useRef, useEffect } from "react";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { CgClose } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toAbs } from "../../../utils/image";

interface DetailSlideImageProp {
  onClose?: () => void;
  productName?: string;
  images?: string[];
}

const DetailSlideImage: React.FC<DetailSlideImageProp> = ({
  onClose,
  productName,
  images,
}) => {
  const slides =
    images && images.length > 0
      ? images
      : [
          "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/1.png",
          "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/2.png",
          "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/3.png",
          "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/4.png",
          "https://sprukomarket.com/products/html/bootstrap/xintra/dist/assets/images/ecommerce/png/5.png",
        ];

  // clone first and last slides for smooth loop
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  // start at first real slide
  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  //handle Smooth looping
  useEffect(() => {
    const total = slides.length;
    if (index === total + 1) {
      // Jump to first real slide without animation
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(1);
      }, 700);
    } else if (index === 0) {
      // Jump to last real slide without animation
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(total);
      }, 700);
    }
  }, [index]);

  useEffect(() => {}, []);

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-[rgba(0,0,0,0.85)] overflow-hidden">
      {/* Slide Container */}
      <div
        ref={transitionRef}
        className={`flex w-full h-full ${
          isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {extendedSlides.map((src, i) => (
          <div
            key={i}
            className="min-w-full flex justify-center items-center flex-col"
          >
            <img
              src={toAbs(src)}
              alt={`Slide ${i + 1}`}
              className="max-h-[calc(100vh-100px)] object-contain rounded-lg shadow-lg select-none"
            />
            <h4 className="text-white font-sans text-sm mt-4 opacity-80">
              {`${productName || "Images Product"} ${
                ((index - 1 + slides.length) % slides.length) + 1
              } / ${slides.length}`}
            </h4>
          </div>
        ))}
      </div>

      {/* Controls */}
      <ButtonWithEmoji
        emoji={<CgClose className="text-xl" />}
        onClick={onClose}
        btnClass="absolute right-10 top-6 !opacity-70 !bg-[#FFFFFF0D] !min-w-0 !p-[10px] hover:!opacity-100"
      />
      <ButtonWithEmoji
        emoji={<IoIosArrowBack className="text-xl" />}
        onClick={handlePrev}
        btnClass="absolute left-10 top-1/2 transform -translate-y-1/2 !opacity-70 !bg-[#FFFFFF0D] !min-w-0 !p-[10px] hover:!opacity-100"
      />
      <ButtonWithEmoji
        emoji={<IoIosArrowForward className="text-xl" />}
        onClick={handleNext}
        btnClass="absolute right-10 top-1/2 transform -translate-y-1/2 !opacity-70 !bg-[#FFFFFF0D] !min-w-0 !p-[10px] hover:!opacity-100"
      />
    </div>
  );
};

export default DetailSlideImage;
