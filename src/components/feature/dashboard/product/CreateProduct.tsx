import FormField from "../../../common/FormField/FormField";
import {RiArrowDownSFill} from "react-icons/ri";
import React from "react";
import SelectItemField from "../../../common/SelectItemField/SelectItemField";
import MultiSelect from "../../../common/MultiSelect/MultiSelect";
import ProductDescriptionInput from "../../../common/ProductDescriptionInput/ProductDescriptionInput";
import ProductImageInput from "../../../common/ProductImageInput/ProductImageInput";

const CreateProduct = () => {
    return (
        <div className="w-full h-full flex justify-center items-center gap-4">
            <div
                className="w-1/2 h-full grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="row-start-1 row-end-2 col-start-1 col-end-3">
                    <FormField label="Product Name" placeholder="Name"
                               helperText="*Product Name should not exceed 30 characters"/>
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
                    <SelectItemField label="Size" options={["Large", "Medium", "Small", "Extra Small"]}
                                     placeholder="Select size"/>
                </div>
                <div className="row-start-3 row-end-4 col-start-2 col-end-3">
                    <SelectItemField label="Size" options={["Large", "Medium", "Small", "Extra Small"]}
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
                    <ProductDescriptionInput label="Product Description"/>
                </div>
                <div className="row-start-6 row-end-7 col-start-1 col-end-2">
                    <FormField label="Product Type" placeholder="Type"/>
                </div>
                <div className="row-start-6 row-end-7 col-start-2 col-end-3">
                    <FormField label="Item Weight" placeholder="Weight in gms"/>
                </div>
                <div className="row-start-7 row-end-8 col-start-1 col-end-3">
                    <ProductImageInput/>
                </div>
                <div className="row-start-8 row-end-9 col-start-1 col-end-3">
                    <SelectItemField label="Availability" options={["Stock", "Out Of Stock"]}
                                     placeholder="Select"/>
                </div>
            </div>
            <div className="w-1/2 h-full grid grid-cols-6 gap-x-6 gap-y-4">
                <div className="col-span-6 row-span-3">1</div>
                <div className="col-span-6 row-start-4">
                    <ProductImageInput/>
                </div>
                <div className="col-span-2 row-start-5">
                    <FormField label="Product Name" placeholder="Actual Price"/>
                </div>
                <div className="col-span-2 col-start-3 row-start-5">
                    <FormField label="Product Name" placeholder="Dealer Price"/>
                </div>
                <div className="col-span-2 col-start-5 row-start-5">
                    <FormField label="Product Name" placeholder="Discount"/>
                </div>
                <div className="col-span-3 row-start-6">6</div>
                <div className="col-span-3 col-start-4 row-start-6">7</div>
                <div className="col-span-6 row-start-7">
                    <SelectItemField label="Published Status" options={["Large", "Medium", "Small", "Extra Small"]}
                                     placeholder="Select"/>
                </div>
                <div className="col-span-6 row-start-8">
                    <MultiSelect options={["IPhone", "Samsung", "Nokia", "Leang", "Koy10", "HiKer"]}
                                 placeholder="Tag" label="Product Tag"/>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct;