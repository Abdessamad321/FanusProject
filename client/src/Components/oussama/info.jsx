import React, { useState } from 'react';
import cal from "../../assets/calendrier.png";
import loc from "../../assets/localisation.png";
import tem from "../../assets/temps.png";
import liv from "../../assets/livre.png";
import can from "../../assets/canape.png"

export default function Info() {
    const specificDate = new Date(2024, 2, 1);
    const formattedDate = specificDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleOptionSelect = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className='info flex'>
            <div className="q mr-4"> {/* Added mr-4 for right margin */}
                <div className="cal flex mb-2">
                    <img className='w-6 h4' src={cal}/>
                    <p>Date & Time</p>
                </div>
                <div className="cal flex mb-2">
                    <img className='w-6 h4' src={loc}/>
                    <p>Localisation</p>
                </div>
                <div className="cal flex mb-2">
                    <img className='w-6 h4' src={tem}/>
                    <p>Duration</p>
                </div>
                <div className="cal flex mb-2">
                    <img className='w-6 h4' src={liv}/>
                    <p>Language</p>
                </div>
                <div className="cal flex mb-2">
                    <img className='w-6 h4' src={can}/>
                    <p className=''>Title Gorem Dolar Sit Amet</p>
                </div>
            </div>
            <div className="a">
                <p className="mb-2">{formattedDate}</p>
                <p className='mb-2'>Room 4, Riad Leorm</p>
                <p className='mb-2'>1hour 15minutes</p>
                <p className='mb-2'>English</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    list="suggestions"
                    onBlur={handleOptionSelect} 
                    placeholder='Prices'
                />
                <datalist id="suggestions"> {/* Define datalist with id */}
                    <option value="14$"></option> {/* Add suggestion options */}
                    <option value="30$"></option>
                    <option value="50$"></option>
                </datalist>
            </div>
        </div>
    )
}