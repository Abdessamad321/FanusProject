import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ eventDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mx-2">
        <div className="border border-red-500 rounded-full p-2">
          <span className="text-2xl text-red-500">{timeLeft.days}</span>
        </div>
        <span className="text-red-500">Days</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-4xl text-red-500">{":"}</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <div className="border border-red-500 rounded-full p-2">
          <span className="text-2xl text-red-500">{timeLeft.hours}</span>
        </div>
        <span className="text-red-500">Hours</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-4xl text-red-500">{":"}</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <div className="border border-red-500 rounded-full p-2">
          <span className="text-2xl text-red-500">{timeLeft.minutes}</span>
        </div>
        <span className="text-red-500">Minutes</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-4xl text-red-500">{":"}</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <div className="border border-red-500 rounded-full p-2">
          <span className="text-2xl text-red-500">{timeLeft.seconds}</span>
        </div>
        <span className="text-red-500">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;