import FormField from "../../../common/FormField/FormField";
import React, {useEffect, useState} from "react";
import SelectItemField from "../../../common/SelectItemField/SelectItemField";
import MultiSelect from "../../../common/MultiSelect/MultiSelect";
import ProductDescriptionInput from "../../../common/ProductDescriptionInput/ProductDescriptionInput";
import ProductImageInput from "../../../common/ProductImageInput/ProductImageInput";
import PublishDateInput from "../../../common/DateForm/DateForm";
import PublishDateTimeInput from "../../../common/TimeForm/TimeForm";
import axiosClient from "../../../../services/api/axiosClient";
import {OptionType} from "../../../common/SelectItemField/SelectItemField";
import ProductService from "../../../../services/common/ProductService/ProductService";

const CreateProduct = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [status, setStatus] = useState<string>("");
    const [categories, setCategories] = useState<OptionType[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [tag, setTag] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setPrice(0);
            return;
        }
        const parsed = Number(value);
        if (!isNaN(parsed)) {
            setPrice(parsed);
        }
    };

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setStock(0);
        }
        const parsed = Number(value);
        if (!isNaN(parsed)) {
            setStock(parsed);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axiosClient.get("/category"); // adjust API endpoint if needed
            const categoryOptions = response.data.map((cat: any) => ({
                value: cat._id,
                label: cat.name,
            }));
            setCategories(categoryOptions);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price.toString());
            formData.append("stock", stock.toString());
            formData.append("category", selectedCategoryId);
            formData.append("status", status);

            tag.forEach(t => formData.append("tag", t));

            images.forEach((image) => {
                formData.append("images", image);
            });

            const response = await ProductService.createProduct(formData);
            console.log("Product created successfully:", response.data);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} method="POST">
            <div className="w-full h-full flex justify-center gap-4">
                <div
                    className="w-1/2 h-full grid grid-cols-2 gap-x-6 gap-y-4">
                    <div className="row-start-1 row-end-2 col-start-1 col-end-3">
                        <FormField label="Product Name" placeholder="Name"
                                   helperText="*Product Name should not exceed 30 characters" value={name}
                                   onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className="row-start-2 row-end-3 col-start-1 col-end-2">
                        <SelectItemField label="Size" options={["Large", "Medium", "Small", "Extra Small"]}
                                         placeholder="Select size"/>
                    </div>
                    <div className="row-start-2 row-end-3 col-start-2 col-end-3">
                        <SelectItemField label="Brand" options={["Gucci", "IPhone", "Samsung", "Extra Small"]}
                                         placeholder="Select size"/>
                    </div>
                    <div className="row-start-3 row-end-4 col-start-1 col-end-2">
                        <SelectItemField
                            label="Category"
                            options={categories}
                            value={selectedCategoryId}
                            onChange={(val) => setSelectedCategoryId(val)}
                            placeholder="Select Category"
                        />
                    </div>
                    <div className="row-start-3 row-end-4 col-start-2 col-end-3">
                        <SelectItemField label="Gender" options={["Male", "Female", "Gay", "ByeBye"]}
                                         placeholder="Select size"/>
                    </div>
                    <div className="row-start-4 row-end-5 col-start-1 col-end-2">
                        <MultiSelect options={["Black", "Blue", "Green", "Yellow", "Red", "White"]}
                                     placeholder="Select Color" label="Color"/>
                    </div>
                    <div className="row-start-4 row-end-5 col-start-2 col-end-3">
                        <FormField label="Enter Cost" placeholder="Cost"
                                   helperText="*Mention final price of the product"/>
                    </div>
                    <div className="row-start-5 row-end-6 col-start-1 col-end-3 ">
                        <ProductDescriptionInput label="Product Description"
                                                 helpText="*Description should not exceed 500 letters"
                                                 onChange={(e) => setDescription(e.target.value)}
                                                 value={description}/>
                    </div>
                    <div className="row-start-6 row-end-7 col-start-1 col-end-2">
                        <FormField label="Product Type" placeholder="Type"/>
                    </div>
                    <div className="row-start-6 row-end-7 col-start-2 col-end-3">
                        <FormField label="Item Weight" placeholder="Weight in gms"/>
                    </div>
                    <div className="row-start-7 row-end-8 col-start-1 col-end-3">
                        <ProductImageInput label="Product Image" onChange={(files) => setImages(files)} value={images}/>
                    </div>
                    <div className="row-start-8 row-end-9 col-start-1 col-end-3">
                        <SelectItemField label="Availability" options={["Stock", "Out Of Stock"]}
                                         placeholder="Select"/>
                    </div>
                </div>
                <div className="w-1/2 h-full grid grid-cols-6 gap-x-6 gap-y-4">
                    <div className="col-span-6 row-span-3 h-[320px] bg-gray-200">
                        Rich Text Editor
                    </div>
                    <div className="col-span-6 row-start-4">
                        <ProductImageInput label="Warranty Documents:"/>
                    </div>
                    <div className="col-span-2 row-start-5">
                        <FormField label="Price"
                                   placeholder="Enter price"
                                   value={price}
                                   onChange={handlePriceChange}
                                   type="number"
                        />
                    </div>
                    <div className="col-span-2 col-start-3 row-start-5">
                        <FormField label="Stock"
                                   placeholder="Enter Stock"
                                   value={stock}
                                   onChange={handleStockChange}
                                   type="number"
                        />
                    </div>
                    <div className="col-span-2 col-start-5 row-start-5">
                        <FormField label="Discount" placeholder="Discount"/>
                    </div>
                    <div className="col-span-3 row-start-6">
                        <PublishDateInput/>
                    </div>
                    <div className="col-span-3 col-start-4 row-start-6">
                        <PublishDateTimeInput label="Publish Date"/>
                    </div>
                    <div className="col-span-6 row-start-7">
                        <SelectItemField label="Published Status" options={["Published", "Unpublished"]}
                                         placeholder="Select" onChange={(e) => setStatus(e)} value={status}/>
                    </div>
                    <div className="col-span-6 row-start-8">
                        <MultiSelect options={["IPhone", "Samsung", "Nokia", "Leang", "Koy10", "HiKer"]}
                                     placeholder="Tag" label="Product Tag"
                                     onChange={(newSelected) => setTag(newSelected)} value={tag}
                        />
                    </div>
                </div>
            </div>
            <div>
                <button type="submit">Add Product</button>
            </div>
        </form>
    )
}

export default CreateProduct;