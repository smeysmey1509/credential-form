import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
import { Product, ProductVariant } from "../../../../types/ProductType";
import CategoryService from "../../../../services/common/Category/CategoryService";
import BrandService from "../../../../services/common/BrandService/BrandService";
import Varaint from "../../../common/Varaint/Varaint";
import { usePopup } from "../../../../context/PopupContext";

const EditProducts = () => {
  const { id } = useParams<{ id: string | undefined }>();

  // product fields
  const [productId, setProductId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [actualPrice, setActualPrice] = useState<number>(0);
  const [dealerPrice, setDealerPrice] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [feature, setFeature] = useState<string>("");
  const [status, setStatus] = useState<string>("Published");
  const [compareAtPrice, setCompareAtPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [categoriesOptions, setCategoriesOptions] = useState<OptionType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [brandOptions, setBrandOptions] = useState<OptionType[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [primaryImage, setPrimaryImage] = useState<string>("");
  const [updatedDate, setUpdatedDate] = useState<string>("");
  const [updatedTime, setUpdatedTime] = useState<string>("");
  const [varatins, setVaraints] = useState<ProductVariant[]>([]);
  const variantsRef = useRef<ProductVariant[]>([]);

  const { showPopup, hidePopup } = usePopup();

  useEffect(() => {
    if (id) getProductByID(id);
  }, [id]);

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const getCategories = async () => {
    try {
      const response = await CategoryService.getAllCategories();
      const responseCategoryOptions: OptionType[] =
        response?.data?.categories?.map((cat: any) => ({
          value: cat?._id,
          label: cat?.categoryName,
        })) || [];
      setCategoriesOptions(responseCategoryOptions);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const getBrands = async () => {
    try {
      const response = await BrandService.getAllBrands();
      const brandList =
        response?.data?.brands?.map((b: any) => ({
          value: b?._id,
          label: b?.name,
        })) || [];
      setBrandOptions(brandList ?? []);
    } catch (err) {
      console.error("❌ Failed to fetch brands:", err);
    }
  };

  const getProductByID = async (id: string): Promise<void> => {
    try {
      const response = await ProductService.getProductById(id);
      const product: Product = response.data;
      setProductId(product?.productId || "");
      setName(product.name || "");
      setDescription(product.description || "");
      setCost(product.cost || "");
      setActualPrice(product?.actualPrice || 0);
      setDealerPrice(product?.dealerPrice || 0);
      setCompareAtPrice(product?.compareAtPrice || 0);
      setRating(product?.ratingCount || 0);
      setTotalStock(product.stock ?? 0);
      setFeature(product?.feature || "");
      setCurrency(product?.currency || "");
      setWeight(product?.weight || 0);
      setVaraints(product?.variants || []);
      setStatus(product.status ?? "Published");
      setProductType(product?.productType || "");
      setSelectedCategoryId(product?.category?._id || "");
      setSelectedBrandId(product?.brand?._id || "");
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

  useEffect(() => {
    variantsRef.current = varatins;
  }, [varatins]);

  const displayVariants = useMemo(
    () =>
      varatins.map((item) => ({
        ...item,
        color: item.attributes?.color || "N/A",
        storage: item.attributes?.storage || "N/A",
        status: item?.stock === 0 ? "Out of Stock" : "In Stock",
      })),
    [varatins]
  );

  const fullDataVaraint = useMemo(
    () => ({
      name,
      description,
      cost,
      compareAtPrice,
      discount: 12,
      productId,
      primaryImage: `http://localhost:5002${primaryImage}`,
      ratingCount: rating,
      variants: displayVariants,
    }),
    [
      compareAtPrice,
      cost,
      description,
      displayVariants,
      name,
      primaryImage,
      productId,
      rating,
    ]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", selectedCategoryId);
      formData.append("currency", currency);
      formData.append("brand", selectedBrandId);
      formData.append("cost", cost);

      await ProductService?.updateProduct(id, formData);
      alert("Updated Successfully.");
    } catch (error) {
      console.error("Error Update", error);
    }
  };

  const handleVariantUpdate = (
    rowIndex: number,
    field: string,
    newValue: any
  ) => {
    setVaraints((prev) => {
      const updated = [...prev];
      const variant = { ...updated[rowIndex] };

      // If it's nested attributes like color or storage
      if (field === "color" || field === "storage") {
        variant.attributes = { ...variant.attributes, [field]: newValue };
      } else {
        (variant as any)[field] = newValue;
      }

      updated[rowIndex] = variant;
      return updated;
    });
  };

  const handleSaveVariants = async () => {
    try {
      const formData = new FormData();
      const latestVariants = variantsRef.current.map((variant) => ({
        ...variant,
        attributes: {
          ...variant.attributes,
        },
      }));

      formData.append("variants", JSON.stringify(latestVariants));
      await ProductService.updateProduct(id, formData);
      alert("✅ Variants updated successfully.");
    } catch (err) {
      console.error("❌ Failed to update variants:", err);
      alert("Failed to update variants.");
    }
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, ""); // remove non-numerics
    setCost(val);
  };

  return (
    <>
      <div className="relative w-full h-full bg-white dark:bg-[#19191C] shadow rounded">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleSubmit(e);
            handleSaveVariants();
          }}
          method="POST"
        >
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
                  placeholder="Select Brand"
                  onChange={(brand) => setSelectedBrandId(brand)}
                  value={selectedBrandId}
                />
              </div>
              <div className="row-start-3 row-end-4 col-start-2 col-end-3">
                <FormField
                  label="Enter Cost"
                  placeholder="Cost"
                  helperText="*Mention final price of the product"
                  value={cost ? `$${cost}` : ""}
                  onChange={handleCostChange}
                />
              </div>
              <div className="row-start-4 row-end-5 col-start-1 col-end-3">
                <ButtonWithEmoji
                  label="Varaints"
                  btnClass="!w-full !bg-[rgba(92,103,247,0.1)] !border !border-transparent !text-[rgba(92,103,247)] !font-semibold !px-[6px] !py-[6px] !rounded hover:!bg-[rgba(92,103,247)] hover:!text-white hover:!border hover:!border-[rgba(92,103,247)] transition-all duration-300"
                  onClick={() =>
                    showPopup(
                      <Varaint
                        onClose={hidePopup}
                        onVariantChange={handleVariantUpdate}
                        onClick={handleSaveVariants}
                        fullDataVaraint={fullDataVaraint}
                      />
                    )
                  }
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
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProducts;
