import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import EditProfile from "../../Components/menu/editProfile";
import Notifications from "../../Components/menu/notifications.jsx";
import Security from "../../Components/menu/security.jsx";
import Appearance from "../../Components/menu/appearance.jsx";
import Help from "../../Components/menu/help.jsx";

function Profile() {
  const [selectedItem, setSelectedItem] = useState("");
  const loca = useLocation();

  useEffect(() => {
    const currentPage = loca.pathname.split("/").pop();
    setSelectedItem(currentPage || "edit-profile");
  }, [loca.pathname]);

  return (
    <div className="flex my-16">
      {(loca.pathname === "/edit-profile" || loca.pathname === "/notifications" || loca.pathname === "/security" || loca.pathname === "/appearance" || loca.pathname === "/help") && <Sidebar />}
      <div className="content flex-grow">
        <Routes>
          {/* <Route path="/" element={<EditProfile />} /> */}
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/security" element={<Security />} />
          <Route path="/appearance" element={<Appearance />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
