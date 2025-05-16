import React from "react";
import ImageLogo from "../assets/illustration.png";
import { RegisterForm } from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="w-full h-screen flex bg-[#fff]">
      <div className="w-[55%] h-full bg-[#fff] flex items-center justify-center rounded-3xl">
        <img src={ImageLogo} alt="image" className="w-full h-full rounded-b-4xl" style={{ padding: '10px', borderRadius: '24px' }} />
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
