import React, { useState, useEffect } from "react";
import FanousButton from "../../Button/Button";
import { TextInput } from "../../inputs/inputs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

function security() {
  const [inputType, setInputType] = useState('password')
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, [])

  const handleResetPassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;
  
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
  
    try {
      const response = await axios.patch(
        `http://localhost:7000/customer/update/${customerId}`,
        { old_password: oldPassword, new_password: newPassword }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Password reset failed:", error);
    }
  };
  

  return (
        <div className="px-12">
          <div className="my-11">
            <span className="text-4xl font-bold">Security</span>
          </div>
          <div className="mb-4">
            <p>Choose a secure password and don't reuse it.</p>
          </div>
          <div className="mb-4">
            <span className="text-xl font-bold">Change password</span>
          </div>
          <div className="flex flex-col mb-6 gap-1">
            <label htmlFor="">Current Password</label>
            <div className="mb-2 relative">
              <TextInput
              className="rounded-md"
                id="password"
                type={inputType}
                placeholder="Enter Current Password"
                name="password"
                value={passwords.oldPassword}
                onChange={(value) =>
                  setPasswords({ ...passwords, oldPassword: value })
                }
                />
            </div>
          </div>

          <div className="flex flex-col mb-6 gap-1">
            <label htmlFor="">Enter New Password</label>
            <div className="mb-2 relative">
              <TextInput
              className="rounded-md"
                id="password"
                type={inputType}
                placeholder="Enter New Password"
                name="password"
                value={passwords.newPassword}
            onChange={(value) =>
              setPasswords({ ...passwords, newPassword: value })
            }
            />
            </div>
          </div>

          <div className="flex flex-col mb-6 gap-1">
            <label htmlFor="">Confirm New Password</label>
            <div className="mb-2 relative">
              <TextInput
              className="rounded-md"
              id="password"
                type={inputType}
                placeholder="Confirm New Password"
                name="password"
                value={passwords.confirmPassword}
            onChange={(value) =>
              setPasswords({ ...passwords, confirmPassword: value })
            }/>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FanousButton onClick={handleResetPassword}>
                Update Password
              </FanousButton>
              <span>Forgot Current Password?</span>
            </div>
            <div className="flex justify-center items-center gap-1 text-red-500">
              <DeleteOutlined className="flex" />
              <span>Delete Account</span>
            </div>
          </div>
          <ToastContainer />
        </div>
  );
}

export default security;



