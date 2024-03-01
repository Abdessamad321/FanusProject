import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../LoginContext/LoginContext";

function PopupMenu({ onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleItemClick = (item) => {
    console.log(`Clicked on ${item}`);
    onClose();
  };

  const handleClose = () => {
    logout();
    onClose(); 
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div ref={modalRef} className="popup-menu bg-white shadow-md rounded-md w-56 sm:w-64">
        <ul>
          <li onClick={() => handleItemClick("/edit-profile")}>
            <Link
              className="flex justify-start items-center px-4 py-4 text-center hover:bg-gray-100 border-b border-gray-200 cursor-pointer"
              to="/edit-profile"
            >
              <div className="flex px-2">
                <UserOutlined />
              </div>
              Profile Account
            </Link>
          </li>
          <li onClick={() => handleItemClick("Reservations")}>
            <Link
              className="flex justify-start items-center px-4 py-4 text-center hover:bg-gray-100 border-b border-gray-200 cursor-pointer"
            >
              <div className="flex px-2">
                <CalendarOutlined />
              </div>
              <span className="">Reservations</span>
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link className="flex justify-start items-center px-4 py-4 text-center hover:bg-gray-100 cursor-pointer">
              <div className="flex px-2">
                <LogoutOutlined />
              </div>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PopupMenu;
