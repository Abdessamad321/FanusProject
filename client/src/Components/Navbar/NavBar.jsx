import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EventGrid from "../EventGrid/EventGrid";
import Settings from '../settings/settings';
import { useAuth } from "../LoginContext/LoginContext";
import { Calendar } from "../../components/ui/calendar";
import logo from '../../assets/logo.png'
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";



export default function NavBar() {
  
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [selected, setSelected] = useState(null);
  const searchRef = useRef(null);
  const [date, setDate] = useState();
  const [location, setLocation] = useState('');
  const [data,setData ] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSelected(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

//Filter by date
  const searchEventsBetweenDates =async (fromDateObj,toDateObj)=>{
    let events = [];
    let currentDate = new Date(fromDateObj); 
    while (currentDate <= toDateObj) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const newDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}T00:00:00.000+00:00`;
  
      try {
          const res = await axios.get('http://localhost:7000/event/all', { params: { location, date: newDateString } });
          if(res.data?.message){
            console.log(res.data?.message+'for '+currentDate)
          }else{
            console.log('event found for '+currentDate)
            events.push(...res.data); 
            setEvents(events);
          }
      } catch (error) {
          console.error(`Error fetching events for ${newDateString}:`, error.message);
      }
  
      currentDate.setDate(currentDate.getDate() + 1); 

    }

    return events;
  }

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true); 
    try {
      if (date.from && date.to) {
        const events = await searchEventsBetweenDates(date.from, date.to);
        console.log("Events between", date.from, "and", date.to + ":");
        console.log(events);
        setData(events);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
   

  useEffect(
    () => {
 
      console.log('date : ' + JSON.stringify(date))
    }
    , [date]);

    const handleProfileClick  = () => {
      if(!isLoggedIn){
        navigate("/login")
      } else{
        setShowSettings(true);
      }
    }

  return (
    <>
    <div className=" z-[999]">
        {/* first part */}
        <div className="flex items-center justify-between w-full h-20 px-8">
        {/* logo */}
        <div className="w-1/4 flex justify-start">
        <Link to="/">
            <img src={logo} alt="" className=" "/>
            {/* <h1 className="text-[#C6553B] text-4xl"> Logo </h1> */}
          </Link>
        </div>
        {/* user options */}
        <div className="w-1/4 flex justify-end">
          <MdOutlineNotificationsNone className=" mx-4 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer" />
          <FaRegHeart className="mx-2 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer" />

          <div className="profile-icon" onClick={handleProfileClick} >
            {" "}
            {/* */}
            <CgProfile className="mx-4 w-8 h-8 p-1 border-[0.5px] rounded-full cursor-pointer" />
          </div>
          {showSettings && <Settings onClose={() => setShowSettings(false)} />}
        </div>
      </div>
      {/* search bar */}
      <div className="flex justify-center">
        <div
          ref={searchRef}
          className={`relative border-solid border-2 rounded-full w-[45rem] h-16 flex items-center ${selected && 'bg-[#ebebeb]'}`}
        >
          <div className="w-full flex items-center h-full">
            {/* Location */}
            <div 
              onClick={() => {
                setSelected('location');
              }}
              id="location-filter-div"
              className={`${selected ? (selected === 'location' ? 'bg-white' : 'hover:bg-[#E3E3E3]') : 'hover:bg-[#E3E3E3]'
                }  w-4/6 pl-8 flex justify-center flex-col cursor-pointer h-full rounded-full  hover:bg-cover`}
            >
              <p className="text-xs font-semibold text-[#161C2D]">Location</p>
              <p className="text-xs font-medium text-[#858585]">{location? location : "Where are you going ?"}</p>
              {selected === 'location' && <div className="absolute bottom-0 translate-y-full">
                <input placeholder="Your destination" className="z-[999] px-4 py-2 rounded outline-stone-500 bg-stone-800 text-white placeholder:text-stone-100/70" 
                  onBlur={(e) => {
                  setLocation(e.target.value);
                }}
                />
              </div>}
            </div>
            {!selected && <div className="border-solid border-r-2 h-[65%]" />}
            {/* arrival */}
            <div
              onClick={() => {
                setSelected('arrival');
              }}
              id="arrival-filter-div"
              className={`${selected ? (selected === 'arrival' ? 'bg-white' : 'hover:bg-[#E3E3E3]') : 'hover:bg-[#E3E3E3]'
                } w-3/6 pl-8 flex justify-center flex-col cursor-pointer h-full rounded-full  hover:bg-cover`}
            >
              <p className="text-xs font-semibold text-[#161C2D]">Arrival Date</p>
              <p className="text-xs font-medium text-[#858585]">{date?.from?.toDateString() || "Add dates"}</p>
            </div>
            {!selected && <div className="border-solid border-r-2 h-[65%]" />}
            {/* Departure */}
            <div
              onClick={() => {
                setSelected('departure');
              }}
              id="departure-filter-div"
              className={`${selected ? (selected === 'departure' ? 'bg-white' : 'hover:bg-[#E3E3E3]') : 'hover:bg-[#E3E3E3]'
                } w-3/6 pl-8 flex justify-center flex-col cursor-pointer h-full rounded-full  hover:bg-cover`}
            >
              <p className="text-xs font-semibold text-[#161C2D]">Departure Date</p>
              <p className="text-xs font-medium text-[#858585]">{date?.to?.toDateString() || "Add dates"}</p>
            </div>
            {!selected && <div className="border-solid border-r-2 h-[65%]" />}
            {/* search */}
            
            <div
              onClick={() => {
                setSelected('search');
                handleSubmit()
              }}
              id="search-filter-div"
              className="w-1/6 flex items-center px-2"
            >
              <button className=" flex text-sm items-center text-[#F5EFEC]  rounded-full  p-2 bg-[#6F584C] border-0
              ">
                {/* <span className={`${selected === null ? 'hidden' : 'block'} font-bold`}>Search</span> */}
                <FaSearch className="w-8 h-8 p-2 text-[#F5EFEC] " />
              </button>
            </div>
            {(selected == 'arrival' | selected == 'departure') ?
                <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(e)=>{
                  setSelected('departure');
                  setDate(e)
                }}
                isDisabled={(day) => {
                  return day.isBefore(new Date());
                }}
                numberOfMonths={2}
                className=" rounded-md border absolute bottom-0 translate-y-full translate-x-1/4"
                /> : ''}
          </div>
        </div>
      </div>

      <div className="my-8 grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
 {isLoading ? <h1> Loading </h1> : data.map((event) => {
      return <EventGrid key={event.id} event={event} />;
  })}</div>
    </div>
    
    </>
  );
}
