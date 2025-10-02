import React from "react";
import CheckBoxRedius from "../CheckBoxRedius/CheckBoxRedius";

interface CreditCardProp {
  creditImg?: string;
  creditLabel?: string;
  creditChecked?: boolean;
  creditName?: string;
  onChange?: () => void;
}

const CreditCard: React.FC<CreditCardProp> = ({
  creditImg,
  creditLabel,
  creditChecked,
  creditName,
  onChange
}) => {
  return (
    <div className="w-full flex items-center border border-[#dee7f1] p-[10px] rounded">
      <div className="w-[40px] h-[40px] mr-2">
        <img src={creditImg} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="w-full">
        <p className="font-semibold text-[13px] font-sans text-[#212B37]">
          {creditLabel}
        </p>
      </div>
      <CheckBoxRedius name={creditName} checked={creditChecked} onChange={onChange}/>
    </div>
  );
};

export default CreditCard;
