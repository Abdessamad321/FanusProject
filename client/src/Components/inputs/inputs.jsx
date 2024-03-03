import React, { useState, useEffect } from "react";

export function TextInput({ id, name, placeholder, value, onChange }) {
  const [textInput, setTextInput] = useState(value || ''); 
  

  const handleTextInputChange = (event) => {
    const newValue = event.target.value;
    setTextInput(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <input
        className="border-[1px] rounded-md border-gray-200 p-3 w-full shadow-sm shadow-slate-100"
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={textInput}
        onChange={handleTextInputChange}
      />
    </div>
  );
}



// function TextAreaInput() {
//   const [textareaInput, setTextareaInput] = useState("");

//   const handleTextareaInputChange = (event) => {
//     setTextareaInput(event.target.value);
//   };

//   return (
//     <div>
//       <textarea
//         id="textareaInput"
//         value={textareaInput}
//         onChange={handleTextareaInputChange}
//       ></textarea>
//     </div>
//   );
// }

// function SelectInput() {
//   const [selectInput, setSelectInput] = useState("");

//   const handleSelectInputChange = (event) => {
//     setSelectInput(event.target.value);
//   };

//   return (
//     <div>
//       <select
//         id="selectInput"
//         value={selectInput}
//         onChange={handleSelectInputChange}
//       >
//         <option value="">Select an option</option>
//         <option value="option1">Option 1</option>
//         <option value="option2">Option 2</option>
//         <option value="option3">Option 3</option>
//       </select>
//     </div>
//   );
// }

// export { TextInput, TextAreaInput, SelectInput };
