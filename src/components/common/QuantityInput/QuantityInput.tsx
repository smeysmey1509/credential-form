import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface QuantityInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  min = 1,
  max = 100,
  onChange,
}) => {
  const decrement = () => {
    const newVal = Math.max(min, value - 1);
    onChange?.(newVal);
  };

  const increment = () => {
    const newVal = Math.min(max, value + 1);
    onChange?.(newVal);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = min;
    val = Math.min(Math.max(val, min), max);
    onChange?.(val);
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <button
        type="button"
        aria-label="decrease quantity"
        className="border-none p-2 text-[12px] text-[#5C67F7] bg-[#EFF1FE] rounded-[50%] hover:bg-[#5C67F7] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
        onClick={decrement}
        disabled={value <= min}
      >
        <FiMinus />
      </button>
      <input
        type="text"
        className="w-full border p-1 text-center font-normal rounded-xl border-[#DDE7F1] focus:border-[#5C67F7] transition-colors duration-300 ease-in-out focus:outline-none"
        aria-label="quantity"
        value={value}
        onChange={handleChange}
      />
      <button
        type="button"
        aria-label="increase quantity"
        className="border-none p-2 text-[12px] text-[#5C67F7] bg-[#EFF1FE] rounded-[50%] hover:bg-[#5C67F7] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
        onClick={increment}
        disabled={value >= max}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantityInput;
