import React, { useState } from "react";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  BookOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
export default function Info() {
  const specificDate = new Date(2024, 2, 1);
  const formattedDate = specificDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOptionSelect = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex justify-between w-full">
      <div className="q mr-4">
        {" "}
        {/* Added mr-4 for right margin */}
        <div className="flex mb-2 gap-1">
          <CalendarMonthOutlinedIcon />
          <p>Date & Time</p>
        </div>
        <div className="flex mb-2 gap-1">
          <FmdGoodOutlinedIcon />
          <p>Location</p>
        </div>
        <div className="flex mb-2 gap-1">
          <AccessTimeOutlinedIcon />
          <p>Duration</p>
        </div>
        <div className="flex mb-2 gap-1">
          <BookOutlinedIcon />
          <p>Language</p>
        </div>
        <div className="flex mb-2 gap-1">
          <ChairOutlinedIcon />
          <p className="">Title Gorem Dolar Sit Amet</p>
        </div>
      </div>
      <div className="text-right">
        <p className="mb-2">{formattedDate}</p>
        <p className="mb-2">Room 4, Riad Leorm</p>
        <p className="mb-2">1hour 15minutes</p>
        <p className="mb-2">English</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          list="suggestions"
          onBlur={handleOptionSelect}
          className="text-right"
        />
        <datalist id="suggestions" >
          {" "}
          <option value="14$"></option>
          <option value="30$"></option>
          <option value="50$"></option>
        </datalist>
      </div>
    </div>
  );
}
