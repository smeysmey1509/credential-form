import React from "react";

const FormFieldTracking = () => {
  return (
    <div
      className="relative w-full h-full flex items-center border border-[#E4E9F2]
             focus-within:border-[#5c67f780]
             focus-within:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)]
             focus-within:bg-[#fff]
             dark:bg-[#19191C] dark:border-gray-700
             rounded overflow-hidden transition duration-200"
    >
      <input
        type="text"
        placeholder="Enter your order number"
        className="w-full h-full appearance-none bg-transparent border-none outline-none
               px-[16px] py-[10px] text-[13px] font-medium font-sans
               text-[#212b37] dark:text-gray-300 dark:placeholder:text-gray-500
               transition duration-200"
      />
      <button
        className="absolute [inset-inline-end:0.5rem] flex justify-center items-center
               rounded-lg px-[0.5rem] py-[0.3rem] text-[12px] font-medium font-sans
               bg-[#5C67F7] text-white hover:bg-[#6E77F8] active:bg-[#6E77F8]
               cursor-pointer transition"
      >
        Track Order
      </button>
    </div>
  );
};

export default FormFieldTracking;
