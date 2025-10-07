import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormField from "../../../common/FormField/FormField";
import SelectItemField, {
  OptionType,
} from "../../../common/SelectItemField/SelectItemField";
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
import { CategoryType } from "../../../../types/Category";

const EditProducts = () => {
  const { id } = useParams<{ id: string }>();

  // product fields
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [defaultPrice, setDefaultPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [status, setStatus] = useState<string>("Published");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [primaryImage, setPrimaryImage] = useState<File | string>("");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");

  useEffect(() => {
    if (id) getProductByID(id);
  }, [id]);

  useEffect(() => {
    getCategories();
  }, []);

  const getProductByID = async (id: string): Promise<void> => {
    try {
      const response = await ProductService.getProductById(id);
      const product: Product = response.data;

      setName(product.name || "");
      setDescription(product.description || "");
      setDefaultPrice(product.defaultPrice ?? 0);
      setStock(product.stock ?? 0);
      setStatus(product.status ?? "Published");
      setSelectedCategoryId(product?.category?.categoryName || "");
      setTag(product.tag || []);
      setImages([]);
      setPrimaryImage(product.primaryImage || "");
      setPublishDate(product.createdAt || "");
      setPublishTime(product.updatedAt || "");
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

  return (
    <div className="w-full h-full bg-white dark:bg-[#19191C] shadow rounded">
      <form method="POST">
        <div className="w-full h-fit flex justify-center p-4 gap-4 border-b border-b-gray-200 border-dashed">
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
                label="Gender"
                options={["Male", "Female", "Gay", "ByeBye"]}
                placeholder="Select size"
              />
            </div>
            <div className="row-start-3 row-end-4 col-start-1 col-end-2">
              <SelectItemField
                label="Size"
                options={["Large", "Medium", "Small", "Extra Small"]}
                placeholder="Select size"
              />
            </div>
            <div className="row-start-3 row-end-4 col-start-2 col-end-3">
              <SelectItemField
                label="Brand"
                options={["Gucci", "IPhone", "Samsung", "Extra Small"]}
                placeholder="Select size"
              />
            </div>
            <div className="row-start-4 row-end-5 col-start-1 col-end-2">
              <MultiSelect
                options={["Black", "Blue", "Green", "Yellow", "Red", "White"]}
                placeholder="Select Color"
                label="Color"
              />
            </div>
            <div className="row-start-4 row-end-5 col-start-2 col-end-3">
              <FormField
                label="Enter Cost"
                placeholder="Cost"
                helperText="*Mention final price of the product"
                value={defaultPrice}
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
              <RichTextEditor label="Product Features" />
            </div>
          </div>
          {/* RIGHT SECTION */}
          <div className="w-1/2 h-full grid grid-cols-6 grid-rows-11 gap-4">
            <div className="col-span-2">
              <FormField
                label="Price"
                placeholder="Enter price"
                value={defaultPrice}
                type="number"
              />
            </div>
            <div className="col-span-2 col-start-3">
              <FormField
                label="Stock"
                placeholder="Enter Stock"
                value={stock}
                type="number"
              />
            </div>
            <div className="col-span-2 col-start-5">
              <FormField label="Product Type" placeholder="Type" />
            </div>
            <div className="col-span-3 row-start-2">
              <FormField label="Product Type" placeholder="Type" />
            </div>
            <div className="col-span-3 col-start-4 row-start-2">
              <FormField label="Item Weight" placeholder="Weight" />
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
              <PublishDateInput label="Publish Date" />
            </div>
            <div className="col-span-6 row-start-8">
              <PublishDateInput label="Publish Time" />
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
