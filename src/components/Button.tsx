"use client";
import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="relative z-50 flex justify-center items-center gap-x-2 p-2 sm:p-4 px-6 sm:px-10 xl:px-14 border border-white rounded-lg cursor-pointer my-4 sm:my-10 mb-40 sm:mb-10
                 transition-all duration-300 hover:border-black hover:bg-[#000A1D] font-poppins text-[16px]"
      onClick={onClick}
    >
      Register Now
      <Image src="/icons/rightArrow.svg" alt="Right Arrow" width={30} height={15} />
    </button>
  );
};

export default Button;