import React, {useState, useEffect} from "react";
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

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({toggleSidebar}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const navigate = useNavigate();

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleToggleDarmode = () => {
        setIsDark(!isDark);
    }

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
        toggleSidebar();
    };

    const handleLogout = async () => {
        await axios.post('http://localhost:5002/api/v1/logout')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="header flex items-stretch justify-between pl-6 pr-6 shadow-custom bg-[#ffffff]">
            <div className="flex items-center gap-8 pt-5 pb-5">
                <button className="text-xl font-normal text-[#687b94]">
                    <RiMenu2Line onClick={handleSidebarToggle}/>
                </button>
                <div
                    className="flex items-center rounded-md gap-2 bg-[#ffffff] border border-[#eff2ff] p-1 pl-4 pr-4">
                    <IoSearchOutline className="text-sm text-[#687b94]"/>
                    <input
                        type="text"
                        placeholder="Search anything here ..."
                        className="w-full outline-none placeholder:text-sm"
                    />
                </div>
            </div>
            <ul className="flex items-center gap-5 pt-5 pb-5 text-xl text-[#687b94]">
                <li className="cursor-pointer p-1 border rounded">
                    <IoLanguageSharp/>
                </li>
                <li className="cursor-pointer p-1 border rounded" onClick={handleToggleDarmode}>
                    <MdDarkMode/>
                </li>
                <li className="cursor-pointer p-1 border rounded">
                    <IoCartOutline/>
                </li>
                <li className="cursor-pointer p-1 border rounded">
                    <IoNotificationsOutline/>
                </li>
                <li className="cursor-pointer p-1 border rounded">
                    <FaUserAlt/>
                </li>
                <li
                    className="cursor-pointer p-1 border rounded"
                    onClick={() => handleLogout()}
                >
                    <MdOutlineLogout/>
                </li>
            </ul>
        </div>
    );
};

export default Header;
