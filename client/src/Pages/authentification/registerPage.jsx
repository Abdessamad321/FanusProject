import React, { useState, useContext } from "react";
import { BsFacebook } from "react-icons/bs";
import { IoLogoGoogle, IoLogoApple } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeFilled,
  EyeInvisibleFilled,
  CloseOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function registerPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:7000/customer/create",
        formData
      );
      console.log(response);

      toast.success(
        "Registration successful, Check your Email to activate your account"
      );
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.err;
        toast.error(
          [...validationErrors, "Please check your input and try again."].join(
            "\n"
          )
        );
      } else {
        const errorMessage = error.response?.data?.err || "An error occurred";
        toast.error(errorMessage);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    window.history.go(-2)
  };


  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute h-full w-full insets-0 flex justify-between ">
          <div className="bg-[#6F584C] text-xl w-1/2 p-2">LOGO</div>
          <div className="bg-white w-1/2 p-2 flex justify-end">
            <CloseOutlined className="" onClick={handleClose} />
          </div>
        </div>
        <div className="flex justify-center z-[100] items-center h-screen">
          <form
            className="bg-white w-[430px] shadow-md rounded-3xl px-10 pt-6 pb-8 m-1"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center mb-4">Welcome to FanousPROD</h2>
            <div className="flex justify-center items-center mb-4">
              <div className="bg-[#F1DBC0] flex w-3/4 px-2 py-2 items-center shadow-md mb-4 rounded-full">
                <Link
                  to="/login"
                  className={`flex w-1/2 py-1 justify-center rounded-full ${
                    !isLogin
                      ? "bg-[#6F584C] text-[#F1DBC0]"
                      : "bg-[#F1DBC0] text-[#6F584C]"
                  }`}
                  onClick={toggleForm}
                  type="button"
                >
                  Login
                </Link>
                <Link
                  to="/create"
                  className={`flex w-1/2 py-1 justify-center rounded-full ${
                    isLogin
                      ? "bg-[#6F584C] text-[#F1DBC0]"
                      : "bg-[#F1DBC0] text-[#6F584C]"
                  }`}
                  onClick={toggleForm}
                  type="button"
                >
                  Register
                </Link>
              </div>
            </div>
            <div className="mb-2">
              <label
                className="block drop-shadow-lg text-[#161C2D] text-gray-700 text-sm font-bold mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border border-[#6F584C] rounded-full w-full py-2 px-3 w-80 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border border-[#6F584C] border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Enter your Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label
                className="block drop-shadow-lg text-[#161C2D] text-sm font-bold mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mb-2 relative">
                <input
                  className="shadow appearance-none border border-[#6F584C] rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={inputType}
                  placeholder="Enter your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <EyeInvisibleFilled
                      className="h-6 w-6 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <EyeFilled
                      className="h-6 w-6 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center mb-2 justify-center">
              <button
                className="bg-[#6F584C] text-white font-bold py-1 px-8 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
            <h2 className="text-center mb-2">Or continue with</h2>
            <div className="flex flex-row items-center gap-6 justify-center">
              <BsFacebook className="w-8 h-8" />
              <button>
                <IoLogoGoogle className="w-8 h-8" />
              </button>
              <IoLogoApple className="w-10 h-10 mb-2" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default registerPage;























