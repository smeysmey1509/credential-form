import React from "react";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  className?: string; // ✅ allow custom class names (e.g., with !important)
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  helperText,
  value,
  onChange,
  type = "text",
  className = "", // ✅ default to empty
}) => {
  const inputBaseClasses = `
    appearance-none border mt-2 rounded bg-white
    dark:bg-[#19191C] dark:border-gray-700 dark:focus:bg-[#19191C]
    font-sans px-[0.75rem] py-[0.375rem] font-normal text-[13px]
    text-[#212b37] dark:text-gray-500 border-[#dee7f1]
    focus:border-[#5c67f780] focus:bg-[#fff]
    focus:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)]
    dark:placeholder:text-gray-500 outline-none
    transition duration-200
  `;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[14px] font-medium text-[#212b37] dark:text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${inputBaseClasses} ${className}`}
      />
      {helperText && (
        <label className="text-[0.75rem] font-medium text-[#6e829f] mt-1">
          {helperText}
        </label>
      )}
    </div>
  );
};

export default FormInput;
