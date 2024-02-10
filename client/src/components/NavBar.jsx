import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoChevronDownSharp } from "react-icons/io5";


export default function NavBar(){
    
    return(
        <>
        {/* first part */}
        <div className="flex items-center justify-between w-full h-20 px-8">
            {/* logo */}
            <div className="w-1/4">
                <h1 className="text-[#C6553B] text-4xl"> Logo </h1>
            </div>
            {/* search bar */}
            <div className="w-2/4 flex justify-center">
            <div className="relative">
            <input type="search"
            placeholder="Search"
            className=" w-96 h-9 px-4  border-[1px] border-[#E3E3E3] rounded-full shadow-sm shadow-slate-300" />
            <button className="absolute inset-y-0 right-0 flex items-center rounded-full mx-3 my-1 bg-[#F5EFEC] border-0">
                <FaSearch className="w-7 h-7 p-2 " style={{color:'#6F584C'}}/>   
            </button>
            </div>
            </div>
            {/* user options */}
            <div className="w-1/4 flex justify-end">
                <MdOutlineNotificationsNone className=" mx-4 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer"/>
                <FaRegHeart className="mx-2 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer"/>
                <CgProfile className="mx-4 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer"/>
            </div>
        </div>
        {/* second part */}
        <div className="gap-6 flex h-16 w-full items-center justify-center border-y-[1px]  ">
            <h1 className="hover:underline cursor-pointer text-[#161C2D]">Home</h1>
            <h1 className="hover:underline cursor-pointer text-[#161C2D]">About us</h1>
            <div className="flex">
            <h1 className="hover:underline cursor-pointer text-[#161C2D]">Help center</h1> <IoChevronDownSharp style={{color:'#161C2D'}} className="mt-2"/>
            </div>
            <h1 className="hover:underline cursor-pointer text-[#161C2D]">Find event</h1>
        </div>
        </>
    )
}