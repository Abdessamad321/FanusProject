import React, { useState, useEffect } from "react";
import { BsFacebook } from "react-icons/bs";
import { IoLogoGoogle, IoLogoApple } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const removeStorage = () => {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  }
 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:7000/customer/login",
        {email, password}
      );
      window.localStorage.setItem("access_token", response.data.access_token);
      window.localStorage.setItem("refresh_token", response.data.refresh_token);
      setIsLoggedIn(true);
      toast.success("Login successful");
    } catch (error) {
      if  (error.response.status === 401){
        toast.error("Invalid email or password");
      }else{
      toast.error("Error occurred. Please try again.");
    }
  }}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />
      {isLoggedIn ? (
        <button 
          onClick={removeStorage}
          className="w-96 h-28 text-6xl bg-[#6F584C] text-[#F1DBC0] rounded-lg  m-96">
          Log Out
        </button>
      ) : (
        <div className='w-screen h-screen flex justify-center items-center'>
          {/* background      */}
          <div className="absolute h-full w-full insets-0 flex justify-between">
            <div className="bg-[#6F584C] w-1/2 p-2">LOGO</div>
            <div className=" bg-white w-1/2 p-2 flex justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          {/* form            */}
          <div className=" bg-white m-4 p-10 rounded-3xl shadow overflow-hidden drop-shadow-lg ">
            <div className="flex justify-center items-center flex-col">
              <h3 className="pb-6 font-medium drop-shadow-lg text-xl">Welcome to FanousPROD</h3>
              <div className="bg-[#F1DBC0]  h-14 xl:w-80 2xl:w-80 md:w-80 sm:w-80 lg:w-80 w-72 rounded-full p-2.5 flex flex-row justify-between">
                <button className="bg-[#6F584C] rounded-full p-1.5 w-32 text-[#F1DBC0]">
                  Login
                </button>
                <button className="rounded-full border-[#6F584C] pr-12 text-[#6F584C] ">Register</button>
              </div>
            </div>

            <form onSubmit={onSubmit} >
              {/* inputs */}
              <div className=" py-8 ">
                {/* email */}
                <div className="flex flex-col">
                  <label className="pb-2 drop-shadow-lg">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your Email Address"
                    onChange={e => setEmail(e.target.value)}
                    className="xl:w-96 2xl:w-96 md:w-96 sm:w-96 lg:w-96 w-72 px-4 drop-shadow-md  h-10 rounded-full border-solid border-2 border-[#6F584C] " />
                </div>

                {/* password */}
                <div className="flex flex-col pt-3">
                  <label className="pb-2 drop-shadow-lg">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      onChange={e => setPassword(e.target.value)}
                      className="xl:w-96 2xl:w-96 md:w-96 sm:w-96 lg:w-96 w-72  px-4 drop-shadow-md h-10 rounded-full border-solid border-2 border-[#6F584C]" />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent border-0"
                      onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEye style={{ color: '#787676' }} /> : < FaEyeSlash style={{ color: '#787676' }} />}
                    </button>
                  </div>
                </div>

                {/* rem for */}
                <div className="p-2 flex justify-between">
                  <div>
                    <input type="checkbox" name="remember" className="drop-shadow-lg" />
                    <label className="text-black drop-shadow-md ml-2">Remember Me</label>
                  </div>
                  <label className="text-black ml-2 drop-shadow-md hover:underline hover:cursor-pointer">Forgot Password?</label>
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#6F584C]  rounded-full w-40 h-10 text-[#F1DBC0] hover:bg-[#F1DBC0] hover:text-[#6F584C] ">Login</button>
              </div>
              {/* Continue with */}
              <div className="pt-7 flex flex-col  items-center">
                <h4 className="text-[#787676] py-3">Or continue with</h4>
                <div className="flex flex-row items-center gap-6 justify-center">
                  <BsFacebook className="w-9 h-9 hover:cursor-pointer" />
                  <IoLogoGoogle className="w-9 h-9 hover:cursor-pointer" />
                  <IoLogoApple className="w-10 h-10 hover:cursor-pointer mb-1.5" />
                </div>

              </div>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
