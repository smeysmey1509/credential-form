import axios from "axios";
import React, {useEffect, useState} from "react";
import Header from "../../layout/Header/Header";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Content from "../../layout/Content/Content";
import Footer from "../../layout/Footer/Footer";
import axiosClient from "../../../services/api/axiosClient";

const Layout = () => {
    const [message, setMessage] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await axiosClient.get('/profile')
                setMessage(res.data.message);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setMessage("Failed to fetch dashboard data. Please try again later.");
                // Optionally, redirect to login if the token is invalid
                // window.location.href = "/login";
                return;
            }
        };
        fetchDashboard();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <main className="flex max-h-full">
            <Sidebar isSidebarOpen={isSidebarOpen}/>
            <div
                className={`fixed max-h-full overflow-y-auto ${
                    isSidebarOpen ? "w-full h-screen max-h-full left-0" : "w-[85%] left-[15%] right-0"
                } flex flex-col bg-[#fff] transition-all duration-300 ease-in-out`}
            >
                <Header toggleSidebar={toggleSidebar}/>
                <Content/>
                <Footer/>
            </div>
        </main>
    );
};

export default Layout;
