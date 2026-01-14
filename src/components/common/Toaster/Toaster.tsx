import React, { ReactNode } from "react";
import {
  IoAlertCircleOutline,
  IoCheckmarkSharp,
  IoCloseOutline,
  IoInformationCircleOutline,
  IoInformationOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { ToastType } from "../../../context/ToasterContext";
import { IoIosInformation } from "react-icons/io";

interface ToasterProp {
  title?: string;
  colorTitle?: string;
  description?: string;
  colorDescription?: string;
  bg?: string;
  icon?: ReactNode;
  bgIcon?: string;
  onClose?: () => void;
  closeTextColor?: ReactNode;
  bgClose?: string;
  borderClose?: string;
  type?: ToastType;
}

const Toaster: React.FC<ToasterProp> = ({
  title,
  colorTitle,
  description,
  colorDescription,
  bg,
  icon,
  bgIcon,
  onClose,
  closeTextColor,
  bgClose,
  borderClose,
  type = "default",
}) => {
  const toastStyle: Record<
    ToastType,
    {
      title: string;
      colorTitle: string;
      description: string;
      colorDescription: string;
      bg: string;
      icon: ReactNode;
      bgIcon: string;
      closeTextColor: string;
      bgClose: string;
      borderClose: string;
    }
  > = {
    default: {
      title: "Primary",
      colorTitle: "text-[#11181C]",
      description: "This is a primary toaster.",
      colorDescription: "text-[#71717A]",
      bg: "bg-white",
      icon: <IoInformationOutline className="text-white text-[14px]" />,
      bgIcon: "bg-black",
      closeTextColor: "text-black",
      bgClose: "bg-white",
      borderClose: "border-gray-400",
    },
    primary: {
      title: "Primary",
      colorTitle: "text-blue-800",
      description: "This is a primary toaster.",
      colorDescription: "text-blue-600",
      bg: "bg-blue-100",
      icon: <IoIosInformation className="text-white text-[24px]" />,
      bgIcon: "bg-[#005BC4]",
      closeTextColor: "text-blue-600",
      bgClose: "bg-blue-50",
      borderClose: "border-blue-400",
    },
    secondary: {
      title: "Secondary",
      colorTitle: "text-[#6020A0]",
      description: "This is a secondary toaster.",
      colorDescription: "text-[#7828C8]",
      bg: "bg-[#F2EAFA]",
      icon: <IoIosInformation className="text-white text-[24px]" />,
      bgIcon: "bg-[#6020A0]",
      closeTextColor: "text-purple-600",
      bgClose: "bg-purple-50",
      borderClose: "border-purple-400",
    },
    success: {
      title: "default",
      colorTitle: "text-[#12A150]",
      description: "This is defualt toaster.",
      colorDescription: "text-[#17C964]",
      bg: "bg-[#E8FAF0]",
      icon: <IoCheckmarkSharp className="text-white text-[14px]" />,
      bgIcon: "bg-[#14A150]",
      closeTextColor: "text-[hsl(145.96_79.46%_43.92%/1)]",
      bgClose: "bg-green-100",
      borderClose: "border-green-400",
    },
    warning: {
      title: "Warning",
      colorTitle: "text-[#C4841D]",
      description: "This is a warning toaster.",
      colorDescription: "text-[#F5A524]",
      bg: "bg-[#FEFCE8]",
      icon: <IoWarningOutline className="text-yellow-700 text-[14px]" />,
      bgIcon: "bg-yellow-500",
      closeTextColor: "text-yellow-700",
      bgClose: "bg-yellow-50",
      borderClose: "border-yellow-400",
    },
    danger: {
      title: "Danger",
      colorTitle: "text-[#C20E4D]",
      description: "This is a danger toaster.",
      colorDescription: "text-[#F31260]",
      bg: "bg-[#FEE7EF]",
      icon: <IoAlertCircleOutline className="text-white text-[14px]" />,
      bgIcon: "bg-red-500",
      closeTextColor: "text-red-600",
      bgClose: "bg-red-50",
      borderClose: "border-red-400",
    },
  };

  const current = toastStyle[type] || toastStyle.default;

  return (
    <div
      className={`relative flex items-center ${
        bg ?? current?.bg
      } gap-3 px-4 py-4 rounded-xl shadow-xl
                 w-[350px] text-sm cursor-pointer group`}
    >
      <div
        className={`w-5 h-5 rounded-full ${
          bgIcon ?? current?.bgIcon
        } flex justify-center items-center`}
      >
        {icon ?? current?.icon}
      </div>

      <div>
        <h4
          className={`font-sans font-normal text-[14px] ${
            colorTitle ?? current?.colorTitle
          }`}
        >
          {title ?? "Title"}
        </h4>
        <span
          className={`font-sans font-normal text-[14px] ${
            colorDescription ?? current?.colorDescription
          }`}
        >
          {description ?? "Description"}
        </span>
      </div>

      <div
        onClick={onClose}
        className={`absolute -top-1 -right-1 w-4.5 h-4.5 flex justify-center items-center
                   rounded-full border ${borderClose ?? current?.borderClose} ${
          bgClose ?? current?.bgClose
        }
                   ${
                     closeTextColor ?? current?.closeTextColor
                   } opacity-0 group-hover:opacity-100
                   transition-opacity duration-300`}
      >
        <IoCloseOutline className="text-[14px]" />
      </div>
    </div>
  );
};

export default Toaster;
