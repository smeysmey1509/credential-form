import React from "react";

interface PublishDateInputProps {
  label?: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PublishDateInput: React.FC<PublishDateInputProps> = ({
  label = "Publish Date",
  value,
  type,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          htmlFor="publish-date"
          className="text-[14px] font-medium text-[#212b37] dark:text-white mb-2"
        >
          {label}
        </label>
      )}
      <input
        id="publish-date"
        type={type || "date"} // ✅ Use date input type
        value={value}
        onChange={onChange}
        className="appearance-none border rounded bg-white dark:bg-[#111827] px-3 py-2 text-[13px] text-[#212b37] dark:text-white border-[#dee7f1] dark:border-[#374151] focus:border-[#5c67f7] focus:bg-[#fff] dark:focus:bg-[#111827] focus:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)] outline-none cursor-pointer"
      />
    </div>
  );
};

export default PublishDateInput;
