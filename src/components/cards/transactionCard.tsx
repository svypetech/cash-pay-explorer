'use client'
import React, { useEffect, useState } from "react";
import images from "../../data/images.json"
import Image from "next/image";
import { useDarkMode } from "../../app/context/DarkModeContext";

interface TransactionCardProps {
  transactionHash: string;
  blockNo: string;
  time: string;
  fromAddress: string;
  toAddress: string;
  status: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transactionHash, blockNo, time, fromAddress, toAddress, status }) => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className={`border-l ${showDark ? "border-l-secondary" : "border-l-primary"} border-l-4 rounded-lg shadow-lg w-full py-2 sm:py-4 m-2 ${darkMode && 'bg-black/25'}`} style={{ boxShadow: "0px 0px 12px 2px rgba(0, 0, 0, 0.06)" }}>
      <div className="flex flex-wrap flex-col sm:flex-row sm:items-center sm:justify-between px-1 sm:px-4">
        <div className="flex flex-col p-2 sm:p-4 gap-y-2 sm:gap-y-4">
          {/* Hash */}
          <div className="flex items-center gap-x-1 sm:gap-x-2 max-w-full overflow-hidden min-w-0">
            <div className="flex items-center p-2 rounded-full bg-secondary2/80">
              <Image src={showDark ? images.transactionIconDark : images.transactionIconLight} alt="block icon" width={24} height={24} />
            </div>
            <p
              className={`font-satoshi text-[12px] lg:text-[16px] font-bold 
      ${showDark ? "text-secondary" : "text-primary"} 
      w-full max-w-full lg:max-w-130 
      break-words overflow-hidden overflow-wrap word-break whitespace-pre-wrap`}
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
            >
              {transactionHash}
            </p>
          </div>


          {/* Block No and Time */}
          <div className="flex gap-x-4">
            <p className={`font-satoshi text-[12px] ${showDark ? "text-white" : "text-gray2"} font-bold`}>Block {blockNo}</p>
            <p className={`font-satoshi text-[12px] ${showDark ? "text-white/50" : "text-gray2/50"}`}>{time}</p>
          </div>
        </div>

        {/* From and To Address */}
        <div className="flex sm:justify-center sm:items-center gap-x-2 sm:gap-x-4 p-4 text-[12px] sm:text-[16px]">
          <div className="relative group cursor-pointer">
            <p>{fromAddress.slice(0, 8)} ...</p>
            <div className="absolute top-full left-0 w-auto max-w-[150px] sm:max-w-[900px] mt-1 p-2 bg-secondary2 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 break-words whitespace-normal">
              {fromAddress}
            </div>
          </div>

          <p className={`${showDark && "text-secondary"}`}> → </p>

          <div className="relative group cursor-pointer">
            <p>{toAddress.slice(0, 8)} ...</p>
            <div className="absolute top-full left-0 w-auto max-w-[150px] sm:max-w-[900px] mt-1 p-2 bg-secondary2 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 break-words whitespace-normal">
              {toAddress}
            </div>

          </div>
        </div>

        {/* Status Buttons */}
        <div className="flex sm:justify-center items-center gap-x-4 p-4">
          <button className="p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-green text-green2 font-semibold">IN</button>
          <button className="p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-green text-green2 font-semibold">{status}</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;