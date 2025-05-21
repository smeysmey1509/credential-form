import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BsDash } from "react-icons/bs";

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
    service: ["Product", "Authentication"],
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
  const [openSubmenus, setOpenSubmenus] = useState<boolean[]>(
    Array(sidebarTitle.length).fill(false)
  );

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenus((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
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
            <ul className="mt-4">
              <li className="mb-4 relative">
                <div
                  onClick={() => handleSubmenuToggle(index)}
                  className="flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 select-none"
                >
                  <AiOutlineHome className="text-xl font-bold" />
                  <span className="font-bold">{item?.module}</span>
                  <IoIosArrowDown
                    className={`ml-auto text-sm font-bold transform transition-transform duration-200 ${
                      openSubmenus[index] ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSubmenus[index]
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  } select-none`}
                >
                  <ul className="flex flex-col gap-4 ml-4 mt-4">
                    {item?.service?.map((serviceItem, serviceIndex) => (
                      <li
                        key={serviceIndex}
                        className="flex items-center gap-1 opacity-60 hover:opacity-100 cursor-pointer font-bold text-[13px] select-none"
                      >
                        <BsDash /> {serviceItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
