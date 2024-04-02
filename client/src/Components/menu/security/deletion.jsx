import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../../LoginContext/LoginContext";

function Deletion() {
  const [formData, setFormData] = useState({
    deletionReason: "",
    improveService: "",
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        "http://localhost:7000/customer/delete-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setFormData({
        deletionReason:"",
        improveService:""
      });
    }

      // const response = await axios.post(
      //   "http://localhost:7000/customer/delete-email",
      //   {
      //     deletionReason: deletionReason,
      //     improveService: improveService,
      //   }
      // );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error sending deletion email:", error);
    //   toast.error("An error occurred while sending the deletion email.");
    //   return;
    // }

    try {
      await axios.patch(`http://localhost:7000/customer/delete/${customerId}`, {
        thepassword: password,
      });
      navigate("/home");
      logout();
    } catch (error) {
      console.error("Error updating password and deleting account:", error);
      toast.error(
        "An error occurred while updating password and deleting account."
      );
    }
  };

  // const handleDeleteAccount = async () => {
  //   // const confirmed = window.confirm(
  //   //   "Are you sure you want to delete your account?"
  //   // );
  //   // if (!confirmed) {
  //   //   return;
  //   // }

  //   try {

  //     await axios.post("http://localhost:7000/customer/delete-email", {
  //       deletionReason: deletionReason,
  //       improveService: improveService,
  //     });

  //     await axios.patch(`http://localhost:7000/customer/delete/${customerId}`, {
  //       thepassword: password,
  //     });
  //     navigate("/home");
  //     logout();

  //   } catch (error) {
  //     console.error(error);
  //     toast.error("An error occurred while processing your request.");
  //   }
  // };

  return (
    <>
      <ToastContainer />
      {/* Inputs */}
      <div className="flex flex-col mx-3">
        {/* Deletion Reason */}
        <div className="flex items-center mb-4">
          <label htmlFor="deletionReason" className="mr-2">
            Why are you deleting your account?
          </label>
          <input
            id="deletionReason"
            className="border-solid border-2 rounded-md h-9 pl-2"
            type="text"
            placeholder="Select a reason"
            value={formData.deletionReason}
            onChange={(e) => setDeletionReason(e.target.value)}
          />
        </div>

        {/* Improve Service */}
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
            value={formData.improveService}
            onChange={(e) => setImproveService(e.target.value)}
          />
        </div>

        {/* Password */}
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

      <button className="my-4 ml-52" onClick={handleDeleteAccount}>
        <TiDeleteOutline className="w-4 h-4 text-[#161C2D] mr-2" />
        Delete Account
      </button>
    </>
  );
}

export default Deletion;
