import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../Components/LoginContext/LoginContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "../../assets/account.png";
import FanousButton from "../Button/Button";
import { monthOptions, countries } from "./data";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { TextInput } from "../inputs/inputs";
function EditProfile() {
  const authContext = useContext(Context);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    customer_photo: null,
  });

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
        setCustomer({
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          nationality: customerData.nationality,
          customer_photo: customerData.customer_photo || null,
        });
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

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", customer.name);
      formData.append("email", customer.email);
      formData.append("phone", customer.phone);
      formData.append("nationality", customer.nationality);
      // formData.append("customer_photo", customer.customer_photo || null);
      if (customer.customer_photo) {
        formData.append("customer_photo", customer.customer_photo);
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
      toast.success(response.data);
    } catch (error) {
      toast.error("Couldn't update customer", { error });
    }
  };

  const handleSelectChange = (e) => {
    setCustomer({ ...customer, nationality: e.value });
  };

  //BIRTHAY********************************************
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  const yearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: 2022 - i,
    label: `${2022 - i}`,
  }));

  const handleDayChange = (selectedOption) => {
    setSelectedDay(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  //PHONE NUMBER*************************************************
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = countries.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setCustomer({ ...customer, name: e.target.value });
  };
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
                    // : `http://localhost:7000/${customer.customer_photo}`
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
            type="name"
            id="fullName"
            name="fullName"
            placeholder="Lorem Jitam"
            value={customer.name}
            onChange={ (e) => setCustomer({ ...customer, name: e.target.value })}
          />
          {/* <input
            className="border-[1px] rounded-md border-gray-200 p-3  shadow-sm shadow-slate-100"
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Lorem Jitam"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          /> */}
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold" htmlFor="emailAddress">
            Email Address
          </label>
          <input
            className="border-[1px] rounded-md border-gray-200 p-3 shadow-sm shadow-slate-100"
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Lorem@gmail.com"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
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
                // checked={formData.gender === "male"}
                // onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                // checked={formData.gender === "female"}
                // onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold" htmlFor="phoneNumber">
            Phone Number
          </label>
          <div className="flex rounded-md border border-gray-200 shadow-sm shadow-slate-100">
            <select
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "0.375rem",
                  padding: "0.25rem",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(0, 0, 0, 100)"
                    : "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                  border: state.isFocused ? "#000000" : "1px solid #e3e3e3",
                  "&:hover": {
                    borderColor: "none",
                  },
                }),
              }}
              value={selectedCountry.code}
              onChange={handleCountryChange}
              className="border-r-0 rounded-l-md pl-2 focus:outline-none focus:ring-0 text-gray-800"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
            <input
              className="border-l-0 rounded-r-md w-full p-3 shadow-sm shadow-slate-100 "
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="6-66-66-66-66"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col mb-6 gap-1">
          <label className="text-lg font-bold" htmlFor="birthday">
            Birthday
          </label>
          <div className="flex gap-2">
            {/* Month */}
            <Select
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "0.375rem",
                  padding: "0.25rem",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(0, 0, 0, 100)"
                    : "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                  border: state.isFocused ? "#000000" : "1px solid #e3e3e3",
                  "&:hover": {
                    borderColor: "none",
                  },
                }),
              }}
              options={monthOptions}
              value={selectedMonth}
              onChange={handleMonthChange}
              placeholder="Month"
            />

            {/* Day */}
            <Select
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "0.375rem",
                  padding: "0.25rem",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(0, 0, 0, 100)"
                    : "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                  border: state.isFocused ? "#000000" : "1px solid #e3e3e3",
                  "&:hover": {
                    borderColor: "none",
                  },
                }),
              }}
              options={dayOptions}
              value={selectedDay}
              onChange={handleDayChange}
              placeholder="Day"
            />
            {/* Year */}
            <Select
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "0.375rem",
                  padding: "0.25rem",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(0, 0, 0, 100)"
                    : "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                  border: state.isFocused ? "#000000" : "1px solid #e3e3e3",
                  "&:hover": {
                    borderColor: "none",
                  },
                }),
              }}
              options={yearOptions}
              value={selectedYear}
              onChange={handleYearChange}
              placeholder="Year"
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
          <Select
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderRadius: "0.375rem",
                padding: "0.25rem",
                boxShadow: state.isFocused
                  ? "0 0 0 2px rgba(0, 0, 0, 100)"
                  : "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
                border: state.isFocused ? "#000000" : "1px solid #e3e3e3",
                "&:hover": {
                  borderColor: "none",
                },
              }),
            }}
            id="nationality"
            name="nationality"
            value={
              customer.nationality
                ? { value: customer.nationality, label: customer.nationality }
                : null
            }
            onChange={handleSelectChange}
            options={countries.map((country) => ({
              value: country.nationality,
              label: country.nationality,
            }))}
            placeholder="Select nationality"
          />
        </div>

        <FanousButton type="submit" onClick={saveChanges}>
          Save
        </FanousButton>
      </form>
    </div>
  );
}

export default EditProfile;
