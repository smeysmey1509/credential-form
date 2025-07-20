import React from 'react'

interface PrimaryButtonProp {
    label?: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button" | undefined;
}

const PrimaryButton: React.FC<PrimaryButtonProp> = ({
    label,
    onClick,
    type
}) => {
  return (
    <button onClick={onClick} type={type} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">{label}</button>
  )
}

export default PrimaryButton
