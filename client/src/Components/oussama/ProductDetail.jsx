import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import FanousButton from "../Button/Button";
import R from "../../assets/R.jpg";
import ProductInfo from "./ProductInfo";
import QuantitySelector from "./QuantitySelector";
import Info from "./info";
import MyCarousel from "./MyCarousel";
import {
  ArrowLeftOutlined,
  ShareAltOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Feedback from "../oussama/feedback";

import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function ProductDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDescription, setShowDescription] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:7000/event/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // if (!event) return <div>No event data available</div>;

  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="flex justify-between items-center mx-6 px-8">
        <ArrowLeftOutlined
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          style={{ fontSize: "24px" }}
        />
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">{event.name}</h2>
          <p className="mx-5">Owner Consectetur Elite</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBookmark} style={{ fontSize: "24px" }} />
          <ShareAltOutlined
            className="cursor-pointer"
            style={{ fontSize: "24px" }}
          />
        </div>
      </div>
      {/* Product Details */}
      <div className="flex mx-8 mt-6 px-16">
        <div className="w-1/2 relative">
          {/* <img className="absolute top-0 left-0 w-full h-full object-cover" src={event.event_image} alt={event.name} /> */}
          {/* Placeholder image */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={R}
            alt=""
          />
        </div>
        <div className="w-1/2 ml-28 py-8">
          <div className="border-b-2 pb-6">
            <ProductInfo
              price={event.price}
              oldPrice={69.99}
              discount={30}
              saleEndDate="2024-04-30T23:59:59Z"
            />
          </div>
          <div className="mb-12 pt-6">
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
                <p className="mb-2">{formatDate(event.date)}</p>
                <p className="mb-2"> {event.location}</p>
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
                <datalist id="suggestions">
                  {" "}
                  <option value="14$"></option>
                  <option value="30$"></option>
                  <option value="50$"></option>
                </datalist>
              </div>
            </div>
          </div>
          <div className="mb-6 flex gap-6">
            <QuantitySelector />
            <FanousButton 
                // className="py-1 px-8 rounded-full focus:outline-none focus:shadow-outline"
                className="flex justify-center py-4 items-center text-sm rounded-xl w-72 gap-2">
              <ShoppingOutlined style={{ fontSize: "18px" }} />
              Add To Cart
            </FanousButton>
          </div>
        </div>
      </div>
      {/* Description and Feedback */}
      <div className="description mx-6 mt-16 mb-24">
        <div className="relative">
          <div className="flex mb-8">
            <div
              onClick={() => setShowDescription(true)}
              className={` py-2 px-4 ${
                showDescription
                  ? "text-[#6f584c] z-10 font-bold border-b-4 border-[#6f584c]"
                  : "text-[#f1dbc0]"
              }`}
            >
              Description
            </div>
            <div
              onClick={() => setShowDescription(false)}
              className={` py-2 px-4 ${
                !showDescription
                  ? "text-[#6f584c] z-10 font-bold border-b-4 border-[#6f584c]"
                  : "text-[#f1dbc0]"
              }`}
            >
              Feedback
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-b-4 border-[#f1dbc0]"></div>
        </div>
        {showDescription ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Description Content</h2>
            {event.description}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-2">Customer Feedback</h2>
            <Feedback />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2 ml-6">
          Similar Event You Might Also Like
        </h2>
        <MyCarousel />
      </div>
    </div>
  );
}
