import React, { useState } from "react";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`grid grid-cols cursor-pointer w-14 h-8 p-1 rounded-full ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
