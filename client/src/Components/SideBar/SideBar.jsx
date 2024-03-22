import { React, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SettingOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  LockOutlined,
} from "@ant-design/icons";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("Edit-profile"); 

  const handleItemClick = (itemName) => {
    setActiveItem(itemName); 
  };

  return (
    <div className="sidebar text-gray-500 border-r border-gray-300 w-1/5 flex flex-col justify-start items-start ">
      <ul className="flex flex-col w-full items-center p-4 ">
        <li className=" w-full">
          <NavLink
            to="/edit-profile"
            activeClassName="text-gray-300"
            className={`flex justify-center items-center  px-4 py-4 text-center hover:text-black  hover:font-bold cursor-pointer ${
              activeItem === "Edit-profile" ? "text-black font-bold" : ""
            }`}
            onClick={() => handleItemClick("Edit-profile")}
          >
            <div className="flex px-5 ">
              <EditOutlined style={{ fontSize: '1.3rem' }} />
            </div>
            <span className="text-start w-32 text-lg ">Edit profile</span>
          </NavLink>
        </li>
        <li className=" w-full">
          <NavLink
            to="/notifications"
            activeClassName="text-gray-300"
            className={`flex justify-center items-center  px-4 py-4 text-center hover:text-black  hover:font-bold cursor-pointer ${
              activeItem === "Notifications" ? "text-black  font-bold" : ""
            }`}
            onClick={() => handleItemClick("Notifications")}
          >
            <div className="flex px-5">
              <BellOutlined style={{ fontSize: '1.3rem' }} />
            </div>
            <span className="text-start w-32 text-lg ">Notifications</span>
          </NavLink>
        </li>

        <li className=" w-full">
          <NavLink
            to="/security"
            activeClassName="text-gray-300"
            className={`flex justify-center items-center  px-4 py-4 text-center hover:text-black hover:font-bold cursor-pointer ${
              activeItem === "Security" ? "text-black font-bold" : ""
            }`}
            onClick={() => handleItemClick("Security")}
          >
            <div className="flex px-5">
              <LockOutlined style={{ fontSize: '1.3rem' }} />
            </div>
            <span className="text-start w-32 text-lg ">Security</span>
          </NavLink>
        </li>

        <li className=" w-full">
          <NavLink
            to="/appearance"
            activeClassName="text-gray-300"
            className={`flex justify-center items-center  px-4 py-4 text-center hover:text-black hover:font-bold cursor-pointer ${
              activeItem === "Appearance" ? "text-black font-bold" : ""
            }`}
            onClick={() => handleItemClick("Appearance")}
          >
            <div className="flex px-5">
              <SettingOutlined style={{ fontSize: '1.3rem' }} />
            </div>
            <span className="text-start w-32 text-lg ">Appearance</span>
          </NavLink>
        </li>

        <li className=" w-full">
          <NavLink
            to="/help"
            activeClassName="text-gray-300"
            className={`flex justify-center items-center px-4 py-4 text-center hover:text-black hover:font-bold cursor-pointer ${
              activeItem === "Help" ? "text-black font-bold" : ""
            }`}
            onClick={() => handleItemClick("Help")}
          >
            <div className="flex px-5">
              <QuestionCircleOutlined style={{ fontSize: '1.3rem' }} />
            </div>
            <span className="text-start w-32 text-lg ">Help</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
