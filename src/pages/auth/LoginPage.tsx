import React from "react";
import LoginForm from "../../features/auth/LoginForm";
import { useTheme } from "../../hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const LoginPage = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-[#F1F5F9] dark:bg-[#0f172a] transition-colors duration-300">
            {/* Theme Toggle Button */}
            <motion.button
                onClick={toggleTheme}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-slate-200/50 dark:border-zinc-700/50 text-slate-800 dark:text-zinc-200 shadow-lg cursor-pointer hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                aria-label="Toggle theme"
            >
                {theme === "light" ? (
                    <FiMoon className="w-5 h-5" />
                ) : (
                    <FiSun className="w-5 h-5" />
                )}
            </motion.button>

            {/* Background elements to add depth while remaining clean and slate gray */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0E73EF]/5 dark:bg-[#0E73EF]/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

            {/* Centered Login Form Container */}
            <motion.div 
                className="w-full max-w-md mx-4 relative z-10 flex justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <LoginForm />
            </motion.div>
        </div>
    );
};

export default LoginPage;
