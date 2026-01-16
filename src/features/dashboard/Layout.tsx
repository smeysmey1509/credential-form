import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Content from "../../components/layout/Content/Content";
import Footer from "../../components/layout/Footer/Footer";
import axiosClient from "../../services/api/axiosClient";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        await axiosClient.get("/profile");
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboard();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div
        className={`relative flex flex-col min-h-screen bg-[#fff] transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-full ml-0" : "w-[87%] ml-[13%]"
          }`}
      >
        {/* 🧠 Freeze Header */}
        <div className="sticky top-0 z-50">
          <Header toggleSidebar={toggleSidebar} />
        </div>

        {/* Content Scroll Area */}
        <div className="flex-grow overflow-y-auto">
          <Content />
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default Layout;
