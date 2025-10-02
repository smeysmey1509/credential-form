import React from "react";
import ButtonWithEmoji from "../../Button/ButtonWithEmoji/ButtonWithEmoji";
import { RiEditLine } from "react-icons/ri";
import CheckBoxRedius from "../CheckBoxRedius/CheckBoxRedius";

interface ShipAddressProp {
  checked?: boolean;
  onChange?: () => void;
  name?: string;
  shipLabel?: string;
}

const ShipAddress: React.FC<ShipAddressProp> = ({
  checked,
  onChange,
  name,
  shipLabel,
}) => {
  return (
    <div
      className={`w-full h-fit flex flex-col justify-center border p-[16px] rounded-lg border-[#dee7f1] transition-colors duration-300
        ${checked ? "bg-[#F8F3FF]" : "bg-white"}`}
    >
      <div className="flex items-center text-center gap-1">
        <CheckBoxRedius checked={checked} onChange={onChange} name={name} />
        <label className="font-medium text-[13px] font-sans text-[#212B37]">
          Set as Default
        </label>
      </div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <h5 className="font-semibold text-[16px] font-sans text-[#212B37]">
          {shipLabel}
        </h5>
        <ButtonWithEmoji
          emoji={<RiEditLine />}
          label="Change"
          btnClass="!px-[8px] !py-[4px]"
        />
      </div>
      <h6 className="mb-1 font-bold text-[16px] font-sans text-[#212B37]">
        Victoria Gracie
      </h6>
      <p className="mb-2 font-medium text-[13px] font-sans text-[#212B37]">
        victoriagracie@jinno.mail
      </p>
      <p className="mb-2 font-medium text-[13px] font-sans text-[#212B37]">
        +05-554-874113
      </p>
      <p className="mb-2 font-medium text-[13px] font-sans text-[#212B37]">
        H.No: 48A-1B/C451, Smart Avenue,Coolin Street, Opp. NG Super Mart,
        57016, Canada
      </p>
    </div>
  );
};

export default ShipAddress;
