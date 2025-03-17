'use client'
import React, { useEffect, useState } from "react";
import images from "../../data/images.json"
import Image from "next/image";
import { useDarkMode } from "../../app/context/DarkModeContext";

interface SearchFieldProps {
    search: string;
    setSearch: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ search, setSearch }) => {
    const { darkMode } = useDarkMode(); // Get dark mode state
    const [showDark, setShowDark] = useState(darkMode);

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);



    return (
        <div className={`flex flex-col justify-center h-auto ${!showDark && "border-b border-gray-300 border-b-2"} p-6 sm:p-10 md:p-20 `}>
            <p className="font-satoshi text-[28px] md:text-[40px] my-4 font-bold">CashPay Explorer</p>
            {/* <div className="flex items-center justify-center w-full"> */}
            <div className={` ${showDark ? "bg-darkBg" : "bg-white"} flex items-center gap-x-2 justify-center w-full border border-black/20 border-2 rounded-lg`}>
                <Image src={showDark ? images.searchIconDark : images.searchIconLight} alt="search" width={24} height={24}
                    className="m-1 sm:m-3 w-4 h-4 sm:w-7 sm:h-7" />
                <input
                    type="text"
                    placeholder="Search by address/ transaction/ block."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full p-1 sm:p-2 border-none outline-none text:[10px] sm:text-[16px] placeholder:text-[10px] sm:placeholder:text-[16px] focus:ring-0 ${showDark ? "placeholder-white" : "placeholder-gray-500"} `}
                />
                <button className="bg-primary text-[16px] sm:text-[24px] text-white p-2 sm:p-6 h-auto rounded-tr-lg rounded-br-lg cursor-pointer">
                    Search
                </button>

            </div>
            {/* <button className="bg-primary text-white p-2 sm:p-6 h-auto rounded-tr-lg rounded-br-lg cursor-pointer">
                    Search
                </button> */}

            {/* </div> */}
        </div>
    );
};

export default SearchField;
