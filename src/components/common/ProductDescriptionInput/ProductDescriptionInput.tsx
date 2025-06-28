import React from "react";

interface ProductDescriptionInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label?: string;
}

const ProductDescriptionInput: React.FC<ProductDescriptionInputProps> = ({
                                                                             value,
                                                                             onChange,
                                                                             label = "Product Description",
                                                                         }) => {
    return (
        <div className="flex flex-col w-full">
            <label
                htmlFor="product-description-add"
                className="text-[14px] font-medium text-[#212b37] mb-1 dark:text-white"
            >
                {label}
            </label>
            <textarea
                id="product-description-add"
                rows={2}
                value={value}
                onChange={onChange}
                className="w-full h-fit border rounded bg-white dark:bg-transparent dark:focus:bg-transparent font-sans px-[0.75rem] py-[0.375rem] font-normal text-[13px] text-[#212b37] border-[#dee7f1] focus:border-[#5c67f780] focus:bg-[#fff] focus:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)] outline-none resize-y"
            ></textarea>
            <label
                htmlFor="product-description-add"
                className="text-[12px] font-normal text-[#6e829f] mt-1"
            >
                *Description should not exceed 500 letters
            </label>
        </div>
    );
};

export default ProductDescriptionInput;
