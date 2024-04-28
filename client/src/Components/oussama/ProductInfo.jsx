import React, { useState, useEffect } from "react";
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';

const ProductInfo = ({ price, oldPrice, discount, saleEndDate }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const endDate = new Date(saleEndDate);
      const today = new Date();
      const difference = endDate.getTime() - today.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(days > 0 ? days : 0);
    };

    calculateDaysLeft();

    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, [saleEndDate]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-2">
          <p className="text-2xl">${price}</p>
          {oldPrice && (
            <p
              className="text-gray-500"
              style={{ textDecoration: "line-through" }}
            >
              ${oldPrice}
            </p>
          )}
        </div>
        <div>
          {discount && (
            <p className="bg-[#f5efec] text-[#6f584c] px-3 p-1 rounded ">
              {discount}% OFF
            </p>
          )}
        </div>
      </div>
      <div className="text-red-500 flex gap-1">
       <AccessAlarmsRoundedIcon />
        <span>{daysLeft} days left at this price</span>
      </div>
    </div>
  );
};

export default ProductInfo;
