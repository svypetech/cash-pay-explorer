"use client"
import React, { useState } from 'react'
import Image from 'next/image';

const EmailField = () => {
    const [email, setEmail] = useState('');

    return (
        <div className='flex bg-white/10 h-16 justify-center items-center rounded-lg pl-4 my-10 mb-50 sm:mb-10 '>
            {/* Email Icon */}
            <Image src="/icons/email.svg" alt='email' className='ml-2 h-7 w-8' />

            {/* Input Field */}
            <input 
                type="text"
                className='ml-4 bg-transparent outline-none text-white placeholder-gray-400 w-full'
                value={email}
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Submit Button */}
            <button className="flex justify-center items-center h-full gap-x-2 px-6 cursor-pointer 
                    transition-all duration-300 hover:blur-sm hover:bg-white hover:cursor-pointer 
                    font-poppins bg-[#143881] rounded-tr-lg rounded-br-lg">
                Submit
                <Image src="/icons/rightArrow.svg" alt="right arrow"/>
            </button>
        </div>
    );
}

export default EmailField;
