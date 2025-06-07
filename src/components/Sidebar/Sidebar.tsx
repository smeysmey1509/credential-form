import React, {useState} from "react";
import {AiOutlineHome} from "react-icons/ai";
import {IoIosArrowDown} from "react-icons/io";
import {BsDash} from "react-icons/bs";
import {useSidebarTitle} from "../../context/SidebarTitleContext";
import {NavLink} from "react-router-dom";

interface SidebarProps {
    isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({isSidebarOpen}) => {
    const {sidebarTitle} = useSidebarTitle();

    // Track active menu and submenu
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<{
        menu: number;
        submenu: number;
    } | null>(null);

    const [openSubmenus, setOpenSubmenus] = useState<boolean[]>(
        Array(sidebarTitle.length).fill(false)
    );

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenus((prev) =>
            prev.map((open, i) => (i === index ? !open : open))
        );
    };

    const handleSubmenuClick = (menuIndex: number, submenuIndex: number) => {
        setActiveSubmenu({menu: menuIndex, submenu: submenuIndex});
        setActiveMenu(menuIndex);
    };

    return (
        <div
            className={`fixed ${
                isSidebarOpen ? "left-[-15%]" : "left-0"
            } w-[15%] bg-[#202947] dark:bg-[#19191C] text-white h-full border-[rgba(255, 255, 255, 0.1)] shadow-custom transition-all duration-300 ease-in-out overflow-hidden`}
        >
            <div className="w-full h-[4.6rem] flex items-center justify-center pt-3.5 pb-3.5 pl-4 pr-4">
                Ur Logo Here
            </div>
            <div className="flex flex-col justify-center p-6">
                {sidebarTitle?.map((item, index) => (
                    <React.Fragment key={index}>
                        <p className="text-[10px] font-normal opacity-50">{item?.title}</p>
                        <ul className="mt-4">
                            <li className="mb-4 relative">
                                <div
                                    onClick={() => {
                                        handleSubmenuToggle(index);
                                    }}
                                    className={`flex items-center gap-2 cursor-pointer select-none
                    opacity-60 hover:opacity-100
                        ${
                                        activeMenu === index ||
                                        (activeSubmenu && activeSubmenu.menu === index)
                                            ? "opacity-100 rounded"
                                            : ""
                                    }
                  `}
                                >
                                    <AiOutlineHome className="text-xl font-bold"/>
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
                                        {item?.service?.map((serviceItem, serviceIndex) => {
                                            return (
                                                <NavLink
                                                    key={serviceIndex}
                                                    to={`/dashboard${item?.path?.[serviceIndex] ?? ""}`}
                                                    className={({isActive}) =>
                                                        `flex items-center gap-1 font-medium text-[13px] cursor-pointer
     ${isActive ? "opacity-100 font-bold" : "opacity-60 hover:opacity-100"}`
                                                    }
                                                    onClick={() =>
                                                        handleSubmenuClick(index, serviceIndex)
                                                    }
                                                >
                                                    <BsDash/> {serviceItem}
                                                </NavLink>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
