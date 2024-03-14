import React, { useState, useEffect, useRef } from 'react';
import Select from "react-select";
import {DownOutlined} from "@ant-design/icons";
import { BiChevronDown } from "react-icons/bi";

export function Dropdown({ options, value, onChange, className, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const spaceAbove = dropdownRect.top;
    const spaceBelow = window.innerHeight - dropdownRect.bottom;

    setIsOpen(!isOpen);
    setOpenUpwards(spaceAbove > spaceBelow);
  };

  const handleSelect = (option) => {
    if (option && option.value) { 
      onChange(option);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div className='flex justify-center items-center '>
        <button
          type="button"
          className={`inline-flex justify-between w-full p-3 border border-gray-200 bg-white text-gray-700 shadow-sm shadow-slate-100 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 ${className}`}
          onClick={handleToggle}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          {value || placeholder}
          <BiChevronDown size={20} style={{ transform: isOpen && !openUpwards ? 'rotate(180deg)' : 'none' }} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-${openUpwards ? 'bottom' : 'top'}-right absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          style={{ top: openUpwards ? 'auto' : '100%', bottom: openUpwards ? '100%' : 'auto' }}
        >
          <div className="py-1 max-h-36 overflow-y-auto" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <div
                key={option.value}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




// export function SelectDropdown ({ id, name, placeholder, options, value, onChange, unstyled }) {


//   return (
//     <Select
//       styles={{
//         control: (provided, state) => ({
//           ...provided,
//           borderRadius: "0.375rem",
//           padding: "0.25rem",
//           height:"3.1rem",
//           boxShadow: state.isFocused
//             ? "0 0 0 2px rgba(0, 0, 0, 100)"
//             : "0 0.5px 2px 0 rgba(0, 0, 0, 0.1)",
//           border: state.isFocused ? "#000000" : "1px solid #e3e3e3",
//           "&:hover": {
//             borderColor: "none",
//           },
//         }),
//       }}
//       id={id}
//       name={name}
//       placeholder={placeholder}
//       options={options}
//       value={value}
//       onChange={onChange}
//     />
//   );
// };












// import React, { useState } from "react";

// function Dropdown({ options, onSelect }) {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSelect = (option) => {
//     setSelectedOption(option);
//     onSelect(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="dropdown">
//       <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
//         {selectedOption ? selectedOption.label : "Select an option"}
//       </div>
//       {isOpen && (
//         <div className="dropdown-menu">
//           {options.map((option) => (
//             <div
//               key={option.value}
//               className="dropdown-item"
//               onClick={() => handleSelect(option)}
//             >
//               {option.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dropdown;
