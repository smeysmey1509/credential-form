import React, { useEffect, useRef, useState } from "react";
import DetailCard from "../../../common/DetailCard/DetailCard";
import DetailCardInformation from "../../../common/DetailCardInformation/DetailCardInformation";
import Tabs from "../../../common/Tabs/Tabs";
import Review from "../../../common/Review/Review";
import FeatureCard from "../../../common/FeatureCard/FeatureCard";
import ProductCard from "../../../common/Card/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../../../services/common/ProductService/ProductService";
import { Product } from "../../../../types/ProductType";
import CartService from "../../../../services/common/CartService/CartService";

const ProductDetails = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [product, setProduct] = useState<Partial<Product>>({});
  const [colorList, setColorList] = useState<string[]>([]);
  const [storagesList, setStoragesList] = useState<string[]>([]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) handleFetchProductById(id);
  }, [id]);

  const relatedProducts = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
    { id: 6, name: "6" },
    { id: 7, name: "7" },
    { id: 8, name: "8" },
    { id: 9, name: "9" },
    { id: 10, name: "10" },
  ];

  // duplicate for seamless loop
  const looped = [...relatedProducts, ...relatedProducts, ...relatedProducts];
  const middleStart = relatedProducts.length; // start from middle copy

  // initial position in middle
  useEffect(() => {
    const container = sliderRef.current;
    if (container && container.children[middleStart]) {
      const card = container.children[middleStart] as HTMLElement;
      container.scrollLeft = card.offsetLeft;
      setIndex(middleStart);
    }
  }, []);

  const scrollTo = (newIndex: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.children[newIndex] as HTMLElement;
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setIndex(newIndex);
  };

  const handleNext = () => {
    let newIndex = index + 1;
    scrollTo(newIndex);
  };

  const handlePrev = () => {
    let newIndex = index - 1;
    scrollTo(newIndex);
  };

  // handle seamless reset when reaching edge
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;

    const maxIndex = looped.length - 1;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0;

    if (index <= 1) {
      // reached start → reset to middle
      const resetIndex = middleStart + 1;
      container.scrollLeft = cardWidth * resetIndex;
      setIndex(resetIndex);
    } else if (index >= maxIndex - 1) {
      // reached end → reset to middle
      const resetIndex = middleStart - 1;
      container.scrollLeft = cardWidth * resetIndex;
      setIndex(resetIndex);
    }
  };

  const handleFetchProductById = async (id: string) => {
    try {
      const responseProduct = await ProductService?.getProductById(id);

      // ✅ Extract unique colors from variants
      const listColor = [
        ...new Set(
          responseProduct?.data?.variants
            ?.map((v: any) => v?.attributes?.color)
            ?.filter((c: string | undefined): c is string => Boolean(c))
        ),
      ];

      const listStorage = [
        ...new Set(
          responseProduct?.data?.variants
            ?.map((v: any) => v?.attributes?.storage)
            ?.filter((c: string | undefined): c is string => Boolean(c))
        ),
      ];
      setColorList(listColor);
      setStoragesList(listStorage);
      setProduct(responseProduct?.data || {});
    } catch (err) {
      console.error("Err Fetch Pooduct BY ID", err);
    }
  };

  const handleAddToCart = async (id: string): Promise<void> => {
    try {
      const responseAddToCart = await CartService.addToCart(id);
      console.log("Add to cart response:", responseAddToCart);
      navigate("/dashboard/product/cart");
    } catch (err) {
      console.log(err);
    }
  };

  const list = ["1GB", "2GB", "3GB", "4GB"];
  const colors = [
    {
      name: "Midnight Black",
      hex: "[#011635]",
      bgClass: "bg-[#011635]",
      ringClass: "ring-[#011635]",
    },
    {
      name: "Gray",
      hex: "gray",
      bgClass: "bg-gray-500",
      ringClass: "ring-gray-400",
    },
    {
      name: "Red",
      hex: "red",
      bgClass: "bg-red-500",
      ringClass: "ring-red-400",
    },
    {
      name: "Green",
      hex: "green",
      bgClass: "bg-green-500",
      ringClass: "ring-green-400",
    },
    {
      name: "Yellow",
      hex: "yellow",
      bgClass: "bg-yellow-500",
      ringClass: "ring-yellow-400",
    },
  ];

  console.log("listStorage", storagesList);

  return (
    <div className="w-full h-fit">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded">
          <DetailCard
            productName={product?.name}
            images={product?.images}
            primaryImage={product?.primaryImage}
          />
        </div>
        <div className="col-span-3 col-start-3 bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded">
          <DetailCardInformation
            productName={product?.name}
            ratingAvg={product?.ratingAvg}
            ratingCount={product?.ratingCount}
            cost={product?.cost}
            compareAtPrice={product?.compareAtPrice}
            description={product?.description}
            storageList={storagesList}
            colorList={colors}
            onCompare={() => alert("Compare")}
            onAddToCart={() => handleAddToCart(id || "")}
          />
        </div>
        <div className="col-span-3 row-start-2 bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded">
          <Tabs />
        </div>
        <div className="col-span-2 row-span-2 col-start-4 row-start-2 bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded">
          <FeatureCard />
        </div>
        <div className="col-span-3 row-start-3 bg-white shadow-[0px_6px_16px_2px_rgba(0,0,0,0.05)] rounded">
          <Review />
        </div>
      </div>
      <h5 className="text-[#212b37] font-sans font-semibold text-[20px] mt-4">
        Related Products
      </h5>
      <span className="text-[212b37] font-sans font-normal text-[13px]">
        Explore more products similar to this one, dolore magna aliqua.
      </span>
      <div className="relative w-full h-fit mt-4">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full p-2 hover:bg-gray-50 cursor-pointer"
        >
          <IoIosArrowBack className="text-gray-700 text-lg" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-hidden gap-5 scrollbar-hide scroll-smooth"
        >
          {looped.map((product, i) => (
            <div
              key={`${product.id}-${i}`}
              className="flex-shrink-0 w-[19%] bg-white rounded"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full p-2 hover:bg-gray-50 cursor-pointer"
        >
          <IoIosArrowForward className="text-gray-700 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
