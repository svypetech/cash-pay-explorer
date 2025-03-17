'use client'
import React, { useEffect, useState } from "react";
import images from "../../data/images.json"
import Image from "next/image";
import { useDarkMode } from "../../app/context/DarkModeContext";

interface BlockCardProps {
    blockNo: string;
    noOfTransactions: string,
    endTime: string,
    size: string,
    gasLimit: string,
    gasUsed: string
}

const BlockCard: React.FC<BlockCardProps> = ({ blockNo, noOfTransactions, endTime, size, gasLimit, gasUsed }) => {
    const { darkMode } = useDarkMode(); // Get dark mode state
    const [showDark, setShowDark] = useState(darkMode);

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);



    return (
        <div className={`flex-1 flex justify-between `} >
            <div className={`flex flex-wrap justify-between w-full border-l ${showDark ? "border-l-secondary" : "border-l-primary"} border-l-4 rounded-lg shadow-lg  ${darkMode && 'bg-black/25'} `}
            style={{ boxShadow: "0px 0px 12px 2px rgba(0, 0, 0, 0.06)" }}>
                <div className="flex-2">
                    <div className="flex flex-wrap items-center gap-x-2 p-4">
                        <div className="flex items-center p-2 rounded-full bg-secondary2/80">
                            <Image src={showDark ? images.blockIconDark : images.blockIconLight} alt="block icon" width={24} height={24} />
                        </div>
                        <p className={`font-satoshi font-bold text-[16px] ${showDark ? "text-secondary" : "text-primary"}`}>{blockNo}</p>
                    </div>
                    <div className="flex items-center gap-x-6 p-4 whitespace-nowrap">
                        <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"}  text-[12px]`}>{noOfTransactions} Transactions</p>
                        <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"}  text-[12px]`}>{size}</p>
                        <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"}  text-[12px]`}>{endTime}</p>
                    </div>
                </div>
                {/* gas limit */}
                <div className="flex flex-1 flex-col w-full items-end justify-end sm:justify-center gap-y-2 p-4 whitespace-nowrap">
                    <p className={`font-satoshi font-bold text-[12px] ${showDark ? "text-secondary" : "text-primary"}`}>{gasLimit} Gas Limit</p>
                    <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"} text-[12px]`}>{gasUsed}% Gas Used</p>
                    <div className={`w-full max-w-32  bg-secondary/10 rounded-full h-1.5 relative overflow-hidden`}>
                        <div
                            className={`${darkMode? "bg-secondary":"bg-primary"} h-full rounded-full transition-all duration-300`}
                            style={{ width: `${gasUsed}%` }}
                        ></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlockCard;
