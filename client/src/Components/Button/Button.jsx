import React from "react";

function FanousButton({ children, onClick, className }) {
  return (
    <button
      className={`bg-[#6F584C] hover:bg-[#f1dbc0] w-32 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FanousButton;
