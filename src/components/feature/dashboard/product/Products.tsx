import React, { useEffect, useMemo, useState } from "react";
import CategorySelect from "../../../common/CategorySelect/CategorySelect";
import PriceRange from "../../../common/PriceRange/PriceRange";
import { Product } from "../../../../types/ProductType";
import ProductService from "../../../../services/common/ProductService/ProductService";
import CartService from "../../../../services/common/CartService/CartService";
import ProductCard from "../../../common/Card/ProductCard";
import CategoryService from "../../../../services/common/Category/CategoryService";
import { CategoryStats } from "../../../../types/Category";
import { useNavigate } from "react-router-dom";
import SelectionFilter from "../../../common/SelectionFilter/SelectionFilter";
import BrandService from "../../../../services/common/BrandService/BrandService";
import { BrandStats } from "../../../../types/BrandType";
import { discountData, sizeData } from "../../../../dummyData/dummyData";
import Pagination from "../../../common/Pagination/Pagination";

type SortKey = "" | "price_asc" | "price_desc";

const LABEL_TO_SORT: Record<string, SortKey> = {
  "Price Low to High": "price_asc",
  "Price High to Low": "price_desc",
};

const perPage = 12;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    CategoryStats["categories"] | undefined
  >([]);
  const [brand, setBrand] = useState<BrandStats["brands"]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [page, setPage] = useState<number>(1);
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
        setPage(1);
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

  useEffect(() => {
    handleListBrand();
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(products?.length / perPage)),
    [products?.length]
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return products?.slice(start, end);
  }, [products, page]);

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

  const handleFilterCategory = async (categoryId: string[]) => {
    try {
      const response = await ProductService.sortByCategory(categoryId);
      setProducts((response?.data as Product[]) || []);
      setPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleListBrand = async () => {
    try {
      const response = await BrandService.getAllBrands();
      setBrand((response?.data as BrandStats)?.brands || []);
    } catch (err) {
      console.log(err);
    }
  };

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
        <div className="w-[75%] h-fit flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedProducts?.map((product, index) => (
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
          {totalPages > 1 && (
            <div className="w-full flex justify-center items-center mt-6">
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
                boundaryCount={2}
                siblingCount={1}
              />
            </div>
          )}
        </div>
        <div className="w-[25%] h-fit grid bg-white shadow rounded-lg">
          <div className="flex justify-between px-[16px] pt-[16px]">
            <h6 className="text-[16px] text-[#212B37] font-semibold">Filter</h6>
            <button
              className="text-[#FF5D9F] text-[13px] font-sans font-normal cursor-pointer underline"
              onClick={() => alert("Clear all filters")}
            >
              Clear All
            </button>
          </div>
          <div className="w-full flex flex-col justify-between">
            <CategorySelect
              label="Categories"
              data={categories}
              selected={selected}
              onChange={(selectedCategories) => {
                setSelected(selectedCategories);
                handleFilterCategory(selectedCategories);
              }}
              accessors={{
                id: (x) => x._id || "",
                label: (x) => x.categoryName,
                count: (x) => x.productCount,
                disabled: (x) => x.productCount === 0,
              }}
            />
            <PriceRange
              label="Price Range"
              min={0}
              max={50000}
              step={0.01}
              defaultValue={[141.94, 50000]}
            />
            <CategorySelect
              label="Brand"
              data={brand}
              selected={selected}
              onChange={setSelected}
              accessors={{
                id: (x) => x._id || "",
                label: (x) => x.name || "",
                count: (x) => x.productCount || 0,
                disabled: (x) => false,
              }}
            />
            <CategorySelect
              label="Discount"
              data={discountData}
              selected={selected}
              onChange={setSelected}
              accessors={{
                id: (x) => x.id || "",
                label: (x) => x.label || "",
                count: (x) => x.count || 0,
                disabled: (x) => x.disabled,
              }}
            />
            <CategorySelect
              label="Size"
              data={sizeData}
              selected={selected}
              onChange={setSelected}
              accessors={{
                id: (x) => x.id || "",
                label: (x) => x.label || "",
                count: (x) => x.count || 0,
                disabled: (x) => x.disabled,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
