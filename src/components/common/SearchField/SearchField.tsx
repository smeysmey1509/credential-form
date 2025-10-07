import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchField = () => {
  return (
    <div className="flex-[2] flex items-center border border-[#dee7f1] rounded bg-white dark:bg-[#19191C] dark:border-gray-700 focus-within:border-[#5c67f780] focus-within:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)] transition duration-200 overflow-hidden">
      <input
        type="text"
        placeholder="Search Orders..."
        className="flex-1 appearance-none bg-transparent font-sans outline-none px-[0.75rem] py-[0.375rem] font-normal text-[13px] text-[#212b37] dark:text-gray-500 dark:placeholder:text-gray-500"
      />
      <button className="p-2 text-[#6e829f] cursor-pointer">
        <CiSearch className="text-[14px]" />
      </button>
    </div>
  );
};

export default SearchField;
