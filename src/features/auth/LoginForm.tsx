import React, { useState } from "react";
import Group from "../../assets/group.png";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookie";
import { AuthService } from "../../services/common/AuthService/AuthService";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { getApiErrorMessage } from "../../services/api/errors";

const LoginForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    // States for floating labels
    const [isUserFocused, setIsUserFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);

    const navigate = useNavigate();

    const handleAuthGoogle = () => {
        setErrorMsg("Google Sign-In integration coming soon!");
        setTimeout(() => setErrorMsg(""), 3000);
    };

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !password) {
            setErrorMsg("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        setErrorMsg("");

        try {
            const response = await AuthService.login(name, password);
            const { accessToken, user } = response.data;

            if (accessToken) {
                setCookie("accessToken", accessToken, 1);
                setCookie("user", JSON.stringify(user), 1);
                
                // Add a brief mock success delay for visual satisfaction
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/dashboard");
                }, 800);
            }
        } catch (err: unknown) {
            setIsLoading(false);
            console.error(err);
            setErrorMsg(getApiErrorMessage(err, "Login failed. Please check your credentials."));
        }
    };

    // Stagger animation container config
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            }
        }
    };

    // Individual item slide-up fade-in variants
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 15 }
        }
    };

    return (
        <motion.div 
            className="w-full px-8 py-10 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-xl rounded-2xl flex flex-col items-center justify-center text-slate-800 dark:text-slate-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Logo */}
            <motion.div className="flex justify-center mb-4" variants={itemVariants}>
                <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-2xl shadow-inner">
                    <img
                        src={Group}
                        alt="Workspace Logo"
                        className="w-12 h-12 object-contain"
                    />
                </div>
            </motion.div>

            {/* Header */}
            <motion.div className="text-center w-full mb-6" variants={itemVariants}>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Login to your Account
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                    See what going on with your business
                </p>
            </motion.div>

            {/* Error Message Alert */}
            {errorMsg && (
                <motion.div 
                    className="w-full mb-4 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-900/30 flex items-center gap-2.5 text-rose-600 dark:text-rose-400 text-xs font-medium"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                </motion.div>
            )}

            {/* Google Sign In */}
            <motion.div className="w-full" variants={itemVariants}>
                <motion.button
                    type="button"
                    onClick={handleAuthGoogle}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer text-sm font-semibold shadow-sm transition-all"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/022/484/503/small_2x/google-lens-icon-logo-symbol-free-png.png"
                        alt="Google Logo"
                        className="w-5 h-5 object-contain"
                    />
                    <span>Continue with Google</span>
                </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div 
                className="w-full flex items-center my-5" 
                variants={itemVariants}
            >
                <div className="flex-grow border-t border-slate-200/80 dark:border-slate-800"></div>
                <span className="mx-3 text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                    or email sign in
                </span>
                <div className="flex-grow border-t border-slate-200/80 dark:border-slate-800"></div>
            </motion.div>

            {/* Login Form */}
            <form className="w-full space-y-4" onSubmit={handleSubmitLogin}>
                {/* Username Input Container */}
                <motion.div className="relative w-full" variants={itemVariants}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <FiUser className="w-5 h-5" />
                    </div>
                    
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsUserFocused(true)}
                        onBlur={() => setIsUserFocused(false)}
                        value={name}
                        className="w-full pl-12 pr-4 pt-6 pb-2 border border-slate-200 dark:border-slate-800 bg-[#F1F5F9]/50 dark:bg-slate-950 focus:border-[#0E73EF] dark:focus:border-[#0E73EF] focus:bg-white dark:focus:bg-slate-950 text-slate-950 dark:text-white rounded-xl placeholder-transparent outline-none transition-all text-sm min-h-[54px]"
                    />
                    
                    <label 
                        htmlFor="username"
                        className={`absolute left-12 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-all duration-200 text-sm ${
                            isUserFocused || name !== "" 
                                ? "top-3.5 text-xs text-[#0E73EF] dark:text-[#0E73EF] font-semibold" 
                                : ""
                        }`}
                    >
                        Username
                    </label>
                </motion.div>

                {/* Password Input Container */}
                <motion.div className="relative w-full" variants={itemVariants}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <FiLock className="w-5 h-5" />
                    </div>
                    
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPassFocused(true)}
                        onBlur={() => setIsPassFocused(false)}
                        value={password}
                        className="w-full pl-12 pr-12 pt-6 pb-2 border border-slate-200 dark:border-slate-800 bg-[#F1F5F9]/50 dark:bg-slate-950 focus:border-[#0E73EF] dark:focus:border-[#0E73EF] focus:bg-white dark:focus:bg-slate-950 text-slate-950 dark:text-white rounded-xl placeholder-transparent outline-none transition-all text-sm min-h-[54px]"
                    />
                    
                    <label 
                        htmlFor="password"
                        className={`absolute left-12 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-all duration-200 text-sm ${
                            isPassFocused || password !== "" 
                                ? "top-3.5 text-xs text-[#0E73EF] dark:text-[#0E73EF] font-semibold" 
                                : ""
                        }`}
                    >
                        Password
                    </label>

                    {/* Show/Hide password toggle */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0E73EF] transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <FiEyeOff className="w-5 h-5" />
                        ) : (
                            <FiEye className="w-5 h-5" />
                        )}
                    </button>
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div 
                    className="w-full flex items-center justify-between text-xs"
                    variants={itemVariants}
                >
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="w-4.5 h-4.5 accent-[#0E73EF] border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded focus:ring-1 focus:ring-[#0E73EF] outline-none"
                        />
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                            Remember Me
                        </span>
                    </label>
                    
                    <a 
                        href="#forgot" 
                        onClick={(e) => {
                            e.preventDefault();
                            setErrorMsg("Password recovery link has been requested.");
                            setTimeout(() => setErrorMsg(""), 3000);
                        }}
                        className="text-[#0E73EF] font-semibold hover:underline"
                    >
                        Forgot Password?
                    </a>
                </motion.div>

                {/* Login Submit Button */}
                <motion.div className="pt-2" variants={itemVariants}>
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full py-3.5 bg-[#0E73EF] hover:bg-[#0c65d3] text-white rounded-xl text-center font-bold text-sm shadow-md cursor-pointer hover:shadow-lg focus:outline-none transition-all flex items-center justify-center min-h-[50px]"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-3 border-t-transparent border-white rounded-full animate-spin" />
                        ) : (
                            <span>Login</span>
                        )}
                    </motion.button>
                </motion.div>
            </form>

            {/* Create Account Footer */}
            <motion.div 
                className="w-full mt-8 text-center text-sm text-slate-500 dark:text-slate-400"
                variants={itemVariants}
            >
                <span>Don't have an account? </span>
                <a
                    href="/register"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/register");
                    }}
                    className="text-[#0E73EF] font-bold hover:underline"
                >
                    Create an Account
                </a>
            </motion.div>
        </motion.div>
    );
};

export default LoginForm;
