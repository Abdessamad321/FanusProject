import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoChevronDownSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Settings from "../settings/settings";
import { useAuth } from "../../Components/LoginContext/LoginContext";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png"
export default function NavBar() {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  const handleProfileClick  = () => {
    if(!isLoggedIn){
      navigate("/login")
    } else{
      setShowSettings(true);
    }
  }

  return (
    <>
      {/* first part */}
      <div className="flex items-center justify-between w-full h-20 px-8">
        {/* logo */}
        <div className="w-1/4">
          <Link to="/">
            <img src={logo} alt="" className=" "/>
            {/* <h1 className="text-[#C6553B] text-4xl"> Logo </h1> */}
          </Link>
        </div>
        {/* search bar */}
        <div className="w-2/4 flex justify-center">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className=" w-96 h-9 px-4  border-[1px] border-[#E3E3E3] rounded-full shadow-sm shadow-slate-300"
            />
            <button className="absolute inset-y-0 right-0 flex items-center rounded-full mx-3 my-1 bg-[#F5EFEC] border-0">
              <FaSearch className="w-7 h-7 p-2 " style={{ color: "#6F584C" }} />
            </button>
          </div>
        </div>
        {/* user options */}
        <div className="w-1/4 flex justify-end">
          <MdOutlineNotificationsNone className=" mx-4 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer" />
          <FaRegHeart className="mx-2 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer" />

          <div className="profile-icon" onClick={handleProfileClick} >
            {" "}
            {/* */}
            <CgProfile className="mx-4 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer" />
          </div>
          {showSettings && <Settings onClose={() => setShowSettings(false)} />}
        </div>
      </div>
      
    </>
  );
}
