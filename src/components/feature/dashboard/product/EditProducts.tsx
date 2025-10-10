import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormField from "../../../common/FormField/FormField";
import SelectItemField from "../../../common/SelectItemField/SelectItemField";
import MultiSelect from "../../../common/MultiSelect/MultiSelect";
import ProductDescriptionInput from "../../../common/ProductDescriptionInput/ProductDescriptionInput";
import ProductImageInput from "../../../common/ProductImageInput/ProductImageInput";
import PublishDateInput from "../../../common/DateForm/DateForm";
import RichTextEditor from "../../../common/RichTextEditor/RichTextEditor";
import ButtonWithEmoji from "../../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { GoPlus, GoDownload } from "react-icons/go";
import ProductService from "../../../../services/common/ProductService/ProductService";
import { Product } from "../../../../types/ProductType";
import CategoryService from "../../../../services/common/Category/CategoryService";
import { BrandType, BrandStats } from "../../../../types/BrandType";
import BrandService from "../../../../services/common/BrandService/BrandService";

const EditProducts = () => {
  const { id } = useParams<{ id: string }>();

  // product fields
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [defaultPrice, setDefaultPrice] = useState<number>(0);
  const [actualPrice, setActualPrice] = useState<number>(0);
  const [dealerPrice, setDealerPrice] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [feature, setFeature] = useState<string>("");
  const [status, setStatus] = useState<string>("Published");
  const [categories, setCategories] = useState<string[]>([]);
  const [currency, setCurrency] = useState<string>("");
  const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [brandOptions, setBrandOptions] = useState<string[]>([]);
  const [productType, setProductType] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [size, setSize] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [color, setColor] = useState<string[]>([]);
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [primaryImage, setPrimaryImage] = useState<File | string>("");
  const [updatedDate, setUpdatedDate] = useState<string>("");
  const [updatedTime, setUpdatedTime] = useState<string>("");

  useEffect(() => {
    if (id) getProductByID(id);
  }, [id]);

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const getProductByID = async (id: string): Promise<void> => {
    try {
      const response = await ProductService.getProductById(id);
      const product: Product = response.data;

      setName(product.name || "");
      setDescription(product.description || "");
      setDefaultPrice(product.defaultPrice ?? 0);
      setActualPrice(product?.actualPrice || 0);
      setDealerPrice(product?.dealerPrice || 0);
      setTotalStock(product.stock ?? 0);
      setFeature(product?.feature || "");
      setBrand(product?.brand?.name || "");
      setCurrency(product?.currency || "");
      setWeight(product?.weight || 0);
      setStatus(product.status ?? "Published");
      setProductType(product?.productType || "");
      setSelectedCategoryId(product?.category?.categoryName || "");
      setTag(product.tag || []);
      setImages([]);
      setPrimaryImage(product.primaryImage || "");
      setUpdatedDate(product.updatedDate || "");
      setUpdatedTime(product.updatedTime || "");

      const colorList =
        response?.data?.variants
          ?.map((v: any) => v?.attributes?.color)
          ?.filter(Boolean) ?? [];
      setColorOptions(colorList);
    } catch (error) {
      console.error("❌ Failed to fetch product data:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await CategoryService.getAllCategories();
      const responseCategoryOptions: string[] = response.data.categories?.map(
        (cat: any) => cat.categoryName
      );
      setCategoriesOptions(responseCategoryOptions);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const getBrands = async () => {
    try {
      const response = await BrandService.getAllBrands();
      const brands: BrandType[] = response?.data?.brands || [];

      const brandNames: string[] =
        brands.map((b) => b.name || "");

      setBrandOptions(brandNames);
    } catch (err) {
      console.error("❌ Failed to fetch brands:", err);
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-[#19191C] shadow rounded">
      <form onSubmit={handleSubmit} method="POST">
        <div className="w-full h-fit flex justify-center p-4 gap-8 border-b border-b-gray-200 border-dashed">
          {/* LEFT SECTION */}
          <div className="w-1/2 h-full grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="row-start-1 row-end-2 col-start-1 col-end-3">
              <FormField
                label="Product Name"
                placeholder="Name"
                helperText="*Product Name should not exceed 30 characters"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="row-start-2 row-end-3 col-start-1 col-end-2">
              <SelectItemField
                label="Category"
                options={categoriesOptions}
                value={selectedCategoryId}
                onChange={(val) => setSelectedCategoryId(val)}
                placeholder="Select Category"
              />
            </div>
            <div className="row-start-2 row-end-3 col-start-2 col-end-3">
              <SelectItemField
                label="Currency"
                options={["USD", "EURO", "RIEL"]}
                placeholder="Select Brand"
                value={currency}
                onChange={(val) => setCurrency(val)}
              />
            </div>
            <div className="row-start-3 row-end-4 col-start-1 col-end-2">
              <SelectItemField
                label="Brand"
                options={brandOptions}
                placeholder="Select size"
                onChange={(brand) => setBrand(brand)}
                value={brand}
              />
            </div>
            <div className="row-start-3 row-end-4 col-start-2 col-end-3">
              <FormField
                label="Enter Cost"
                placeholder="Cost"
                helperText="*Mention final price of the product"
                value={`$${defaultPrice}`}
              />
            </div>
            <div className="row-start-4 row-end-5 col-start-1 col-end-3">
              <ButtonWithEmoji
                label="Varaints"
                btnClass="!w-full !bg-[rgba(92,103,247,0.1)] !border !border-transparent !text-[rgba(92,103,247)] !font-semibold !px-[6px] !py-[6px] !rounded-lg hover:!bg-[rgba(92,103,247)] hover:!text-white hover:!border hover:!border-[rgba(92,103,247)] transition-all duration-300"
                onClick={() => alert("123")}
              />
            </div>
            <div className="row-start-5 row-end-6 col-start-1 col-end-3 ">
              <ProductDescriptionInput
                label="Product Description"
                helpText="*Description should not exceed 500 letters"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="row-start-6 row-end-6 col-start-1 col-end-3">
              <RichTextEditor label="Product Features" value={feature} />
            </div>
          </div>
          {/* RIGHT SECTION */}
          <div className="w-1/2 h-full grid grid-cols-6 grid-rows-11 gap-4">
            <div className="col-span-2">
              <FormField
                label="Actual Price"
                placeholder="Actual price"
                value={`$${actualPrice}`}
                type="text"
              />
            </div>
            <div className="col-span-2 col-start-3">
              <FormField
                label="Dealer Price"
                placeholder="Dealer Price"
                value={`$${dealerPrice}`}
                type="text"
              />
            </div>
            <div className="col-span-2 col-start-5">
              <FormField label="Discount" placeholder="Discount" />
            </div>
            <div className="col-span-3 row-start-2">
              <FormField
                label="Product Type"
                placeholder="Type"
                value={productType}
              />
            </div>
            <div className="col-span-3 col-start-4 row-start-2">
              <FormField
                label="Item Weight"
                placeholder="Weight"
                value={weight}
              />
            </div>
            <div className="col-span-6 row-span-2 row-start-3">
              <ProductImageInput
                label="Product Image"
                onChange={(files) => setImages(files)}
                value={images}
              />
            </div>
            <div className="col-span-6 row-span-2 row-start-5">
              <ProductImageInput label="Warranty Documents:" />
            </div>
            <div className="col-span-6 row-start-7">
              <PublishDateInput label="Publish Date" value={updatedDate} />
            </div>
            <div className="col-span-6 row-start-8">
              <PublishDateInput label="Publish Time" value={updatedTime} />
            </div>
            <div className="col-span-6 row-start-9">
              <SelectItemField
                label="Published Status"
                options={["Published", "Unpublished"]}
                placeholder="Select"
                onChange={(e) => setStatus(e)}
                value={status}
              />
            </div>
            <div className="col-span-6 row-start-10">
              <MultiSelect
                options={["IPhone", "Samsung", "Nokia", "Leang"]}
                placeholder="Tag"
                label="Product Tag"
                onChange={(newSelected) => setTag(newSelected)}
                value={tag}
              />
            </div>
            <div className="col-span-6 row-start-11">
              <SelectItemField
                label="Availability"
                options={["Stock", "Out Of Stock"]}
                placeholder="Select"
                value="Stock"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex justify-end p-4 gap-2">
          <ButtonWithEmoji
            label="Add Product"
            emoji={<GoPlus />}
            btnClass="flex-row-reverse !bg-[#E354D41A] !text-[#E354D4] hover:!bg-[#E354D4] hover:!text-white"
          />
          <ButtonWithEmoji
            label="Save Product"
            emoji={<GoDownload />}
            btnClass="flex-row-reverse"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProducts;
