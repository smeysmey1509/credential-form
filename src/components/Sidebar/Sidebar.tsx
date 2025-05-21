import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

interface SidebarProps {
  isSidebarOpen: boolean;
}

interface SidebarTitleProp {
  title?: string;
  module?: string;
  service?: string[];
  feature?: string[];
}

const sidebarTitle: SidebarTitleProp[] = [
  {
    title: "MAIN",
    module: "Dashboard",
    service: ["Ecommerce", "Authentication"],
    feature: ["Sales", "Analytics", "Ecommerce"],
  },
  {
    title: "WEB APPS",
    module: "Apps",
    service: ["Ecommerce", "Authentication"],
    feature: ["Sales", "Analytics", "Ecommerce"],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

  const handleSubmenuToggle = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div
      className={`fixed ${
        isSidebarOpen ? "left-[-15%]" : "left-0"
      } w-[15%] bg-[#202947] text-white h-screen shadow-custom transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="w-full h-[4.6rem] flex items-center justify-center pt-3.5 pb-3.5 pl-4 pr-4 border-b ">
        Ur Logo Here
      </div>
      <div className="flex flex-col justify-center p-6">
        {sidebarTitle?.map((item, index) => (
          <>
            <p className="text-[10px] font-normal opacity-50">{item?.title}</p>
            <ul className="mt-4" key={index}>
              <li className="mb-4 relative">
                <div
                  onClick={handleSubmenuToggle}
                  className="flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 select-none"
                >
                  <AiOutlineHome className="text-xl font-bold" />
                  <span className="font-bold">{item?.module}</span>
                  <IoIosArrowDown
                    className={`ml-auto text-sm font-bold transform transition-transform duration-200 ${
                      isSubmenuOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isSubmenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  } select-none`}
                >
                  <ul className="flex flex-col gap-4 ml-4 mt-4">
                    {item?.feature?.map((featureItem, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="opacity-60 hover:opacity-100 cursor-pointer font-normal select-none"
                      >
                        {featureItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </>
        ))}
        {/* <ul className="mt-6">
          <li className="mb-2 relative">
            <div
              onClick={handleSubmenuToggle}
              className="flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 select-none"
            >
              <AiOutlineHome className="text-xl font-bold" />
              <span className="font-bold">Dashboards</span>
              <IoIosArrowDown
                className={`ml-auto text-sm font-bold transform transition-transform duration-200 ${
                  isSubmenuOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isSubmenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } select-none`}
            >
              <ul className="flex flex-col gap-4 m-4">
                <li className="opacity-60 hover:opacity-100 cursor-pointer font-bold select-none">
                  - Sales
                </li>
                <li className="opacity-60 hover:opacity-100 cursor-pointer font-bold select-none">
                  - Analytics
                </li>
                <li className="opacity-60 hover:opacity-100 cursor-pointer font-bold select-none">
                  - Ecommerce
                </li>
              </ul>
            </div>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
