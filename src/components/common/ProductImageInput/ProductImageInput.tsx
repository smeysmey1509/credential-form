import React, {useRef} from "react";

const ProductImageInput = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log("Selected files:", files);
            // Handle file uploads here
        }
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#212b37] dark:text-white">
                Product Images
            </label>
            <div
                className="border border-dashed border-[#dee7f1] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#5c67f7] transition"
                onClick={handleClick}
            >
                <p className="text-sm text-gray-500">
                    Drag & Drop your files or{" "}
                    <span className="text-[#5c67f7] font-medium">Browse</span>
                </p>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            <label
                htmlFor="product-description-add"
                className="text-[12px] font-normal text-[#6e829f] mt-1"
            >
                * Minimum of 6 images are need to be uploaded, all images should be uniformly maintained, width and
                height to the container.
            </label>
        </div>
    );
};

export default ProductImageInput;
