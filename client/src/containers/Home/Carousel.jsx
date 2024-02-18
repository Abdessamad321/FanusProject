import React, { useState, useRef } from "react";
import data from "../../constants/bannerData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";
export default function CarouselGallery() {

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
    const walk = (x - startX) * 3; // Adjust the multiplier for sensitivity
    sliderRef.current.scrollLeft = startScrollLeft - walk;
  };

  return (
    <>
      <div className=" flex flex-col border-y-2 py-8 px-3">
          <div
            id="slider"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
            className="w-full h-full overflow-hidden scroll  whitespace-nowrap scroll-smooth">
            {data.map((item,i) => (
              <div key={`card-sroll-${i}`} className='relative w-1/2 2xl:w-1/4 xl:w-1/4 lg:w-1/4 md:w-1/4 inline-block cursor-pointer p-6 hover:scale-105 ease-in-out duration-300'
              >
                <img
                  className="w-full rounded-lg "
                  src={item.img}
                  alt='/'
                />
                <div className="absolute top-7 right-8 flex items-center">
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
            // 0 -> max i * VALUE_TO_SLIDE
            // 1 -> == 
            style={{opacity:1 - Math.abs(scrollValue-(i*VALUE_TO_SLIDE)) / ((data.length-3)*VALUE_TO_SLIDE)}}
              className={`cursor-pointer hover:scale-125 text-[#6F584C] hover:opacity-100`} />
              // . . . . . . . 
          ))}
        </div>
      </div>
    </>
  )
}