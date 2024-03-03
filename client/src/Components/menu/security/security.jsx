import React, { useState } from "react";
import FanousButton from "../../Button/Button";
import { TextInput } from "../../inputs/inputs";

import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

function security() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            placeholder="Enter your Password"
            name="password"
            // value={formData.password}
            // onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {showPassword ? (
              <EyeInvisibleFilled
                className="flex justify-center items-center h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeFilled
                className="flex justify-center items-center h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-6 gap-1">
        <label htmlFor="">Enter New Password</label>
        <div className="mb-2 relative">
          <TextInput
            id="password"
            type={inputType}
            placeholder="Enter your Password"
            name="password"
            // value={formData.password}
            // onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {showPassword ? (
              <EyeInvisibleFilled
                className="flex justify-center items-center h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeFilled
                className="flex justify-center items-center h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-6 gap-1">
        <label htmlFor="">Confirm New Password</label>
        <div className="mb-2 relative">
          <TextInput
            id="password"
            type={inputType}
            placeholder="Enter your Password"
            name="password"
            // value={formData.password}
            // onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {showPassword ? (
              <EyeInvisibleFilled
                className="flex justify-center items-center h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeFilled
                className="flex justify-center items-center h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FanousButton>Update Password</FanousButton>
          <span>Forgot Current Password?</span>
        </div>
        <div>
          <span className="text-red-500">Delete Account</span>
        </div>
      </div>
    </div>
  );
}

export default security;
