import React, {use} from "react";
import {useLocation, Link} from "react-router-dom";
import "./Content.css";
import {Outlet} from "react-router-dom";

const Content = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const user = localStorage.getItem("user");
    const userName = user ? JSON.parse(user).name : "Guest";

    return (
        <div className="w-full h-screen flex flex-col gap-4 p-6 dark:bg-[#2D2D30] dark:text-[#ffffff] overflow-y-auto">
            <div className="w-full flex items-center justify-between max-h-1/2">
                <div>
                    <ol className="breadcrumb flex list-none p-0 items-center gap-2 text-sm font-bold">
                        {pathnames?.map((value, index) => {
                            const routeTo = pathnames.slice(0, index + 1).join("");
                            return (
                                <li key={index} className="breadcrumb-item">
                                    <Link
                                        to={routeTo}
                                        className={`text-[#687b94] hover:text-[#000] ${
                                            index === pathnames.length - 1 ? "font-bold" : ""
                                        }`}
                                    >
                                        {value?.charAt(0).toUpperCase() + value?.slice(1)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                    <h2 className="text-xl font-bold">Hello, {userName || "null"}</h2>
                </div>
                <div>B</div>
            </div>
            <div className="w-full  bg-white dark:bg-[#19191C] rounded-lg shadow-lg p-6">
                <Outlet/>
            </div>
        </div>
    );
};

export default Content;
