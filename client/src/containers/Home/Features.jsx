import React from "react";
import { ImTicket } from "react-icons/im";
import { IoPersonSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";

export default function Features (){
    return(
        <div className="m-8">
        <h1 className="text-[#6F584C] 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-lg text-sm font-medium text-center">WHY CHOOSE US</h1>
        <h1 className="text-[#161C2D] 2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-xl font-bold text-center p-6">
        People choose us because we <br />
        serve the best for everyone
        </h1>
        <div className="flex flex-col gap-y-14 my-10 2xl:flex-row xl:flex-row lg:flex-row">

            <div className=" m-2 flex gap-6 2xl:w-1/3 xl:w-1/3 lg:w-1/3">
                <div className="w-auto h-16 flex items-center justify-center  bg-[#F5EFEC] rounded-2xl">
                    <ImTicket className="w-12 h-12  m-2" style={{color:'#6F584C'}}/>
                </div>
                <div>
                    <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Easy allocated seating</h1>
                    <p className="text-[#6c6969] text-lg font-sm">Choose your preferred seats directly, secure tickets for your favorite artists.</p>
                </div>
            </div>

            <div className=" m-2 flex gap-6 2xl:w-1/3 xl:w-1/3 lg:w-1/3">
                <div className="w-auto h-16 flex items-center justify-center  bg-[#F5EFEC] rounded-2xl">
                    <IoPersonSharp className="w-12 h-12 m-2 " style={{color:'#6F584C'}}/>
                </div>
                <div>
                    <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Build your community</h1>
                    <p className="text-[#6c6969] text-lg font-sm">Stay connected to your attendees with advanced email marketing tools, targeted notifications.</p>
                </div>
            </div>

            <div className=" m-2 flex gap-6 2xl:w-1/3 xl:w-1/3 lg:w-1/3">
                <div className="w-auto h-16 flex items-center justify-center  bg-[#F5EFEC] rounded-2xl">
                    <FaTasks className="w-12 h-10 m-2" style={{color:'#6F584C'}}/>
                </div>
                <div>
                    <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Organized tasks</h1>
                    <p className="text-[#6c6969] text-lg font-sm">Plan and organize your next event, with an array of innovative features, effortlessly.</p>
                </div>
            </div>
        </div>
        </div>
    )
}