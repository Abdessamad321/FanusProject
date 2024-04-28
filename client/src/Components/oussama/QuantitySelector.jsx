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
        <form className="flex bg-[#f1dbc0] text-[#6f584c] rounded-xl">
            <div className="relative flex items-center max-w-[11rem]">
                <button
                    type="button"
                    onClick={decrementQuantity}
                    className="text-[#6f584c] rounded-l-full p-4 h-11 "
                >
                    <svg
                        className="w-3 h-3 text-[#6f584c] dark:text-costum-brown"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                        />
                    </svg>
                </button>
                <input
                    type="text"
                    className="bg-[#f1dbc0] border-x-0 h-11 font-medium text-center block w-14 dark:text-costum-brown"
                    placeholder=""
                    value={quantity}
                    required
                    readOnly
                />
                <button
                    type="button"
                    onClick={incrementQuantity}
                    className=" rounded-r-full p-4 h-11 "
                >
                    <svg
                        className="w-3 h-3 text-[#6f584c] dark:text-costum-brown"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default QuantitySelector;
