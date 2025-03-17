import React from 'react'
import Image from 'next/image'
import data from '../data/header.json';

const Footer = () => {
    return (
        <div>
            <div className="bg-primary2 text-white w-full px-2 sm:px-12 flex flex-col gap-y-8 pt-18">
                <Image src="/images/whiteLogo.svg" alt="logo" width={497} height={112} />
                <div className='flex flex-col gap-y-4 sm:gap-y-8 pl-2 sm:pl-8 '>
                    <p className="font-poppins text-[16px] sm:text-[20] max-w-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className='flex gap-x-2 sm:gap-x-8 items-center'>
                        {Array.isArray(data) &&
                            data.map((val, ind) => (
                                <div key={ind} className='flex flex-1 sm:flex-0 gap-x-2 items-center cursor-pointer'>
                                    <p className='font-satoshi text-[12px] sm:text-[16px]' >{val.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="border-t border-white flex  flex-wrap justify-center sm:justify-between items-center">
                    <p className="font-poppins text-[14px] max-w-lg my-6">
                        Licensed & Regulated by [Appropriate Regulatory Authority].
                    </p>
                    <div className='flex gap-4 sm:gap-6 items-center'>
                        <Image src={"icons/Twitter.svg"} alt='logo' width={20} height={20} />
                        <Image src={"icons/LinkedIn.svg"} alt='logo' width={20} height={20} />
                        <Image src={"icons/Instagram.svg"} alt='logo' width={20} height={20} />
                        <Image src={"icons/Facebook.svg"} alt='logo' width={20} height={20} />
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='bg-primary/98 flex justify-center p-3 text-white'>
                <p className="font-poppins font-[16]">
                    Copyright © 2025 Cashpay
                </p>
            </div>
        </div>
    )
}

export default Footer
