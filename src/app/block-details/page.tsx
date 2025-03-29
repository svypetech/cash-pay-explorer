"use client";

import BlockDetails from "@/src/components/cards/blockDetails";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { convertGasUsed, convertTimestamp } from "@/src/types/types";
import { useSearchParams } from "next/navigation";

interface Block {
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
    timestamp: string;
    totalDifficulty: string;
    transactions: string[];
};

const page = () => {
    const { darkMode } = useDarkMode();
    const [showDark, setShowDark] = useState(darkMode);
    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    // Decode and parse the JSON string
    const block = data ? JSON.parse(decodeURIComponent(data)) : null;
  
    console.log(block); // See the extracted block object

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);

    if (!block) {
        return <div className="flex justify-center items-center min-h-screen text-black">No block details available</div>;
    }

    return (
        <div className="flex flex-col justify-center min-h-screen bg-dark p-10">
            <BlockDetails blockHash={block.hash} parentHash={block.parentHash} timestamp={convertTimestamp(block.timestamp)} transactions={block.transactions.length} size={block.size} difficulty={Number(block.difficulty)} totalDifficulty={block.totalDifficulty} gasUsed={convertGasUsed(block.gasUsed, block.gasLimit)} gasLimit={Number(block.gasLimit)} nonce={block.nonce} showDark={showDark} stateRoot={block.stateRoot} baseFeePerGas={block.baseFeePerGas} extraData={block.extraData} logsBloom={block.logsBloom} miner={block.miner} mixHash={block.mixHash} number={block.number} receiptsRoot={block.receiptsRoot} />
        </div>
    );
}

export default page;    