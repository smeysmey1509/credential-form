import React, {useState} from "react";
import Group from "../assets/group.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleAuthGoogle = () => {
        alert(123);
    };

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5002/api/v1/login", {
                name,
                password,
            });

            const accessToken = response.data.accessToken;

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-[45%] flex flex-col items-center justify-center">
            <div className="w-3/6 h-auto flex flex-start">
                <img
                    src={Group}
                    alt="image"
                    style={{width: "62px", height: "62px"}}
                />
            </div>
            <div
                className="w-3/6 h-fit flex flex-col items-center justify-center"
                style={{marginTop: "18px"}}
            >
                <h2 className="w-full flex items-start text-[32px] font-bold text-[#525252]">
                    Login to your Account
                </h2>
                <p
                    className="w-full items-start text-[#525252]"
                    style={{fontSize: "14px", lineHeight: "24px"}}
                >
                    See what going on with your business
                </p>
                <div
                    className="w-full flex items-center justify-center gap-4 border-1 border-[#E8E8E8] rounded-lg cursor-pointer"
                    style={{padding: "8px", marginTop: "24px"}}
                    onClick={handleAuthGoogle}
                >
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/022/484/503/small_2x/google-lens-icon-logo-symbol-free-png.png"
                        alt=""
                        style={{width: "18px", height: "18px"}}
                    />
                    <p className="text-[#828282] text-sm font-bold">
                        Continue with Google
                    </p>
                </div>
                <span
                    className="w-full flex items-center justify-center text-[12px] text-[#E8E8E8] cursor-auto"
                    style={{marginTop: "32px"}}
                >
          ------------<p className="text-[#a1a1a1]">or Sign in with Email</p>
          ------------
        </span>
                <div className="w-full h-auto">
                    <form
                        className="w-full"
                        style={{marginTop: "24px"}}
                        onSubmit={handleSubmitLogin}
                    >
                        <div className="w-full">
                            <label htmlFor="" className="text-[#828282] text-sm">
                                Email
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="mail@abc.com"
                                className="w-full border border-solid border-[#ded2d9] rounded placeholder:text-sm outline-none"
                                style={{padding: "8px"}}
                            />
                        </div>
                        <div className="w-full" style={{marginTop: "18px"}}>
                            <label
                                htmlFor=""
                                className="text-[#828282] text-sm"
                                style={{marginTop: "12px"}}
                            >
                                Password
                            </label>
                            <input
                                type="text"
                                placeholder="**************"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="w-full border border-solid border-[#ded2d9] rounded placeholder:text-sm outline-none"
                                style={{padding: "8px"}}
                            />
                        </div>
                        <div
                            className="w-full flex items-center justify-between text-[12px]"
                            style={{marginTop: "5px"}}
                        >
                            <div className="flex items-center justify-center gap-1">
                                <input
                                    type="checkbox"
                                    className="accent-[#7f265b] rounded-md outline-none"
                                />
                                <label htmlFor="" className="text-[#a1a1a1]">
                                    Remember Me
                                </label>
                            </div>
                            <div>
                                <a href="" className="w-1/2 text-[#7f265b] font-bold">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            style={{padding: "8px", marginTop: "24px"}}
                            className="w-full bg-[#7f265b] rounded text-white text-center font-bold cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div
                    className="w-full h-fit text-[#828282] font-normal flex items-center justify-center text-sm gap-2"
                    style={{marginTop: "72px"}}
                >
                    Don't have an account?
                    <a
                        href="http://localhost:5173/register?"
                        className="text-[#7F265B] cursor-pointer underline font-bold"
                    >
                        Create an Account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
