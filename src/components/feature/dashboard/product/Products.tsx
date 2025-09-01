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
import ProductCard from "../../../common/Card/ProductCard";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await ProductService.getAllProducts();
      setProducts(res.data as Product[]);
    })();
  }, []);

  console.log("products", products);

  const categories = [
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

  return (
    <div className="w-full h-full flex flex-col justify-between gap-6">
      <div className="flex justify-between bg-white p-[16px] shadow rounded-lg">
        <div className="flex justify-between">
          <h6 className="text-[16px] text-[#212B37] font-bold rounded-full">
            Total{" "}
            <span className="text-[16px] text-[#E354D4] font-bold">
              6678 Items
            </span>{" "}
            Available
          </h6>
        </div>
        <div className="flex justify-between">B</div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-[75%] h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index ?? product.productId} product={product} />
          ))}
        </div>
        <div className="w-[25%] h-full grid bg-white shadow rounded-lg">
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
              data={discount}
              selected={selected}
              onChange={setSelected}
            />
            <CategorySelect
              label="Brand"
              data={brand}
              selected={selected}
              onChange={setSelected}
            />
            <CategorySelect
              label="Size"
              data={sizes}
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
