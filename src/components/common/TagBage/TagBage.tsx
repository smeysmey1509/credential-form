import React from "react";

interface TagBageProp {
  label?: string;
  classname?: string;
}

const TagBage: React.FC<TagBageProp> = ({ label, classname }) => {
  return (
    <span className={`flex justify-center items-center font-semibold font-sans rounded text-[11px] text-white text-center bg-[#FF5D9F] px-[0.65rem] py-[0.12rem] ${classname}`}>
      {label}
    </span>
  );
};

export default TagBage;
