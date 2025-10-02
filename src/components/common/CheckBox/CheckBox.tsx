import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  classname?: string;
  label?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  classname,
  label,
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className={`peer appearance-none w-[15px] h-[15px] border border-gray-300 rounded bg-white checked:bg-[#5C67F7] checked:border-[#5C67F7] cursor-pointer ${classname}`}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <CgCheck className="absolute text-white text-[18px] hidden peer-checked:block pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      {label && (
        <label htmlFor="" className="text-[#212b37] text-[13px] font-sans">
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
