import React from "react";
import FanousButton from "../Button/Button";
import {CloseOutlined} from "@ant-design/icons";

export default function ForgotPassword () {

    return(
        <>
        <div className="fixed inset-0 flex justify-center items-center bg">
        <div className="absolute h-full w-full insets-0 flex justify-between ">
          <div className="bg-[#6F584C] text-xl w-1/2 p-2">LOGO</div>
          <div className="bg-white w-1/2 p-2 flex justify-end">
            <CloseOutlined className=""  />
          </div>
        </div>
        <div className="flex justify-center z-[100] items-center h-screen">
        <form className="bg-white w-[430px] shadow-md rounded-3xl px-10 py-28 m-1 ">
            <h2 className="mb-4 font-medium text-[#161C2D]">Forget Password</h2>
            <p className="text-[#757474]">Enter your registered email below</p>
           <div className="py-16">
            <p className="text-[#757474] pb-3 ml-4">Enter Email Address</p>
            <input type="email" placeholder="Email"  className="shadow appearance-none border  border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <p className="text-[#757474] pt-3 ml-4">Remember the password? <b className="text-[#6F584C] hover:underline cursor-pointer">Login</b></p>
           </div>
          <div className="flex justify-center">
          <FanousButton className={`w-full mx-8 rounded-full h-12 text-[#F1DBC0] hover:text-[#6F584C]`}> Submit </FanousButton>
          </div>
          </form>
        </div>
      </div>
     
        </>
    )
}