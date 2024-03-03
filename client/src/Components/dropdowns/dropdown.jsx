import React, { useState } from "react";

function Dropdown({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
