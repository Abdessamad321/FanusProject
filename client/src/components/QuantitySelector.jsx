import React, { useState } from 'react';

function QuantitySelector() {
    const [quantity, setQuantity] = useState(0); 

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const incrementQuantity = () => {
        if (quantity < 5) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    return (
        <form className="max-w-xs mx-auto ">
            
            <div className="relative flex items-center max-w-[11rem]">
                <button type="button" onClick={decrementQuantity} className=" bg-biege  rounded-s-full p-3 h-11  focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-costum-brown" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                    </svg>
                </button>
                <input type="text" className="bg-biege border-x-0 h-11 font-medium text-center  block w-14   dark:text-costum-brown " placeholder="" value={quantity} required readOnly />
                
                <button type="button" onClick={incrementQuantity} className=" bg-biege  rounded-e-full p-3 h-11  focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-costum-brown" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default QuantitySelector;
