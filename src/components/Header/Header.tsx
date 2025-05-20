import React from "react";
import "./Header.css";
import { RiMenu2Line } from "react-icons/ri";
import {
  IoSearchOutline,
  IoLanguageSharp,
  IoCartOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header flex items-stretch justify-between pl-6 pr-6 shadow-custom bg-[#ffffff]">
      <div className="flex items-center gap-8 pt-5 pb-5">
        <button className="text-xl font-normal text-[#687b94]">
          <RiMenu2Line />
        </button>
        <div className="flex items-center rounded-md gap-2 bg-[#ffffff] border p-1 pl-4 pr-4">
          <IoSearchOutline className="text-sm text-[#687b94]" />
          <input
            type="text"
            placeholder="Search anything here ..."
            className="w-full outline-none placeholder:text-sm"
          />
        </div>
      </div>
      <ul className="flex items-center gap-5 pt-5 pb-5 text-xl text-[#687b94]">
        <li className="cursor-pointer p-1 border rounded">
          <IoLanguageSharp />
        </li>
        <li className="cursor-pointer p-1 border rounded">
          <MdDarkMode />
        </li>
        <li className="cursor-pointer p-1 border rounded">
          <IoCartOutline />
        </li>
        <li className="cursor-pointer p-1 border rounded">
          <IoNotificationsOutline />
        </li>
        <li className="cursor-pointer p-1 border rounded">
          <FaUserAlt />
        </li>
      </ul>
    </div>
  );
};

export default Header;
