import React, {useEffect, useRef, useState} from "react";
import { FormImage } from "../../../types/ProductType";

interface ProductImageInputProps {
    label?: string;
    value?: FormImage[];
    onChange?: (files: File[]) => void;
}

const ProductImageInput: React.FC<ProductImageInputProps> = ({label, onChange, value}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    useEffect(() => {
        if (!value || value.length === 0) {
            setSelectedImages([]);
            return;
        }

        const urls = value.map((item) =>
            typeof item === "string" ? item : URL.createObjectURL(item)
        );
        setSelectedImages(urls);

        return () => {
            urls.forEach((url, index) => {
                if (typeof value[index] !== "string") {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [value]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);

            // Call the parent's onChange with File[]
            if (onChange) {
                onChange(fileArray);
            }

            console.log("Selected files:", files);
            // Handle file uploads here if needed
        }
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#212b37] dark:text-white">
                {label}
            </label>

            <div
                className="h-[80px] border border-dashed border-[#dee7f1] dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#5c67f7] transition"
                onClick={handleClick}
            >
                <p className="text-sm text-gray-500">
                    Drag & Drop your files or{" "}
                    <span className="text-[#5c67f7] font-medium">Browse</span>
                </p>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {selectedImages.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Selected ${index}`}
                            className="w-full h-[100px] object-cover rounded border"
                        />
                    ))}
                </div>
            )}

            <label
                htmlFor="product-description-add"
                className="text-[12px] font-normal text-[#6e829f] mt-1"
            >
                * Minimum of 6 images need to be uploaded, all images should be uniformly maintained, width and
                height to the container.
            </label>
        </div>
    );
};

export default ProductImageInput;
