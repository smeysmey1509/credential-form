import React, {lazy, useState, useRef, useEffect} from "react";
import "./Header.css";
import {RiMenu2Line} from "react-icons/ri";
import {
    IoSearchOutline,
    IoLanguageSharp,
    IoCartOutline,
    IoNotificationsOutline,
} from "react-icons/io5";
import {MdDarkMode, MdOutlineLogout} from "react-icons/md";
import {FaUserAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useTheme} from "../../../hooks/useTheme";
import {AnimatePresence} from 'framer-motion';

import Notification from "../../common/Notification/Notification";
import {deleteCookie} from "../../../utils/cookie";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({toggleSidebar}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const {toggleTheme} = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowNotification(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
        toggleSidebar();
    };

    const hanldeNotification = () => {
        setShowNotification(prevState => !prevState);
    }

    const handleLogout = async () => {
        await axios.post('http://localhost:5002/api/v1/logout')
        deleteCookie('accessToken')
        deleteCookie('user');
        navigate('/login');
    };

    return (
        <div
            className="sticky top-0 z-11 w-full h-content flex items-stretch justify-between px-6 bg-[#ffffff] dark:bg-[#19191C] shadow-md">
            <div className="w-full flex items-center gap-8">
                <button className="text-xl font-normal text-[#687b94] cursor-pointer ">
                    <RiMenu2Line onClick={handleSidebarToggle}/>
                </button>
                <div
                    className="min-w-[20rem] flex items-center rounded-md gap-2 bg-[#ffffff] dark:bg-[#28282B] dark:border-none dark:text-[#FFFFFF] border border-[#eff2ff] p-1 pl-4 pr-4">
                    <IoSearchOutline className="text-sm text-[#687b94]"/>
                    <input
                        type="text"
                        placeholder="Search anything here ..."
                        className="w-full outline-none placeholder:text-sm"
                    />
                </div>
            </div>
            <ul className="flex items-center gap-5 pt-5 pb-5 text-xl text-[#687b94] dark:color-[rgba(255, 255, 255, 0.6)]">
                <li className="cursor-pointer p-1 border rounded dark:border-gray-600">
                    <IoLanguageSharp/>
                </li>
                <li className="cursor-pointer p-1 border rounded dark:border-gray-600" onClick={toggleTheme}>
                    <MdDarkMode/>
                </li>
                <li className="cursor-pointer p-1 border rounded dark:border-gray-600">
                    <IoCartOutline/>
                </li>
                <li className="cursor-pointer p-1 border rounded relative dark:border-gray-600"
                    onClick={hanldeNotification}>
                    <IoNotificationsOutline ref={containerRef}/>
                    <AnimatePresence>
                        {showNotification && (
                            <Notification/>
                        )}
                    </AnimatePresence>
                </li>
                <li className="cursor-pointer p-1 border rounded dark:border-gray-600">
                    <FaUserAlt/>
                </li>
                <li
                    className="cursor-pointer p-1 border rounded dark:border-gray-600"
                    onClick={() => handleLogout()}
                >
                    <MdOutlineLogout/>
                </li>
            </ul>
        </div>
    );
};

export default Header;
