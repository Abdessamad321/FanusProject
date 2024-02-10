import React, { useState } from "react";
import "./styles.css";
import { BsFacebook } from "react-icons/bs";
import { IoLogoGoogle, IoLogoApple } from "react-icons/io5";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

function register() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  


  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white w-[430px] shadow-md rounded-3xl px-10 pt-6 pb-8 m-1">
          <h2 className="text-center mb-4">Welcome to FanousPROD</h2>
          <div className="flex justify-center items-center mb-4">
            <div className="bg-[#F1DBC0] w-3/4 px-2 py-2 items-center mb-4 rounded-full">
            <button
              className={`w-1/2 py-1 rounded-full ${
                isLogin
                  ? "bg-[#F1DBC0] text-[#6F584C]"
                  : "bg-[#6F584C] text-[#F1DBC0]"
              }`}
              onClick={toggleForm}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-1 rounded-full ${
                !isLogin
                  ? "bg-[#F1DBC0] text-[#6F584C]"
                  : "bg-[#6F584C] text-[#F1DBC0]"
              }`}
              onClick={toggleForm}
            >
              Register
            </button>
            </div>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border border-[#6F584C] rounded-full w-full py-2 px-3 w-80 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your Email Address"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border border-[#6F584C] border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Enter your Phone Number"
            />
          </div>
          <div className="mb-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="mb-2 relative">
              <input
                className="shadow appearance-none border border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={inputType}
                placeholder="Enter your Password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <EyeInvisibleFilled
                    className="h-6 w-6 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <EyeFilled
                    className="h-6 w-6 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center mb-2 justify-center">
            <button
              className="bg-[#6F584C] text-white font-bold py-1 px-8 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              // onClick={onSubmit}
            >
              Register
            </button>
          </div>
          <h2 className="text-center mb-2">Or continue with</h2>
          <div className="flex flex-row items-center gap-6 justify-center">
            <BsFacebook className="w-8 h-8" />
            <IoLogoGoogle className="w-8 h-8" />
            <IoLogoApple className="w-10 h-10 mb-2" />
          </div>
        </form>
      </div>
    </>
  );
}

export default register;
