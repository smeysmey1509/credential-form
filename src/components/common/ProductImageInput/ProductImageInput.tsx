import React, { useEffect, useRef, useState } from "react";
import { FormImage } from "../../../types/ProductType";
import { UploadList } from "../Card/uploadItemCard";

interface ProductImageInputProps {
  label?: string;
  value?: FormImage[];
  onChange?: (files: FormImage[]) => void;
}

const ProductImageInput: React.FC<ProductImageInputProps> = ({
  label,
  onChange,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<
    { src: string; image: FormImage }[]
  >([]);

  useEffect(() => {
    if (!value || value.length === 0) {
      setSelectedImages([]);
      return;
    }

    const urls = value.map((item) => ({
      src: typeof item === "string" ? item : URL.createObjectURL(item),
      image: item,
    }));
    setSelectedImages(urls);

    return () => {
      urls.forEach((entry) => {
        if (typeof entry.image !== "string") {
          URL.revokeObjectURL(entry.src);
        }
      });
    };
  }, [value]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const fileArray = Array.from(files);
    const nextImages = [...(value ?? []), ...fileArray];

    if (onChange) {
      onChange(nextImages);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const nextImages = (value ?? []).filter((_, idx) => idx !== index);
    onChange?.(nextImages);
  };

  const handleRemoveImageById = (id: string) => {
    const index = selectedImages.findIndex((entry) => entry.src === id);
    if (index === -1) {
      return;
    }

    handleRemoveImage(index);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-[14px] font-bold text-[#212b37] dark:text-white">
        {label}
      </label>

      <div
        className="min-h-[80px] max-h-fit border border-dashed border-[#dee7f1] dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#5c67f7] transition"
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
        <div className="w-full mt-5 flex flex-col items-start gap-2">
          <UploadList
            files={selectedImages.map((entry) => ({
              id: entry.src,
              name: entry.src,
              sizeLabel: "1.3 MB",
            }))}
            onRemove={handleRemoveImageById}
          />
        </div>
      </div>

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {selectedImages.map((entry, index) => (
            <div
              key={`${entry.src}-${index}`}
              className="relative w-full h-[100px] rounded border overflow-hidden group"
            >
              <img
                src={entry.src}
                alt={`Selected ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100"
                aria-label={`Remove image ${index + 1}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        htmlFor="product-description-add"
        className="text-[12px] font-normal text-[#6e829f] mt-1"
      >
        * Minimum of 6 images need to be uploaded, all images should be
        uniformly maintained, width and height to the container.
      </label>
    </div>
  );
};

export default ProductImageInput;
