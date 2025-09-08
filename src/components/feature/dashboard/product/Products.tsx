import React, { use, useEffect, useState } from "react";
import CategorySelect from "../../../common/CategorySelect/CategorySelect";
import PriceRange from "../../../common/PriceRange/PriceRange";
import {
  ProductVariant,
  Product,
  Inventory,
  Dimensions,
} from "../../../../types/ProductType";
import ProductService from "../../../../services/common/ProductService/ProductService";
import CartService from "../../../../services/common/CartService/CartService";
import ProductCard from "../../../common/Card/ProductCard";
import CategoryService from "../../../../services/common/Category/CategoryService";
import { CategoryStats, CategoryType } from "../../../../types/Category";
import { useNavigate } from "react-router-dom";
import SelectionFilter from "../../../common/SelectionFilter/SelectionFilter";

type SortKey = "" | "price_asc" | "price_desc";

const LABEL_TO_SORT: Record<string, SortKey> = {
  "Price Low to High": "price_asc",
  "Price High to Low": "price_desc",
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    CategoryStats["categories"] | undefined
  >([]);
  const [sortBy, setSortBy] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let res;
        switch (sortBy) {
          case "price_asc":
            res = await ProductService.priceLowToHigh();
            setProducts((res?.data as Product[]) || []);
            break;
          case "price_desc":
            res = await ProductService.priceHighToLow();
            setProducts((res?.data as Product[]) || []);
            break;
          default:
            res = await ProductService.getAllProducts();
        }
        setProducts((res?.data as Product[]) || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [sortBy]);

  useEffect(() => {
    (async () => {
      const responseCategories = await CategoryService.getAllCategories();
      setCategories(responseCategories?.data?.categories || []);
    })();
  }, []);

  const categoriess = [
    { id: "c1", name: "Electronics" },
    { id: "c2", name: "Clothing" },
    { id: "c3", name: "Kitchen" },
    { id: "c4", name: "Books" },
    { id: "c5", name: "Toys" },
    { id: "c6", name: "Sports" },
    { id: "c7", name: "Beauty" },
    { id: "c8", name: "Health" },
  ];

  const discount = [
    { id: "d1", name: "10% off", value: 10 },
    { id: "d2", name: "20% off", value: 20 },
    { id: "d3", name: "30% off", value: 30 },
    { id: "d4", name: "40% off", value: 40 },
    { id: "d5", name: "50% off", value: 50 },
  ];

  const brand = [
    { id: "b1", name: "Brand A" },
    { id: "b2", name: "Brand B" },
    { id: "b3", name: "Brand C" },
    { id: "b4", name: "Brand D" },
    { id: "b5", name: "Brand E" },
  ];

  const sizes = [
    { id: "s1", name: "Small" },
    { id: "s2", name: "Medium" },
    { id: "s3", name: "Large" },
    { id: "s4", name: "X-Large" },
    { id: "s5", name: "XX-Large" },
    { id: "s6", name: "XXX-Large" },
    { id: "s7", name: "XXXX-Large" },
  ];

  const handleSortChange = (label: string) => {
    const key = LABEL_TO_SORT[label] ?? "";
    setSortBy(key);
    console.log("Selected sort:", label, "→", key);
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const responseAddToCart = await CartService.addToCart(productId);
      console.log("Add to cart response:", responseAddToCart);
      navigate("/dashboard/product/cart");
    } catch (err) {
      console.log(err);
    }
  };

  console.log("products", products);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-6">
      <div className="flex justify-between items-center p-[16px] bg-white shadow rounded-lg">
        <div className="flex justify-between">
          <h6 className="text-[16px] text-[#212B37] font-bold rounded-full">
            Total{" "}
            <span className="text-[16px] text-[#E354D4] font-bold">
              {products.length}
            </span>{" "}
            Available
          </h6>
        </div>
        <div className="flex justify-between">
          <SelectionFilter onSortChange={handleSortChange} />
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-[75%] h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={index ?? product._id}
              product={product}
              userClick={{
                addToCart: () => handleAddToCart(product?._id || ""),
                quickView: () => alert(product.productId + " quick view"),
                addToWishlist: () =>
                  alert(product.productId + " added to wishlist"),
                compare: () => alert(product.productId + " compare"),
              }}
            />
          ))}
        </div>
        <div className="w-[25%] h-fit grid bg-white shadow rounded-lg">
          <div className="flex justify-between px-[16px] pt-[16px]">
            <h6 className="text-[16px] text-[#212B37] font-semibold">Filter</h6>
            <p className="text-[#FF5D9F] text-[13px] font-sans font-normal cursor-pointer underline">
              Clear All
            </p>
          </div>
          <div className="w-full flex flex-col justify-between">
            <CategorySelect
              label="Categories"
              data={categories}
              selected={selected}
              onChange={setSelected}
            />
            <PriceRange
              label="Price Range"
              min={0}
              max={50000}
              step={0.01}
              defaultValue={[141.94, 50000]}
            />
            <CategorySelect
              label="Discount"
              data={categories}
              selected={selected}
              onChange={setSelected}
            />
            <CategorySelect
              label="Brand"
              data={categories}
              selected={selected}
              onChange={setSelected}
            />
            <CategorySelect
              label="Size"
              data={categories}
              selected={selected}
              onChange={setSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
