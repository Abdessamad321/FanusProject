import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from "react-icons/bi";

export function Dropdown({ placeholder, options, value, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div className='flex justify-center items-center'>
        <button
          type="button"
          className={`inline-flex justify-between w-full p-3 border border-gray-200 bg-white text-gray-700 shadow-sm shadow-slate-100 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 ${className}`}
          onClick={handleToggle}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          {value}
          <BiChevronDown size={20} style={{ transform: isOpen && !openUpwards ? 'rotate(180deg)' : 'none' }} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-${openUpwards ? 'bottom' : 'top'}-right absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          style={{ top: openUpwards ? 'auto' : '100%', bottom: openUpwards ? '100%' : 'auto' }}
        >
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {filteredOptions.length > 0 ? (
            <div className="py-1 max-h-36 overflow-y-auto" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-700">
              No matching options found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}