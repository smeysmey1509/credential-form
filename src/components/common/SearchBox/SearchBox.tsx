import React from "react";

const SearchBox = () => {
  return (
    <input
      type="search"
      placeholder="Search Here"
      className="w-fit h-fit border p-[4px] font-sans text-[#212b37] dark:text-white font-normal border-[#dee7f1] dark:border-[#374151] bg-white dark:bg-[#111827] rounded text-[0.8rem] py-[0.25rem] px-[0.8rem] outline-none focus:border-[#5c67f780] focus:bg-[#fff] dark:focus:bg-[#111827]
    focus:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)] transition duration-200"
    />
  );
};

export default SearchBox;
