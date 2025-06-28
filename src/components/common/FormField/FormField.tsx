import React from "react";

interface FormInputProps {
    label: string;
    placeholder?: string;
    helperText?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 label,
                                                 placeholder,
                                                 helperText,
                                                 value,
                                                 onChange,
                                             }) => {
    return (
        <div className="flex flex-col">
            <label className="text-[14px] font-medium text-[#212b37] dark:text-white">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border mt-2 rounded bg-white font-sans px-[0.75rem] py-[0.375rem] font-normal text-[13px] text-[#212b37] border-[#dee7f1] focus:border-[#5c67f780] focus:bg-[#fff] focus:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)] outline-none"
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
