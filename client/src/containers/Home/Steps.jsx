import React from "react";
import { IoNotifications } from "react-icons/io5";

export default function Steps () {
    return(
        <>
       <div className="2xl:px-72 xl:px-72 lg:px-40">
        {/* first part */}
       <h1 className="text-[#161C2D] text-3xl font-extrabold text-center p-10">Reserve your seat with 3 easy steps</h1>
        <h1 className="text-[#6c6969] text-lg font-medium text-center "> Start transforming your vision into a remarkable reality today!</h1>
        <div className="py-8 flex flex-col 2xl:flex-row xl:flex-row lg:flex-row justify-center items-center gap-20 ">
            {/* image */}
           <div className="relative">
           <div className="h-80 w-72 2xl:w-[22rem] 2xl:h-96 xl:w-[22rem] xl:h-96 lg:w-[22rem] lg:h-96 md:w-[22rem] md:h-96 sm:w-[22rem] sm:h-96 border-2 border-solid bg-[#4C5361] rounded-xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"></div>
           {/* <div className="absolute h-16 w-60 bg-white rounded-lg bottom-16 -left-8 flex items-center">
            <div className="mx-3 bg-[#6F584C] rounded-full" >
                <IoNotifications className="w-6 h-6 m-2" style={{color:'#F5EFEC'}}/>
            </div>
            <div>
            <h1 className="text-[#6c6969]">New Notification!</h1>
            <h1 className="text-[#161C2D] text-lg font-semibold">Reservation done!</h1>
            </div>
           </div> */}
           </div>
           {/* steps */}
           <div className=" flex flex-col gap-y-7 m-4">
           {/* 1 */}
           <div className="flex gap-5">
           <div className="bg-[#6F584C] w-10 h-10 rounded-full flex items-center justify-center">
           <h1 className="text-center font-extrabold text-[#F5EFEC] mx-4 text-xl">1</h1>
           </div>
            <div>
            <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Browse Events</h1>
            <h1 className="text-[#6c6969] text-lg font-medium">Discover diverse shows from concerts to festivals, find the perfect experience.</h1>
            </div>
           </div>
           {/* 2 */}
           <div className="flex gap-5">
           <div className="bg-[#6F584C] w-10 h-10 rounded-full flex items-center justify-center">
           <h1 className="text-center text-xl font-extrabold text-[#F5EFEC] mx-4">2</h1>
           </div>
            <div>
            <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Choose Your Seat</h1>
            <h1 className="text-[#6c6969] text-lg font-medium">Easily select your preferred spot on our interactive venue layout.</h1>
            </div>
           </div>
           {/* 3 */}
           <div className="flex gap-5">
           <div className="bg-[#6F584C] w-10 h-10 rounded-full flex items-center justify-center">
           <h1 className="text-center font-extrabold text-[#F5EFEC] mx-4 text-xl">3</h1>
           </div>

            <div>
            <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Secure Your Spot</h1>
            <h1 className="text-[#6c6969] text-lg font-medium">Hassle-free ticket purchase for an elevated event experience!</h1>
            </div>
           </div>
           </div>
        </div>
        {/* second part */}
        <div className="flex text-center 2xl:text-start xl:text-start lg:text-start md:text-start flex-col md:flex-row 2xl:flex-row xl:flex-row lg:flex-row justify-around border-t-2 p-6">
            <div>
                <h1 className="text-[#161C2D] text-2xl font-bold pb-5">Ready to find your perfect Event?</h1>
                <h1 className="text-[#6c6969] text-lg font-medium pb-5">Let the discovery begin, find your unforgettable experience now!</h1>
            </div>
            <div className="pt-2">
                <button className="bg-[#6F584C] font-medium rounded-lg w-48 h-10 text-[#F5EFEC] hover:bg-[#F5EFEC] hover:text-[#6F584C]">Begin Discovery</button>
            </div>
        </div>
       </div>
        </>
    )
}