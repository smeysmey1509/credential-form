import axios from "axios";
import React, {useEffect, useState} from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Content from "../components/Content/Content";
import axiosClient from "../apis/axiosClient";

const Dashboard = () => {
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
        <div className="flex min-h-screen">
            <Sidebar isSidebarOpen={isSidebarOpen}/>
            <div
                className={`fixed ${
                    isSidebarOpen ? "w-full left-0" : "w-[85%] left-[15%] right-0"
                } flex flex-col bg-[#f4f7fa] transition-all duration-300 ease-in-out`}
            >
                <Header toggleSidebar={toggleSidebar}/>
                <Content/>
            </div>
        </div>
    );
};

export default Dashboard;
