"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
}

const EmailField: React.FC<ButtonProps> = ({ onClick }) => {
  const [email, setEmail] = useState("");

  return (
    <div 
    className="relative z-50 flex justify-center items-center gap-x-2 bg-white/10 h-13 sm:h-16 rounded-lg cursor-pointer my-4 sm:my-10 mb-26 sm:mb-10
                 transition-all duration-300 font-poppins">
    {/* className="relative z-50 flex bg-white/10 h-16 justify-center items-center rounded-lg pl-4 my-10 mb-50 sm:mb-10"> */}
      {/* Email Icon */}
      <Image
        src="/icons/email.svg"
        alt="email"
        height={7}
        width={8}
        className="ml-2 h-7 w-8"
      />

      {/* Input Field */}
      <input
        type="text"
        className="relative z-50 ml-4 bg-transparent outline-none text-white placeholder-gray-400 w-full"
        value={email}
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Submit Button */}
      <button
      className="relative z-50 flex justify-center items-center h-full gap-x-2 px-6 cursor-pointer font-poppins bg-[#143881] rounded-tr-lg rounded-br-lg
                 transition-all duration-300 hover:border-black hover:bg-[#000A1D] font-poppins"
        onClick={() => {
          console.log("Submit button clicked"); // Debugging log
          onClick();
        }}
      >
        Submit
        <Image src="/icons/rightArrow.svg" alt="Right Arrow" width={30} height={15} />
      </button>
    </div>
  );
};

export default EmailField;