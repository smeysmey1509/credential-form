import React, { ReactNode } from "react";

interface PersonalDetailProp {
  label?: string;
  emoji?: ReactNode;
  onClick?: () => void;
  classname?: string;
}

const PersonalDetail: React.FC<PersonalDetailProp> = ({
  label,
  emoji,
  onClick,
  classname
}) => {
  return (
    <button
      className={`${classname} flex justify-center items-center gap-2 font-sans font-semibold text-[13px] cursor-pointer rounded text-[#E354D4] bg-[#FDEFFB] hover:bg-[#E354D4] hover:text-white py-[6px] px-[12px] transition-colors duration-300`}
      onClick={onClick}
    >
      {label}
      {emoji}
    </button>
  );
};

export default PersonalDetail;
