import React from "react";

interface CheckBoxRediusProp {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
  name?: string;
}

const CheckBoxRedius: React.FC<CheckBoxRediusProp> = ({
  label,
  checked = false,
  onChange,
  name = "radio-group",
}) => {
  return (
    <>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-[16px] h-[16px] border border-gray-300 dark:border-gray-600 rounded-[50%] bg-white dark:bg-[#111827] checked:bg-[#5C67F7] checked:border-[#5C67F7] cursor-pointer"
        />
        <label className="absolute w-[6px] h-[6px] bg-white text-[18px] rounded-[50%] hidden peer-checked:block pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      {label && (
        <p className="text-[#212b37] dark:text-white text-[13px] font-normal font-sans">
          {label}
        </p>
      )}
    </>
  );
};

export default CheckBoxRedius;
