import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FanousButton from "../../Button/Button";
import axios from "axios";

function Deletion({}) {
  const [showPopover, setShowPopover] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [improveService, setImproveService] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [selected, setSelected] = useState(null);

  const deletionPoints = [
    "You'll lose all the data and content in that account.",
    "You won't be able to use services where you sign in with that account.",
    "You'll lose access to subscriptions and reservations you did with that account.",
  ];

  const reasons = ["Reason 1","Reason 2", "Reason 3"];


  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    setCustomerId(storedCustomerId);
  }, []);


  const handleDeleteAccount = async () => {
    if (!deleteReason.trim()) {
      toast.error("Please select a reason for deleting your account.");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter your password to confirm account deletion.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:7000/customer/verifyPassword/${customerId}`,
        { password }
      );
  
      if (response.status === 200) {
        // If success
        setShowPopover(true);
      } else {
        // If incorrect password
        toast.error("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.");
    }
  };
  

  const handleDeleteAnyway = () => {
    setAccountDeleted(true);
  };

  return (
    <>
      <ToastContainer />
      {/* the title */}
      <div className="flex items-center m-3">
        <RiDeleteBin6Line className="w-6 h-6 text-[#161C2D]" />
        <h1 className="text-[#161C2D] text-2xl pl-2">Delete account</h1>
      </div>

      {/* space */}
      <div className="my-8" />

      {/* text */}
      <p className="mx-3">
        You can't delete your account at any time. If you change your mind, you
        might not be able to recover it after 30 days. <br /> Once the deletion
        process begins, you won't be able to reactivate your account or retrieve
        any information you have added.
      </p>

      {/* space */}
      <div className="my-8" />

      {/* meanings */}
      <div className="mx-3 mb-4">
        {deletionPoints.map((point) => (
          <li className="flex">
            <TiDeleteOutline className="w-4 h-4 text-[#161C2D] mr-2" />
            {point}
          </li>
        ))}
      </div>

      {/* space */}
      <div className="my-8" />

      {/* inputs */}
      <div className="flex flex-col mx-3 ">
        <div className="flex items-center mb-4">
          <label htmlFor="deleteReason" className="mr-2">
            Why are you deleting your account?
          </label>
          <input
        placeholder="Select a reason"
        value={deleteReason}
        onClick={() => setSelected(true)}
        className=" relative border-solid border-2 rounded-md h-9 pl-2"
      />
      {selected && (
        <div className="absolute w-56 translate-y-24 translate-x-72 z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {reasons.map((reason, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              role="menuitem"
              tabIndex="-1"
              onClick={() => {
                setDeleteReason(reason); 
                setSelected(false); 
              }}
            >
              {reason}
            </a>
          ))}
        </div>
        )}

          {/* <input placeholder="why" /> 
         {selected === 'deleteReason' && <div> 
         <div className="absolute z-10 w-full mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {reasons.map((reason, index) => (
                <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                selected={deleteReason}
                onSelect={(e)=>{
                  setDeleteReason(e)
                  }}
                  onClick={() => {
                    setDeleteReason(reason); 
                    setSelected(true); 
                  }}
                >
                {reason}</a>
          ))}
        </div> 
         </div>} */}
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="improveService" className="mr-2">
            How can we improve the service?{" "}
            <span className="text-[#858585]">(optional)</span>
          </label>
          <input
            id="improveService"
            className="border-solid border-2 rounded-md h-9 pl-2"
            type="text"
            placeholder="Enter suggestions"
            value={improveService}
            onChange={(e) => setImproveService(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="password" className="mr-2">
            To continue, please re-enter your password
          </label>
          <input
            id="password"
            className="border-solid border-2 rounded-md h-9 pl-2"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {/* forgot password */}
      <div className="mx-3">
        <p className="hover:underline text-[#6f584c]">Forgot your password?</p>
      </div>
      <FanousButton
       className="my-4 ml-52 bg-red-600 text-white hover:bg-red-800 hover:text-white"
        onClick={handleDeleteAccount} >
        Delete Account
      </FanousButton>

      {/* Popover */}
      {showPopover && !accountDeleted && (
        <>
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-594 h-472 bg-white p-6 rounded-lg z-50">
            <h2 className="text-[#161C2D] text-2xl mb-4">
              We're sorry to see you leaving
            </h2>
            <p className="mb-4">
              If you've gotten tired of getting email notifications from us, <br />
              you can <span className="text-[#3365F1]">disable them here. </span>
              <br /> Account deletion is final. There will be no way to <br />
              your account after 30 Days.
            </p>
            <div className="flex justify-between py-8">
              <FanousButton
                className="bg-red-600 text-white hover:bg-red-800 hover:text-white px-4 py-2 rounded"
                onClick={handleDeleteAnyway} >
                Delete Account Anyway
              </FanousButton>
              <FanousButton
                className="bg-gray-500 text-white hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                onClick={() => setShowPopover(false)}
              >
                Keep Account
              </FanousButton>
            </div>
          </div>
        </>
      )}
      {/* Confirmation */}
      {accountDeleted && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
            <div className="bg-white p-6 rounded-lg w-594 h-472 z-10 p-14">
              <h2 className="text-[#161C2D] text-2xl mb-4 pb-4"> Your account is deleted </h2>
              <FaRegCheckCircle className="w-12 h-12 text-[#161c2d] mx-auto mb-4" />
              <p className="text-center pt-4"> Thanks for using our website! <br /> We look forward to seeing you again. </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Deletion;
