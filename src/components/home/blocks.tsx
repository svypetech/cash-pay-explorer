'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../app/context/DarkModeContext";
import BlockCard from "../cards/blockCard";
import Link from "next/link";
import { Block, getTimeAgo } from "@/src/types/types";
import { formatDistanceToNow } from "date-fns";
import BlockCardSkeleton from "../skeletons/block";

interface BlocksProps {
    blocks: Block[];
    loading: boolean;
}

const Blocks: React.FC<BlocksProps> = ({ blocks, loading }) => {
    const { darkMode } = useDarkMode(); // Get dark mode state
    const [showDark, setShowDark] = useState(darkMode);

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);



    return (
        <div className="py-8 p-6 sm:p-10 md:p-20">
            <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
                <div className="flex flex-wrap justify-between items-center">
                    <p className="font-satoshi font-bold text-[28px] md:text-[40px]">Blocks</p>
                    <Link href="/blocks">
                        <button className={`border ${showDark ? "border-secondary text-secondary" : "border-primary text-primary"} font-bold text-[12px] sm:text-[16px] rounded-sm p-2 px-2 sm:px-4 cursor-pointer`}>
                            View All
                        </button>
                    </Link>
                </div>
                <div className="flex items-center flex-wrap justify-between my-4 gap-4">
                    {
                        loading ?
                            <div className="flex items-center flex-wrap justify-between my-4 gap-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                <BlockCardSkeleton key={index} />
                                ))}
                            </div> :
                            blocks.map((val, ind) => { // @ts-ignore
                                return <BlockCard key={ind} blockNo={val.number} noOfTransactions={val.transactions.length.toString()} endTime={getTimeAgo(val.timestamp)} size={val.size} gasLimit={val.gasLimit} gasUsed={val.gasUsed} />
                            })
                    }
                </div>
            </div>

        </div>
    );
};

export default Blocks
