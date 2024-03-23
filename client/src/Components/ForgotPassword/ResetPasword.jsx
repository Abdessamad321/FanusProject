import React, { useState } from "react";
import FanousButton from "../Button/Button";
import { CloseOutlined } from "@ant-design/icons";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg">
        <div className="absolute h-full w-full insets-0 flex justify-between ">
          <div className="bg-[#6F584C] text-xl w-1/2 p-2">LOGO</div>
          <div className="bg-white w-1/2 p-2 flex justify-end">
            <CloseOutlined className="" />
          </div>
        </div>
        <div className="flex justify-center z-[100] items-center h-screen">
          <form action="submit" className="bg-white w-[430px] shadow-md rounded-3xl px-10 py-28 m-1 ">
            <h2 className="mb-4 font-medium text-[#161C2D]">Reset Password</h2>
            <p className="text-[#757474]">Enter your New Password below</p>
            <div className="py-16">
              {/* New Password */}
              <p className="text-[#757474] pb-3 ml-4 text-sm">New Password</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="shadow appearance-none border  border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(true)}
                />
                {isPasswordFocused && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? (
                      <VscEyeClosed className="h-5 w-5 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                    ) : (
                      <VscEye className="h-5 w-5 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility} />
                    )}
                  </span>
                )}
              </div>
              {/* Confirm New Password */}
              <p className="text-[#757474] py-3 ml-4 text-sm">Confirm New Password</p>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="shadow appearance-none border flex items-center border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(true)}
                />
                {isConfirmPasswordFocused && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showConfirmPassword ? (
                      <VscEyeClosed className="h-5 w-5 text-gray-500 cursor-pointer" onClick={toggleConfirmPasswordVisibility} />
                    ) : (
                      <VscEye className="h-5 w-5 text-gray-500 cursor-pointer" onClick={toggleConfirmPasswordVisibility} />
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <FanousButton className={`w-full mx-8 rounded-full h-12 text-[#F1DBC0] hover:text-[#6F584C]`}> Submit </FanousButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
