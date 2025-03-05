"use client"
import React from 'react'
import Image from 'next/image';

const Button = () => {
  return (
    <button className="flex justify-center items-center gap-x-2 p-4 px-6 border border-white rounded-lg cursor-pointer my-10 mb-50 sm:mb-10
                    transition-all duration-300 hover:blur-sm hover:bg-white hover:cursor-pointer font-poppins"
                    // onClick={onSubmit}
                    >
      Register Now
      <Image src="/icons/rightArrow.svg" alt="Right Arrow"/>
    </button>


  )
}

export default Button