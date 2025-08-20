import React from "react";

interface PrimaryButtonProp {
  label?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProp> = ({
  label,
  onClick,
  type = "button",
  className = "",
}) => {
  const baseStyles =
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none transition duration-200";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${className}`} // ✅ merge default with custom
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
