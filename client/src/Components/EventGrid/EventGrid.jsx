import React from "react";
import { format } from 'date-fns';
import test from '../../assets/test.png'
import { BsStarFill, BsCashCoin } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { IoLocationOutline, IoCalendarNumberOutline} from "react-icons/io5";
import FanousButton from "../Button/Button";



export default function EventGrid ({event}) {
    return(
        <>
        <div className=" 2xl:p-3 p-5">
            {/* img */}
            <div className=" relative">
                <img src={test} alt="/" className="2xl:h-72 h-80 w-full rounded-lg"/>
                <FaRegHeart className="absolute text-white top-3 right-3 cursor-pointer" />
            </div>
           <div className="p-2 ">
            {/* title */}
           <div className="flex justify-between ">
                <p className="font-bold text-[#161C2D]">{event.name}</p>
                <div className="flex justify-center items-center">
                <p className="px-2 font-semibold text-[#161C2D]">4.95</p>
                <BsStarFill />
                </div>
            </div>
            {/* location */}
            <div className="flex items-center">
            <IoLocationOutline />
            <p className="px-2 text-[#161C2D]">{event.location}</p> 
            </div>
            {/* date */}
            <div className="flex items-center">
            <IoCalendarNumberOutline />
            <p className="px-2 text-[#161C2D]">{format(new Date(event.date), 'dd/MM/yyyy')}</p> 
            </div>
            {/* time */}
            <div className="flex items-center">
            <LuClock4 />
            <p className="px-2 text-[#161C2D]">{event.time.slice(0, -3)}</p> 
            </div>
            {/* but & pr */}
            <div className="flex justify-between">
            {/* price */}
            <div className="flex items-center">
            <BsCashCoin />
            <p className="px-2 font-semibold text-[#161C2D]">{event.price} Mad</p> 
            </div>
            {/* button */}
            <button className="bg-[#6F584C] font-bold rounded-lg w-28 h-8 text-[#F5EFEC] hover:border-2 hover:border-[#6F584C] hover:bg-[#F5EFEC] hover:text-[#6F584C] ">Add to cart</button>
            </div>
           </div>
        </div>
        </>
    )
}