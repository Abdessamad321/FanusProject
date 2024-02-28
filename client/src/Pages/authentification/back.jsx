import React from "react";
import { CloseOutlined } from "@ant-design/icons";

function Background({ showCloseButton, onClose }) {
  return (
    <div className="absolute h-full w-full inset-0 flex justify-between">
      {showCloseButton && (
        <>
          <div className="bg-[#6F584C] text-xl w-1/2 p-2">LOGO</div>
          <div className="bg-white w-1/2 p-2 flex justify-end">
            <CloseOutlined className="" onClick={onClose} />
          </div>
        </>
      )}
    </div>
  );
}

export default Background;
