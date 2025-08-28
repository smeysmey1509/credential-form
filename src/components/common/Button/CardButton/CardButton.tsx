import React from "react";

interface CardButtonProps {
  label?: string | React.ReactNode;
  tooltip?: string;
  classname?: string;
  onClick?: () => void;
}

const CardButton = ({
  label = "Default",
  tooltip,
  classname,
  onClick,
}: CardButtonProps) => {
  return (
    <div className="relative group/btn inline-flex">
      <button
        className={`w-[33px] h-[33px] text-[11px] font-bold text-white bg-[#5C67F7] rounded-full inline-flex items-center justify-center cursor-pointer hover:bg-[rgba(92,103,247,0.9)] ${classname}`}
        onClick={onClick}
        aria-label={typeof tooltip === "string" ? tooltip : "button"}
      >
        {label}
      </button>

      <span className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover/btn:scale-100 transition-transform bg-gray-800 text-white text-[12px] rounded px-2 py-1 whitespace-nowrap">
        {tooltip}
      </span>
    </div>
  );
};

export default CardButton;
