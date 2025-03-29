'use client'
import React, { useEffect, useState } from "react";
import images from "../../data/images.json"
import Image from "next/image";
import { useDarkMode } from "../../app/context/DarkModeContext";
import { useRouter } from "next/navigation";
import { getTimeAgo } from "@/src/types/types";

interface BlockCardProps {
    block: {
        baseFeePerGas: string;
        difficulty: string;
        extraData: string;
        gasLimit: string;
        gasUsed: string;
        hash: string;
        logsBloom: string;
        miner: string;
        mixHash: string;
        nonce: string;
        number: string;
        parentHash: string;
        receiptsRoot: string;
        sha3Uncles: string;
        size: string;
        stateRoot: string;
        timestamp: number;
        totalDifficulty: string;
        transactions: string[];
    };
}

const BlockCard: React.FC<BlockCardProps> = ({ block }) => {
    const { darkMode } = useDarkMode(); // Get dark mode state
    const [showDark, setShowDark] = useState(darkMode);
    const router = useRouter();

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);



    return (
        <div className={`flex-1 border-l ${showDark? "border-l-secondary":"border-l-primary"} border-l-4 rounded-lg shadow-lg w-full sm:w-62  ${darkMode && 'bg-black/25'} `} style={{ boxShadow: "0px 0px 12px 2px rgba(0, 0, 0, 0.06)" }}>
            <div className="flex flex-wrap items-center gap-x-2 p-4">
                <div className="flex items-center p-2 rounded-full bg-secondary2/80">
                    <Image src={showDark ? images.blockIconDark:images.blockIconLight} alt="block icon" width={24} height={24} />
                </div>
                <p className={`cursor-pointer font-satoshi font-bold text-[16px] ${showDark? "text-secondary":"text-primary"}`}
                    onClick={() => {
                        const serializedBlock = encodeURIComponent(JSON.stringify(block));
                        router.push(`/block-details?data=${serializedBlock}`);
                    }}
                >{block.number}</p>
            </div>
            <div className="flex items-center bg-black/4 gap-x-6 p-4">
                <p className="font-satoshi text-gray text-[12px]">{block.transactions.length.toString()} Transactions</p>
                <p className="font-satoshi text-gray text-[12px]">{getTimeAgo(block.timestamp)}</p>
            </div>
        </div>
    );
};

export default BlockCard;
