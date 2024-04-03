import React, {useState,useRef,useEffect} from "react";
import data from "./BannerData";
import axios from "axios";
import EventGrid from "../../components/EventGrid/EventGrid";
import NavBar from "../../components/Navbar/NavBar";
import { BsStarFill } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { ImTicket } from "react-icons/im";
import { IoNotifications, IoPersonSharp} from "react-icons/io5";
import { useAtomValue, useSetAtom } from 'jotai'
import { isDataAvailable } from "@/lib/states";

export default function Home () {
    // Carousel logic
  const VALUE_TO_SLIDE = 400
  const [scrollValue, setScrollValue]=useState(0)
  
  const slideLeft = (n) => {
    const slider = document.getElementById('slider');
    if (typeof n === 'number')
      slider.scrollLeft = n;
    else
      slider.scrollLeft -= VALUE_TO_SLIDE;
      setScrollValue(slider.scrollLeft)
  };
  const slideRight = (n) => {
    const slider = document.getElementById('slider');
    if (typeof n === 'number')
      slider.scrollLeft = n;
    else
      slider.scrollLeft += VALUE_TO_SLIDE;
      setScrollValue(slider.scrollLeft)
  };
  const sliderRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setStartScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    setScrollValue(e.pageX - sliderRef.current.offsetLeft)
    const walk = (x - startX) * 3; 
    sliderRef.current.scrollLeft = startScrollLeft - walk;
  };

//   Events data
const [events, setEvents] = useState([]);
const showData = useAtomValue(isDataAvailable)
const setShowData = useSetAtom(isDataAvailable)

