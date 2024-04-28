import React from "react";

export function TextInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
}) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      className={`border-[1px] border-gray-200 p-3 w-full shadow-sm shadow-slate-100 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 ${className}`}
    />
  );
}

export function SelectInput({ id, name, value, options }) {
  const handleSelectInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleSelectInputChange}
        onfocus="this.size=6;"
        onblur="this.size=6;"
        onfocusout="this.size=null;"
        onchange="this.size=6; this.blur();"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextAreaInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
}) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      className={`border-[1px] border-gray-200 p-3 w-full shadow-sm shadow-slate-100 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 ${className}`}
    />
  );
}
