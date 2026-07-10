import { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Content from "../../components/layout/Content/Content";
import Footer from "../../components/layout/Footer/Footer";
import { motion } from "framer-motion";
import UserService from "../../services/common/UserService/UserService";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        await UserService.getProfile();
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        // Enforce a small delay for a smooth entry transition experience
        setTimeout(() => {
          setIsAuthLoading(false);
        }, 1500);
      }
    };
    fetchDashboard();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#2d2d30] dark:text-white">
      {/* 1. Sidebar Panel: Animates in immediately from left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          loading={isAuthLoading}
        />
      </motion.div>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className={`flex min-h-screen flex-col transition-all duration-300 ${isSidebarOpen ? "lg:pl-72" : "lg:pl-20"}`}>
        
        {/* 2. Header Panel: Animates in slightly after sidebar (delay: 0.15s) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            loading={isAuthLoading}
          />
        </motion.div>
        
        {/* 3. Content Panel: Animates in after header (delay: 0.3s) */}
        <motion.div
          className="flex-grow flex flex-col"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Content loading={isAuthLoading} />
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