useEffect(() => {
  setShowData(false);
const fetchEvent = async () =>{
    try {
        const response = await axios.get("http://localhost:7000/event/all");
        if(response.status === 200) {
            setEvents(response.data);
          } else {
            console.log("Failed to fetch events.");
          }
    } catch (error) {
        console.log("Error: " + error.message);
    }
};
fetchEvent();
}, []);




    return (
        <>
        <NavBar />
        { !showData && <div>
          {/* Carousel */}
        <div className=" flex flex-col border-b-2 py-8 px-3">
          <div
            id="slider"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
            className="w-full h-full overflow-hidden scroll  whitespace-nowrap scroll-smooth">
            {data.map((item,i) => (
              <div key={`card-sroll-${i}`} className='p-2 relative 2xl:p-4 xl:p-4  lg:p-4  md:p-4 w-1/2 2xl:w-1/4 xl:w-1/4 lg:w-1/4 md:w-1/4 inline-block cursor-pointer  hover:scale-105 ease-in-out duration-300'
              >
                <img
                  className="w-full rounded-lg "
                  src={item.img}
                  alt='/'
                />
                <div className="absolute 2xl:m-2 xl:m-2  lg:m-2  md:m-2 top-3 right-4 flex items-center">
                  <BsStarFill style={{ color: '#ffffff' }} />
                  <h3 className="text-white p-1">New</h3>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center w-full">
          {data.slice(0, data.length - 3).map((item, i) => (
            <TbPointFilled onClick={() => {

              slideRight(i * VALUE_TO_SLIDE)
              setScrollValue(i*VALUE_TO_SLIDE)
            }}
            style={{opacity:1 - Math.abs(scrollValue-(i*VALUE_TO_SLIDE)) / ((data.length-3)*VALUE_TO_SLIDE)}}
              className={`cursor-pointer hover:scale-125 text-[#6F584C] hover:opacity-100`} />
          ))}
        </div>
        </div>
        {/* Steps */}
        <div className="2xl:px-40 xl:px-72 lg:px-40">
        {/* first part */}
       <h1 className="text-[#161C2D] text-3xl font-extrabold text-center p-10">Reserve your seat with 3 easy steps</h1>
        <h1 className="text-[#6c6969] text-lg font-medium text-center "> Start transforming your vision into a remarkable reality today!</h1>
        <div className="py-8 flex flex-col 2xl:flex-row xl:flex-row lg:flex-row justify-center items-center gap-20 ">
            {/* image */}
           <div className="relative">
           <div className="h-80 w-72 2xl:w-[22rem] 2xl:h-96 xl:w-[22rem] xl:h-96 lg:w-[22rem] lg:h-96 md:w-[22rem] md:h-96 sm:w-[22rem] sm:h-96 border-2 border-solid bg-[#4C5361] rounded-xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"></div>
           <div className="absolute h-16 w-60 bg-white rounded-lg bottom-16 -left-8 flex items-center">
            <div className="mx-3 bg-[#6F584C] rounded-full" >
                <IoNotifications className="w-6 h-6 m-2" style={{color:'#F5EFEC'}}/>
            </div>
            <div>
            <h1 className="text-[#6c6969]">New Notification!</h1>
            <h1 className="text-[#161C2D] text-lg font-semibold">Reservation done!</h1>
            </div>
           </div>
           </div>
           {/* steps */}
           <div className=" flex flex-col gap-y-7 m-4">
           {/* 1 */}
           <div className="flex gap-5">
           <div className="bg-[#6F584C] w-10 h-10 rounded-full flex items-center justify-center">
           <h1 className="text-center font-extrabold text-[#F5EFEC] mx-4 text-xl">1</h1>
           </div>
            <div>
            <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Browse Events</h1>
            <h1 className="text-[#6c6969] text-lg font-medium">Discover diverse shows from concerts to festivals, find the perfect experience.</h1>
            </div>
           </div>
           {/* 2 */}
           <div className="flex gap-5">
           <div className="bg-[#6F584C] w-10 h-10 rounded-full flex items-center justify-center">
           <h1 className="text-center text-xl font-extrabold text-[#F5EFEC] mx-4">2</h1>
           </div>
            <div>
            <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Choose Your Seat</h1>
            <h1 className="text-[#6c6969] text-lg font-medium">Easily select your preferred spot on our interactive venue layout.</h1>
            </div>
           </div>
           {/* 3 */}
           <div className="flex gap-5">
           <div className="bg-[#6F584C] w-10 h-10 rounded-full flex items-center justify-center">
           <h1 className="text-center font-extrabold text-[#F5EFEC] mx-4 text-xl">3</h1>
           </div>

            <div>
            <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Secure Your Spot</h1>
            <h1 className="text-[#6c6969] text-lg font-medium">Hassle-free ticket purchase for an elevated event experience!</h1>
            </div>
           </div>
           </div>
        </div>
        {/* second part */}
        <div className="flex text-center 2xl:text-start xl:text-start lg:text-start md:text-start flex-col md:flex-row 2xl:flex-row xl:flex-row lg:flex-row justify-around border-t-2 p-6">
            <div>
                <h1 className="text-[#161C2D] text-2xl font-bold pb-5">Ready to find your perfect Event?</h1>
                <h1 className="text-[#6c6969] text-lg font-medium pb-5">Let the discovery begin, find your unforgettable experience now!</h1>
            </div>
            <div className="pt-2">
                <button className="bg-[#6F584C] font-medium rounded-lg w-48 h-10 text-[#F5EFEC] hover:border-2 hover:border-[#6F584C] hover:bg-[#F5EFEC] hover:text-[#6F584C]">Begin Discovery</button>
            </div>
        </div>
        </div>
       {/* Events */}
        <div className="border-y-2 border-solid p-4">
        <h1 className="text-[#161C2D] text-3xl font-extrabold text-center m-5">Explore Our Event Showcase</h1>
        <h1 className="text-[#6c6969] text-lg font-medium text-center "> A Tapestry of Unforgettable Moments</h1>
        <div className="my-8 grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
        {events.map(event => (
        <EventGrid key={event.id} event={event} />
        ))}
        </div>
       
        </div>
        {/* Features */}
        <div className="m-8">
        <h1 className="text-[#6F584C] 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-lg text-sm font-medium text-center">WHY CHOOSE US</h1>
        <h1 className="text-[#161C2D] 2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-xl font-bold text-center p-6">
        People choose us because we <br />
        serve the best for everyone
        </h1>
        <div className="flex flex-col gap-y-14 my-10 2xl:flex-row xl:flex-row lg:flex-row">

            <div className=" m-2 flex gap-6 2xl:w-1/3 xl:w-1/3 lg:w-1/3">
                <div className="w-auto h-16 flex items-center justify-center  bg-[#F5EFEC] rounded-2xl">
                    <ImTicket className="w-12 h-12  m-2" style={{color:'#6F584C'}}/>
                </div>
                <div>
                    <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Easy allocated seating</h1>
                    <p className="text-[#6c6969] text-lg font-sm">Choose your preferred seats directly, secure tickets for your favorite artists.</p>
                </div>
            </div>

            <div className=" m-2 flex gap-6 2xl:w-1/3 xl:w-1/3 lg:w-1/3">
                <div className="w-auto h-16 flex items-center justify-center  bg-[#F5EFEC] rounded-2xl">
                    <IoPersonSharp className="w-12 h-12 m-2 " style={{color:'#6F584C'}}/>
                </div>
                <div>
                    <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Build your community</h1>
                    <p className="text-[#6c6969] text-lg font-sm">Stay connected to your attendees with advanced email marketing tools, targeted notifications.</p>
                </div>
            </div>

            <div className=" m-2 flex gap-6 2xl:w-1/3 xl:w-1/3 lg:w-1/3">
                <div className="w-auto h-16 flex items-center justify-center  bg-[#F5EFEC] rounded-2xl">
                    <FaTasks className="w-12 h-10 m-2" style={{color:'#6F584C'}}/>
                </div>
                <div>
                    <h1 className="text-[#161C2D] text-2xl font-bold pb-2">Organized tasks</h1>
                    <p className="text-[#6c6969] text-lg font-sm">Plan and organize your next event, with an array of innovative features, effortlessly.</p>
                </div>
            </div>
        </div>
        </div>
      </div> } </>
        )
}