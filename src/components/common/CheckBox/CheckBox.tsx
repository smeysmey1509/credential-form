import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";

interface CheckBoxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="peer appearance-none w-[15px] h-[15px] border border-gray-300 rounded bg-white checked:bg-[#5C67F7] checked:border-[#5C67F7] cursor-pointer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <CgCheck className="absolute text-white text-[18px] hidden peer-checked:block pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </label>
  );
};

export default CheckBox;
