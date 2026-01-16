import React from "react";
import LoginForm from "../../features/auth/LoginForm";
import ImageLogo from "../../assets/illustration.png";

const LoginPage = () => {
    return (
        <div className="w-full h-screen flex bg-white dark:bg-[#121212]">
            <div className="w-[55%] h-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center rounded-3xl">
                <img src={ImageLogo} alt="image" className="w-full h-full rounded-b-4xl"
                     style={{padding: '10px', borderRadius: '24px'}}/>
            </div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
