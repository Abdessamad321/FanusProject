import React, { useState, useContext, useEffect } from "react";
import { Context } from "../LoginContext/LoginContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "../../assets/account.png";
import FanousButton from "../Button/Button";
import { monthOptions, countries } from "./data";
// import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import { TextInput } from "../inputs/inputs";
import { Dropdown } from "../../components/dropdowns/dropdown";

function EditProfile() {
  const authContext = useContext(Context);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    gender: "",
    code: "",
    phone: "",
    day: "",
    month: "",
    year: "",
    nationality: "",
    customer_photo: null,
  });
  console.log(customer)

  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedCustomerId = localStorage.getItem("customerId");
      setCustomerId(storedCustomerId);
      try {
        const response = await axios.get(
          `http://localhost:7000/customer/${storedCustomerId}`
        );
        const customerData = response.data;


        if (customerData.birthday) {
          const birthdayDate = new Date(customerData.birthday);
          const day = String(birthdayDate.getDate()).padStart(2, "0");
          const month = String(birthdayDate.getMonth() + 1).padStart(2, "0");
          const year = String(birthdayDate.getFullYear());

          setCustomer({
            ...customer,
            name: customerData.name,
            code: customerData.code,
            phone: customerData.phone,
            gender: customerData.gender,
            email: customerData.email,
            day: day,
            month: month,
            year: year,
            nationality: customerData.nationality,
            customer_photo: customerData.customer_photo || null,
          });
        } else {
          setCustomer({
            ...customer,
            name: customerData.name,
            code: "code",
            phone: customerData.phone,
            gender: customerData.gender,
            email: customerData.email,
            day: "Day",
            month: "Month",
            year: "Year",
            nationality: 'Select nationality',
            customer_photo: customerData.customer_photo || null,
          });
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      customer_photo: file,
    }));
    authContext.setCustomerImage(file);
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const { day, month, year, ...rest } = customer;
      const birthday = `${year}-${month}-${day}`;
      
      const formData = new FormData();
      formData.append("name", rest.name);
      formData.append("code", rest.code); 
      formData.append("phone", rest.phone); 
      formData.append("gender", rest.gender);
      formData.append("email", rest.email);
      formData.append("birthday", birthday);
      formData.append("nationality", rest.nationality);
      if (rest.customer_photo) {
        formData.append("customer_photo", rest.customer_photo);
      }

      const response = await axios.put(
        `http://localhost:7000/customer/${customerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating customer:", error.message);
    }
  };

  const handleSelectChange = (name, value) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  //BIRTHAY********************************************

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1).padStart(2, "0"),
  }));

  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: currentYear - i,
    label: `${currentYear - i}`,
  }));

  return (
    <div className="px-12">
      <div className="flex justify-between items-center">
        <span className="text-4xl font-bold">Edit profile</span>
        <div className="image bg-gray-300 rounded-full overflow-hidden">
          <label htmlFor="image-input" className=" cursor-pointer">
            <div className=" w-32 h-32 rounded-full overflow-hidden bg-gray-300 relative">
              {customer.customer_photo ? (
                <img
                  src={
                    customer.customer_photo instanceof File
                      ? URL.createObjectURL(customer.customer_photo)
                      : customer.customer_photo
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={upload} alt="" className="" />
              )}
            </div>
          </label>
          <input
            type="file"
            id="image-input"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <form>
        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold" htmlFor="fullName">
            Full Name
          </label>
          <TextInput
            className="rounded-md"
            type="name"
            id="fullName"
            name="fullName"
            placeholder="Lorem Jitam"
            value={customer.name}
            onChange={(value) => setCustomer({ ...customer, name: value })}
          />
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold" htmlFor="emailAddress">
            Email Address
          </label>
          <TextInput
            className="rounded-md"
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Lorem@gmail.com"
            value={customer.email}
            onChange={(value) => setCustomer({ ...customer, email: value })}
          />
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold">Gender</label>
          <div className="flex gap-12 items-center">
            <div className="flex gap-2 ">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={customer.gender === "male"}
                onChange={(e) => handleSelectChange("gender", e.target.value)}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={customer.gender === "female"}
                onChange={(e) => handleSelectChange("gender", e.target.value)}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold" htmlFor="phoneNumber">
            Phone Number
          </label>
          <div className="flex ">
            <Dropdown
              id="code"
              name="code"
              placeholder="nan"
              className="border-r-0 rounded-l-md text-gray-800"
              options={countries.map((country) => ({
                value: country.code,
                label: country.code,
              }))}
              value={customer.code}
              onChange={(e) => handleSelectChange("code", e.value)}
            />
            <TextInput
              className="border-l-0 rounded-r-md text-gray-800"
              type="phone"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="6-66-66-66-66"
              value={customer.phone}
              onChange={(value) => setCustomer({ ...customer, phone: value })}
            />
          </div>
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold" htmlFor="birthday">
            Birthday
          </label>
          <div className="flex gap-2">
            <Dropdown
              id="month"
              name="month"
              className="border-gray-200 rounded-md shadow-sm shadow-slate-100"
              options={monthOptions}
              value={customer.month}
              onChange={(e) => handleSelectChange("month", e.value)}
            />
            <Dropdown
              id="day"
              name="day"
              className=" border-gray-200 rounded-md shadow-sm shadow-slate-100"
              options={dayOptions}
              value={customer.day}
              onChange={(e) => handleSelectChange("day", e.value)}
            />
            <Dropdown
              id="year"
              name="year"
              className=" border-gray-200 rounded-md shadow-sm shadow-slate-100"
              options={yearOptions}
              value={customer.year}
              onChange={(e) => handleSelectChange("year", e.value)}
            />
          </div>
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <div>
            <label className="text-lg font-bold pr-2" htmlFor="nationality">
              Nationality
            </label>
            <span className="" style={{ color: "#4C5361" }}>
              (optional)
            </span>
          </div>
          <Dropdown
            id="nationality"
            name="nationality"
            options={countries.map((country) => ({
              value: country.nationality,
              label: country.nationality,
            }))}
            value={customer.nationality}
            onChange={(e) => handleSelectChange("nationality", e.value)}
            className="rounded-md"
          />
        </div>
        <FanousButton type="submit" onClick={(e) => saveChanges(e)}>
          Save
        </FanousButton>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default EditProfile;

