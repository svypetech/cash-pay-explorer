import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import data from '../data/header.json';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '../app/context/DarkModeContext';
import Link from 'next/link';

const Footer = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showTransactionDropdown, setShowTransactionDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const transactionDropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // Delay to let the onClick event finish first
                setTimeout(() => setShowDropdown(false), 0);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (transactionDropdownRef.current && !transactionDropdownRef.current.contains(event.target as Node)) {
                // Delay to let the onClick event finish first
                setTimeout(() => setShowTransactionDropdown(false), 0);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


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
                                <div key={ind} className='relative flex flex-1 sm:flex-0 gap-x-2 items-center cursor-pointer'>
                                    {val.dropdown ? (
                                                    <>
                                                      <div
                                                        onClick={() => {
                                                          val.name === "APIs" ? setShowDropdown((prev) => !prev): setShowTransactionDropdown((prev) => !prev)
                                                        }}
                                                        className="flex items-center cursor-pointer rounded-lg"
                                                      >
                                                          <p className="font-satoshi text-[12px] sm:text-[16px]">{val.name}</p>
                                                      </div>
                                    
                                                      {(val.name === "APIs" ? showDropdown : showTransactionDropdown) && val.dropdown && (
                                                        <div
                                                          ref={val.name === "APIs" ? dropdownRef : transactionDropdownRef}
                                                          className={`absolute top-3 left-0 bottom- mt-3 w-32 bg-white text-black border border-gray-200 rounded-md shadow-lg z-10`}
                                                        >
                                                          {val.dropdown.map((item: any, i: number) => (
                                                            <button
                                                              key={i}
                                                              type="button"
                                                              onClick={() => {
                                                                val.name === "APIs" ? setShowDropdown(!showDropdown) : setShowTransactionDropdown(!showTransactionDropdown)
                                                                if (item.route) router.push(item.route); // Fixed routing issue
                                                              }}
                                                              className="w-full text-left px-4 py-2 text-sm cursor-pointer hover:scale-105"
                                                            >
                                                              {item.name}
                                                            </button>
                                                          ))}
                                                        </div>
                                                      )}
                                                    </>
                                                  ) :
                                    <Link href={val.route} className='font-satoshi text-[12px] sm:text-[16px]' >{val.name}</Link>}
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
