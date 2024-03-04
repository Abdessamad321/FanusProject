import React, { useState, useEffect } from "react";
import FanousButton from "../../Button/Button";
import { TextInput } from "../../inputs/inputs";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

function security() {
  const { token } = useParams();
  // const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/customer/password/reset/verify/${token}`
      );
      // toast.success(response.data.message);
      setIsValidToken(true);
    } catch (error) {
      toast.error("Token verification failed:", error);
      setIsValidToken(false);
      console.log(error)
    }
  };

  const handleResetPassword = async () => {
    try {
      await verifyToken();
      if (isValidToken) {
        setLoading(true);

        if (!newPassword.trim() || newPassword.trim().length < 6) {
          toast.error(
            "Password must not be empty and must be at least 6 characters"
          );
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        const response = await axios.post(
          `http://localhost:7000/customer/password/reset/update/${token}`,
          {
            newPassword: newPassword,
          }
        );
        toast.success(response.data.message);
        navigate("/home");
      } else {
        toast.error("Invalid token");
      }
    } catch (error) {
      toast.error("Password reset failed:", error);
    } finally {
      setLoading(false);
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
            id="password"
            type={inputType}
            placeholder="Enter Current Password"
            name="password"
            // value={currentPassword}
            // onChange={setCurrentPassword}
          />
        </div>
      </div>

      <div className="flex flex-col mb-6 gap-1">
        <label htmlFor="">Enter New Password</label>
        <div className="mb-2 relative">
          <TextInput
            id="password"
            type={inputType}
            placeholder="Enter New Password"
            name="password"
            value={newPassword}
            onChange={(value) => setNewPassword(value)}
          />
        </div>
      </div>

      <div className="flex flex-col mb-6 gap-1">
        <label htmlFor="">Confirm New Password</label>
        <div className="mb-2 relative">
          <TextInput
            id="password"
            type={inputType}
            placeholder="Confirm New Password"
            name="password"
            value={confirmPassword}
            onChange={(value) => setConfirmPassword(value)}
          />
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

