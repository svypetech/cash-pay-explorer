'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../app/context/DarkModeContext";
import BlockCard from "../cards/blockCard";
import Link from "next/link";
import { Block } from "@/src/types/types";
import BlockCardSkeleton from "../skeletons/block";

interface BlocksProps {
    blocks: Block[];
    loading: boolean;
    error?: string | null;
}

const Blocks: React.FC<BlocksProps> = ({ blocks, loading, error }) => {
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
                    {loading ? (
                        <div className="flex items-center flex-wrap justify-between my-4 gap-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <BlockCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className={`w-full flex items-center justify-center p-8 rounded-lg ${showDark ? "bg-gray-800" : "bg-gray-100"}`}>
                            <div className="text-center">
                                <div className={`text-4xl mb-2 ${showDark ? "text-gray-600" : "text-gray-400"}`}>
                                    ⚠️
                                </div>
                                <p className={`text-sm font-medium ${showDark ? "text-gray-300" : "text-gray-600"}`}>
                                    Unable to fetch blocks
                                </p>
                            </div>
                        </div>
                    ) : (
                        blocks.map((block, ind) => {
                            return <BlockCard key={ind} block={block} />
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blocks