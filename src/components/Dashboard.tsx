import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import {useSidebarTitle} from "../context/SidebarTitleContext";
import axiosClient from "../apis/axiosClient";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found. Redirecting to login...");
                window.location.href = "/login";
                return;
            }

            try {
                const res = await axiosClient.get('/profile')
                setMessage(res.data.message);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setMessage("Failed to fetch dashboard data. Please try again later.");

                // Optionally, redirect to login if the token is invalid
                window.location.href = "/login";
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
                className={`fixed h-full ${
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
