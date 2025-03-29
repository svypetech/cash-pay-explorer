'use client'
import React, { useEffect, useState } from "react";
import images from "../../data/images.json"
import Image from "next/image";
import { useDarkMode } from "../../app/context/DarkModeContext";
import { useRouter } from "next/navigation";
import { Block, getTimeAgo } from "@/src/types/types";

interface BlockCardProps {
    block: Block;
}


const BlockCard: React.FC<BlockCardProps> = ({ block }) => {
    const { darkMode } = useDarkMode(); // Get dark mode state
    const [showDark, setShowDark] = useState(darkMode);
    const router = useRouter(); // Use Next.js router for navigation

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
                        <p className={`font-satoshi font-bold text-[16px] cursor-pointer ${showDark ? "text-secondary" : "text-primary"}`}
                            onClick={() => {
                                const serializedBlock = encodeURIComponent(JSON.stringify(block));
                                router.push(`/block-details?data=${serializedBlock}`);
                            }}
                        >{block?.number}</p>
                    </div>
                    <div className="flex items-center gap-x-6 p-4 whitespace-nowrap">
                        <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"}  text-[12px]`}>{block.transactions.length.toString()} Transactions</p>
                        <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"}  text-[12px]`}>{block.size}</p>
                        <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"}  text-[12px]`}>{getTimeAgo(block?.timestamp)}</p>
                    </div>
                </div>
                {/* gas limit */}
                <div className="flex flex-1 flex-col w-full items-end justify-end sm:justify-center gap-y-2 p-4 whitespace-nowrap">
                    <p className={`font-satoshi font-bold text-[12px] ${showDark ? "text-secondary" : "text-primary"}`}>{block.gasLimit} Gas Limit</p>
                    <p className={`font-satoshi ${darkMode? "text-darkText":"text-gray"} text-[12px]`}>{block.gasUsed}% Gas Used</p>
                    <div className={`w-full max-w-32  bg-secondary/10 rounded-full h-1.5 relative overflow-hidden`}>
                        <div
                            className={`${darkMode? "bg-secondary":"bg-primary"} h-full rounded-full transition-all duration-300`}
                            style={{ width: `${block.gasUsed}%` }}
                        ></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlockCard;
