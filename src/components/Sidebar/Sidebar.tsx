import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  console.log(isSidebarOpen);

  return (
    <div
      className={`fixed ${
        isSidebarOpen ? "left-[-15%]" : "left-0"
      } w-[15%] bg-[#202947] text-white h-screen shadow-custom transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="w-full h-[4.6rem] flex items-center justify-center pt-3.5 pb-3.5 pl-4 pr-4 border-b ">
        Ur Logo Here
      </div>
      <div className="flex items-center justify-center">
        <ul className="flex flex-col gap-6 w-full h-full p-6">
          <li className="text-[10px] font-normal text-[#b2b8c7] opacity-80">
            <span>MAIN</span>
          </li>
          <li>
            <div className="flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100">
              <AiOutlineHome className="text-xl" />
              <span>Dashboards</span>
              <IoIosArrowDown className="ml-auto text-sm" />
            </div>
            <ul className="flex flex-col gap-6 w-full h-full pt-6 pl-6">
              <li className="opacity-60 hover:opacity-100 cursor-pointer">
                - Sales
              </li>
              <li className="opacity-60 hover:opacity-100  cursor-pointer">
                - Analytics
              </li>
              <li className="opacity-60 hover:opacity-100  cursor-pointer">
                - Ecommerce
              </li>
            </ul>
          </li>
          {/* <li className="text-[10px] font-normal text-[#b2b8c7] opacity-80">
            <span>APP</span>
          </li>
          <li>
            Web Apps{" "}
            <ul className="flex flex-col gap-6 w-full h-full pt-6 pl-6">
              <li>- Ecommerce</li>
              <li>- Authentication</li>
              <li>- Qoutation</li>
            </ul>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
